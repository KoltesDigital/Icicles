
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"), { premultipliedAlpha: false, alpha: true });
var shaderMeshSkyCube, shaderMeshScreen, shaderSimple;
var shaderParticleBush, shaderParticleGround, shaderMeshLandscape;
var meshSkyCube, meshLandscape, meshScreen, meshAxis;
var particleBush, particleGround;
var scene, frame, frameBackground;
var ready = false;

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

	scene = new Scene();

	frame = new FrameBuffer();
	frameBackground = new FrameBuffer();
	scene.uniforms.u_frameBuffer = frame.getTexture();
	scene.uniforms.u_frameBackground = frameBackground.getTexture();

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

		// draw background
		frameBackground.recordStart();
		scene.clear();
		scene.draw(meshSkyCube, shaderMeshSkyCube);
		scene.draw(meshLandscape, shaderMeshLandscape);
		frameBackground.recordStop();

		frame.recordStart();
		scene.clear();
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