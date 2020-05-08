// clock.js

var elem = document.documentElement;
var btn = document.getElementById("FullscreenButton");
var canv = document.getElementById("ClockCanvas");
var ctx = canv.getContext("2d");


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

function update(dt) {
}

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function render() {
	for (let x=0; x<canv.width/42; x++)
		for (let y=0; y<canv.height/42; y++) {
			ctx.fillStyle = getRndColor();
			ctx.fillRect(x*42, y*42, 42, 42);
		}	
}

function renderFPS(dt) {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 80, 40);
	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
	ctx.fillText((1/dt).toFixed() + "fps", 10, 30);
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
