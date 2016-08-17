var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {   // socket = individual connection
	console.log('User connected via socket.io!');

	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
        
        // sends to everyone EXCLUDING sender, io.emit sends message to everyone INCLUDING sender
		socket.broadcast.emit('message', message);
	});

    // server sends a message event, to be listened to in app.js 
	socket.emit('message', {
		text: 'Welcome to the chat application!'
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});

