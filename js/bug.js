/* js/bug.js
 *
 * This file is part of BitBugz.
 *
 * BitBugz is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BitBugz is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BitBugz.  If not, see <http://www.gnu.org/licenses/>
 *
 * Created: Monday October 26, 2015
 * Author:  Joseph Pentland <joe.pentland@gmail.com>
 */

var TO_RADIANS = Math.PI/180;
var FROM_RADIANS = 1/TO_RADIANS;

/* Object to store position, size and rotation of a sprite */
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
 */
function Bug(svg_file, posX, posY, sizeX, sizeY, onReady) {
	this.box = new Box(posX, posY, sizeX, sizeY, 0);
	this.oldBox = this.box.copy();
	this.image = new Image();
	this.onReady = onReady;
	this.image.onload = onReady;
	this.image.src = svg_file;
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

Bug.prototype.move = function(x, y) {
	this.box.pos.x += x;
	this.box.pos.y += y;
}

/* Move assuming that 0 degrees rotation faces upwards */
Bug.prototype.moveForward = function(d) {
	this.box.pos.x -= d * Math.sin(-(this.box.rotation) * TO_RADIANS);
	this.box.pos.y -= d * Math.cos(-(this.box.rotation) * TO_RADIANS);
}

Bug.prototype.rotate = function(degrees) {
	this.box.rotation += degrees;
}

Bug.prototype.pointTo = function(targetx, targety) {
	this.box.rotation = 90 + (FROM_RADIANS *
				Math.atan2(targety - this.box.pos.y,
				targetx - this.box.pos.x));
	if(this.box.rotation < 0)
		this.box.rotation += 360;
}

