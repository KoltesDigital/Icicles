define(['THREE', 'particles/particles'], function (THREE, Particles) {
	function ParticlesSimple (attributes)
	{
		Particles.call(this, attributes);

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

		this.mesh = new THREE.Mesh(this.geometry, new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			vertexShader: assets.shaders["particle.vert"],
			fragmentShader: assets.shaders["particle.frag"],
			side: THREE.DoubleSide
		}));

		this.update = function ()
		{

		};
	}

	ParticlesSimple.prototype = Object.create(Particles.prototype);
	ParticlesSimple.prototype.constructor = ParticlesSimple;

	return ParticlesSimple;
});
