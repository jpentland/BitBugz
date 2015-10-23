var CANVAS_X = 640;
var CANVAS_Y = 480;

var context = document.getElementById('canvasId').getContext("2d");

var drawImage = function drawImage(name, x, y) {

  var image = new Image();
  image.onload = function() {
        context.drawImage(image, x, y);
  }
  image.src = name;
}

var doStuff = function doStuff() {
        context.canvas.width = CANVAS_X;
        context.canvas.height= CANVAS_Y;

        context.strokeRect(10,10, CANVAS_X-10, CANVAS_Y-10);
        drawImage("http://localhost/BitBugz/bug1.svg", 10, 10);
}

window.onload = doStuff;

