define(['THREE', 'engine/renderer', 'utils/assets', 'engine/uniforms', 'utils/voxelize', 'libs/OrbitControls', 'engine/framebuffer', 'engine/particles', 'engine/pass', 'utils/getTime'],
	function (THREE, renderer, assets, uniforms, voxelize, OrbitControls, FrameBuffer, Particles, Pass, getTime) {
	"use strict";

	var camera, scene, controls;
	var sceneBuffer, frameBufferScene;
	var feedbackPass, raymarchingPass;
	var zebraParticles, duckParticles;

	assets.load(function() {

		init();
		animate();
		var vectorRight, vectorUp;

		function init() {

			camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.001, 3500 );
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
			zebraParticles.mesh.position.x = -1;
			sceneBuffer.add(zebraParticles.mesh);

			var duck = assets.geometries.duck.children[0].geometry;
			duckParticles = new Particles(voxelize(duck, assets.textures.duck, 100.));
			duckParticles.mesh.position.x = 1;
			sceneBuffer.add(duckParticles.mesh);

			uniforms.sceneTexture.value = frameBufferScene.getTexture();

			feedbackPass = new Pass(assets.shaders['feedback.frag'], uniforms);
			raymarchingPass = new Pass(assets.shaders['raymarching.frag'], uniforms);
		}

		function animate ()
		{
			requestAnimationFrame( animate );
			controls.update();

			var time = getTime();
			uniforms.time.value = time;
			uniforms.eye.value = camera.position;
			uniforms.front.value = camera.getWorldDirection().normalize();
			uniforms.right.value = vectorRight.set(1,0,0).applyMatrix4( camera.matrixWorld ).sub( camera.position ).normalize();
			uniforms.up.value = vectorUp.set(0,1,0).applyMatrix4( camera.matrixWorld ).sub( camera.position ).normalize();
			uniforms.feedbackTexture.value = feedbackPass.update();
			// uniforms.raymarchingTexture.value = raymarchingPass.update();
			zebraParticles.update();
			duckParticles.update();
			render();
		}

		function render () {
			renderer.render( sceneBuffer, camera, frameBufferScene.getTarget(), true );
			renderer.render( scene, camera );
		}
	});
});