
var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");

class Boid {
	constructor() {
	}
	
	update() {
	}

	draw() {
	}

}

/**
 * Converts a HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 */
function hslToRgb(h, s, l) {
	var r, g, b;

	if(s == 0) {
		r = g = b = l; // achromatic
	} else {
		var hue2rgb = function hue2rgb(p, q, t) {
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

window.onresize = function() {
	resizeCanvas();
}

window.onload = function () {
	document.body.appendChild(canv);
	resizeCanvas();
	animate();
}

function resizeCanvas() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
	// TODO: setup boids
}

function update() {
	//boids.forEach(t => t.update());
}

function render() {
	ctx.clearRect(0, 0, canv.width, canv.height);	
	//boids.forEach(t => t.draw());
}

function animate() {
	update();
	render();	
	requestAnimationFrame(animate);
}
