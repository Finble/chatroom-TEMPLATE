var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {}; 

// sends current users to provided socket

function sendCurrentUsers(socket) {
    var info = clientInfo[socket.id];
    var users = [];
    
    if (typeof info === 'undefined') {
        return;  // ensures we only search for rooms that exists, or stops function running
    }
    
    Object.keys(clientInfo).forEach(function (socketId) {
        var userInfo = clientInfo[socket.id]; // where is socketId defined?
        
        if (info.room === userInfo.room) {
            users.push(userInfo.name);
        }
    });
    
    socket.emit('message', {
        name: 'System',
        text: 'Current users: ' + users.join(', '), // join takes every element in an array and pushes together, with ' ' in between
        timestamp: moment().valueOf()
    });
}


io.on('connection', function (socket) {   
	console.log('User connected via socket.io!');
    
    // leave room
    
    socket.on('disconnect', function() {
        var userData = clientInfo[socket.id];
        
        if (typeof userData !== 'undefined') { 
           socket.leave(userData.room); 
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
        
        // add current user command, so can see all users in a room at any point in time
        
        if (message.text === '@currentUsers') {  // if user doesn't run custom command...
            sendCurrentUsers(socket);
            
            // server sends message out to all clients        
        } else {
            message.timestamp = moment().valueOf();
            io.to(clientInfo[socket.id].room).emit('message', message);
        }
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










