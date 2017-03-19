define(['gl', 'engine/Geometry'], function(gl, Geometry) {
	return function(dimension) {
		dimension = dimension || 8;
		var count = dimension * dimension;
		var index = 0;

		var position = [];
		var texcoord = [];
		var color = [];
		var indices = [];

		for (var i = 0; i < count; ++i) {

			var x = (i % dimension) / dimension;
			var y = 0;
			var z = Math.floor(i / dimension) / dimension;

			for (var p = 0; p < 3; ++p) {
				position.push(x, y, z);
				color.push(1,1,1,1);
			}



			// textures coordinates
			// Array.prototype.push.apply(bufferArray.texcoord.data, [ 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1 ]);

			// textures coordinates leaf style
			// Array.prototype.push.apply(bufferArray.texcoord.data, [ 0.5,0, 1,0.5, 0,0.5, 0,0.5, 1,0.5, 0.5,1 ]);

			// var mid = 0.5;// + Math.random() * 0.4;
			texcoord.push(-1,0, 0,1., 1.,0. );
			// Array.prototype.push.apply(bufferArray.indices.data, [ index,index+1, index,index+2, index+1,index+2, index+1,index+3, index+2,index+3]);//, i+4,i+3 ]);
			indices.push(index,index+2,index+1);
			index += 3;
		}

		return new Geometry({
			position: { numComponents: 3, data: position },
			color: { numComponents: 4, data: color },
			texcoord: { numComponents: 2, data: texcoord },
			indices: indices,
		}, gl.TRIANGLES);
	};
});
