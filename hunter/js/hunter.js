
var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");
var mode = 0;

window.onresize = function() {
	resizeAndRedrawCanvas();
}

window.onload = function () {
	document.body.appendChild(canv);
	resizeAndRedrawCanvas();
}

function resizeAndRedrawCanvas() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
}

function render() {
	ctx.clearRect(0, 0, canv.width, canv.height);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000000";

	if (mode == 0) {
		ctx.beginPath();
		for (let r=0; r<100; r++){
			for (let a=0; a<1; a+=0.01) {
				let x = canv.width/2 + r*Math.cos(a*2*Math.PI);
				let y = canv.height/2 + r*Math.sin(a*2*Math.PI);
				ctx.moveTo(x, y);
				ctx.lineTo(x+5, y+5);
			}
		}
		ctx.closePath();
		ctx.stroke();
	}
	
}

function clickMouse(evt) {
	mode = (mode + 1) % 3;
}

function animate() {	
	render();	
	requestAnimationFrame(animate);
}

canv.addEventListener("mousedown", function(evt) { clickMouse(evt);} );

animate();
