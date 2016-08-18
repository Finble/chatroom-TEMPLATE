var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

// listens to message from server.js

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);
    
    jQuery('.messages').append('<p>' + message.text + '</p>'); // targeting by id = #, targeting by class = .  
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
