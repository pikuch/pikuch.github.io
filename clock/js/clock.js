// clock.js

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
              width: window.innerWidth,
              height: window.innerHeight,
              wireframes: false
             }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ballA = Bodies.circle(380, 100, 40, 10);
var ballB = Bodies.circle(460, 10, 40, 10);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ballA, ballB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

//window.onload = window.onresize = function() {
//  render.setwidth = theCanvas.offsetWidth;
//  render.setheight = theCanvas.offsetHeight;
//}