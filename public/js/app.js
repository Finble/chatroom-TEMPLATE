var name = getQueryVariable('name') || 'Anonymous';  
var room = getQueryVariable('room');  
var socket = io();

console.log(name + ' wants to join ' + room); 

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

// listens to message from server.js

jQuery('.room-title').text(room); // select room field

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
        name: name,  
        text: $message.val() 
    });

	$message.val(''); 
});
