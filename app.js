var express=require('express');

var socket=require('socket.io');
var path=require('path');

var app=express();

app.use(express.static(path.join(__dirname, 'public')));

var server=app.listen(4000,function(){
	console.log('You are currently listening to port number 4000');
});

//setup socket
var io=socket(server);

//listening to the socket connection attempts made by the browser sockets
io.on('connection',function(socket){   //this socket is the browser's socket
	console.log('Socket connection is made to '+socket.id);

	socket.on('chat',function(data){
		io.sockets.emit('chat',data);
	});

	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);//socket here means the socket from which the message will be broadcasted to all other sockets.
	});
}); 