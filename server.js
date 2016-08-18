var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {   
	console.log('User connected via socket.io!');

    // server listens + receives message
    
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
        
        // server sends message out to all clients
        
		io.emit('message', message); // now sends to all clients + sender (socket.broadcast = all clients NOT sender)
	});

    // server sends message to message sender
    
	socket.emit('message', {
		text: 'Welcome to the chat application!'
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});



