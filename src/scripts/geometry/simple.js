
createAxis = function (s)
{
	s = s || 1;
	return {
		position: { numComponents: 3, data: [ 0,0,0, s,0,0, 0,0,0, 0,s,0, 0,0,0, 0,0,s ] },
		color: { numComponents: 4, data: [ 1,0,0,1, 1,0,0,1, 0,1,0,1, 0,1,0,1, 0,0,1,1, 0,0,1,1 ] },
		indices: { numComponents: 2, data: [ 0,1, 2,3, 4,5 ] }
	};
}

createPlane = function ()
{
	return { 
		position: [ -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0 ],
		texcoord: [ 0, 0, 1, 0, 0, 1, 1, 1 ], 
		indices: [ 0, 1, 2, 1, 3, 2 ]
	};
}

createWiredCube = function (s)
{
	s = s || 1;
	return { 
		position: [ -s,-s,-s, s,-s,-s, s,s,-s, -s,s,-s, -s,-s,s, s,-s,s, s,s,s, -s,s,s ],
		texcoord: [ 0,0, 1,0, 0,1, 1,1 ], 
		color: [ 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1 ],
		indices: [ 0,1, 1,2, 2,3, 3,0, 0,4, 1,5, 2,6, 3,7, 4,5, 5,6, 6,7, 7,4 ],
	};
}

createCube = function ()
{
	return {
		position: [1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1],
		normal:   [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1],
		texcoord: [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
		indices:  [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23],
	};
}

createGrid = function (dimension, cellSize)
{
	dimension = dimension || 5;
	cellSize = cellSize || 1;
	var cellCount = dimension * dimension;
	var bufferArray = {
		position: { numComponents: 3, data: [] },
		color: { numComponents: 4, data: [] },
		indices: { numComponents: 3, data: [] },
		texcoord: { numComponents: 2, data: [] },
		center: { numComponents: 2, data: [] },
		grid: { numComponents: 2, data: [] },
	};

	var index = 0;
	var s = cellSize;
	var h = (dimension / 2) * cellSize;

	for (var cell = 0; cell < cellCount; ++cell) {
		var line = cell % dimension;
		var row = Math.floor(cell / dimension);
		var u = line / dimension;
		var v = row / dimension;
		var x = line * cellSize - h;
		var y = row * cellSize - h;
		var cX = (x + x+s + x+s) / 3;
		var cY = (y + y+s + y+s) / 3;
		var cX2 = (x + x + x+s) / 3;
		var cY2 = (y + y+s + y+s) / 3;
		Array.prototype.push.apply(bufferArray.position.data, [
			x,0,y, x+s,0,y+s, x+s,0,y,
			x,0,y, x,0,y+s, x+s,0,y+s]);
		Array.prototype.push.apply(bufferArray.indices.data, [
			index, index+1, index+2,
			index+3, index+4, index+5 ]);
		Array.prototype.push.apply(bufferArray.texcoord.data, [
			u,v, u,v, u,v,
			u,v, u,v, u,v ]);
		Array.prototype.push.apply(bufferArray.center.data, [
			cX,cY, cX,cY, cX,cY,
			cX2,cY2, cX2,cY2, cX2,cY2 ]);
		Array.prototype.push.apply(bufferArray.color.data, [
			0,0,1,1, 0,0,1,1, 1,0,0,1,
			1,0,0,1, 1,0,0,1, 1,0,0,1 ]);
		Array.prototype.push.apply(bufferArray.grid.data, [
			line,row, line,row, line,row,
			line,row, line,row, line,row ]);
		index += 6;
	}

	return bufferArray;
}

function createCircle (segment)
{
	var circle = {
		position: { numComponents: 3, data: [] }, 
		color: { numComponents: 4, data: [] }, 
		texcoord: { numComponents: 2, data: [] }, 
	};

	segment = segment || 32;

	for (var i = 0; i < segment; ++i) {
		var ratio = i / segment;

		// positions
		Array.prototype.push.apply(circle.position.data, [ 0, 0, 0 ]);

		// textures coordinates
		Array.prototype.push.apply(circle.texcoord.data, [ ratio, 0 ]);

		// color
		Array.prototype.push.apply(circle.color.data, [ 1, 0, 0, 1 ]);
	}

	return circle;
}