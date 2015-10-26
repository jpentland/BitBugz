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

	this.box = new Box(posX, posY, sizeX, sizeY, 0);
	this.oldBox = this.box.copy();
	this.image = new Image();
	this.onReady = onReady;
	this.image.onload = onReady;
	this.image.src = svg_file;
}

Bug.prototype.move = function(x, y) {
	this.box.pos.x += x;
	this.box.pos.y += y;
}

/*
 * Center context on box so all coordinates are relative to
 * the center of where the object should be drawn. Also
 * allows for rotation.
 */
Bug.prototype.withBox = function(context, box, func) {
	context.save();
	context.translate(box.pos.x, box.pos.y);
	context.translate(box.size.x/2, box.size.y/2);
	context.rotate(box.rotation * TO_RADIANS);
	func();
	context.restore();
}

Bug.prototype.draw = function(context) {
	var _this = this;
	this.withBox(context, this.box, function() {
		context.drawImage(_this.image,
						 -_this.box.size.x/2, -_this.box.size.y/2,
						  _this.box.size.x, _this.box.size.y);
	});
}

Bug.prototype.clear = function(context) {
	var _this = this;
	this.withBox(context, this.oldBox, function() {
		context.clearRect(-_this.oldBox.size.x/2, -_this.oldBox.size.y/2,
						   _this.oldBox.size.x, _this.oldBox.size.y);
	});
	this.oldBox = this.box.copy();
}

Bug.prototype.rotate = function(degrees) {
	this.box.rotation += degrees;
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

	bugs.push(new Bug("bug1.svg", 10, 10, 50, 60, redraw));
}

window.onload = doStuff;

