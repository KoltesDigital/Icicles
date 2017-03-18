define(['gl', 'engine/Geometry'], function(gl, Geometry) {
	return function() {
		return new Geometry({
			texCoord: [ 0, 0, 1, 0, 0, 1, 1, 1 ],
			indices: [ 0, 1, 2, 3 ]
		}, gl.TRIANGLE_STRIP);
	};
});
