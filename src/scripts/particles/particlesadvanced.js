define(['THREE', 'particles/particles', 'utils/utils', 'utils/assets', 'engine/pass'],
function (THREE, Particles, utils, assets, Pass) {
	var closestPowerOfTwo = utils.closestPowerOfTwo;
	function ParticlesAdvanced (attributes)
	{
		Particles.call(this, attributes);

		var array = attributes.position.array;
		var colors = attributes.color.array;
		var normalArray = attributes.normal.array;
		var dimension = closestPowerOfTwo(Math.sqrt(array.length / 3));
		var count = array.length / 3;
		var resolution = dimension*dimension;
		var x, y, z, ia, ib, ic, u, v, nx, ny, nz;
		var indexVertex = 0;
		var indexUV = 0;
		var indexAnchor = 0;

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
		}

		this.spawnTexture = new THREE.DataTexture(dataPosition, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
		this.colorTexture = new THREE.DataTexture(dataColor, dimension, dimension, THREE.RGBFormat, THREE.FloatType);
		this.normalTexture = new THREE.DataTexture(dataNormal, dimension, dimension, THREE.RGBFormat, THREE.FloatType);

		this.spawnTexture.needsUpdate = true;
		this.colorTexture.needsUpdate = true;
		this.normalTexture.needsUpdate = true;

		this.uniforms = {
			time: { value: 1.0 },
			positionTexture: { value: 0 },
			velocityTexture: { value: 0 },
			feedbackTexture: { value: 0 },
			frameBuffer: { value: 0 },
			sceneTexture: { value: 0 },
			colorTexture: { value: 0 },
			normalTexture: { value: 0 },
			spawnTexture: { value: 0 },
			raymarchingTexture: { value: 0 },
			matrix: { value: 0 },
			pivot: { value: 0 },
			panoramaTexture: { value: assets.textures.panorama }
		};

		this.positionPass = new Pass(assets.shaders['position.frag'], this.uniforms, dimension, dimension, THREE.RGBAFormat, THREE.FloatType);
		this.velocityPass = new Pass(assets.shaders['velocity.frag'], this.uniforms, dimension, dimension, THREE.RGBAFormat, THREE.FloatType);

		this.mesh = new THREE.Mesh(this.geometry, new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			vertexShader: assets.shaders["particle.vert"],
			fragmentShader: assets.shaders["particle.frag"],
			side: THREE.DoubleSide
		}));

		this.update = function ()
		{
			this.uniforms.time.value += 0.05;
			this.uniforms.matrix.value = this.mesh.matrixWorld;
			this.uniforms.pivot.value = this.mesh.position;
			this.uniforms.spawnTexture.value = this.spawnTexture;
			this.uniforms.colorTexture.value = this.colorTexture;
			this.uniforms.normalTexture.value = this.normalTexture;
			this.uniforms.velocityTexture.value = this.velocityPass.update();
			this.uniforms.positionTexture.value = this.positionPass.update();
		}
	}

	ParticlesAdvanced.prototype = Object.create(Particles.prototype);
	ParticlesAdvanced.prototype.constructor = ParticlesAdvanced;

	return ParticlesAdvanced;
});