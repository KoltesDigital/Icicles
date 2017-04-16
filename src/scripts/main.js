
var container, camera, scene, renderer, uniforms;
var sceneBuffer, frameBufferScene;
var feedbackPass, raymarchingPass;
var zebraParticles, duckParticles;

assets.load(function() {

	init();
	animate();
	var vectorRight, vectorUp;

	function init() {
		uniforms = {
			time: { value: 1.0 },
			frameBuffer: { value: 0 },
			positionTexture: { value: 0 },
			velocityTexture: { value: 0 },
			feedbackTexture: { value: 0 },
			sceneTexture: { value: 0 },
			colorTexture: { value: 0 },
			normalTexture: { value: 0 },
			spawnTexture: { value: 0 },
			raymarchingTexture: { value: 0 },
			panoramaTexture: { value: assets.textures.panorama },
			meshTexture: { value: assets.textures.male },
			resolution: { value: new THREE.Vector2() },
			eye: { value: 0 },
			front: { value: 0 },
			right: { value: 0 },
			up: { value: 0 }
		};

		container = document.getElementById( 'container' );
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		if ( ! renderer.extensions.get( "OES_texture_float" ) ) {
			return "No OES_texture_float support for float textures.";
		}
		container.appendChild( renderer.domElement );
		onWindowResize();
		window.addEventListener( 'resize', onWindowResize, false );

		camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.001, 3500 );
		camera.position.z = 2;
		camera.position.y = 1;
		scene = new THREE.Scene();

		vectorRight = new THREE.Vector3( 1, 0, 0 );
		vectorUp = new THREE.Vector3( 0, 1, 0 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.rotateSpeed = 0.5;

		// render
		scene.add(new THREE.Mesh(new THREE.PlaneBufferGeometry( 2, 2 ), new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: assets.shaders['fullscreen.vert'],
			fragmentShader: assets.shaders['render.frag']
		})));

		sceneBuffer = new THREE.Scene();
		frameBufferScene = new FrameBuffer();

		// particles
		// particles = new Particles(assets.geometries["cookie"].attributes);
		var zebra = assets.geometries.zebra.children[0].geometry;
		zebraParticles = new Particles(voxelize(zebra, assets.textures.zebra, 100.));
		sceneBuffer.add(zebraParticles.mesh);

		// var duck = assets.geometries.duck.children[0].geometry;
		// duckParticles = new Particles(voxelize(duck,100.), assets.textures.duck);
		// duckParticles.mesh.position.x = 4;
		// sceneBuffer.add(duckParticles.mesh);

		uniforms.sceneTexture.value = frameBufferScene.getTexture();

		feedbackPass = new Pass(assets.shaders['feedback.frag']);
		raymarchingPass = new Pass(assets.shaders['raymarching.frag']);
	}

	function onWindowResize( event ) {
		renderer.setSize( window.innerWidth, window.innerHeight );
		uniforms.resolution.value.x = renderer.domElement.width;
		uniforms.resolution.value.y = renderer.domElement.height;
	}

	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		uniforms.time.value += 0.05;
		uniforms.eye.value = camera.position;
		uniforms.front.value = camera.getWorldDirection().normalize();
		uniforms.right.value = vectorRight.set(1,0,0).applyMatrix4( camera.matrixWorld ).sub( camera.position ).normalize();
		uniforms.up.value = vectorUp.set(0,1,0).applyMatrix4( camera.matrixWorld ).sub( camera.position ).normalize();
		render();
	}

	function render () {
		// uniforms.raymarchingTexture.value = raymarchingPass.update();
		renderer.render( sceneBuffer, camera, frameBufferScene.getTarget(), true );
		zebraParticles.update();
		// duckParticles.update();

		uniforms.feedbackTexture.value = this.feedbackPass.update();
		renderer.render( scene, camera );
	}
});