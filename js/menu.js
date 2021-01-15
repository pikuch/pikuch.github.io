"use strict";

var canv = document.createElement("canvas");  
var ctx = canv.getContext("2d");

var noise = new SimplexNoise();
var time = performance.now();

var timeScale = 1/10000;
var resizeTime;
var resizePending = false;

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
		this.startX = 0;
		this.startY = 0;
		this.tileSize = 0;
		this.findDivisions(links.length * 1.2);
		this.tiles = [];
		this.generateTiles(linkNames);
		this.tabDirections = [];
		this.generateTabDirections();
		this.generateCurves();
	}
	
	generateCurves() {
		let normalCurve = [[0.1, 0],
					 [0.3, 0], [0.4, 0], [0.5, 0],
					 [0.4, 0.05], [0.4, 0.1], [0.4, 0.15],
					 [0.45, 0.2], [0.5, 0.2], [0.55, 0.2],
					 [0.6, 0.15], [0.6, 0.1], [0.6, 0.05],
					 [0.5, 0], [0.6, 0], [0.7, 0],
					 [0.9, 0], [1.0, 0]];
		
		for (let x = 0; x < this.tilesX; x++) {
			for (let y = 0; y < this.tilesY; y++) {
				let tile = this.tiles[x][y];
				let curve;
				// top
				curve = this.deepCopyCurve(normalCurve);
				if (this.tabDirections[x+1][y][1]) {
					this.flipCurve(curve);
				}
				tile.edges.push(curve);
				tile.edgesDeformed.push(this.deepCopyCurve(curve));
				
				// right
				curve = this.deepCopyCurve(normalCurve);
				if (!this.tabDirections[x+1][y+1][0]) {
					this.flipCurve(curve);
				}
				this.rotateCurve(curve, 1/2*Math.PI);
				tile.edges.push(curve);
				tile.edgesDeformed.push(this.deepCopyCurve(curve));
				
				// bottom
				curve = this.deepCopyCurve(normalCurve);
				if (!this.tabDirections[x+1][y+1][1]) {
					this.flipCurve(curve);
				}
				this.rotateCurve(curve, Math.PI);
				tile.edges.push(curve);
				tile.edgesDeformed.push(this.deepCopyCurve(curve));
				
				// left
				curve = this.deepCopyCurve(normalCurve);
				if (this.tabDirections[x][y+1][0]) {
					this.flipCurve(curve);
				}
				this.rotateCurve(curve, 3/2*Math.PI);
				tile.edges.push(curve);
				tile.edgesDeformed.push(this.deepCopyCurve(curve));
			}
		}
	}

	flipCurve(curve) {
		for (let p in curve) {
			curve[p][1] *= -1;
		}
	}

	rotateCurve(curve, angle) {
		let sinAngle = Math.sin(angle);
		let cosAngle = Math.cos(angle);
		let center = 0.5;
		for (let p in curve) {
			let x = curve[p][0] - center;
			let y = curve[p][1] - center;
			let newX = x * cosAngle - y * sinAngle;
			let newY = x * sinAngle + y * cosAngle;
			curve[p][0] = newX + center;
			curve[p][1] = newY + center;
		}
	}
	
	deepCopyCurve(curve) {
		let output = new Array(curve.length);
		for (let p in curve) {
			output[p] = [curve[p][0], curve[p][1]];
		}
		return output;
	}
	
	generateTabDirections() {
		for (let x = 0; x <= this.tilesX; x++) {
			this.tabDirections.push([]);
			for (let y = 0; y <= this.tilesY; y++) {
				this.tabDirections[x].push();
				this.tabDirections[x][y] = [Math.random() > 0.5, Math.random() > 0.5];
			}
		}
	}
	
	generateTiles(links) {
		let toFill = [];
		for (let x = 0; x < this.tilesX; x++) {
			this.tiles.push([]);
			for (let y = 0; y < this.tilesY; y++) {
				let newTile = new Tile(x, y);
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
		let margin = 0.25;
		let width = canv.width * (1 - margin);
		let height = canv.height * (1 - margin);
		while (this.tilesX * this.tilesY < minElements) {
			if (width / this.tilesX < height / this.tilesY) {
				this.tilesY++;
			} else {
				this.tilesX++;
			}
		}
		this.tileSize = Math.floor(Math.min(width / this.tilesX, height / this.tilesY));
		this.startX = canv.width / 2 - this.tilesX / 2 * this.tileSize;
		this.startY = canv.height / 2 - this.tilesY / 2 * this.tileSize;
    }

	mouseAt(mX, mY) {
		for (let x = 0; x < this.tilesX; x++) {
			for (let y = 0; y < this.tilesY; y++) {
				this.tiles[x][y].isChosen = false;
			}
		}

		let xx = (mX - this.startX) / this.tileSize;
		let yy = (mY - this.startY) / this.tileSize;
		let xTile = Math.floor(xx);
		let yTile = Math.floor(yy);
		let xRem = xx % 1;
		let yRem = yy % 1;
		
		if (xRem > 0.1 && xRem < 0.9 && yRem > 0.1 && yRem < 0.9 && xTile >= 0 && xTile < this.tilesX && yTile >= 0 && yTile < this.tilesY) {
			this.tiles[xTile][yTile].isChosen = true;
		}
		
	}

	clickAt(mX, mY) {
		let xx = (mX - this.startX) / this.tileSize;
		let yy = (mY - this.startY) / this.tileSize;
		let xTile = Math.floor(xx);
		let yTile = Math.floor(yy);
		let xRem = xx % 1;
		let yRem = yy % 1;
		
		if (xRem > 0.1 && xRem < 0.9 && yRem > 0.1 && yRem < 0.9 && xTile >= 0 && xTile < this.tilesX && yTile >= 0 && yTile < this.tilesY) {
			if (this.tiles[xTile][yTile].isFilled) {
				if (this.tiles[xTile][yTile].lnk.target != "") {
					window.location.href = this.tiles[xTile][yTile].lnk.target;
				}
			}
		}
		
	}

	update() {
		time = performance.now();
		for (let x = 0; x < this.tilesX; x++) {
			for (let y = 0; y < this.tilesY; y++) {
				this.tiles[x][y].deform();
			}
		}
	}

	draw() {
		ctx.clearRect(0, 0, canv.width, canv.height);
		
		// draw images
		for (let x = 0; x < this.tilesX; x++) {
			for (let y = 0; y < this.tilesY; y++) {
				if (this.tiles[x][y].isFilled) {

					let tile = this.tiles[x][y];

					ctx.save();
					ctx.translate(this.startX, this.startY);
					ctx.scale(this.tileSize, this.tileSize);
					ctx.translate(x, y);

					// cut tile shape
					ctx.beginPath();
					ctx.moveTo(tile.startDeformed[0][0], tile.startDeformed[0][1]);
					for (let e=0; e<tile.edgesDeformed.length; e++) {
						let edge = tile.edgesDeformed[e];
						for (let p=0; p<edge.length/3; p++) {
							ctx.bezierCurveTo(edge[3*p][0], edge[3*p][1], edge[3*p+1][0], edge[3*p+1][1], edge[3*p+2][0], edge[3*p+2][1]);
						}
					}
					ctx.closePath();
					ctx.clip();
					ctx.drawImage(tile.lnk.img, tile.minX, tile.minY, tile.maxX - tile.minX, tile.maxY - tile.minY);
					ctx.restore();
				}
			}
		}
		
		// draw tile edges
		for (let x = 0; x < this.tilesX; x++) {
			for (let y = 0; y < this.tilesY; y++) {
				if (this.tiles[x][y].isFilled) {

					let tile = this.tiles[x][y];

					ctx.save();
					ctx.translate(this.startX, this.startY);
					ctx.scale(this.tileSize, this.tileSize);
					ctx.translate(x, y);

					ctx.beginPath();
					ctx.moveTo(tile.startDeformed[0][0], tile.startDeformed[0][1]);
					for (let e=0; e<tile.edgesDeformed.length; e++) {
						let edge = tile.edgesDeformed[e];
						for (let p=0; p<edge.length/3; p++) {
							ctx.bezierCurveTo(edge[3*p][0], edge[3*p][1], edge[3*p+1][0], edge[3*p+1][1], edge[3*p+2][0], edge[3*p+2][1]);
						}
					}
					ctx.closePath();
					if (tile.isChosen == false) {
						ctx.lineWidth = 0.01;
					} else {
						ctx.lineWidth = 0.02;
					}
					ctx.strokeStyle = "#000000";
					ctx.stroke();
					
					ctx.restore();
				}
			}
		}
	}

}

class Tile {
	constructor(posX, posY) {
		this.start = [[0, 0]];
		this.edges = [];
		this.startDeformed = [[0, 0]];
		this.edgesDeformed = [];
		this.x = posX;
		this.y = posY;
		this.minX = 0.5;
		this.minY = 0.5;
		this.maxX = 0.5;
		this.maxY = 0.5;
		this.isChosen = false;
		this.isFilled = false;
		this.noiseScale = 0.6;
		this.noiseStrength = 0.06;
	}
	
	addLink(lnk) {
		this.lnk = lnk;
		this.isFilled = true;
	}
	
	deformCurve(curve, curveDeformed) {
		for (let p in curve) {
			let noiseX = noise.noise3D(this.noiseScale * (this.x + curve[p][0]), this.noiseScale * (this.y + curve[p][1]), time * timeScale);
			let noiseY = noise.noise3D(this.noiseScale * (this.x + 100 + curve[p][0]), this.noiseScale * (this.y + 100 + curve[p][1]), time * timeScale);
			curveDeformed[p][0] = curve[p][0] + this.noiseStrength * noiseX;
			curveDeformed[p][1] = curve[p][1] + this.noiseStrength * noiseY;
			// update tile limits
			if (curveDeformed[p][0] < this.minX) {
				this.minX = curveDeformed[p][0];
			} else if (curveDeformed[p][0] > this.maxX) {
				this.maxX = curveDeformed[p][0];
			}
			if (curveDeformed[p][1] < this.minY) {
				this.minY = curveDeformed[p][1];
			} else if (curveDeformed[p][1] > this.maxY) {
				this.maxY = curveDeformed[p][1];
			}
		}
	}
	
	deform() {
		this.minX = 0.5;
		this.minY = 0.5;
		this.maxX = 0.5;
		this.maxY = 0.5;
		this.deformCurve(this.start, this.startDeformed);
		for (let edge in this.edges) {
			this.deformCurve(this.edges[edge], this.edgesDeformed[edge]);
		}
	}
}

function makeImg(name) {
	let img = document.createElement("img");
	img.src = name;
	return img;
}

window.onresize = function() {
	resizeTime = performance.now() + 100;
	resizePending = true;
}

window.onload = function () {
	document.body.appendChild(canv);
	resizeCanvas();
	resizeTime = performance.now();
	animate();
}

function resizeCanvas() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
	puzzle = new Puzzle(canv, links);
}

function updateMouse(evt) {
	let rect = canv.getBoundingClientRect();
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;
	puzzle.mouseAt(mouseX, mouseY);
}

function clickMouse(evt) {
	let rect = canv.getBoundingClientRect();
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;
	puzzle.clickAt(mouseX, mouseY);
}

function animate() {
	puzzle.update();
	puzzle.draw();
	requestAnimationFrame(animate);
	if (resizePending) {
		if (performance.now() > resizeTime) {
			resizeCanvas();
			resizePending = false;
		}
	}
}

canv.addEventListener("mousemove", function(evt) { updateMouse(evt);} );
canv.addEventListener("mousedown", function(evt) { clickMouse(evt);} );

var links = [];
links.push(new Link("pikuch's github site", "", makeImg("./logo.png")));
links.push(new Link("example1", "./example1/index.html", makeImg("./example1/example1.png")));
links.push(new Link("example2", "./example2/index.html", makeImg("./example2/example2.png")));
links.push(new Link("example3", "./example3/index.html", makeImg("./example3/example3.png")));
links.push(new Link("example4", "./example4/index.html", makeImg("./example4/example4.png")));
