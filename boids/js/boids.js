
var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");

var sightRadius = 200;  // how far boids can see
var sightRadiusSquared = sightRadius * sightRadius;
var boidCount = 200;
var boids = [];
var sectors = [];
var speedLimit = 6.0;
var edgeDistance = 200.0;
var edgeForce = speedLimit / 20;
var boidDistance = 80;
var avoidanceForce = 0.001;
var friendshipForce = 0.0004;
var speedAdjustForce = 0.0003;

class Boid {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.dx = Math.random() * 2 * speedLimit - speedLimit;
		this.dy = Math.random() * 2 * speedLimit - speedLimit;
	}
	
	update() {
		// remove boid from sector
		let coords = this.getSector();
		const index = sectors[coords[0]][coords[1]].indexOf(this);
		if (index > -1) {
		  sectors[coords[0]][coords[1]].splice(index, 1);
		}
		
		let othersX = 0.0;
		let othersY = 0.0;
		let othersDx = 0.0;
		let othersDy = 0.0;
		
		// find neighbours
		let neighbours = [];
		for (let dx=-1; dx<2; dx++) {
			for (let dy=-1; dy<2; dy++) {
				let sx = coords[0] + dx;
				let sy = coords[1] + dy;
				if (sx >= 0 && sx < sectors.length && sy >= 0 && sy < sectors[0].length) {
					for (let otherBoid of sectors[sx][sy]) {
						if (Math.pow(this.x - otherBoid.x, 2) + Math.pow(this.y - otherBoid.y, 2) < sightRadiusSquared) {
							neighbours.push(otherBoid);
							othersX += otherBoid.x;
							othersY += otherBoid.y;
							othersDx += otherBoid.dx;
							othersDy += otherBoid.dy;
						}
					}
				}
			}
		}
		
		if (neighbours.length > 0) {
			// fly towards nearby boids
			othersX /= neighbours.length;
			othersY /= neighbours.length;
			this.dx += (othersX - this.x) * friendshipForce;
			this.dy += (othersY - this.y) * friendshipForce;

			// keep your distance
			for (let otherBoid of neighbours) {
				let dist = Math.hypot(this.x - otherBoid.x, this.y - otherBoid.y);
				if (dist < boidDistance) {
					this.dx -= (otherBoid.x - this.x) / dist * (boidDistance - dist) * avoidanceForce;
					this.dy -= (otherBoid.y - this.y) / dist * (boidDistance - dist) * avoidanceForce;
				}
			}
		
			// adjust speed to others			
			this.dx += (othersDx - this.dx) * speedAdjustForce;
			this.dy += (othersDy - this.dy) * speedAdjustForce;

		} else {
			// no friends in sight
			this.dx += (Math.random() - 0.5) * 0.01 * speedLimit;
			this.dy += (Math.random() - 0.5) * 0.01 * speedLimit;
		}
		
		// force away from borders
		if (this.x < edgeDistance) {
			this.dx += (edgeDistance - this.x) * edgeForce / edgeDistance;
		} else if (this.x > canv.width - edgeDistance) {
			this.dx += (canv.width - edgeDistance - this.x) * edgeForce / edgeDistance;
		}
		if (this.y < edgeDistance) {
			this.dy += (edgeDistance - this.y) * edgeForce / edgeDistance;
		} else if (this.y > canv.height - edgeDistance) {
			this.dy += (canv.height - edgeDistance - this.y) * edgeForce / edgeDistance;
		}

		// apply speed limit
		const speed = Math.hypot(this.dx, this.dy);
		if (speed > speedLimit) {
			this.dx = this.dx / speed * speedLimit;
			this.dy = this.dy / speed * speedLimit;
		}
		
		// update position
		this.x += this.dx;
		this.y += this.dy;
		
		// add boid to a new sector
		coords = this.getSector();
		sectors[coords[0]][coords[1]].push(this);
	}

	draw() {
		let rotation = Math.atan2(this.dy, this.dx);
		let speed = Math.hypot(this.dx, this.dy);

		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(rotation);
		ctx.fillStyle = rgbToHex(...hslToRgb(rotation/(2*Math.PI), 1, 0.3 + 0.4 * (speed / speedLimit)));
		ctx.beginPath();
		ctx.moveTo(6 + speed, 0);
		ctx.lineTo(-speed, 6 + speedLimit - speed);
		ctx.lineTo(-speed, -6 - (speedLimit - speed));
		ctx.lineTo(6 + speed, 0);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
	
	getSector() {
		let x = Math.floor(this.x / sightRadius);
		if (x < 0) {
			x = 0;
		} else if (x >= sectors.length) {
			x = sectors.length-1;
		}
		let y = Math.floor(this.y / sightRadius);
		if (y < 0) {
			y = 0;
		} else if (y >= sectors[x].length) {
			y = sectors[x].length-1;
		}
		return [x, y];
	}
}

/**
 * Converts an HSL color value to RGB. Conversion formula
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
	setupSectors();
}

window.onload = function () {
	document.body.appendChild(canv);
	resizeCanvas();
	setupBoids();
	setupSectors();
	animate();
}

function resizeCanvas() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
}

function setupBoids() {
	for (let i=0; i<boidCount; i++) {
		boids.push(new Boid(Math.random() * canv.width, Math.random() * canv.height));
	}
}

function setupSectors() {
	sectors = [];
	for (let x=0; x<canv.width/sightRadius + 1; x++) {
		sectors[x] = [];
		for (let y=0; y<canv.height/sightRadius + 1; y++) {
			sectors[x][y] = [];
		}
	}
	
	for (let boid of boids) {
		const coords = boid.getSector();
		sectors[coords[0]][coords[1]].push(boid);
	}
}


function update() {
	boids.forEach(b => b.update());
}

function render() {
	ctx.clearRect(0, 0, canv.width, canv.height);
	boids.forEach(b => b.draw());
}

function animate() {
	update();
	render();
	requestAnimationFrame(animate);
}
