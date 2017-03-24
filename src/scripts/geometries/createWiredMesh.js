define(['gl', 'engine/Geometry'], function(gl, Geometry) {

	return function(meshData) {

		var mesh = {
			position: { numComponents: 3, data: [] }, 
			color: { numComponents: 4, data: [] },
			normal: { numComponents: 3, data: [] },
			texcoord: { numComponents: 2, data: [] }, 
			indices: { numComponents: 2, data: [] },
			anchor: { numComponents: 3, data: [] },
		};

		var lines = meshData.split("\n");
		for (var l = 15; l < lines.length; ++l)
		{
			var column = lines[l].split(" ");

			// position, normals, texcoord
			if (column.length == 8)
			{
				Array.prototype.push.apply(mesh.position.data, [ parseFloat(column[0]), parseFloat(column[1]), parseFloat(column[2]) ]);
				Array.prototype.push.apply(mesh.normal.data, [ parseFloat(column[3]), parseFloat(column[4]), parseFloat(column[5]) ]);
				Array.prototype.push.apply(mesh.texcoord.data, [ parseFloat(column[6]), parseFloat(column[7]) ]);
				Array.prototype.push.apply(mesh.color.data, [ .8, .8, .8, 1 ]);
				Array.prototype.push.apply(mesh.anchor.data, [0,0,0]);
			}
			// indices
			else if (column.length == 5)
			{
				var a = parseFloat(column[1]);
				var b = parseFloat(column[2]);
				var c = parseFloat(column[3]);
				var d = parseFloat(column[4]);
				Array.prototype.push.apply(mesh.indices.data, [ a,b, b,c, c,d, d,a ]);
			}
			// indices
			else if (column.length == 4)
			{
				var a = parseFloat(column[1]);
				var b = parseFloat(column[2]);
				var c = parseFloat(column[3]);
				Array.prototype.push.apply(mesh.indices.data, [ a,b, b,c, c,a ]);
			}
		}

		return new Geometry(mesh, gl.LINES);
	}
});