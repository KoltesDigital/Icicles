
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"), { premultipliedAlpha: false, alpha: true });
var shaderMeshSkyCube, shaderMeshScreen, shaderSimple;
var shaderParticleBush, shaderParticleGround, shaderMeshLandscape;
var meshSkyCube, meshLandscape, meshScreen, meshAxis, meshRoad;
var entityCube, entityAxis, blender;
var particleBush, particleGround;
var scene, frame;
var ready = false;
var road = new Road({
	seed: 0,
	pointCount: 100,
	spawnZMin: 500,
	spawnZMax: 1000,
	getSpawnRange: function(time) {
		return 100;
	},
	divisonCount: 10000,
	divisonsPerSpaceUnit: 1,
	divisonOffset: 10,
	sincNeighbors: 3,
	bisectionEpsilon: 0.001,
});
var blenderWS = new BlenderWebSocket();
blenderWS.addListener("refresh", function() {
	location.reload();
});

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

function start ()
{
	meshSkyCube = twgl.createBufferInfoFromArrays(gl, createCube());
	meshScreen = twgl.createBufferInfoFromArrays(gl, createPlane());
	meshAxis = twgl.createBufferInfoFromArrays(gl, createAxis());
	meshLandscape = twgl.createBufferInfoFromArrays(gl, createGrid(10,0.1));
	meshRoad = twgl.createBufferInfoFromArrays(gl, createRoad(road, 50, 50, 20));
	particleBush = twgl.createBufferInfoFromArrays(gl, createGridParticles(128));
	particleGround = twgl.createBufferInfoFromArrays(gl, createGridParticles(64));

	shaderSimple = new Shader("Simple");
	shaderMeshSkyCube = new Shader("MeshSkyCube");
	shaderMeshScreen = new Shader("MeshScreen");
	shaderMeshLandscape = new Shader("MeshLandscape");
	shaderParticleBush = new Shader("ParticleBush");
	shaderParticleGround = new Shader("ParticleGround");

	blenderWS.addListener("time", BlenderDidUpdate);

	entityCube = new Entity(createCube(), new Shader("MeshLit"));
	entityAxis = new Entity(createAxis(), shaderSimple);

	blender = new Blender();
	scene = new Scene();
	frame = new FrameBuffer();
	scene.uniforms.u_frameBuffer = frame.getTexture();

	ready = true;
}

function render (time)
{
	time *= 0.001;
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	if (ready)
	{
		// logic
		mouse.update();
		scene.update(time);


		// draw
		frame.recordStart();
		scene.clear();
		scene.draw(meshSkyCube, shaderMeshSkyCube);
		scene.drawEntity(entityCube);
		scene.drawEntity(entityAxis, gl.LINES);
		// scene.draw(meshLandscape, shaderMeshLandscape);
		scene.draw(meshRoad, shaderSimple, gl.TRIANGLE_STRIP);
		scene.draw(particleBush, shaderParticleBush);
		scene.draw(particleGround, shaderParticleGround);
		frame.recordStop();

		// post fx
		scene.draw(meshScreen, shaderMeshScreen);

		// ui
		gl.disable(gl.DEPTH_TEST);
		scene.draw(meshAxis, shaderSimple, gl.LINES);

	} else if (assetsIsLoaded) {
		start();
	}

	requestAnimationFrame(render);
}
requestAnimationFrame(render);

function BlenderDidUpdate (time)
{
	blender.evaluate(entityCube.matrix, "CubeAction", time);
	// blender.evaluate(entityAxis.matrix, "CameraAction", time);

	// scene.camera = m4.rotationY(3.14159);
	blender.evaluate(scene.camera, "CameraAction", time);
	m4.multiply(scene.camera, m4.rotationX(-Math.PI/2.), scene.camera);
	// m4.transformDirection(entityAxis.matrix, [1,1,1], entityAxis.matrix);

	// console.log(m4.getTranslation(scene.camera), time);

	var point = vec2.create();
	var angle = road.getPointAndAngle(point, time * 10/* ! */);
	var q = quat.create();
	quat.setAxisAngle(q, [0, 1, 0], angle);
	mat4.fromRotationTranslation(entityAxis.matrix, q, [point[0], 0, point[1]]);
}
