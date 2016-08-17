var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http); // socket expects to call http server

app.use(express.static(__dirname + '/public'));  

io.on('connection', function () { // can listen for events, pass name of event
    console.log('User connected via socket.io!');
});

http.listen(PORT, function() {
   console.log('Server started!'); 
});