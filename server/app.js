import express from 'express';
import {Server} from 'http';
import favicon from 'serve-favicon';
import path from 'path';
import shortid from 'shortid';
import _ from 'underscore';

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
      delete users[socket.username];
    }

    if (users[username]){
      socket.emit('LOG_IN_FAILURE', 'USERNAME_TAKEN');
    } else {

      socket.username = username;
      users[username] = username;

      loggedIn = true;
      socket.emit('LOG_IN_SUCCESS');
    }
  });

  socket.on('CREATE_GAME_REQUEST', () => {
    const gameId = shortid.generate();
    socket.join(gameId);

    const game = {
      host: socket.username,
      players: [socket.username]
    };

    games[gameId] = game;

    const response = {
      id: gameId,
      game: game
    };

    socket.emit('CREATE_GAME_SUCCESS', response);
    socket.broadcast.emit('GAME_CREATED', response);
  });

  socket.on('JOIN_GAME_REQUEST', gameId => {
    socket.join(gameId);
    const game = games[gameId];

    if (game) {
      game.players.push(socket.username);

      socket.emit('JOIN_GAME_SUCCESS', {
        id: gameId,
        game: game
      });
      socket.broadcast.to(gameId).emit('PLAYER_JOINED', {
        id: gameId,
        name: socket.username
      });

    } else {
      socket.emit('JOIN_GAME_FAILURE', gameId);
    }
  });

  socket.on('LEAVE_GAME_REQUEST', gameId => {
    socket.leave(gameId);
    const game = games[gameId];

    if (game) {
      game.players = _.without(game.players, socket.username);

      socket.emit('LEAVE_GAME_SUCCESS', {
        id: gameId,
        game: game
      });
      socket.broadcast.to(gameId).emit('PLAYER_LEFT', {
        id: gameId,
        name: socket.username
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

  socket.on('LOG_OUT', () => {
    loggedIn = false;
    delete users[socket.username];
  });

  socket.on('disconnect', () => {
    delete users[socket.username];
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
