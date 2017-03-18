define(['gl', 'engine/Geometry'], function(gl, Geometry) {
	return function(s) {
		s = s || 1;
		return new Geometry({
			position: { numComponents: 3, data: [ 0,0,0, s,0,0, 0,0,0, 0,s,0, 0,0,0, 0,0,s ] },
			color: { numComponents: 4, data: [ 1,0,0,1, 1,0,0,1, 0,1,0,1, 0,1,0,1, 0,0,1,1, 0,0,1,1 ] },
			indices: [ 0,1, 2,3, 4,5 ],
		}, gl.LINES);
	};
});
