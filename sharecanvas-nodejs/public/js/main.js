
var messageDiv;
var statusDiv;

// drawing vars
var canvas;
var ctx = null;
var color 	 = {};
var id 		 = -1;
var sketches = {};
var socket = io();
$(window).load(function() {
	// document.getElementById("brow").textContent = " " + BrowserDetect.browser + " "
	// + BrowserDetect.version +" " + BrowserDetect.OS +" ";

	// messageDiv 	= document.getElementById("messages");
	// statusDiv	= document.getElementById("status");

	canvas 		= document.getElementById("sketchCanvas");
	if (canvas.getContext) {
		canvas.onmousedown 	= onMouseDown;
		canvas.onmouseup 	= onMouseUp;
		canvas.onmousemove 	= onMouseMoved;
		canvas.addEventListener("touchstart", onMouseDown, false);
		canvas.addEventListener("touchend", onMouseUp, false);
		canvas.addEventListener("touchmove", onMouseMoved, false);
		ctx			= canvas.getContext('2d');
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		window.addEventListener("resize", onresize);

		// canvas.addEventListener('touchmove', function(e) {
		//   e.preventDefault();
		// 	onMouseDown(e);
		// },false);
		//target the entire page, and listen for touch events
		$('html, body').on('touchstart touchmove', function(e){ 
		     //prevent native touch activity like scrolling
		     e.preventDefault(); 
		 });
	} else {
		alert("Sorry, your browser doesn't support canvas!");
	}


	socket.on('setup',function (message){
		console.log(message);
		var object = JSON.parse(message);
		color 	= object.color;
		id 		= object.id;

		sketches[id] = {color:color, points:[]};
		renderCanvas();
	});
	socket.on('point',function (message){
		var object = JSON.parse(message);
		console.log(object);
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
			renderCanvas();
	});
	socket.on('erase',function (message){
		var object = JSON.parse(message);
		var _id = object.erase;
		if ( sketches[_id] ){
			delete sketches[_id];
		}
		renderCanvas();
	})


});
function onresize(){
	canvas 		= document.getElementById("sketchCanvas");
	
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}
// send value from text input
function sendMessageForm(){
	socket.send(message.value);
	message.value = "";
}

var bMouseDown = false;
function onMouseDown( e ){
	mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
	mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY);
	bMouseDown = true;
	onMouseDraw( mouseX, mouseY  );
}

function onMouseMoved( e ){
	mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX);
	mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY);
	if ( bMouseDown ){
		onMouseDraw( mouseX, mouseY );
	}
}

function onMouseUp( e ){
	bMouseDown = false;
}

// catch mouse events on canvas
function onMouseDraw( x, y ){
	var point = {point:{x:x,y:y},id:id,color:color};

	if ( socket.connected ){
		sketches[id].points.push( point.point );
		if ( sketches[id].points.length > 500 ){
			sketches[id].points.shift();
		}
		var msg = JSON.stringify(point);
		
		socket.emit('point',point);
		renderCanvas();
	}
}

function renderCanvas(){
	if ( ctx == null ) return;
	
	canvas.width = canvas.width;
	ctx.moveTo(0,0);
	for ( var _id in sketches ){
		var c = sketches[_id].color;
		var pts = sketches[_id].points;
		ctx.strokeStyle = 'rgb('+c.r+','+c.g+','+c.b+')';
		ctx.beginPath();
		if ( pts.length > 0 ){			
			ctx.moveTo(pts[0].x,pts[0].y);
			for ( var i=1, len = pts.length; i<len; i++){
				ctx.lineTo( pts[i].x, pts[i].y )
			}
			ctx.stroke();
		}
	}
}

// catch incoming messages + render them to the canvas

// setup web socket
