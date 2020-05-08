// clock.js

var elem = document.documentElement;
var btn = document.getElementById("FullscreenButton");
var canv = document.getElementById("ClockCanvas");

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
  
  ctx = canv.getContext("2d");
  for (let i=1; i<50; i++) {
	ctx.beginPath();
	ctx.arc(canv.width/2, canv.height/2, canv.height/2/i, 0, 2 * Math.PI);
	ctx.stroke();
    }
}