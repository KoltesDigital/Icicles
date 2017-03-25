define(['gl', 'twgl', 'assets', 'engine/Camera', 'engine/Entity', 'engine/FrameBuffer', 'engine/uniforms', 'entities/createCube', 'entities/createGrid', 'geometries/createAxis', 'geometries/createCube', 'geometries/createFullScreenQuad', 'geometries/createGridParticles', 'geometries/createRoad', 'geometries/createLeavesFromPoints', 'utils/generatedInfo', 'utils/getTime', 'utils/input', 'utils/road', 'geometries/createMesh', 'geometries/createWiredMesh', 'entities/createBuilding', 'entities/createStreet', 'geometries/createLandscape', 'geometries/createLineMesh'],
function (gl, twgl, assets, Camera, Entity, FrameBuffer, uniforms, createCubeEntity, createGridEntity, createAxisGeometry, createCubeGeometry, createFullScreenQuadGeometry, createGridParticlesGeometry, createRoad, createLeavesFromPoints, generatedInfo, getTime, input, road, createMesh, createWiredMesh, createBuildingEntity, createStreet, createLandscape, createLineMesh) {
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
		//var roadEntity = new Entity(createRoad(road, 500, 50, 20), assets.shaders.MeshRoad);
		//glMatrix.mat4.translate(roadEntity.matrix, roadEntity.matrix, [0, 0, -1000]);
		// var carEntity = new Entity(createWiredMesh(assets.meshes.car), assets.shaders.LineBuilding);
		var landsacpeEntity = new Entity(createLandscape(road, 100, 100, 1), assets.shaders.MeshBuilding);
		var carEntity = new Entity(createLineMesh(assets.meshes.car2), assets.shaders.LineBuilding);

		var cubeEntity = createCubeEntity();
		var building = createBuildingEntity();
		var streetEntity = createStreet();
		var voxelEntity = createGridEntity([8,8,8], 30);

		var sceneEntityArray = [streetEntity, carEntity, landsacpeEntity];
		// var sceneEntityArray = [bushEntity, groundEntity, roadEntity, cubeEntity, streetEntity, voxelEntity];

		var followMatrix = twgl.m4.identity();

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

			var distance = generatedInfo.getDistance(time);
			road.getTiltedMatrix(carEntity.matrix, distance);

			camera.matrix = twgl.m4.identity();
			road.getTiltedMatrix(camera.matrix, distance);
			twgl.m4.multiply(camera.matrix, twgl.m4.rotationY(Math.PI), camera.matrix);
			twgl.m4.multiply(camera.matrix, twgl.m4.translation([-4,22.7,5.6]), camera.matrix);
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
