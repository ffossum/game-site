import express from 'express';
import {Server} from 'http';
import favicon from 'serve-favicon';
import path from 'path';
import shortid from 'shortid';
import _ from 'lodash';
import db from './db';
import * as loveLetter from './loveLetter';

const app = express();
const server = Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.use(favicon(path.join('public','static','meeple.png')));

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

io.on('connection', socket => {
  let loggedIn = false;

  socket.emit('UPDATE_PLAYERS', _.extend({}, users, getUsersInGames(games)));
  socket.emit('UPDATE_GAMES', _.mapValues(games, game => {
    return _.pick(game, ['id', 'host', 'players', 'status']);
  }));

  socket.on('SEND_MESSAGE', data => {
    socket.broadcast.emit('NEW_MESSAGE', data);
  });

  socket.on('LOG_IN_REQUEST', username => {

    if (loggedIn) {
      delete users[socket.user.id];
    }

    const user = _.findWhere(db.users, {name: username});
    if (!user) {
      socket.emit('LOG_IN_FAILURE', 'USER_NOT_FOUND');
    } else {
      socket.user = _.pick(user, ['id', 'name', 'avatar']);
      users[user.id] = socket.user;
      userSockets[user.id] = _.union(userSockets[user.id], [socket]);

      loggedIn = true;

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
      socket.emit('LOG_IN_SUCCESS', socket.user);
    }
  });

  socket.on('CREATE_GAME_REQUEST', () => {
    const gameId = shortid.generate();
    _.each(userSockets[socket.user.id], userSocket => userSocket.join(gameId));

    const game = {
      id: gameId,
      host: socket.user.id,
      players: [socket.user.id]
    };

    games[gameId] = game;

    socket.emit('CREATE_GAME_SUCCESS', game);
    socket.broadcast.emit('GAME_CREATED', game);
  });

  socket.on('JOIN_GAME_REQUEST', gameId => {
    const game = games[gameId];

    if (game) {
      _.each(userSockets[socket.user.id], userSocket => userSocket.join(gameId));
      game.players.push(socket.user.id);

      socket.emit('JOIN_GAME_SUCCESS', game);
      socket.broadcast.to(gameId).emit('PLAYER_JOINED', {
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
      socket.broadcast.to(gameId).emit('PLAYER_LEFT', {
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
    loggedIn = false;

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
      delete users[socket.user.id];
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
      delete users[socket.user.id];
    }
  });
});

server.listen(8080, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  var environment = process.env.NODE_ENV === 'production' ? 'Production' : 'Development';
  console.log(environment + ' environment');

  console.log('Listening at localhost:8080');
});
