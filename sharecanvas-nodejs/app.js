var express = require('express');

var app = express();

var server = require('http').createServer(app);

app.use(express.static('public'));

var io = require('socket.io')(server);

server.listen(9092, function () {
	console.log('Server listening at port %d', 9092);
});


io.on('connection', function (socket){
		var addedUser = false;
		console.log("on connection to "+socket.id);
		var msg = JSON.stringify(
					{color:{
						r:randomInt(0,255),
						g:randomInt(0,255),
						b:randomInt(0,255)
					},id:socket.id});
		io.sockets.emit('setup', msg);

		socket.on('point',function (data){
			var msg = JSON.stringify(data);
			// console.log(msg);
			io.sockets.emit('point',msg);
		})
		socket.on('disconnect',function (data){
			console.log("on disconnect to "+socket.id);
			io.sockets.emit('socket',JSON.stringify({erase:socket.id}));
		});
	}
);


function randomInt(minimum, maximum){

	return parseInt(minimum + (Math.random() * maximum)); 
}