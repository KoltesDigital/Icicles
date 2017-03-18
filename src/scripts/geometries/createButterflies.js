define(['../gl'], function(gl) {
	return function (array) {
		var particles = {
			position: { numComponents: 3, data: [], drawType: gl.DYNAMIC_DRAW },
			normal: { numComponents: 3, data: [], drawType: gl.DYNAMIC_DRAW },
			texcoord: { numComponents: 2, data: [] },
			size: { numComponents: 1, data: [] },
			ratio: { numComponents: 1, data: [] },
		};

		for (var i = 0; i < array.length; ++i) {
			Array.prototype.push.apply(particles.texcoord.data, [ 0.5,0.5, 0.75,0, 1,1, 0.5,0.5, 0,1, 0.25,0 ]);

			for (var a = 0; a < 6; ++a) {
				Array.prototype.push.apply(particles.position.data, [ 0, 0, 0 ]);
				particles.size.data.push(array[i].size);
				particles.ratio.data.push(array[i].ratio);
				particles.normal.data.push(array[i].velocity);
			}
		}

		return particles;
	};
});
