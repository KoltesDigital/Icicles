
function Particles (uniforms)
{
	this.geometry = new THREE.BufferGeometry();
	var dimension = 64;
	var count = dimension*dimension;
	var vertices = new Float32Array(count * 3 * 3);
	var texcoord = new Float32Array(count * 3 * 2);
	var x, y, z;
	var range = 1.;
	var triangleIndex = 0;

	this.positionFrame = new FrameBuffer(dimension, dimension, THREE.RGBAFormat, THREE.FloatType);

	// Triangles
	for (var i = 0; i < vertices.length; i+=9) {

		x = (triangleIndex % dimension) / dimension;
		y = (Math.floor(triangleIndex / dimension) % dimension) / dimension;
		z = Math.floor(triangleIndex / (dimension*dimension)) / dimension;

		// A
		vertices[i+0] = x;
		vertices[i+1] = y;
		vertices[i+2] = z;

		// B
		vertices[i+3] = x;
		vertices[i+4] = y;
		vertices[i+5] = z;

		// C
		vertices[i+6] = x;
		vertices[i+7] = y;
		vertices[i+8] = z;

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
	this.dataTexture.needsUpdate = true;

	// UV
	for (var i = 0; i < texcoord.length; i+=6) {

		var x = (i % dimension) / dimension;
		var y = Math.floor(i / dimension) / dimension;
		// A
		texcoord[i] = 0;
		texcoord[i+1] = 1;
		// B
		texcoord[i+2] = -1;
		texcoord[i+3] = -1;
		// C
		texcoord[i+4] = 1;
		texcoord[i+5] = -1;
	}

	this.geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	this.geometry.addAttribute( 'texcoord', new THREE.BufferAttribute( texcoord, 2 ) );
	this.geometry.computeBoundingSphere();

	this.mesh = new THREE.Mesh( this.geometry, new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertexShaderParticle' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShaderParticle' ).textContent,
		side: THREE.DoubleSide
	}));
}