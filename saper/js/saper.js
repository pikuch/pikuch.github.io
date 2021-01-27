"use strict";

var canv;
var ctx;
const tileSize = 30;
var mx;
var my;
var field = [];
var gameState = "playing";
var prevMouseX = 0;
var prevMouseY = 0;

var audioNewGame = new Audio('./snd/newGame.mp3');
var audioWin = new Audio('./snd/win.mp3');
var audioFail = new Audio('./snd/fail.mp3');

var img = [];
for (let i=0; i<9; i++) {
		img[i] = document.createElement("img");
		img[i].src = "./img/tile" + i + ".png";
	}

var imgMine = document.createElement("img");
imgMine.src = "./img/tileX.png";

var imgFlag = document.createElement("img");
imgFlag.src = "./img/flag.png";

var imgNewGame = document.createElement("img");
imgNewGame.src = "./img/newGame.jpg";


class Tile {
	constructor () {
		this.revealed = false;
		this.flagged = false;
		this.value = 0;
	}
}

function resetField(difficulty) {
	let toFill = [];
	for (let x=0; x<mx; x++) {
		field[x] = [];
		for (let y=0; y<my; y++) {
			field[x][y] = new Tile();
			if (x > mx/2 || y > my/2) {
				toFill.push(field[x][y]);
			}
		}
	}
	// choose tiles for mines
	let toAssign = Math.floor(toFill.length * difficulty);
	for (let i=0; i<toAssign; i++) {
		let chosen = Math.floor(Math.random() * toFill.length);
		toFill[chosen].value = -1;
		toFill.splice(chosen, 1);
	}
	
	// set up mine counts
	for (let x=0; x<mx; x++) {
		for (let y=0; y<my; y++) {
			if (field[x][y].value == -1) {
				for (let dx=-1; dx<2; dx++) {
					for (let dy=-1; dy<2; dy++) {
						let nx = x + dx;
						let ny = y + dy;
						if (nx>=0 && nx<mx && ny>=0 && ny<my && (nx > mx/2 || ny > my/2)) {
							if (field[nx][ny].value >= 0) {
								field[nx][ny].value++;
							}
						}
					}
				}
			}
		}
	}
}

window.onload = function () {
	canv = document.getElementById("gameCanvas");
	ctx = canv.getContext("2d");
	mx = Math.floor(canv.width / tileSize - 2);
	my = Math.floor(canv.height / tileSize - 2);
	
	resetField(0.15);	
	ctx.clearRect(0, 0, canv.width, canv.height);
	ctx.drawImage(imgNewGame, 12 * tileSize, 9 * tileSize);

	canv.addEventListener("click", function(evt) { clickMouse(evt);} );
	canv.addEventListener("mousemove", function(evt) { moveMouse(evt);} );
	canv.addEventListener("dblclick", function(evt) { dblClickMouse(evt);} );
	canv.addEventListener("contextmenu", function(evt) { rightClickMouse(evt);} );
	 

}

function drawTile(x, y) {
	ctx.clearRect(tileSize + x * tileSize, tileSize + y * tileSize, tileSize, tileSize);
	
	if (field[x][y].revealed) {
		if (field[x][y].value == -1) {
			ctx.drawImage(imgMine, tileSize + x * tileSize, tileSize + y * tileSize);
		} else {
			ctx.drawImage(img[field[x][y].value], tileSize + x * tileSize, tileSize + y * tileSize);
		}
	}
	if (field[x][y].flagged) {
		ctx.drawImage(imgFlag, tileSize + x * tileSize, tileSize + y * tileSize);
	}
}

function revealAll() {
	for (let x=0; x<mx; x++) {
		for (let y=0; y<my; y++) {
			if ((x > mx/2 || y > my/2) && field[x][y].revealed == false) {
				field[x][y].revealed = true;
				drawTile(x, y);
			}
		}
	}
}

function checkAllClear() {
	for (let x=0; x<mx; x++) {
		for (let y=0; y<my; y++) {
			if ((x > mx/2 || y > my/2) && field[x][y].value >= 0 && field[x][y].revealed == false) {
				return false;
			}
		}
	}
	return true;
}

function testIn(a, b) {
	for (let elem of b) {
		if (a.length == elem.length) {
			let allOk = true;
			for (let i=0; i<a.length; i++) {
				if (a[i] != elem[i]) {
					allOk = false;
				}
			}
			if (allOk) {
				return true;
			}
		}
	}
	return false;
}

function revealFrom(x, y) {
	let visited = [[x, y]];
	let toCheck = [[x, y]];
	while (toCheck.length > 0) {
		let coords = toCheck.shift();
		let cx = coords[0];
		let cy = coords[1];
		field[cx][cy].revealed = true;
		drawTile(cx, cy);
		if (field[cx][cy].value == 0) {
			for (let dx=-1; dx<2; dx++) {
				for (let dy=-1; dy<2; dy++) {
					if (dx != 0 || dy != 0) {
						let nx = cx + dx;
						let ny = cy + dy;
						if (nx>=0 && nx<mx && ny>=0 && ny<my && (nx > mx/2 || ny > my/2)) {
							if (field[nx][ny].flagged == false && !testIn([nx, ny], visited)) {
								visited.push([nx, ny]);
								toCheck.push([nx, ny]);
							}
						}
					}
				}
			}			
		}
	
	}
	
}

function winGame() {
	if (gameState == "playing") {
		gameState = "win";
		audioWin.play();
	}
}

function failGame() {
	if (gameState == "playing") {
		revealAll();
		gameState = "fail";
		audioFail.play();
	}
}

function toggleFlag(tileX, tileY) {
	if (tileX > mx/2 || tileY > my/2) {
		if (!field[tileX][tileY].revealed) {
			if (field[tileX][tileY].flagged) {
				field[tileX][tileY].flagged = false;
			} else {
				field[tileX][tileY].flagged = true;
			}
			drawTile(tileX, tileY);
		}
	}
}

function tileCoordsFromMouseEvent(evt) {
	let rect = canv.getBoundingClientRect();
	let mouseX = evt.clientX - rect.left;
	let mouseY = evt.clientY - rect.top;
	let x = Math.floor(mouseX / tileSize) - 1;
	let y = Math.floor(mouseY / tileSize) - 1;
	return [x, y];
}

function clickMouse(evt) {
	let tileCoords = tileCoordsFromMouseEvent(evt);
	let tileX = tileCoords[0];
	let tileY = tileCoords[1];

	if (tileX < 0 || tileX >= mx || tileY < 0 || tileY >= my) {
		return
	}

	if (evt.shiftKey || evt.ctrlKey) {
		toggleFlag(tileX, tileY);
		return;
	}
	
	if (tileX > mx/2 || tileY > my/2) {
		if (field[tileX][tileY].revealed == false && field[tileX][tileY].flagged == false) {
			if (field[tileX][tileY].value == -1) {
				failGame();
			} else {
				field[tileX][tileY].revealed = true;
				drawTile(tileX, tileY);
				if (checkAllClear()) {
					winGame();
				}
			}
		}
	} else if (tileX >= 11 && tileX < 23 && tileY >= 8 && tileY < 12) {
		// difficulties: easy 10%, medium 15%, hard 20%
		resetField(0.10 + 0.05 * (tileX-11) / 4);
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.drawImage(imgNewGame, 12 * tileSize, 9 * tileSize);
		gameState = "playing";
		audioNewGame.play();
	}
}

function rightClickMouse(evt) {
	evt.preventDefault();
	let tileCoords = tileCoordsFromMouseEvent(evt);
	let tileX = tileCoords[0];
	let tileY = tileCoords[1];

	if (tileX < 0 || tileX >= mx || tileY < 0 || tileY >= my) {
		return
	}
	
	toggleFlag(tileX, tileY);

}

function dblClickMouse(evt) {
	let tileCoords = tileCoordsFromMouseEvent(evt);
	let tileX = tileCoords[0];
	let tileY = tileCoords[1];

	if (tileX < 0 || tileX >= mx || tileY < 0 || tileY >= my) {
		return
	}
	
	if (tileX > mx/2 || tileY > my/2) {
		if (field[tileX][tileY].revealed && field[tileX][tileY].value == 0) {
			revealFrom(tileX, tileY);
			if (checkAllClear()) {
				winGame();
				}
		}
	}
}

function moveMouse(evt) {
	let tileCoords = tileCoordsFromMouseEvent(evt);
	let tileX = tileCoords[0];
	let tileY = tileCoords[1];

	ctx.clearRect(prevMouseX * tileSize + tileSize, prevMouseY * tileSize + tileSize, tileSize, tileSize);
	drawTile(prevMouseX, prevMouseY);

	if (tileX < 0 || tileX >= mx || tileY < 0 || tileY >= my || !(tileX > mx/2 || tileY > my/2)) {
		return;
	}
	
	prevMouseX = tileX;
	prevMouseY = tileY;
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#ffffff";
	ctx.strokeRect(tileX * tileSize + tileSize + 1, tileY * tileSize + tileSize + 1, tileSize - 2, tileSize - 2);
	
}
