var CANVAS_X = 640;
var CANVAS_Y = 480;

var context = document.getElementById('canvasId').getContext("2d");

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
}

Bug.prototype.move = function(x, y) {
	this.posX += x;
	this.posY += y;
}

Bug.prototype.draw = function(context) {
	context.drawImage(this.image, this.posX, this.posY, this.sizeX, this.sizeY);
}

var drawImage = function drawImage(name, x, y) {
	var bug = new Bug(name, x, y, function() { bug.draw(context) })
}

var doStuff = function doStuff() {
        context.canvas.width = CANVAS_X;
        context.canvas.height= CANVAS_Y;

        context.strokeRect(10,10, CANVAS_X-10, CANVAS_Y-10);
		drawImage("bug1.svg", 10, 10);
}

window.onload = doStuff;

