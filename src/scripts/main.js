
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"), { premultipliedAlpha: false, alpha: true });
var shaderMeshSkyCube, shaderMeshScreen, shaderSimple;
var shaderParticleBush, shaderParticleGround, shaderMeshLandscape;
var meshSkyCube, meshLandscape, meshScreen, meshAxis;
var entityCube, blender;
var particleBush, particleGround;
var scene, frame;
var ready = false;
var blenderWS = new BlenderWebSocket();

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

function start ()
{
	meshSkyCube = twgl.createBufferInfoFromArrays(gl, createCube());
	meshScreen = twgl.createBufferInfoFromArrays(gl, createPlane());
	meshAxis = twgl.createBufferInfoFromArrays(gl, createAxis());
	meshLandscape = twgl.createBufferInfoFromArrays(gl, createGrid(10,0.1));
	particleBush = twgl.createBufferInfoFromArrays(gl, createGridParticles(128));
	particleGround = twgl.createBufferInfoFromArrays(gl, createGridParticles(64));

	shaderSimple = new Shader("Simple");
	shaderMeshSkyCube = new Shader("MeshSkyCube");
	shaderMeshScreen = new Shader("MeshScreen");
	shaderMeshLandscape = new Shader("MeshLandscape");
	shaderParticleBush = new Shader("ParticleBush");
	shaderParticleGround = new Shader("ParticleGround");
	
	blenderWS.addListener("refresh", function() {
		// console.log("Blender file has been saved, reload assets?");
		location.reload();
	});

	blenderWS.addListener("time", BlenderDidUpdate);

	entityCube = new Entity(createCube(), new Shader("MeshLit"));
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
		// scene.draw(meshLandscape, shaderMeshLandscape);
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
	// console.log("Time changed: %f seconds.", time);
	blender.evaluate(entityCube.matrix, "CubeAction", time);
}