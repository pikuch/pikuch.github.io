// clock.js

var elem = document.documentElement;
var btn = document.getElementById("FullscreenButton");
var canv = document.getElementById("ClockCanvas");
var ctx = canv.getContext("2d");
var lastTime = Date.now();
var mousePosition = {x:0, y:0, speed:0, pred_x:0, pred_y:0};
var background = new Image();
background.src = "img/background.jpg";
var currentTime = new Date();
var digits = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,4,5,5,5,5,5,5,5,5,5,5,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,3,0,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,6,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,7,7,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,6,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,3,6,7,7,7,7,7,7,6,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,7,7,7,7,7,7,7,4,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,7,6,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,7,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,7,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,7,7,7,7,7,7,6,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,7,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,5,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,6,4,1,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,7,7,5,4,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,4,5,6,7,7,7,7,7,7,7,5,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,5,5,5,5,5,4,5,5,5,5,5,5,5,5,6,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0],[0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,3,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,4,5,5,4,5,5,5,5,5,5,5,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,4,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,4,5,3,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,6,7,7,7,7,6,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,5,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,4,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,5,5,5,5,4,5,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,5,5,3,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,5,5,5,5,3,0,0,0,0,0],[0,0,0,0,0,0,1,4,4,5,4,5,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,4,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,6,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,3,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,6,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,6,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,7,7,7,7,7,7,6,5,5,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,6,4,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,3,6,7,7,7,7,7,6,3,1,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,5,3,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,4,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,1,4,5,6,7,7,7,7,7,7,7,7,5,2,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,3,5,7,7,7,7,7,7,7,7,5,4,5,5,5,4,5,7,7,7,7,7,7,7,7,7,6,4,1,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,0,0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,1,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,3,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,5,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,5,5,5,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,5,5,5,5,3,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,4,5,5,5,5,4,3,0,0,0,0,0,0],[0,0,0,0,0,0,1,4,5,5,5,4,5,5,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,6,3,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,4,1,0,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,4,1,0,0,0],[0,0,0,0,3,5,7,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,7,7,7,7,7,6,3,0,0,0,0,0,0,0,0,1,4,5,4,5,5,3,1,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,7,7,7,7,7,6,3,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,7,6,3,1,0,0,0,0,0,2,4,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,7,7,7,4,1,0,0,0,3,5,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,6,7,7,7,7,7,7,7,7,5,4,5,5,6,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,1,4,4,6,7,7,7,7,7,7,6,4,1,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,5,5,5,5,7,7,7,7,7,7,7,7,7,5,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,1,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0,0],[0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0],[0,0,0,0,0,0,1,4,6,7,7,7,7,7,7,7,7,7,7,5,5,3,0,0,1,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,4,4,6,7,7,7,7,7,7,6,4,1,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,4,5,4,5,5,5,4,1,0,0,0,0,0,0,0,0,3,5,5,7,7,7,7,7,7,7,5,5,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,5,5,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,4,5,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,6,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,6,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,6,7,7,7,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,6,7,7,7,7,7,6,5,5,5,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,5,2,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,5,2,0,0,0,2,5,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,4,5,6,7,7,7,7,7,6,5,4,1,0,0,0,0,2,5,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,4,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0,0,2,5,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,4,5,6,7,7,7,7,7,6,5,4,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,7,7,7,7,7,7,7,5,5,5,5,5,5,5,5,3,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,7,7,7,7,7,7,7,5,5,5,5,5,5,5,5,3,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,5,5,4,5,5,4,3,0,0,0,0,0,0],[0,0,0,0,0,2,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,1,0,0,0,0,0,1,4,7,7,7,7,7,7,7,6,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,1,0,0,0,0,0,0,0,3,6,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,5,1,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,6,4,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,5,5,5,5,5,4,5,7,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,1,0,0,0,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,6,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,5,7,7,7,7,7,5,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,5,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,5,7,7,7,7,7,6,4,1,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,5,7,7,7,7,7,7,6,1,0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,6,4,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,5,2,0,0,0,0,1,4,5,6,7,7,7,7,7,7,5,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,6,5,4,4,5,5,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,4,5,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,1,4,5,6,7,7,7,7,7,7,7,6,5,4,2,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,4,5,5,5,5,5,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,5,5,5,5,5,5,5,4,5,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,3,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,0,0,0,0,0],[0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,5,5,5,7,7,7,7,6,5,5,5,5,5,5,5,5,5,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,5,5,4,1,1,1,5,7,7,5,3,0,0,0,0,0,0,0,0,1,4,5,6,7,7,7,7,7,7,5,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,4,2,0,0,0,2,5,7,7,6,2,0,0,0,0,0,0,0,0,0,0,0,0,2,4,7,7,7,7,7,6,4,1,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,4,1,0,0,0,0,2,5,7,7,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,6,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,5,0,0,0,0,0,0,2,6,7,7,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,6,7,7,7,7,7,6,4,0,0,0,0,0,3,5,7,7,7,6,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,4,6,7,7,7,6,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,4,7,7,7,7,7,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,3,6,7,7,7,7,6,4,0,0,0,0,0,0,0,0,0,0,0,0,1,4,6,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,4,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,1,3,4,5,7,7,7,7,7,6,4,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,6,5,5,5,5,5,5,4,7,7,7,7,7,7,7,7,5,0,0,0,0,0],[0,0,0,0,4,6,7,7,7,7,6,3,0,0,0,0,0,0,3,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0],[0,0,0,0,4,7,7,7,7,7,6,3,0,0,0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0,0],[0,0,0,0,4,6,7,7,7,7,7,6,4,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0],[0,0,0,0,3,4,5,5,5,5,5,5,3,0,0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,5,6,7,7,7,7,7,7,7,7,5,4,2,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,5,5,5,5,5,4,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,4,5,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,5,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,6,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,5,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,2,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,3,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,0,0,0,2,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,0,0,0,1,3,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,4,1,2,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,6,5,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,4,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,5,5,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,4,5,5,5,5,4,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,5,4,5,5,4,2,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,4,5,4,4,5,5,4,1,0,0,0,0,0,0,0,0,2,4,5,6,7,7,7,7,7,7,6,5,4,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,5,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0,3,6,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0],[0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0,0],[0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,4,5,5,5,6,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,6,5,5,4,5,7,7,7,7,7,7,7,7,7,7,7,6,5,4,0,0,0,0,0,3,5,5,7,7,7,7,7,7,4,1,0,0,0],[0,0,0,0,3,6,7,7,7,7,7,6,4,0,0,0,0,4,6,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,5,3,0,0,0,0,0,0,3,6,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,1,4,6,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,5,2,0,0,0,0,0,0,0,3,5,7,7,7,7,7,7,6,4,1,0,0,0,0,0,0,0,0,0,0,0,4,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,5,1,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,0,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,5,1,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,0,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,5,2,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,7,5,2,0,0,0,0,0,0,0,0,0,0,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,7,7,7,7,7,5,3,0,0,0,0,0,0,0,0,1,5,7,7,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,7,7,7,7,7,7,6,3,1,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0,0,0,1,4,6,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,5,7,7,7,7,7,7,7,5,5,5,4,5,5,5,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,2,5,7,7,7,7,7,7,4,1,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,5,5,5,6,7,7,7,7,7,7,5,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,3,0,0,0,0,0],[0,0,0,0,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,6,4,0,0,1,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,4,1,0,0,0,0,0,1,4,5,6,7,7,7,7,7,7,7,7,7,7,6,4,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,4,5,5,5,5,5,4,1,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,5,4,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,5,4,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,4,5,5,5,5,5,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,4,5,6,7,7,7,7,7,7,7,7,7,5,5,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,3,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0,0,2,4,5,5,5,5,5,5,4,1,0,0,0],[0,0,0,0,0,0,1,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,3,0,0,0,0,0,0,2,5,7,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,2,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,7,7,5,5,5,5,5,5,4,5,6,7,7,7,7,7,7,7,7,5,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,5,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,1,3,5,5,7,7,7,7,7,7,5,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,7,7,7,7,7,6,3,0,0,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,5,1,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,4,6,7,7,7,7,5,2,0,0,0,0,0,0,0,0,0,0,0,0,1,4,7,7,7,7,7,5,0,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,7,7,7,7,6,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,7,7,5,1,0,0,0,0,0,1,5,7,7,7,7,7,5,1,0,0,0],[0,0,0,0,3,7,7,7,7,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,7,7,7,6,4,0,0,0,0,0,2,5,7,7,7,7,7,7,4,1,0,0,0],[0,0,0,0,4,6,7,7,7,6,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,7,7,7,4,1,0,0,0,0,0,3,6,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,4,7,7,7,7,7,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,7,7,6,4,0,0,0,0,0,3,5,7,7,7,7,7,7,4,0,0,0,0,0],[0,0,0,0,3,5,7,7,7,7,7,6,3,1,0,0,0,0,0,0,0,0,0,0,0,1,5,7,7,5,3,0,0,0,1,4,7,7,7,7,7,7,7,6,4,0,0,0,0,0],[0,0,0,0,0,3,6,7,7,7,7,7,6,5,4,2,0,0,0,0,0,0,0,0,1,4,7,7,6,3,0,0,3,5,5,7,7,7,7,7,7,7,6,3,0,0,0,0,0,0],[0,0,0,0,0,2,6,7,7,7,7,7,7,7,7,5,5,5,5,5,5,5,5,5,6,7,7,7,7,6,5,5,6,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0],[0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,5,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,4,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,2,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,4,5,5,5,5,6,7,7,7,7,7,7,7,7,7,7,7,6,5,4,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,5,5,5,4,5,5,5,5,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,6,5,5,4,1,0,0,0,0,0,0,0,0,0,0,1,4,5,5,6,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,4,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,4,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,2,5,7,7,7,7,7,5,2,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,5,2,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,4,7,7,7,7,7,7,7,4,0,0,0,0,0,0,0,0,4,7,7,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,4,7,7,7,7,7,7,7,4,0,0,0,0,0,0,0,0,4,7,7,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,5,2,0,0,0,0,0,0,0,0,2,6,7,7,7,7,7,6,2,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,4,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,4,7,7,7,7,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,6,5,5,4,1,0,0,0,0,0,0,0,0,0,0,1,4,5,6,6,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]; // lol

// go fullscreen
function openFullscreen() {
  btn.parentNode.removeChild(btn);
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

}

window.onresize = function() {
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
}

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function isPointOnDigit(x, y, unitSquare, digitPlace) {
	let digit = 0;
	let hours = currentTime.getHours();
	let minutes = currentTime.getMinutes();
	switch(digitPlace) {
		case "10h":
			if (hours<10) {
				return false;
			} else {
				digit = (hours < 20) ? 1 : 2;
			}
			break;
		case "1h":
			digit = parseInt(hours.toString().slice(-1), 10);
			break;
		case ":":
			digit = 10; // ":"
			break;
		case "10m":
			if (minutes<10) {
				digit = 0;
			} else {
				digit = parseInt(minutes.toString()[0], 10);
			}
			break;
		case "1m":
			digit = parseInt(minutes.toString().slice(-1), 10);
			break;
	}
	
	return (digits[Math.trunc(digit*30 + x*10/unitSquare)][Math.trunc(y*10/unitSquare)] > 3);
}

function isPointOnTime(x, y) {
	let x_cutoff = 0;
	let	y_cutoff = 0;
	let unitSquare = 0;
	if (canv.width*9/16 > canv.height) {
		x_cutoff = (canv.width - canv.height*16/9) / 2;
		unitSquare = canv.height / 9;
	} else {
		y_cutoff = (canv.height - canv.width*9/16) / 2;
		unitSquare = canv.width / 16;
	}
	
	if (x<x_cutoff || x>canv.width-x_cutoff || y<y_cutoff || y>canv.height-y_cutoff) {
		return false;
	}
	
	x -= x_cutoff;
	y -= y_cutoff;
	
	if (x<unitSquare || x>15*unitSquare || y<2*unitSquare || y>7*unitSquare) {
		return false;
	}
	
	x -= unitSquare;
	y -= 2*unitSquare;
	
	// the timer area is 14x5 unitSquare
	
	if (x<3*unitSquare) {
		return isPointOnDigit(x, y, unitSquare, "10h");
	} else if (x<6*unitSquare){
		return isPointOnDigit(x-3*unitSquare, y, unitSquare, "1h");
	} else if (x<8*unitSquare){
		return isPointOnDigit(x-6*unitSquare, y, unitSquare, ":");
	} else if (x<11*unitSquare){
		return isPointOnDigit(x-8*unitSquare, y, unitSquare, "10m");
	} else {
		return isPointOnDigit(x-11*unitSquare, y, unitSquare, "1m");
	}
}

function updateMouse(canv, evt) {
	var rect = canv.getBoundingClientRect();
	var new_x = evt.clientX - rect.left;
	var new_y = evt.clientY - rect.top;
	var new_speed = Math.sqrt(Math.pow(new_x-mousePosition.x, 2) + Math.pow(new_y-mousePosition.y, 2));
	var new_pred_x = new_x + 2 * (new_x - mousePosition.x);
	var new_pred_y = new_y + 2 * (new_y - mousePosition.y);
	mousePosition = {x:new_x, y:new_y, speed:new_speed, pred_x:new_pred_x, pred_y:new_pred_y};
}

function update(dt) {
}


function render() {
	ctx.drawImage(background, 0, 0, canv.width, canv.height);
	
	ctx.beginPath();
	ctx.arc(mousePosition.pred_x, mousePosition.pred_y, mousePosition.speed, 0, 2 * Math.PI);
	ctx.stroke();
	
	for (let i=0; i<800; i++) {
		let x = Math.random() * canv.width;
		let y = Math.random() * canv.height;
		if (isPointOnTime(x, y)) {
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
}

function renderFPS(dt) {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 40, 15);
	ctx.font = "12px Arial";
	ctx.fillStyle = "black";
	ctx.fillText((1/dt).toFixed() + " fps", 2, 12);
}

function animate() {
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
	
	currentTime = new Date();
	
    update(dt);
    render();
	renderFPS(dt);
	
	lastTime = now;
	requestAnimationFrame(animate);
}

canv.addEventListener('mousemove', function(evt) {
	updateMouse(canv, evt);
})

animate()
