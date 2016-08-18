var name = getQueryVariable('name'); // added QueryParams inside app.js
var room = getQueryVariable('room'); // added QueryParams inside app.js
var socket = io();

console.log(name + ' wants to join ' + room); // added QueryParams inside app.js

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

// listens to message from server.js

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);  
	console.log('New message:');
	console.log(message.text);
    
    jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ':  </strong>' + message.text + '</p>');   
});

// sends message to server.js

var $form = jQuery('#message-form');  

$form.on('submit', function(event){  
    event.preventDefault();  
    
	var $message = $form.find('input[name=message]'); 
    
    socket.emit('message', {
       text: $message.val() 
    });

	$message.val(''); 
});
