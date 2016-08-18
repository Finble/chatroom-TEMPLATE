var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {}; // key = unique socket id, value = name + room

io.on('connection', function (socket) {   
	console.log('User connected via socket.io!');
    
    // leave room
    
    socket.on('disconnect', function() {
        var userData = clientInfo[socket.id];
        
        if (typeof userData !== 'undefined') { // ensure client exists
           socket.leave(userData.room); // disconnected
           io.to(userData.room).emit('message', {
               name: 'System',
               text: userData.name + ' has left!',
               timestamp: moment().valueOf()
           });
           delete clientInfo[socket.id];
       } 
    });
    
    // join room
    
    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req; 
        socket.join(req.room);  
        socket.broadcast.to(req.room).emit('message', { 
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment().valueOf()
        });
    });

    // server listens + receives message
    
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);
        
        // server sends message out to all clients
        message.timestamp = moment().valueOf(); 
		io.to(clientInfo[socket.id].room).emit('message', message); 
	});

    // server sends message upon first message received
    
	socket.emit('message', {
        name: 'System',  
		text: 'Welcome to the chat application!',
        timestamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});



