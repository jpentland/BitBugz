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
		bug=bugs[i];
		bug.clear(context);
	}

	for (i in bugs) {
		bug=bugs[i];
		bug.draw(context);

		if (!(bug.box.pos.x < bug.targetx + 10 &&
		      bug.box.pos.x > bug.targetx - 10 &&
		      bug.box.pos.y < bug.targety + 10 &&
		      bug.box.pos.y > bug.targety - 10))
			bugs[i].moveForward(1);
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
				  function() {
					if (i == NUM_BUGS-1)
						redraw();
				  }));

	}
}

var resizeCanvas = function resizeCanvas() {

	context.canvas.width = $("#canvas-panel").width();
	context.canvas.height= CANVAS_Y;
}

window.onload = doStuff;
$("#canvasId").mousemove( function (event) {

	for (i in bugs) {
		bugs[i].pointTo(event.offsetX, event.offsetY);
	}
});
