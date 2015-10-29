var CANVAS_X = 640*2;
var CANVAS_Y = 680;
var FPS = 30;
var NUM_BUGS = 20;

var context = document.getElementById('canvasId').getContext("2d");
var start = false;
var bugs = [];

var redraw = function redraw() {

	requestAnimationFrame(redraw);

	for (i in bugs) {
		bugs[i].clear(context);
	}

	for (i in bugs) {
		if (Math.random() < 0.01)
			bugs[i].dir = -bugs[i].dir;
		bugs[i].draw(context);
		bugs[i].rotate(bugs[i].dir);
		bugs[i].moveForward(2);
	}

	context.strokeRect(10,10, CANVAS_X-10, CANVAS_Y-10);

}

var doStuff = function doStuff() {
	context.canvas.width = CANVAS_X;
	context.canvas.height= CANVAS_Y;

	for (var i=0; i < NUM_BUGS-1; i++) {

		bugs.push(new Bug("bug1.svg",
				  Math.random()*CANVAS_X , Math.random()*CANVAS_Y,
				  50, 60,
				  function() {onBugReady(NUM_BUGS);}));

		if (Math.random() < 0.5)
			bugs[i].dir = 1;
		else
			bugs[i].dir = -1;
	}

	bugs.push(new Bug("bug1.svg", 500, 500, 50, 60, redraw));
	bugs[NUM_BUGS-1].dir = 1;

}

window.onload = doStuff;

