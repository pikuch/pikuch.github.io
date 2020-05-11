// clock.js

var elem = document.documentElement;
var btn = document.getElementById("FullscreenButton");
var canv = document.getElementById("ClockCanvas");
var ctx = canv.getContext("2d");
var lastTime = Date.now();
var mousePosition = {x:0, y:0, speed:0, pred_x:0, pred_y:0};
var background = new Image();
background.src = "img/background.jpg";
var currentTime = new Date();

/* View in fullscreen */
function openFullscreen() {
  btn.parentNode.removeChild(btn);
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

window.onresize = function() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
}

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function isPointOnTime(x, y) {
	let x_cutoff = 0;
	let	y_cutoff = 0;
	let unitSquare = 0;
	if (canv.width*9/16 > canv.height) {
		x_cutoff = (canv.width - canv.height*16/9) / 2;
		unitSquare = canv.height / 9;
	} else {
		y_cutoff = (canv.height - canv.width*9/16) / 2;
		unitSquare = canv.width / 16;
	}
	
	if (x<x_cutoff || x>canv.width-x_cutoff || y<y_cutoff || y>canv.height-y_cutoff) {
		return false;
	}
	
	x -= x_cutoff;
	y -= y_cutoff;
	
	if (x<unitSquare || x>15*unitSquare || y<unitSquare || y>8*unitSquare) {
		return false;
	} else {
		return true;
	}
	
	
}

function updateMouse(canv, evt) {
	var rect = canv.getBoundingClientRect();
	var new_x = evt.clientX - rect.left;
	var new_y = evt.clientY - rect.top;
	var new_speed = Math.sqrt(Math.pow(new_x-mousePosition.x, 2) + Math.pow(new_y-mousePosition.y, 2));
	var new_pred_x = new_x + 2 * (new_x - mousePosition.x);
	var new_pred_y = new_y + 2 * (new_y - mousePosition.y);
	mousePosition = {x:new_x, y:new_y, speed:new_speed, pred_x:new_pred_x, pred_y:new_pred_y};
}

function update(dt) {
}


function render() {
	ctx.drawImage(background, 0, 0, canv.width, canv.height);
	
	ctx.beginPath();
	ctx.arc(mousePosition.pred_x, mousePosition.pred_y, mousePosition.speed, 0, 2 * Math.PI);
	ctx.stroke();
	
	for (let i=0; i<100; i++) {
		let x = Math.random() * canv.width;
		let y = Math.random() * canv.height;
		if (isPointOnTime(x, y)) {
			ctx.fillStyle = "black";
		} else {
			ctx.fillStyle = "white"
		}
		ctx.beginPath();
		ctx.arc(x, y, 5, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function renderFPS(dt) {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 40, 15);
	ctx.font = "12px Arial";
	ctx.fillStyle = "black";
	ctx.fillText((1/dt).toFixed() + " fps", 2, 12);
	
	
}

function animate() {
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
	
	currentTime = new Date();
	
    update(dt);
    render();
	renderFPS(dt);
	
	lastTime = now;
	requestAnimationFrame(animate);
}


canv.addEventListener('mousemove', function(evt) {
    updateMouse(canv, evt);
})

animate()
