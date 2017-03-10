
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"));
var shaderMeshTerrain, shaderMeshSkyCube, shaderMeshScreen, shaderSimple;
var shaderParticleBush, shaderParticleGround, shaderParticleLandscape;
var meshTerrain, meshSkyCube, meshLandscape, meshScreen, meshAxis;
var particleBush, particleGround;
var scene, frame;
var ready = false;

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

function start ()
{
	meshTerrain = twgl.createBufferInfoFromArrays(gl, createGrid(100, 10));
	meshSkyCube = twgl.createBufferInfoFromArrays(gl, createCube());
	meshScreen = twgl.createBufferInfoFromArrays(gl, createPlane());
	meshAxis = twgl.createBufferInfoFromArrays(gl, createAxis());
	meshLandscape = twgl.createBufferInfoFromArrays(gl, createGrid(10,0.1));
	particleBush = twgl.createBufferInfoFromArrays(gl, createGridParticles(128));
	particleGround = twgl.createBufferInfoFromArrays(gl, createGridParticles(64));

	shaderSimple = new Shader("Simple");
	shaderMeshTerrain = new Shader("MeshTerrain");
	shaderMeshSkyCube = new Shader("MeshSkyCube");
	shaderMeshScreen = new Shader("MeshScreen");
	shaderParticleBush = new Shader("ParticleBush");
	shaderParticleGround = new Shader("ParticleGround");
	shaderParticleLandscape = new Shader("ParticleLandscape");

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

		frame.recordStart();

		// draw
		scene.clear();
		scene.draw(meshSkyCube, shaderMeshSkyCube);
		scene.draw(particleBush, shaderParticleBush);
		scene.draw(particleGround, shaderParticleGround);
		scene.draw(meshLandscape, shaderParticleLandscape);

		frame.recordStop();

		// post fx
		scene.draw(meshScreen, shaderMeshScreen);

		// helper
		gl.disable(gl.DEPTH_TEST);
		scene.draw(meshAxis, shaderSimple, gl.LINES);

	} else if (assetsIsLoaded) {
		start();
	}

	requestAnimationFrame(render);
}
requestAnimationFrame(render);