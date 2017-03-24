define(['gl', 'twgl', 'assets', 'engine/Camera', 'engine/Entity', 'engine/FrameBuffer', 'engine/uniforms', 'entities/createCube', 'entities/createGrid', 'geometries/createAxis', 'geometries/createCube', 'geometries/createFullScreenQuad', 'geometries/createGridParticles', 'geometries/createRoad', 'geometries/createLeavesFromPoints', 'utils/getTime', 'utils/input', 'utils/road', 'geometries/createMesh', 'geometries/createWiredMesh', 'entities/createBuilding', 'entities/createStreet'],
function (gl, twgl, assets, Camera, Entity, FrameBuffer, uniforms, createCubeEntity, createGridEntity, createAxisGeometry, createCubeGeometry, createFullScreenQuadGeometry, createGridParticlesGeometry, createRoad, createLeavesFromPoints, getTime, input, road, createMesh, createWiredMesh, createBuildingEntity, createStreet) {
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

		
		var axisEntity = new Entity(createAxisGeometry(), assets.shaders.Simple);
		var fullScreenQuadEntity = new Entity(createFullScreenQuadGeometry(), assets.shaders.MeshFullScreen);

		var bushEntity = new Entity(createGridParticlesGeometry(128), assets.shaders.ParticleBush);
		var groundEntity = new Entity(createGridParticlesGeometry(64), assets.shaders.ParticleGround);
		var roadEntity = new Entity(createRoad(road, 50, 50, 20), assets.shaders.MeshRoad);
		var carEntity = new Entity(createWiredMesh(assets.meshes.car), assets.shaders.LineBuilding);

		var cubeEntity = createCubeEntity();
		var building = createBuildingEntity();
		var streetEntity = createStreet();
		var voxelEntity = createGridEntity([8,8,8], 30);

		var sceneEntityArray = [streetEntity, roadEntity, carEntity];
		// var sceneEntityArray = [bushEntity, groundEntity, roadEntity, cubeEntity, streetEntity, voxelEntity];

		function render()
		{
			requestAnimationFrame(render);

			var time = getTime();
			uniforms.u_time = time;

			// logic
			input.mouse.update();
			camera.update(time);
			sceneEntityArray.forEach(function(entity) {
				entity.update(time);
			});

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

			sceneEntityArray.forEach(function(entity) {
				entity.draw();
			});

			FrameBuffer.recordStop();

			// post fx & GUI
			gl.disable(gl.DEPTH_TEST);
			fullScreenQuadEntity.draw();
			axisEntity.draw();
		}

		requestAnimationFrame(render);
	});
});
