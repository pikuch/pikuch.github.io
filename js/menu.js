
var linkNames = ["example1", "example2", "example3", "example4"]
var links = []

var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");

function Link(name) {
	this.name = name;
	this.target = "./" + name + "/index.html";
	this.x = 0;
	this.y = 0;
	this.img = document.createElement("img");
	this.img.src = "./" + name + "/" + name + ".png";
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

}

function render() {
	ctx.clearRect(0, 0, canv.width, canv.height);

	for (n in links) {
		// find image radius for drawing
		radius = canv.width;
		// take into account distances to other links
		for (m in links) {
			if (n != m) {
				r = Math.hypot(links[n].x-links[m].x, links[n].y-links[m].y) / 2;
				if (r < radius) {
					radius = r;
				}
			}
		}
		// take into account distances to borders
		if (radius > links[n].y) {
			radius = links[n].y;
		}
		if (radius > canv.height - links[n].y) {
			radius = canv.height - links[n].y;
		}
		if (radius > links[n].x) {
			radius = links[n].x;
		}
		if (radius > canv.width - links[n].x) {
			radius = canv.width - links[n].x;
		}
		
		// draw mask
		ctx.save();
		ctx.beginPath();
		ctx.arc(links[n].x, links[n].y, radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.clip();
		// draw image
		ctx.drawImage(links[n].img, links[n].x-radius, links[n].y-radius, 2*radius, 2*radius);
		ctx.restore();
	}
}

function animate() {	
    update();
	render();	
	requestAnimationFrame(animate);
}

animate();

// canv.addEventListener('mousemove', function(evt) {
	// updateMouse(canv, evt);
// })

