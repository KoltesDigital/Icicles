
function Particles (attributes)
{
	var array = attributes.position.array;
	var colors = attributes.color.array;
	this.geometry = new THREE.BufferGeometry();
	var dimension = closestPowerOfTwo(Math.sqrt(array.length / 3));
	// var dimension = Math.floor(array.length / 3);
	// var dimension = 512;
	var count = array.length / 3;
	var resolution = dimension*dimension;
	var vertices = new Float32Array(count * 3 * 3);
	var x, y, z, ia, ib, ic;
	var dataPosition = new Float32Array(resolution * 3);
	var dataColor = new Float32Array(resolution * 3);

	var indexVertex = 0;

	// Triangles
	for (var triangleIndex = 0; triangleIndex < count; triangleIndex++) {

		// var indexRatio = triangleIndex / count
		ia = triangleIndex*3;
		ib = triangleIndex*3+1;
		ic = triangleIndex*3+2;

		x = array[ia];
		y = array[ib];
		z = array[ic];

    dataPosition[ia] = x;
    dataPosition[ib] = y;
    dataPosition[ic] = z;
    dataColor[ia] = colors[ia];
    dataColor[ib] = colors[ib];
    dataColor[ic] = colors[ic];

		for (var tri = 0; tri < 3; ++tri) {
			vertices[indexVertex] = x;
			vertices[indexVertex+1] = y;
			vertices[indexVertex+2] = z;
	    indexVertex += 3;
		}
	}

	this.spawnTexture = new THREE.DataTexture( dataPosition, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	this.spawnTexture.needsUpdate = true;
	this.colorTexture = new THREE.DataTexture( dataColor, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	this.colorTexture.needsUpdate = true;

	// UV
	var anchor = new Float32Array(count * 3 * 2);
	var texcoord = new Float32Array(count * 3 * 2);
	for (var i = 0; i < texcoord.length; i+=6) {

		var x = (i % dimension) / dimension;
		var y = Math.floor(i / dimension) / dimension;
		// Anchor A
		anchor[i] = 0;
		anchor[i+1] = 1;
		// Anchor B
		anchor[i+2] = -1;
		anchor[i+3] = -1;
		// Anchor C
		anchor[i+4] = 1;
		anchor[i+5] = -1;
		// ID A
		texcoord[i] = x;
		texcoord[i+1] = y;
		// ID B
		texcoord[i+2] = x;
		texcoord[i+3] = y;
		// ID C
		texcoord[i+4] = x;
		texcoord[i+5] = y;
	}

	this.geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	this.geometry.addAttribute( 'anchor', new THREE.BufferAttribute( anchor, 2 ) );
	this.geometry.addAttribute( 'texcoord', new THREE.BufferAttribute( texcoord, 2 ) );
	this.geometry.computeBoundingSphere();

	// this.setupColors = function (colors)
	// {

	// }
}