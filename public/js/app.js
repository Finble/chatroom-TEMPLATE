var name = getQueryVariable('name') || 'Anonymous';  
var room = getQueryVariable('room');  
var socket = io();

console.log(name + ' wants to join ' + room);

jQuery('.room-title').text(room); 

socket.on('connect', function () {
	console.log('Connected to socket.io server!');    
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

// update message to messages + add message var = list item, which goes inside unordered list

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);  
    var $messages = jQuery('.messages');  // change
    var $message = jQuery('<li class="list-group-item"></li>');  // add
    
	console.log('New message:');
	console.log(message.text);
    
    $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message); // add
});

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
