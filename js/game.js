var CANVAS_Y = 480;
var FPS = 30;
var CANVAS_PAD = 20;
var NUM_BUGS=5

var context = document.getElementById('canvasId').getContext("2d");
var start = false;
var bugs = [];

var redraw = function redraw() {

	requestAnimationFrame(redraw);

	for (i in bugs) {
		bugs[i].clear(context);
		bugs[i].draw(context);
		bugs[i].rotate(1);
		bugs[i].moveForward(2);
	}

	context.strokeRect(10,10,
			context.canvas.width-CANVAS_PAD,
			context.canvas.height-CANVAS_PAD);

}

var doStuff = function doStuff() {
	resizeCanvas();

	for (var i=0; i < NUM_BUGS-1; i++) {

		bugs.push(new Bug("bug1.svg",
				  Math.random()*context.canvas.width,
				  Math.random()*context.canvas.height,
				  50, 60,
				  function() {onBugReady(NUM_BUGS);}));

	}
}

var resizeCanvas = function resizeCanvas() {

	context.canvas.width = $("#canvas-panel").width();
	context.canvas.height= CANVAS_Y;
}
window.onload = doStuff;

