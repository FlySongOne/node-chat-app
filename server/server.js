const path = require('path'); // built in module, no need for npm install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); //Path is /Users/kyungsong/projects/node-chat-app/public
const port = process.env.PORT || 3000;                                                      
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 

// middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Sam',
    text: 'See you then',
    createdAt: 123123
  });
 
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});// let you register an event listener , when connection comes in order to do something, you provide a callback


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};