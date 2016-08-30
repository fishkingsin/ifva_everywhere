var socket = io();
var sketches = {};
var localColor 	 = {};
var id 		 = -1;

var prev = new Date();
var startPos = {x:50,y:50};
var endPos = {x:590,y:430};
var margin = 100;
var rectsize = 10;
var maxLength = 320*144;
function setup(){
	createCanvas(640, 480);
	
	startPos = {x:margin,y:margin};
	endPos = {x:width-(margin),y:height-(margin)};
	
	rectsize = width/(width-(margin*2));

	background(125);
	fill(0,0,0);
	rect(startPos.x,startPos.y, endPos.x- startPos.x, endPos.y - startPos.y);
	console.log("rectsize " + rectsize);
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
		if ( sketches[_id].points.length > maxLength ){
			sketches[_id].points.shift();
		}
		// renderCanvas();
		newDrawing();
	});
	socket.on('erase',function (message){
		console.log(message);
		var object = JSON.parse(message);
		var _id = object.erase;
		if ( sketches[_id] ){
			delete sketches[_id];
		}
		// background(0);
		newDrawing();
	})
}
function newDrawing(){
	background(125);
	fill(0,0,0);
	rect(startPos.x,startPos.y, endPos.x- startPos.x, endPos.y - startPos.y);
	for ( var _id in sketches ){
		//console.log(sketches[_id]);
		var c = sketches[_id].color;
		var pts = sketches[_id].points;
		
		if ( pts.length > 0 ){			
			
			for ( var i=1, len = pts.length; i<len; i++){
				noStroke();
				fill(c.r , c.g , c.b);
				rect(pts[i].x, pts[i].y, rectsize ,rectsize);
			}
			
		}
	}
}
function mouseDragged(){
	var curr = new Date();
	var diff = get_time_diff_mis(prev);
	prev = curr;
	var mX = parseInt(mouseX);
	var mY = parseInt(mouseY);
	if(mX > startPos.x && mX < endPos.x && mY > startPos.y && mY < endPos.y){
		var point = {point:{x:mX,y:mY},id:id,color:localColor,diff:diff};

		if ( socket.connected ){
			sketches[id].points.push( point.point );
			if ( sketches[id].points.length > 500 ){
				sketches[id].points.shift();
			}
			// var msg = JSON.stringify(point);
		
			socket.emit('point',point);
			// renderCanvas();
		}
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

function get_time_diff_mis( datetime )
{
	var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

	var datetime = new Date( datetime ).getTime();
	var now = new Date().getTime();

	if( isNaN(datetime) )
	{
		return "";
	}

    // console.log( datetime + " " + now);

    if (datetime < now) {
    	var milisec_diff = now - datetime;
    }else{
    	var milisec_diff = datetime - now;
    }
    return milisec_diff
    // var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    // var date_diff = new Date( milisec_diff );

    // return days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
}