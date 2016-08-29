var express = require('express');

var app = express();

var server = require('http').createServer(app);

app.use(express.static('public'));

var io = require('socket.io')(server);


var sketches = {};

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
	socket.emit('setup', msg);
	

	for ( var _id in sketches ){
		var pts = sketches[_id].points;
		for ( var i=1, len = pts.length; i<len; i++){
			var point = {point:{x:pts[i].x,y: pts[i].y},id:_id,color:sketches[_id].color};
			socket.emit('point',JSON.stringify(point));
		}
	}
	

	socket.on('point',function (data){
		var msg = JSON.stringify(data);

		var c = data.color;
		var _id =  data.id;

		// if we don't know this one, add it to our list
		if ( !sketches[_id] ){
			sketches[_id] = {color:c, points:[]};
		}
		sketches[_id].points.push( data.point );
		

		console.log(msg);
		io.sockets.emit('point',msg);
	})
	socket.on('disconnect',function (data){
		console.log("on disconnect to "+socket.id);

		var _id = socket.id;
		if ( sketches[_id] ){
			delete sketches[_id];
		}

		io.sockets.emit('erase',JSON.stringify({erase:socket.id}));
	});
}
);


function randomInt(minimum, maximum){

	return parseInt(minimum + (Math.random() * maximum)); 
}