var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); // start a new server and use express app as boilerplate, anything express app listens to, the server should also listen to

app.use(express.static(__dirname + '/public'));  //__dirname = current dir

http.listen(PORT, function() {
   console.log('Server started!'); 
});