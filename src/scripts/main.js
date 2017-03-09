
"use strict";
twgl.setDefaults({attribPrefix: "a_"});
var m4 = twgl.m4;
var gl = twgl.getWebGLContext(document.getElementById("c"));
var programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
var programInfo2 = twgl.createProgramInfo(gl, ["vsParticle", "fsParticle"]);

var textures = twgl.createTextures(gl, {
	ground1: { src: "images/ground.jpg" },
})

var arrays = createGrid(100, 1);
var arrays2 = createGridParticles(64);

var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
var bufferInfo2 = twgl.createBufferInfoFromArrays(gl, arrays2);

var tex = twgl.createTexture(gl, {
	min: gl.NEAREST,
	mag: gl.NEAREST,
	src: [
	255, 255, 255, 255,
	192, 192, 192, 255,
	192, 192, 192, 255,
	255, 255, 255, 255,
	],
});

var uniforms = {
	u_lightWorldPos: [1, 8, -10],
	u_lightColor: [1, 0.8, 0.8, 1],
	u_ambient: [0, 0, 0, 1],
	u_specular: [1, 1, 1, 1],
	u_shininess: 50,
	u_specularFactor: 1,
	u_diffuse: tex,
	u_time: 0,
	u_groundTexture: textures.ground1
};

function render(time) {
	time *= 0.001;
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.enable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 1000);
	var eye = [1, 20, -60];
	var target = [0, 3, 0];
	var up = [0, 1, 0];

	var camera = m4.lookAt(eye, target, up);
	var view = m4.inverse(camera);
	var viewProjection = m4.multiply(projection, view);
	var world = m4.rotationY(0);

	uniforms.u_viewInverse = camera;
	uniforms.u_world = world;
	uniforms.u_worldInverseTranspose = m4.transpose(m4.inverse(world));
	uniforms.u_worldViewProjection = m4.multiply(viewProjection, world);
	uniforms.u_time = time;

	gl.useProgram(programInfo.program);
	twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
	twgl.setUniforms(programInfo, uniforms);
	gl.drawElements(gl.TRIANGLES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);

	gl.useProgram(programInfo2.program);
	twgl.setBuffersAndAttributes(gl, programInfo2, bufferInfo2);
	twgl.setUniforms(programInfo2, uniforms);
	gl.drawElements(gl.TRIANGLES, bufferInfo2.numElements, gl.UNSIGNED_SHORT, 0);

	requestAnimationFrame(render);
}
requestAnimationFrame(render);