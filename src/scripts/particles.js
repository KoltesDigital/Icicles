
function Particles (attributes)
{
	var array = attributes.position.array;
	var colors = attributes.color.array;
	this.geometry = new THREE.BufferGeometry();
	var dimension = closestPowerOfTwo(array.length / 3);
	var count = dimension*dimension;
	var vertices = new Float32Array(count * 3 * 3);
	var x, y, z;
	var range = 1.;
	var triangleIndex = 0;
	var dataPosition = new Float32Array(count * 3);
	var dataColor = new Float32Array(count * 3);

	this.positionFrame = new FrameBuffer(dimension, dimension, THREE.RGBAFormat, THREE.FloatType);

	// Triangles
	for (var i = 0; i+8 < count; i+=9) {

		x = array[triangleIndex*3+0];
		y = array[triangleIndex*3+1];
		z = array[triangleIndex*3+2];

    dataPosition[triangleIndex*3+0] = x;
    dataPosition[triangleIndex*3+1] = y;
    dataPosition[triangleIndex*3+2] = z;

    // dataColor[i+0] = x;
    // dataColor[i+1] = y;
    // dataColor[i+2] = z;

		for (var tri = 0; tri < 3; ++tri) {
			vertices[i+tri*3] = x;
			vertices[i+tri*3+1] = y;
			vertices[i+tri*3+2] = z;
		}

		++triangleIndex;
	}

	var size = dimension * dimension;
	var data = new Float32Array( size * 3 );
	for (var i = 0; i < data.length; i+=3) {
	    data[ i ]     = vertices[i*3];
	    data[ i + 1 ] = vertices[i*3+1];
	    data[ i + 2 ] = vertices[i*3+2];
	}

	this.dataTexture = new THREE.DataTexture( data, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	// this.dataTexture = new THREE.DataTexture( dataPosition, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	// this.dataTexture.needsUpdate = true;

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
	this.geometry.addAttribute( 'color', new THREE.BufferAttribute( dataColor, 3 ) );
	this.geometry.addAttribute( 'anchor', new THREE.BufferAttribute( anchor, 2 ) );
	this.geometry.addAttribute( 'texcoord', new THREE.BufferAttribute( texcoord, 2 ) );
	this.geometry.computeBoundingSphere();

	// this.setupColors = function (colors)
	// {

	// }
}