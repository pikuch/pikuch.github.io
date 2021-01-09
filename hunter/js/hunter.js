
var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");

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
	ctx.lineWidth = 10;
	ctx.strokeStyle = "#000000";

	ctx.beginPath();
	for (let n=0; n<200; n++) {
		let angle = Math.random()*2*Math.PI;
		let r = Math.random() * 100;
		let x0 = canv.width/2 + r * Math.cos(angle);
		let y0 = canv.height/2 + r * Math.sin(angle);
		let x = canv.width/2 - r * Math.cos(angle);
		let y = canv.height/2 - r * Math.sin(angle);
		ctx.moveTo(x0, y0);
		ctx.lineTo(x, y);
	}
	ctx.closePath();
	ctx.stroke();	
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
