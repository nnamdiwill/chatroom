var express = require('express');

var app = express();
app.use(express.static('public'));


io.on('connection', function (socket) {
    console.log('Client connected');

    socket.on('message', function(message) {
        console.log('Received message:', message);
    });
});
app.listen(process.env.PORT || 8080);