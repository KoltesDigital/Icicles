define(['gl', 'gl-matrix', 'engine/Geometry'], function(gl, glMatrix, Geometry) {
	var vec2 = glMatrix.vec2;

	return function(road, count, interval, width) {
		var point = vec2.create();

		var position = [];
		var texcoord = [];
		var color = [];
		var indices = [];

		for (var i = 0; i <= count; ++i) {
			var unit = i * interval;
			var angle = road.getPointAndAngle(point, unit);

			position.push(
				point[0] + Math.cos(angle) * width,
				0,
				point[1] - Math.sin(angle) * width,
				point[0] - Math.cos(angle) * width,
				0,
				point[1] + Math.sin(angle) * width
			);

			texcoord.push(
				-1, i,
				1, i
			);

			color.push(
				1, 1, 1, 1,
				1, 1, 1, 1
			);

			indices.push(i * 2, i * 2 + 1);
		}

		return new Geometry({
			position: { numComponents: 3, data: position },
			texcoord: { numComponents: 2, data: texcoord },
			color: { numComponents: 4, data: color },
			indices: indices,
		}, gl.TRIANGLE_STRIP);
	};
});
