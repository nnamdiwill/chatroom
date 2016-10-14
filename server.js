//require socket IO, http package and express
var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();

//tell express to serve the public html pages
app.use(express.static('public'));

//wrap the express app in an http server, allows socket to run alongside express
var server = http.Server(app);

//creates socket io server
var io = socket_io(server);

//on a new connection to the server (io.on) - prints client connected message
//inside that, when a new socket connects (socket.on), prints the message and 'received'
//socket.broadcast.emit - broadcasts received message to every socket BUT the one it received from

io.on('connection', function (socket) {
    
    //logs the message
    console.log('New client connected');

    //sends a broadcast message to every socket but the one who made it occurr
    socket.broadcast.emit('message', 'New user connected');

    
    //when socket receives a 'message', logs that a new message was received, and broadcasts the message 
    //to all connected sockets except the one who sent it
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message',message);
    });

    //watching for the 'typing' socket type, broadcast to all users that someone is typing
    socket.on('typing',function() {
        socket.broadcast.emit('message','Someone is typing');
    });

    //when a socket disconnects, logs it and sends a disconnected message to all other sockets
    socket.on('disconnect', function(){
        socket.broadcast.emit('message', 'Client Disonnected');
        console.log('user disconnected');
    });
  
});

server.listen(process.env.PORT || 8080);
