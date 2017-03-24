define(['gl', 'engine/Geometry'], function(gl, Geometry) {
	return function(s) {
		s = s || 1;
		return new Geometry({
			position: [ -s,-s,-s, s,-s,-s, s,s,-s, -s,s,-s, -s,-s,s, s,-s,s, s,s,s, -s,s,s ],
			texcoord: [ 0,0, 1,0, 0,1, 1,1 ],
			color: [ 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1 ],
			indices: [ 0,1, 1,2, 2,3, 3,0, 0,4, 1,5, 2,6, 3,7, 4,5, 5,6, 6,7, 7,4 ],
		}, gl.LINES);
	};
});
