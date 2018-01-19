const path = require('path'); // built in module, no need for npm install
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public'); //Path is /Users/kyungsong/projects/node-chat-app/public
const port = process.env.PORT || 3000;                                                      
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 


// middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  // socket.emit from Admin text Welcome to the chat app 
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

     io.emit('newMessage', generateMessage(message.from, message.text));
     
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});// let you register an event listener , when connection comes in order to do something, you provide a callback


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};