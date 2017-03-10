
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"));
var shaderMeshTerrain, shaderMeshSkyCube, shaderParticleBush, shaderParticleGround, shaderParticleLandscape;
var meshTerrain, meshSkyCube, particleBush, particleGround, particleLandscape;
var scene;
var ready = false;

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

function start ()
{
	meshTerrain = twgl.createBufferInfoFromArrays(gl, createGrid(100, 10));
	meshSkyCube = twgl.createBufferInfoFromArrays(gl, createCube());
	particleBush = twgl.createBufferInfoFromArrays(gl, createGridParticles(128));
	particleGround = twgl.createBufferInfoFromArrays(gl, createGridParticles(64));
	particleLandscape = twgl.createBufferInfoFromArrays(gl, createGridParticles(8));

	shaderMeshTerrain = new Shader("MeshTerrain");
	shaderMeshSkyCube = new Shader("MeshSkyCube");
	shaderParticleBush = new Shader("ParticleBush");
	shaderParticleGround = new Shader("ParticleGround");
	shaderParticleLandscape = new Shader("ParticleLandscape");

	scene = new Scene();

	ready = true;
}

function render (time)
{
	time *= 0.001;
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.enable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clearColor(0,0,0,1);

	if (ready) {

		mouse.update();

		scene.update(time);
		scene.draw(meshSkyCube, shaderMeshSkyCube);
		scene.draw(particleBush, shaderParticleBush);
		scene.draw(particleGround, shaderParticleGround);
		scene.draw(particleLandscape, shaderParticleLandscape);

	} else if (assetsIsLoaded) {
		start();
	}

	requestAnimationFrame(render);
}
requestAnimationFrame(render);