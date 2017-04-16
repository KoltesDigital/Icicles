
function Particles (attributes)
{
	var array = attributes.position.array;
	var colors = attributes.color.array;
	var normalArray = attributes.normal.array;
	var dimension = closestPowerOfTwo(Math.sqrt(array.length / 3));
	this.dimension = dimension;
	var count = array.length / 3;
	var resolution = dimension*dimension;
	var x, y, z, ia, ib, ic, u, v, nx, ny, nz;
	var indexVertex = 0;
	var indexUV = 0;
	var indexAnchor = 0;
	// attributes
	var vertices = new Float32Array(count * 3 * 3);
	var normals = new Float32Array(count * 3 * 3);
	var anchor = new Float32Array(count * 3 * 2);
	var texcoord = new Float32Array(count * 3 * 2);
	// data texture
	var dataPosition = new Float32Array(resolution * 3);
	var dataColor = new Float32Array(resolution * 3);
	var dataNormal = new Float32Array(resolution * 3);

	// triangles
	for (var triangleIndex = 0; triangleIndex < count; triangleIndex++) {

		// var indexRatio = triangleIndex / count
		ia = triangleIndex*3;
		ib = triangleIndex*3+1;
		ic = triangleIndex*3+2;

		u = (triangleIndex % dimension) / dimension;
		v = Math.floor(triangleIndex / dimension) / dimension;

		x = array[ia];
		y = array[ib];
		z = array[ic];

		nx = normalArray[ia];
		ny = normalArray[ib];
		nz = normalArray[ic];

    dataPosition[ia] = x;
    dataPosition[ib] = y;
    dataPosition[ic] = z;
    dataColor[ia] = colors[ia];
    dataColor[ib] = colors[ib];
    dataColor[ic] = colors[ic];
    dataNormal[ia] = nx;
    dataNormal[ib] = ny;
    dataNormal[ic] = nz;

		for (var tri = 0; tri < 3; ++tri) {
			vertices[indexVertex] = x;
			vertices[indexVertex+1] = y;
			vertices[indexVertex+2] = z;
			normals[indexVertex] = nx;
			normals[indexVertex+1] = ny;
			normals[indexVertex+2] = nz;
	    indexVertex += 3;

			texcoord[indexUV] = u;
			texcoord[indexUV+1] = v;
	    indexUV += 2;
	  }

		anchor[indexAnchor] = 0;
		anchor[indexAnchor+1] = 1;
		anchor[indexAnchor+2] = -1;
		anchor[indexAnchor+3] = -1;
		anchor[indexAnchor+4] = 1;
		anchor[indexAnchor+5] = -1;
		indexAnchor += 6;
	}

	this.spawnTexture = new THREE.DataTexture(dataPosition, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	this.colorTexture = new THREE.DataTexture(dataColor, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	this.normalTexture = new THREE.DataTexture(dataNormal, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
	this.spawnTexture.needsUpdate = true;
	this.colorTexture.needsUpdate = true;
	this.normalTexture.needsUpdate = true;

	this.geometry = new THREE.BufferGeometry();
	this.geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	this.geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
	this.geometry.addAttribute( 'anchor', new THREE.BufferAttribute( anchor, 2 ) );
	this.geometry.addAttribute( 'texcoord', new THREE.BufferAttribute( texcoord, 2 ) );
	this.geometry.computeBoundingSphere();
}