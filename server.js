var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var favicon = require('serve-favicon');
var path = require('path');

app.use(express.static('public'));
app.use(favicon(path.join(__dirname,'public','static','favicon.ico')));

app.get('*', (req, res) => {
  res.render('index.jade', {
    env: process.env.NODE_ENV
  });
});

// usernames currently connected to the chat
var users = {};

io.on('connection', socket => {
  var userLoggedIn = false;

  socket.on('SEND_MESSAGE', data => {
    socket.broadcast.emit('new message', data);
  });

  socket.on('LOG_IN_REQUEST', username => {

    if (userLoggedIn) {
      delete users[socket.username];
    }

    if (users[username]){
      socket.emit('username taken');
    } else {

      socket.username = username;
      users[username] = username;

      userLoggedIn = true;
      socket.emit('login', {
        users: users
      });

      socket.broadcast.emit('user joined', {
        username: socket.username
      });
    }
  });

  socket.on('LOG_OUT', () => {
    userLoggedIn = false;
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
