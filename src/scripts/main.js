
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"));
var shaderMeshTerrain, shaderParticleBush, shaderParticleGround;
var meshTerrain, particleBush, particleGround;
var uniforms, scene;
var ready = false;

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

function start ()
{
	meshTerrain = twgl.createBufferInfoFromArrays(gl, createGrid(100, 10));
	particleBush = twgl.createBufferInfoFromArrays(gl, createGridParticles(128));
	particleGround = twgl.createBufferInfoFromArrays(gl, createGridParticles(128));

	uniforms = {
		u_lightWorldPos: [1, 8, -10],
		u_lightColor: [1, 0.8, 0.8, 1],
		u_ambient: [0, 0, 0, 1],
		u_specular: [1, 1, 1, 1],
		u_shininess: 50,
		u_specularFactor: 1,
		u_time: 0,
		u_groundTexture: textures.ground1
	};

	shaderMeshTerrain = new Shader("MeshTerrain");
	shaderParticleBush = new Shader("ParticleBush");

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

	if (ready) {

		scene.updateUniforms(uniforms);
		uniforms.u_time = time;

		// gl.useProgram(shaderMeshTerrain.program);
		// twgl.setBuffersAndAttributes(gl, shaderMeshTerrain, meshTerrain);
		// twgl.setUniforms(shaderMeshTerrain, uniforms);
		// gl.drawElements(gl.TRIANGLES, meshTerrain.numElements, gl.UNSIGNED_SHORT, 0);

		var programInfo = shaderParticleBush.programInfo;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, particleBush);
		twgl.setUniforms(programInfo, uniforms);
		gl.drawElements(gl.TRIANGLES, particleBush.numElements, gl.UNSIGNED_SHORT, 0);

	} else if (assetsIsLoaded) {
		start();
	}

	requestAnimationFrame(render);
}
requestAnimationFrame(render);