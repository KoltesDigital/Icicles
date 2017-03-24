define(['gl', 'twgl', 'assets', 'engine/Camera', 'engine/Entity', 'engine/FrameBuffer', 'engine/uniforms', 'entities/createCube', 'entities/createGrid', 'geometries/createAxis', 'geometries/createCube', 'geometries/createFullScreenQuad', 'geometries/createGridParticles', 'geometries/createRoad', 'geometries/createLeavesFromPoints', 'utils/getTime', 'utils/input', 'utils/road', 'geometries/createMesh'],
function (gl, twgl, assets, Camera, Entity, FrameBuffer, uniforms, createCubeEntity, createGridEntity, createAxisGeometry, createCubeGeometry, createFullScreenQuadGeometry, createGridParticlesGeometry, createRoad, createLeavesFromPoints, getTime, input, road, createMesh) {
	"use strict";

	return assets.load(function() {
		var camera = new Camera();

		function onWindowResize() {
			twgl.resizeCanvasToDisplaySize(gl.canvas);
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

			uniforms.u_resolution = [gl.canvas.width, gl.canvas.height];

			camera.updateProjectionMatrix();
		}
		onWindowResize();
		window.addEventListener('resize', onWindowResize);

		var frameBuffer = new FrameBuffer();
		uniforms.u_frameBuffer = frameBuffer.getTexture();

		var axisGeometry = createAxisGeometry();
		var cubeGeometry = createCubeGeometry();
		var fullScreenQuadGeometry = createFullScreenQuadGeometry();

		var axisEntity = new Entity(axisGeometry, assets.shaders.Simple);
		var skyCubeEntity = new Entity(cubeGeometry, assets.shaders.MeshSkyCube);
		var fullScreenQuadEntity = new Entity(fullScreenQuadGeometry, assets.shaders.MeshFullScreen);
		var bushEntity = new Entity(createGridParticlesGeometry(128), assets.shaders.ParticleBush);
		var groundEntity = new Entity(createGridParticlesGeometry(64), assets.shaders.ParticleGround);
		var roadEntity = new Entity(createRoad(road, 50, 50, 20), assets.shaders.MeshRoad);
		var meshEntity = new Entity(createMesh(assets.meshes.building1), assets.shaders.MeshLit);

		var cubeEntity = createCubeEntity();
		var voxelEntity = createGridEntity([8,8,8], 30);

		function render()
		{
			requestAnimationFrame(render);

			var time = getTime();
			uniforms.u_time = time;

			// logic
			input.mouse.update();

			cubeEntity.update(time);
			voxelEntity.update(time);
			camera.update(time);

/*
			var point = vec2.create();
			var angle = road.getPointAndAngle(point, time * 10);
			var q = quat.create();
			quat.setAxisAngle(q, [0, 1, 0], angle);
			mat4.fromRotationTranslation(entityAxis.matrix, q, [point[0], 0, point[1]]);
*/
			// draw

			frameBuffer.recordStart();

			gl.enable(gl.DEPTH_TEST);
			gl.disable(gl.CULL_FACE);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.clearColor(0,0,0,1);

			cubeEntity.draw();
			roadEntity.draw();
			bushEntity.draw();
			meshEntity.draw();
			groundEntity.draw();
			voxelEntity.draw();

			FrameBuffer.recordStop();
			gl.disable(gl.DEPTH_TEST);

			// post fx
			fullScreenQuadEntity.draw();

			// ui
			axisEntity.draw();
		}

		requestAnimationFrame(render);
	});
});
