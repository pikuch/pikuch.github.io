// clock.js

var elem = document.documentElement;
var btn = document.getElementById("FullscreenButton");
var canv = document.getElementById("ClockCanvas");
var ctx = canv.getContext("2d");
var squareSize = 100;

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
  
  for (let i=1; i<50; i++) {
	ctx.beginPath();
	ctx.arc(canv.width/2, canv.height/2, canv.height/2/i, 0, 2 * Math.PI);
	ctx.stroke();
    }
}


function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function update(dt) {
	if (1/dt >= 55) {
		squareSize*=0.99;
	} else {
		squareSize*=1.01;
	}
}


function render() {
	for (let x=0; x<canv.width/squareSize; x++)
		for (let y=0; y<canv.height/squareSize; y++) {
			ctx.fillStyle = getRndColor();
			ctx.fillRect(x*squareSize, y*squareSize, squareSize, squareSize);
		}	
}

function renderFPS(dt) {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 90, 60);
	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
	ctx.fillText((1/dt).toFixed() + "fps", 10, 30);
	ctx.fillText("size=" + (squareSize).toFixed(), 10, 50);
}


var lastTime;
function animate() {
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();
	renderFPS(dt);

    lastTime = now;
	requestAnimationFrame(animate);
}

animate()
