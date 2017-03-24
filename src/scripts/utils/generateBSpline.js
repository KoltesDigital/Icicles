define(['gl-matrix', 'utils/BezierCurves'], function(glMatrix, BezierCurves) {
	'use strict';

	var vec3 = glMatrix.vec3;

	return function(points) {
		var curves = new BezierCurves();
		var p0 = points[0];
		var p1 = vec3.create();
		vec3.lerp(p1, p0, points[1], 1 / 3);
		var p2, p3, nextp1;

		for (var i = 1, n = points.length - 1; i < n; ++i) {
			p2 = vec3.create();
			vec3.lerp(p2, points[i-1], points[i], 2 / 3);

			nextp1 = vec3.create();
			vec3.lerp(nextp1, points[i], points[i+1], 1 / 3);

			p3 = vec3.create();
			vec3.lerp(p3, p2, nextp1, 0.5);

			curves.add(p0, p1, p2, p3);

			p0 = p3;
			p1 = nextp1;
		}

		p2 = vec3.create();
		vec3.lerp(p2, points[i-1], points[i], 2 / 3);

		p3 = points[i];

		curves.add(p0, p1, p2, p3);

		return curves;
	};
});
