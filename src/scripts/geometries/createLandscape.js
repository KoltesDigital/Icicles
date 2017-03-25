define(['twgl', 'gl', 'gl-matrix', 'engine/Geometry'], function(twgl, gl, glMatrix, Geometry) {
	var vec3 = glMatrix.vec3;

	return function(road, count, interval, width) {
		var point = [];
		var matrix = twgl.m4.identity();
		var matrixOffset = twgl.m4.identity();

		var position = [];
		var normals = [];
		var texcoord = [];
		var color = [];
		var indices = [];

		var lines = 30;
		var range = 10;
		var index = 0;
		var current = vec3.create();
		var next = vec3.create();
		var nextNext = vec3.create();
		var normal = vec3.create();
		var forward = vec3.create();
		var rightAxis = vec3.create();
		var rightAxisNext = vec3.create();
		var offset = vec3.create();

		function getPosition (l)
		{
			vec3.multiply(offset, rightAxis, [range*l,range*l,range*l]);
			twgl.m4.translation(current, matrix);
			twgl.m4.translate(matrix, offset, matrix);
			return twgl.m4.getTranslation(matrix);
		}

		function addPoint (p)
		{
			Array.prototype.push.apply(position, p);
			Array.prototype.push.apply(normals, normal);
			texcoord.push( 0,0 );
			color.push( 1,1,1,1 );
		}

		road.getUprightMatrix(matrix, 0);
		addPoint(twgl.m4.getTranslation(matrix));
		index += 1;

		for (var i = 1; i < count-1; ++i) {

			road.getUprightMatrix(matrix, i * interval);
			current = twgl.m4.getTranslation(matrix);
			road.getUprightMatrix(matrix, (i+1) * interval);
			next = twgl.m4.getTranslation(matrix);

			forward = vec3.create();
			rightAxis = vec3.create();
			vec3.sub(forward, next, current);
			vec3.normalize(forward, forward);
			vec3.cross(rightAxis, forward, [0,1,0]);
			vec3.cross(normal, rightAxis, forward);

			addPoint(current);
			indices.push(index-1, index);
			index += 1;
		}

		return new Geometry({
			position: { numComponents: 3, data: position },
			color: { numComponents: 4, data: color },
			normal: { numComponents: 3, data: normals },
			texcoord: { numComponents: 2, data: texcoord },
			indices: indices,
		}, gl.LINES);
	};
});
