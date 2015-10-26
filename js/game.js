var CANVAS_X = 640;
var CANVAS_Y = 480;
var FPS = 30;

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

	context.strokeRect(10,10, CANVAS_X-10, CANVAS_Y-10);

}

var doStuff = function doStuff() {
        context.canvas.width = CANVAS_X;
        context.canvas.height= CANVAS_Y;

	bugs.push(new Bug("bug1.svg", 10, 10, 50, 60, redraw));
}

window.onload = doStuff;

