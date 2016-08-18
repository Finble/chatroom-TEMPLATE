var name = getQueryVariable('name') || 'Anonymous';  // automatically picks up name (as put into URL)
var room = getQueryVariable('room');  // automatically picks up room (as put into URL)
var socket = io();

console.log(name + ' wants to join ' + room); 

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

// listens to message from server.js

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);  
    var $message = jQuery('.messages');
    
	console.log('New message:');
	console.log(message.text);
    
    $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
});

// sends message to server.js

var $form = jQuery('#message-form');  

$form.on('submit', function(event){  
    event.preventDefault();  
    
	var $message = $form.find('input[name=message]'); 
    
    socket.emit('message', {
        name: name,  // prints out name to all clients, so ALL can read
        text: $message.val() // print message.text to all clients, so ALL can read
    });

	$message.val(''); 
});
