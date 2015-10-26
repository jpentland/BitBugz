var CANVAS_X = 640;
var CANVAS_Y = 480;
var FPS = 30;
var TO_RADIANS = Math.PI/180;

var context = document.getElementById('canvasId').getContext("2d");
var start = false;
var bugs = [];

function Box(posX, posY, sizeX, sizeY, rotation) {
	this.pos = {x:posX, y:posY};
	this.size = {x:sizeX, y:sizeY};
	this.rotation = rotation;
}

Box.prototype.copy = function() {
	return new Box(this.pos.x, this.pos.y, this.size.x, this.size.y, this.rotation);
}


/*
 * Self-drawing bug object
 * TODO: Split into layers
 */
function Bug(svg_file, posX, posY, sizeX, sizeY, onReady) {
	this.posX = posX;
	this.posY = posY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.image = new Image();
	this.onReady = onReady;
	this.image.onload = onReady; //function() { this.onReady() };
	this.image.src = svg_file;
	this.rotation = 0;
}

Bug.prototype.move = function(x, y) {
	this.posX += x;
	this.posY += y;
}

Bug.prototype.draw = function(context) {
	context.save();
	context.translate(this.posX, this.posY);
	context.translate(this.sizeX/2, this.sizeY/2);
	context.rotate(this.rotation * TO_RADIANS);
	context.drawImage(this.image, -this.sizeX/2, -this.sizeY/2, this.sizeX, this.sizeY);
	context.restore();
}

Bug.prototype.clear = function(context) {
	context.clearRect(this.posX, this.posY, this.sizeX, this.sizeY);
}

Bug.prototype.rotate = function(degrees) {
	this.rotation += degrees;
}

var redraw = function redraw() {

	requestAnimationFrame(redraw);

        context.strokeRect(10,10, CANVAS_X-10, CANVAS_Y-10);

	for (i in bugs) {
		bugs[i].clear(context);
		bugs[i].draw(context);
		bugs[i].move(2, 1);
		bugs[i].rotate(5);
	}

}

var doStuff = function doStuff() {
        context.canvas.width = CANVAS_X;
        context.canvas.height= CANVAS_Y;

	bugs.push(new Bug("bug1.svg", 10, 10, 100, 110, redraw));
}

window.onload = doStuff;

