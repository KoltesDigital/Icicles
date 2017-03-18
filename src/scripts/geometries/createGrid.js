define(function() {
	return function(dimension, cellSize) {
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
	};
});
