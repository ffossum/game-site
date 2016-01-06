import express from 'express';
import {Server} from 'http';
import favicon from 'serve-favicon';
import path from 'path';
import shortid from 'shortid';
import _ from 'lodash';
import db from './db';
import * as loveLetter from './loveLetter';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {secret} from './config';

const app = express();
const server = Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.use(favicon(path.join('public','static','meeple.png')));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, db.users[id]);
});

passport.use(new LocalStrategy({
    session: false
  },
  (username, password, done) => {
    const user = _.findWhere(db.users, {name: username});

    if (!user) {
      return done(null, false);
    }

    bcrypt.compare(password, user.password, (err, res) => {
      return done(null, res && user);
    });
  }
));

app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/register',
  (req, res) => {
    const {email, username, password} = req.body;
    const existing = _.find(db.users, user => {
      return user.name === username || user.email === email;
    });

    if (existing) {
      res.status(403).send('Already exists');
    } else {
      const userId = shortid.generate();
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, (err, hash) => {
          db.users[userId] = {
            id: userId,
            name: username,
            email,
            password: hash,
            avatar: crypto.createHash('md5').update(email).digest('hex')
          };

          jwt.sign({id: userId}, secret, {expiresIn: '7d'}, token => {
            res.status(200).json({token});
          });
        });
      });
    }
  }
);

app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    jwt.sign({id: req.user.id}, secret, {expiresIn: '7d'}, token => {
      res.status(200).json({token});
    });
  }
);

app.get('*', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.jade'), {
    env: process.env.NODE_ENV
  });
});

const users = {};
const userSockets = {};
const games = {};

function getUsersInGames(games) {
  const userIds = _.chain(games)
    .map(game => game.players)
    .flatten()
    .uniq()
    .value();

  const usersInGames = {};
  _.each(userIds, userId => {
    usersInGames[userId] = _.pick(db.users[userId], ['id', 'name', 'avatar']);
  });

  return usersInGames;
}

function isStartable(game) {
  return game.players.length >= game.settings.players.required;
}

function isJoinable(game) {
  const {required, optional} = game.settings.players;
  return game.players.length < required + optional;
}

io.on('connection', socket => {
  socket.emit('UPDATE_PLAYERS', _.extend({}, users, getUsersInGames(games)));
  socket.emit('UPDATE_GAMES', _.mapValues(games, game => {
    return _.pick(game, ['id', 'host', 'players', 'status', 'settings']);
  }));

  socket.on('SEND_MESSAGE', data => {
    socket.broadcast.emit('NEW_MESSAGE', data);
  });

  socket.on('LOG_IN_REQUEST', token => {
    jwt.verify(token, secret, (err, decoded) => {
      if (decoded) {
        const userId = decoded.id;
        const user = db.users[userId];

        if (!user) {
          socket.emit('LOG_IN_FAILURE', 'USER_NOT_FOUND');
        } else {
          socket.user = _.pick(user, ['id', 'name', 'avatar']);
          users[user.id] = socket.user;
          userSockets[user.id] = _.union(userSockets[user.id], [socket]);

          _.each(games, (game, gameId) => {
            if (_.contains(game.players, user.id)) {
              socket.join(gameId);
              socket.broadcast.to(gameId).emit('PLAYER_RECONNECTED', {
                game: {id: gameId},
                user: {id: user.id}
              });

              if (game.status === 'IN_PROGRESS') {
                socket.emit('UPDATE_GAME_STATE', {
                  game: {
                    id: gameId,
                    state: loveLetter.asVisibleBy(game.state, user.id)
                  }
                });
              }
            }
          });

          socket.broadcast.emit('UPDATE_PLAYERS', {[socket.user.id]: socket.user});

          jwt.sign({id: user.id}, secret, {expiresIn: '7d'}, newToken => {
            socket.emit('LOG_IN_SUCCESS', {user: socket.user, token: newToken});
          });
        }
      }
    });
  });

  socket.on('CREATE_GAME_REQUEST', settings => {
    const gameId = shortid.generate();
    _.each(userSockets[socket.user.id], userSocket => userSocket.join(gameId));

    const game = {
      id: gameId,
      host: socket.user.id,
      players: [socket.user.id],
      settings
    };

    games[gameId] = game;

    socket.emit('CREATE_GAME_SUCCESS', game);
    socket.broadcast.emit('GAME_CREATED', game);
  });

  socket.on('JOIN_GAME_REQUEST', gameId => {
    const game = games[gameId];

    if (game && isJoinable(game)) {
      _.each(userSockets[socket.user.id], userSocket => userSocket.join(gameId));
      game.players.push(socket.user.id);

      socket.emit('JOIN_GAME_SUCCESS', game);
      socket.broadcast.emit('PLAYER_JOINED', {
        game: {id: gameId},
        user: {id: socket.user.id}
      });

    } else {
      socket.emit('JOIN_GAME_FAILURE', gameId);
    }
  });

  socket.on('LEAVE_GAME_REQUEST', gameId => {
    socket.leave(gameId);
    const game = games[gameId];

    if (game) {
      game.players = _.without(game.players, socket.user.id);

      socket.emit('LEAVE_GAME_SUCCESS', game);
      socket.broadcast.emit('PLAYER_LEFT', {
        game: {id: gameId},
        user: {id: socket.user.id}
      });
    }
  });

  socket.on('SEND_GAME_MESSAGE', data => {
    const gameId = data.game.id;
    const game = games[gameId];
    if (game) {
      socket.broadcast.to(gameId).emit('NEW_GAME_MESSAGE', data);
    }
  });

  socket.on('START_GAME_REQUEST', data => {
    const gameId = data.game.id;
    const game = games[gameId];

    if (game && isStartable(game)) {
      game.status = 'IN_PROGRESS';
      game.state = loveLetter.createInitialState(game.players);
      _.each(game.players, userId => {
        _.each(userSockets[userId], userSocket => {
          userSocket.emit('UPDATE_GAME_STATE', {
            game: {
              id: gameId,
              state: loveLetter.asVisibleBy(game.state, userId)
            }
          });
        });
      });

      socket.emit('START_GAME_SUCCESS', data);
      socket.broadcast.to(gameId).emit('GAME_STARTED', data);
    }
  });

  socket.on('PERFORM_GAME_ACTION', data => {
    const gameId = data.game.id;
    const game = games[gameId];

    const action = _.extend(data.action, {acting: socket.user.id});
    game.state = loveLetter.useCard(game.state, action);

    _.each(game.players, userId => {
      _.each(userSockets[userId], userSocket => {
        userSocket.emit('UPDATE_GAME_STATE', {
          game: {
            id: gameId,
            state: loveLetter.asVisibleBy(game.state, userId)
          }
        });
      });
    });
  });

  socket.on('LOG_OUT', () => {
    if (socket.user) {
      _.each(games, (game, gameId) => {
        if (_.contains(game.players, socket.user.id)) {
          socket.leave(gameId);
          socket.broadcast.to(gameId).emit('PLAYER_DISCONNECTED', {
            game: {id: gameId},
            user: {id: socket.user.id}
          });
        }
      });

      userSockets[socket.user.id] = _.without(userSockets[socket.user.id], socket);
      if (_.isEmpty(userSockets[socket.user.id])) {
        delete users[socket.user.id];
      }
    }
  });

  socket.on('disconnect', () => {
    if (socket.user) {
      _.each(games, (game, gameId) => {
        if (_.contains(game.players, socket.user.id)) {
          socket.broadcast.to(gameId).emit('PLAYER_DISCONNECTED', {
            game: {id: gameId},
            user: {id: socket.user.id}
          });
        }
      });

      userSockets[socket.user.id] = _.without(userSockets[socket.user.id], socket);
      if (_.isEmpty(userSockets[socket.user.id])) {
        delete users[socket.user.id];
      }
    }
  });
});

server.listen(8080, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }

  var environment = process.env.NODE_ENV === 'production' ? 'Production' : 'Development';
  console.log(environment + ' environment');

  console.log('Listening on port 8080');
});
