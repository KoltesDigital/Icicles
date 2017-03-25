define(['gl', 'engine/Geometry'], function(gl, Geometry) {

	return function(meshData) {

		var position = [];
		var normals = [];
		var color = [];
		var indices = [];

		var lines = meshData.split("\n");
		for (var l = 4; l < lines.length; ++l)
		{
			var column = lines[l].split(" ");
			if (column.length == 4)
			{
				Array.prototype.push.apply(position, [ parseFloat(column[1]), parseFloat(column[2]), parseFloat(column[3]) ]);
				Array.prototype.push.apply(color, [ 1,1,1,1 ]);
				Array.prototype.push.apply(normals, [ 0,1,0 ]);
			}
			if (column.length == 3)
			{
				Array.prototype.push.apply(indices, [ parseFloat(column[1]) - 1, parseFloat(column[2]) - 1 ]);
			}
		}

		console.log(indices.length)


		return new Geometry({
			position: { numComponents: 3, data: position },
			normal: { numComponents: 3, data: normals },
			color: { numComponents: 4, data: color },
			indices: { numComponents: 2, data: indices },
		}, gl.LINES);
	}
});