
var links = [];

function makeImg(name) {
	let img = document.createElement("img");
	img.src = name;
	return img;
}

var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");

var mouseX = 0;
var mouseY = 0;

var puzzle;

class Link {
	constructor(name, target, img) {
		this.name = name;
		this.target = target;
		this.img = img;
	}
}

class Puzzle {

	constructor(canv, linkNames) {
		this.tilesX = 1;
		this.tilesY = 1;
		this.tileSize = 0;
		this.findDivisions(links.length + 1);
		this.tiles = [];
		this.generateTiles(linkNames);
		this.tabDirections = [];
		this.generateTabDirections();
	}
	
	generateTabDirections() {
		for (let x = 0; x < this.tilesX; x++) {
			this.tabDirections.push([]);
			for (let y = 0; y < this.tilesY; y++) {
				this.tabDirections[x].push();
				this.tabDirections[x][y] = [Math.random() > 0.5 ? 1 : -1, Math.random() > 0.5 ? 1 : -1]
			}
		}
	}
	
	generateTiles(links) {
		let toFill = [];
		for (let x = 0; x < this.tilesX; x++) {
			this.tiles.push([]);
			for (let y = 0; y < this.tilesY; y++) {
				let newTile = new Tile();
				this.tiles[x].push(newTile);
				toFill.push(newTile);
			}
		}
		for (let n in links) {
			let chosen = Math.floor(Math.random() * toFill.length);
			toFill[chosen].addLink(links[n]);
			toFill.splice(chosen, 1);
        }
    }

	findDivisions(minElements) {
		let margin = 0.2;
		let width = canv.width * (1 - margin);
		let height = canv.height * (1 - margin);
		while (this.tilesX * this.tilesY < minElements) {
			if (width / this.tilesX < height / this.tilesY) {
				this.tilesY++;
			} else {
				this.tilesX++;
			}
		}
		this.tileSize = Math.min(width / this.tilesX, height / this.tilesY);
    }

	draw() {
		let startX = canv.width / 2 - this.tilesX / 2 * this.tileSize;
		let startY = canv.height / 2 - this.tilesY / 2 * this.tileSize;
		for (let x = 0; x < this.tilesX; x++) {
			for (let y = 0; y < this.tilesY; y++) {
				if (typeof this.tiles[x][y].lnk !== 'undefined') {

					ctx.save();
					ctx.translate(startX, startY);
					ctx.scale(this.tileSize, this.tileSize);
					ctx.translate(x, y);
					ctx.beginPath();
					//ctx.moveTo();
					ctx.rect(0, 0, 1, 1);
					ctx.strokeStyle = "black";
					ctx.lineWidth = 0.05;
					ctx.stroke();
					//ctx.closePath();
					//ctx.clip();
					
					ctx.drawImage(this.tiles[x][y].lnk.img, 0, 0, 1, 1);
					ctx.restore();

				}
			}
		}
	}

}

class Tile {
	addLink(lnk) {
		this.lnk = lnk;
	}
}


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

	puzzle = new Puzzle(canv, links);
	render();
}

function render() {
	ctx.clearRect(0, 0, canv.width, canv.height);
	puzzle.draw();
}


function updateMouse(evt) {
	let rect = canv.getBoundingClientRect();
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;	
}

function clickMouse(evt) {
	
}

// function animate() {	
	// render();	
	// requestAnimationFrame(animate);
// }

canv.addEventListener("mousemove", function(evt) { updateMouse(evt);} );
canv.addEventListener("mousedown", function(evt) { clickMouse(evt);} );

links.push(new Link("pikuch's github site", "./index.html", makeImg("./siteicon.png")));
links.push(new Link("example1", "./example1/index.html", makeImg("./example1/example1.png")));
links.push(new Link("example2", "./example2/index.html", makeImg("./example2/example2.png")));
links.push(new Link("example3", "./example3/index.html", makeImg("./example3/example3.png")));
links.push(new Link("example4", "./example4/index.html", makeImg("./example4/example4.png")));


//animate();
