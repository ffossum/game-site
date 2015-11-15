import express from 'express';
import {Server} from 'http';
import favicon from 'serve-favicon';
import path from 'path';
import shortid from 'shortid';
import _ from 'underscore';
import db from './db';

const app = express();
const server = Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.use(favicon(path.join(__dirname,'public','static','meeple.png')));

app.get('*', (req, res) => {
  res.render('index.jade', {
    env: process.env.NODE_ENV
  });
});

const users = {};
const games = {};

io.on('connection', socket => {
  let loggedIn = false;

  socket.emit('UPDATE_GAMES', games);

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

      loggedIn = true;

      _.each(games, (game, gameId) => {
        if (_.contains(game.players, user.id)) {
          socket.join(gameId);
          socket.broadcast.to(gameId).emit('PLAYER_RECONNECTED', {
            game: {id: gameId},
            user: {id: user.id}
          });
        }
      });

      socket.emit('LOG_IN_SUCCESS', socket.user);
    }
  });

  socket.on('CREATE_GAME_REQUEST', () => {
    const gameId = shortid.generate();
    socket.join(gameId);

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
    socket.join(gameId);
    const game = games[gameId];

    if (game) {
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
    const gameId = data.id;
    const game = games[gameId];
    if (game) {
      socket.broadcast.to(gameId).emit('NEW_GAME_MESSAGE', data);
    }
  });

  socket.on('START_GAME_REQUEST', gameId => {
    const game = games[gameId];
    game.status = 'IN_PROGRESS';

    socket.emit('START_GAME_SUCCESS', gameId);
    socket.broadcast.to(gameId).emit('GAME_STARTED', gameId);
  });

  socket.on('LOG_OUT', () => {
    loggedIn = false;

    _.each(games, (game, gameId) => {
      if (_.contains(game.players, socket.user.id)) {
        socket.leave(gameId);
        socket.broadcast.to(gameId).emit('PLAYER_DISCONNECTED', {
          game: {id: gameId},
          user: {id: socket.user.id}
        });
      }
    });

    delete users[socket.user.id];
  });

  socket.on('disconnect', () => {

    _.each(games, (game, gameId) => {
      if (_.contains(game.players, socket.user.id)) {
        socket.broadcast.to(gameId).emit('PLAYER_DISCONNECTED', {
          game: {id: gameId},
          user: {id: socket.user.id}
        });
      }
    });
    if (socket.user) {
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
