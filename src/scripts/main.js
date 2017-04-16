
var container, stats;
var camera, scene, sceneBuffer, renderer;
var uniforms, positionPass, velocityPass, particles, feedbackPass;

assets.load(function() {

	init();
	animate();

	function init() {

		container = document.getElementById( 'container' );
		camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3500 );
		camera.position.z = 10;
		scene = new THREE.Scene();

		uniforms = {
			time: { value: 1.0 },
			frameBuffer: { value: 0 },
			positionTexture: { value: 0 },
			velocityTexture: { value: 0 },
			feedbackTexture: { value: 0 },
			spawnTexture: { value: 0 },
			resolution: { value: new THREE.Vector2() }
		};

		var dimension = 128;

		positionPass = new Pass(assets.shaders['position.frag'], dimension, dimension, THREE.RGBAFormat, THREE.FloatType);
		velocityPass = new Pass(assets.shaders['velocity.frag'], dimension, dimension, THREE.RGBAFormat, THREE.FloatType);
		feedbackPass = new Pass(assets.shaders['feedback.frag']);

		// render
		// scene.add(new THREE.Mesh(new THREE.PlaneBufferGeometry( 2, 2 ), new THREE.ShaderMaterial( {
		// 	uniforms: uniforms,
		// 	vertexShader: assets.shaders['fullscreen.vert'],
		// 	fragmentShader: assets.shaders['render.frag']
		// })));

		// particles
		// scene.add(new THREE.Mesh( particles.geometry, new THREE.ShaderMaterial( {
		// 	uniforms: uniforms,
		// 	vertexShader: assets.shaders["particle.vert"],
		// 	fragmentShader: assets.shaders["particle.frag"],
		// 	side: THREE.DoubleSide
		// })));
		particles = new Particles(assets.geometries["cookie"].attributes);
		uniforms.spawnTexture.value = particles.dataTexture;
		scene.add(new THREE.Mesh(particles.geometry, new THREE.ShaderMaterial( {
				uniforms: uniforms,
				vertexShader: assets.shaders["particle.vert"],
				fragmentShader: assets.shaders["particle.frag"],
				side: THREE.DoubleSide
			})));

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		if ( ! renderer.extensions.get( "OES_texture_float" ) ) {
			return "No OES_texture_float support for float textures.";
		}
		container.appendChild( renderer.domElement );
		onWindowResize();
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function onWindowResize( event ) {
		renderer.setSize( window.innerWidth, window.innerHeight );
		uniforms.resolution.value.x = renderer.domElement.width;
		uniforms.resolution.value.y = renderer.domElement.height;
	}
	function animate() {
		requestAnimationFrame( animate );
		uniforms.time.value += 0.05;
		uniforms.velocityTexture.value = velocityPass.update();
		uniforms.positionTexture.value = positionPass.update();
		uniforms.feedbackTexture.value = feedbackPass.update();
		renderer.render(scene, camera);
	}
});