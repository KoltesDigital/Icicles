
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"));
var shaderMeshTerrain, shaderMeshSkyCube, shaderMeshScreen;
var shaderParticleBush, shaderParticleGround, shaderParticleLandscape;
var meshTerrain, meshSkyCube, meshScreen;
var particleBush, particleGround, particleLandscape;
var scene, frameBuffer;
var ready = false;

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

function start ()
{
	meshTerrain = twgl.createBufferInfoFromArrays(gl, createGrid(100, 10));
	meshSkyCube = twgl.createBufferInfoFromArrays(gl, createCube());
	meshScreen = twgl.createBufferInfoFromArrays(gl, createPlane());
	particleBush = twgl.createBufferInfoFromArrays(gl, createGridParticles(128));
	particleGround = twgl.createBufferInfoFromArrays(gl, createGridParticles(64));
	particleLandscape = twgl.createBufferInfoFromArrays(gl, createGridParticles(8));

	shaderMeshTerrain = new Shader("MeshTerrain");
	shaderMeshSkyCube = new Shader("MeshSkyCube");
	shaderMeshScreen = new Shader("MeshScreen");
	shaderParticleBush = new Shader("ParticleBush");
	shaderParticleGround = new Shader("ParticleGround");
	shaderParticleLandscape = new Shader("ParticleLandscape");

	frameBuffer = twgl.createFramebufferInfo(gl);

	scene = new Scene();

	ready = true;
}

function render (time)
{
	time *= 0.001;
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	if (ready) {

		mouse.update();

		scene.update(time);

		twgl.bindFramebufferInfo(gl, frameBuffer);

		scene.clear();

		scene.draw(meshSkyCube, shaderMeshSkyCube);
		scene.draw(particleBush, shaderParticleBush);
		scene.draw(particleGround, shaderParticleGround);
		scene.draw(particleLandscape, shaderParticleLandscape);

		twgl.bindFramebufferInfo(gl, null);
		scene.uniforms.u_frameBuffer = frameBuffer.attachments[0];

		scene.draw(meshScreen, shaderMeshScreen);

	} else if (assetsIsLoaded) {
		start();
	}

	requestAnimationFrame(render);
}
requestAnimationFrame(render);