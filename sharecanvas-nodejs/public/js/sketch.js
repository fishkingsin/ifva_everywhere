var socket = io();
var sketches = {};
var localColor 	 = {};
var id 		 = -1;
function setup(){
	createCanvas(640, 480);

	socket.on('setup',function (message){
		// console.log(message);

		var object = JSON.parse(message);
		localColor 	= object.color;
		id 		= object.id;

		sketches[id] = {color:localColor, points:[]};
		// renderCanvas();
	});
	socket.on('point',function (message){
		var object = JSON.parse(message);
		// console.log(object);
		var c = object.color;
		var _id =  object.id;

		// if we don't know this one, add it to our list
		if ( !sketches[_id] ){
			sketches[_id] = {color:c, points:[]};
		}
		sketches[_id].points.push( object.point );
		if ( sketches[_id].points.length > 500 ){
			sketches[_id].points.shift();
		}
		// renderCanvas();
		newDrawing();
	});
	socket.on('erase',function (message){
		var object = JSON.parse(message);
		var _id = object.erase;
		if ( sketches[_id] ){
			delete sketches[_id];
		}
		// renderCanvas();
	})
}
function newDrawing(){
	for ( var _id in sketches ){
		//console.log(sketches[_id]);
		var c = sketches[_id].color;
		var pts = sketches[_id].points;
		
		if ( pts.length > 0 ){			
			
			for ( var i=1, len = pts.length; i<len; i++){
				fill(c.r , c.g , c.b);
				ellipse(pts[i].x, pts[i].y, 10 ,10);
			}
			
		}
	}
}
function mouseDragged(){
	var point = {point:{x:mouseX,y:mouseY},id:id,color:localColor};

	if ( socket.connected ){
		sketches[id].points.push( point.point );
		if ( sketches[id].points.length > 500 ){
			sketches[id].points.shift();
		}
		var msg = JSON.stringify(point);
		
		socket.emit('point',point);
		// renderCanvas();
	}
}
function draw(){

	// newDrawing();
	// if (mouseIsPressed) {
	// 	fill(0);
	// } else {
	// 	fill(255);
	// }
	// ellipse(mouseX, mouseY, 80, 80);

	
}