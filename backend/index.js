const express = require('express');
const app = express();
const server = require('http').createServer(app);
const options = {
  cors: true,
  origins: ['http://127.0.0.1:5347'],
};
const io = require('socket.io')(server, options);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('good');
});

const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });

    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

app.use(router);
