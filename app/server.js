var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("my socket server is running")

var socket = require('socket.io');

var io = socket(server); // tracker

io.sockets.on('connection', newConnection); //new connection event

function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    socket.on('mouse', mouseMsg)
    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        // io.sockets.emit('mouse', data); <-- broadcasts the message to all clients (including the one emitting)
        console.log(data);
    }
}