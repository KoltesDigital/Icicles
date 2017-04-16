
function Particles (attributes)
{
	var array = attributes.position.array;
	var colors = attributes.color.array;
	this.geometry = new THREE.BufferGeometry();
	// var dimension = closestPowerOfTwo(Math.floor(array.length / 3));
	// var dimension = Math.sqrt(Math.floor(array.length / 3));
	var dimension = 512;
	var count = dimension*dimension;
	console.log(array.length);
	console.log(count);
	var vertices = new Float32Array(count * 3 * 3);
	var x, y, z;
	var triangleIndex = 0;
	var dataPosition = new Float32Array(count * 3 * 3);
	var dataColor = new Float32Array(count * 3 * 3);

	// Triangles
	for (var i = 0; i+8 < count; i+=9) {

		x = array[triangleIndex*3+0];
		y = array[triangleIndex*3+1];
		z = array[triangleIndex*3+2];

    // dataColor[i+0] = x;
    // dataColor[i+1] = y;
    // dataColor[i+2] = z;

		for (var tri = 0; tri < 3; ++tri) {
			var ia = i+tri*3;
			var ib = i+tri*3+1;
			var ic = i+tri*3+2;
			vertices[ia] = x;
			vertices[ib] = y;
			vertices[ic] = z;

	    dataPosition[ia] = x;
	    dataPosition[ib] = y;
	    dataPosition[ic] = z;
		}

		++triangleIndex;
	}

	this.dataTexture = new THREE.DataTexture( dataPosition, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	this.dataTexture.needsUpdate = true;

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
	// this.geometry.addAttribute( 'color', new THREE.BufferAttribute( dataColor, 3 ) );
	this.geometry.addAttribute( 'anchor', new THREE.BufferAttribute( anchor, 2 ) );
	this.geometry.addAttribute( 'texcoord', new THREE.BufferAttribute( texcoord, 2 ) );
	this.geometry.computeBoundingSphere();

	// this.setupColors = function (colors)
	// {

	// }
}