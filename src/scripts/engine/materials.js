define(['THREE', 'utils/assets', 'engine/uniforms'], function(THREE, assets, uniforms) {
	var materials = {};

	materials.setup = function () {

		materials.render = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: assets.shaders['fullscreen.vert'],
			fragmentShader: assets.shaders['render.frag']
		})

		materials.feedback = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: assets.shaders['fullscreen.vert'],
			fragmentShader: assets.shaders['feedback.frag']
		});

		materials.raymarching = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: assets.shaders['fullscreen.vert'],
			fragmentShader: assets.shaders['raymarching.frag']
		});

		materials.particlesAdvanced = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: assets.shaders["particle.vert"],
			fragmentShader: assets.shaders["particle.frag"],
			side: THREE.DoubleSide
		});

		materials.particlesPosition = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: assets.shaders["fullscreen.vert"],
			fragmentShader: assets.shaders['position.frag']
		});

		materials.particlesVelocity = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: assets.shaders["fullscreen.vert"],
			fragmentShader: assets.shaders['velocity.frag']
		});
	}

	return materials;
})