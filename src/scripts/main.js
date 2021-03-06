define(['THREE', 'engine/renderer', 'utils/assets', 'engine/uniforms', 'utils/voxelize', 'libs/OrbitControls', 'engine/framebuffer', 'particles/particlesadvanced', 'particles/particlessimple', 'engine/pass', 'utils/getTime', 'utils/blender', 'dat-gui', 'engine/parameters', 'utils/socket', 'engine/materials'],
	function (THREE, renderer, assets, uniforms, voxelize, OrbitControls, FrameBuffer, ParticlesAdvanced, ParticlesSimple, Pass, getTime, blender, gui, parameters, Socket, materials) {
	"use strict";

	var camera, scene, controls;
	var sceneBuffer, frameBufferScene;
	var feedbackPass, raymarchingPass;
	var zebraParticles, duckParticles, watermelonParticles, Simon1Particles;
	var LesCopainsParticles;

	assets.load(function() {

		init();
		animate();
		var vectorRight, vectorUp;

		function init() {
			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.001, 1000 );
			renderer.resizeCallbacks.push(function (width, height) {
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
			})
			// camera.matrixAutoUpdate = false;
			camera.position.z = 2;
			camera.position.y = 1;
			scene = new THREE.Scene();
			materials.setup();

			vectorRight = new THREE.Vector3( 1, 0, 0 );
			vectorUp = new THREE.Vector3( 0, 1, 0 );

			controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.rotateSpeed = 0.5;

			// render
			scene.add(new THREE.Mesh(new THREE.PlaneBufferGeometry( 2, 2 ), materials.render));

			sceneBuffer = new THREE.Scene();
			frameBufferScene = new FrameBuffer();

			// particles
			// particles = new Particles(assets.geometries["cookie"].attributes);
			// var zebra = assets.geometries.zebra.children[0].geometry;
			// zebraParticles = new ParticlesAdvanced(voxelize(zebra, 100., 512, assets.textures.zebra));
			// zebraParticles.mesh.position.x = -1;
			// sceneBuffer.add(zebraParticles.mesh);

			// var duck = assets.geometries.duck.children[0].geometry;
			// duckParticles = new ParticlesAdvanced(voxelize(duck, 100., 512, assets.textures.duck));
			// duckParticles.mesh.position.x = 1;
			// sceneBuffer.add(duckParticles.mesh);

			// var LesCopains = assets.geometries.LesCopains.children[0].geometry;
			// LesCopainsParticles = new ParticlesAdvanced(voxelize(LesCopains, 10., 64, assets.textures.LesCopainsSD));
			// LesCopainsParticles.mesh.frustumCulled = false;
			// sceneBuffer.add(assets.geometries.LesCopains);

			var watermelon = assets.geometries.watermelon.children[0].geometry;
			watermelonParticles = new ParticlesAdvanced(voxelize(watermelon, 100., 256, assets.textures.watermelon));
			sceneBuffer.add(watermelonParticles.mesh);

			// var Simon1 = assets.geometries.Simon1;
			// Simon1Particles = new ParticlesAdvanced(Simon1.attributes);
			// Simon1Particles.mesh.frustumCulled = false;
			// sceneBuffer.add(Simon1Particles.mesh);

			uniforms.sceneTexture.value = frameBufferScene.getTexture();

			feedbackPass = new Pass(materials.feedback);
			// materials.feedback.uniforms = uniforms;
			// raymarchingPass = new Pass(materials.raymarching);
		}

		function animate ()
		{
			requestAnimationFrame( animate );
			controls.update();
			


			uniforms.feedbackBlend.value = parameters.feedbackBlend;

			var time = getTime();
			uniforms.time.value = time;
			uniforms.eye.value = camera.position;
			uniforms.front.value = camera.getWorldDirection().normalize();
			uniforms.right.value = vectorRight.set(1,0,0).applyMatrix4( camera.matrixWorld ).sub( camera.position ).normalize();
			uniforms.up.value = vectorUp.set(0,1,0).applyMatrix4( camera.matrixWorld ).sub( camera.position ).normalize();
			uniforms.feedbackTexture.value = feedbackPass.update();
			// uniforms.raymarchingTexture.value = raymarchingPass.update();
			// Simon1Particles.update();
			watermelonParticles.update();
			// blender.evaluate(camera.matrix, "CameraAction", time);
			camera.updateMatrixWorld(true);

			render();
		}

		function render () {
			renderer.render( sceneBuffer, camera, frameBufferScene.getTarget(), true );
			renderer.render( scene, camera );
		}
	});
});