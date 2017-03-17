
var Scene = function ()
{
	this.projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 10000);
	this.eye = [1, 20, -80];
	this.target = [0, 0, 0];
	this.up = [0, 1, 0];

	this.camera = m4.lookAt(this.eye, this.target, this.up);
	this.view = m4.inverse(this.camera);
	this.viewProjection = m4.multiply(this.projection, this.view);
	this.world = m4.identity();

	this.uniforms = {
		u_lightWorldPos: [1, 8, -10],
		u_lightColor: [1, 0.8, 0.8, 1],
		u_ambient: [0, 0, 0, 1],
		u_specular: [1, 1, 1, 1],
		u_resolution: [gl.canvas.width, gl.canvas.height],
		u_shininess: 50,
		u_specularFactor: 1,
		u_time: 0,
		u_groundTexture: textures.ground1,
		u_frameBuffer: null,
		u_textTexture: null,
	};

	this.clear = function ()
	{
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		gl.clearColor(0,0,0,1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	this.update = function (time)
	{
		this.eye = rotateY(this.eye, mouse.delta.x * 0.01);

		// this.camera = m4.lookAt(this.eye, this.target, this.up);
		this.view = m4.inverse(this.camera);
		this.viewProjection = m4.multiply(this.projection, this.view);
		this.world = m4.rotationY(0);

		this.uniforms.u_viewInverse = this.camera;
		this.uniforms.u_world = this.world;
		this.uniforms.u_worldInverseTranspose = m4.transpose(m4.inverse(this.world));
		this.uniforms.u_worldViewProjection = m4.multiply(this.viewProjection, this.world);
		this.uniforms.u_time = time;
	}

	this.draw = function (geometry, shader, drawType)
	{
		var programInfo = shader.programInfo;
		this.uniforms.u_model = m4.identity();
		drawType = drawType || gl.TRIANGLES;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, geometry);
		twgl.setUniforms(programInfo, this.uniforms);
		gl.drawElements(drawType, geometry.numElements, gl.UNSIGNED_SHORT, 0);
	}

	this.drawEntity = function (entity, drawType)
	{
		var geometry = entity.bufferInfo;
		var programInfo = entity.shader.programInfo;
		this.uniforms.u_model = entity.matrix;
		drawType = drawType || gl.TRIANGLES;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, geometry);
		twgl.setUniforms(programInfo, this.uniforms);
		gl.drawElements(drawType, geometry.numElements, gl.UNSIGNED_SHORT, 0);
	}
}