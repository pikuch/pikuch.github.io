
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
	ctx.fillStyle = "rgba(0, 0, 0, 0.01)";

	if (mode == 0) {  // 1000 lines
		ctx.beginPath();
		for (let r=0; r<10; r++){
			for (let a=0; a<1; a+=0.01) {
				angle = a + Math.random() * 10;
				radius = (r + Math.random()) * 10;
				let x0 = canv.width/2 + radius*Math.cos(angle*2*Math.PI);
				let y0 = canv.height/2 + radius*Math.sin(angle*2*Math.PI);
				let x = canv.width/2 + (radius+7)*Math.cos(angle*2*Math.PI);
				let y = canv.height/2 + (radius+7)*Math.sin(angle*2*Math.PI);
				ctx.moveTo(x0, y0);
				ctx.lineTo(x, y);
			}
		}
		ctx.closePath();
		ctx.stroke();
	} else if (mode == 1) {  // 1000 circles
		for (let n=0; n<1000; n++) {
			ctx.beginPath();
			let x = canv.width/2 + Math.random()*400-200;
			let y = canv.height/2 + Math.random()*400-200;
			ctx.arc(x, y, 100, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fill();
		}
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
