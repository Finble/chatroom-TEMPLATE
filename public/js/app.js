var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

// listens to message from server.js

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);
});

// Handles submitting of new message  $ makes clear that this is a jQuery var

var $form = jQuery('#message-form');  // selects any id in index.html, $form = var can use all jQuery methods

$form.on('submit', function(event){  // event name = submit (most browsers aware of submit method), function passes event
    event.preventDefault();  // does not refresh whole page
    
    // send message to server
    
	var $message = $form.find('input[name=message]'); // specifies any input tags that have a name attribute that equals message, 
    
    socket.emit('message', {
       text: $message.val() //.val pulls method out as a string
    });

	$message.val(''); // creates an empty input, so replaces message field with empty string
});
