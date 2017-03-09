
var Scene = function ()
{
	this.projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 1000);
	this.eye = [1, 30, -80];
	this.target = [0, 3, 0];
	this.up = [0, 1, 0];

	this.camera = m4.lookAt(this.eye, this.target, this.up);
	this.view = m4.inverse(this.camera);
	this.viewProjection = m4.multiply(this.projection, this.view);
	this.world = m4.rotationY(0);

	this.uniforms = {
		u_lightWorldPos: [1, 8, -10],
		u_lightColor: [1, 0.8, 0.8, 1],
		u_ambient: [0, 0, 0, 1],
		u_specular: [1, 1, 1, 1],
		u_shininess: 50,
		u_specularFactor: 1,
		u_time: 0,
		u_groundTexture: textures.ground1
	};

	this.update = function (time)
	{
		this.uniforms.u_viewInverse = this.camera;
		this.uniforms.u_world = this.world;
		this.uniforms.u_worldInverseTranspose = m4.transpose(m4.inverse(this.world));
		this.uniforms.u_worldViewProjection = m4.multiply(this.viewProjection, this.world);
		this.uniforms.u_time = time;
	}

	this.draw = function (geometry, shader)
	{
		var programInfo = shader.programInfo;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, geometry);
		twgl.setUniforms(programInfo, this.uniforms);
		gl.drawElements(gl.TRIANGLES, geometry.numElements, gl.UNSIGNED_SHORT, 0);
	}
}