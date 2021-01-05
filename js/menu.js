
var linkNames = ["example1", "example2", "example3", "example4"]
var links = []

var linkImportanceEasing = 0.1;
var mouseX = 0;
var mouseY = 0;

var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");

function Link(name) {
	this.name = name;
	this.target = "./" + name + "/index.html";
	this.importance = 0.01;
	this.radius = 1;
	this.x = 0;
	this.y = 0;
	this.fx = 0; // force vector
	this.fy = 0;
	this.img = document.createElement("img");
	this.img.src = "./" + name + "/" + name + ".png";
	
	this.addForceFrom = function (x, y, otherImportance) {
		relativeImportance = otherImportance / this.importance;
		dist = 0.001 * Math.max(1, Math.hypot(this.x - x, this.y - y));
		dir = Math.atan2(this.y - y, this.x - x);
		this.fx += relativeImportance * Math.cos(dir) / (dist * dist);
		this.fy += relativeImportance * Math.sin(dir) / (dist * dist);
	}
}

window.onresize = function() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
}

window.onload = function () {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
	document.body.appendChild(canv);
	
	for (n in linkNames) {
		links.push(new Link(linkNames[n]));
	}
	for (n in links) {  // position links in a circle
		let angle = (n / links.length) * 2 * Math.PI;
		links[n].x = canv.width/2 + canv.width/4 * Math.cos(angle);
		links[n].y = canv.height/2 + canv.height/4 * Math.sin(angle);
	}

}

function update() {
	// update link importance (relative size)
	for (n in links) {
		if (links[n].importance != 1.0) {
			links[n].importance += (1.0 - links[n].importance) * linkImportanceEasing;
		}
	}
	
	// calculate forces
	for (n in links) {
		links[n].fx = 0.0;
		links[n].fy = 0.0;
		for (m in links) {
			if (n != m) {
				links[n].addForceFrom(links[m].x, links[m].y, links[m].importance);
			}
		}
		links[n].addForceFrom(links[n].x, 0, 1);
		links[n].addForceFrom(links[n].x, canv.height, 1);
		links[n].addForceFrom(0, links[n].y, 1);
		links[n].addForceFrom(canv.width, links[n].y, 1);
	}

	// move links according to forces
	for (n in links) {
		links[n].fx = Math.min(links[n].fx, 10);
		links[n].fx = Math.max(links[n].fx, -10);
		links[n].fy = Math.min(links[n].fy, 10);
		links[n].fy = Math.max(links[n].fy, -10);
		
		links[n].x += links[n].fx;
		links[n].y += links[n].fy;
	}
	
	// if a link goes outside the canvas, bring it inside
	for (n in links) {
		if (links[n].x < 0) {
			links[n].x = 1;
		}
		if (links[n].x > canv.width) {
			links[n].x = canv.width - 1;
		}
		if (links[n].y < 0) {
			links[n].y = 1;
		}
		if (links[n].y > canv.height) {
			links[n].y = canv.height - 1;
		}
	}
	
	// update link with mouseover
	for (n in links) {
		if (Math.hypot(links[n].x - mouseX, links[n].y - mouseY) < links[n].radius) {
			links[n].importance += (3 - links[n].importance);
		}
	}
}

function render() {
	ctx.clearRect(0, 0, canv.width, canv.height);

	for (n in links) {
		// update image radius for drawing
		links[n].radius = canv.width;
		// take into account distances to other links
		for (m in links) {
			if (n != m) {
				r = Math.hypot(links[n].x-links[m].x, links[n].y-links[m].y) / 2;
				if (r < links[n].radius) {
					links[n].radius = r;
				}
			}
		}
		// take into account distances to borders
		if (links[n].radius > links[n].y) {
			links[n].radius = links[n].y;
		}
		if (links[n].radius > canv.height - links[n].y) {
			links[n].radius = canv.height - links[n].y;
		}
		if (links[n].radius > links[n].x) {
			links[n].radius = links[n].x;
		}
		if (links[n].radius > canv.width - links[n].x) {
			links[n].radius = canv.width - links[n].x;
		}
		
		// draw mask
		ctx.save();
		ctx.beginPath();
		ctx.arc(links[n].x, links[n].y, links[n].radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.clip();
		// draw image
		ctx.drawImage(links[n].img, links[n].x-links[n].radius, links[n].y-links[n].radius, 2*links[n].radius, 2*links[n].radius);
		ctx.restore();

	}
}

function updateMouse(evt) {
	let rect = canv.getBoundingClientRect();
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;	
}

function clickMouse(evt) {
	for (n in links) {
		if (Math.hypot(links[n].x - mouseX, links[n].y - mouseY) < links[n].radius) {
			location.href = links[n].target;
		}
	}		
}

function animate() {	
    update();
	render();	
	requestAnimationFrame(animate);
}

canv.addEventListener("mousemove", function(evt) { updateMouse(evt);} );
canv.addEventListener("mousedown", function(evt) { clickMouse(evt);} );

animate();
