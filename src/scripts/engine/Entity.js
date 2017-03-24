define(['gl', 'twgl', 'engine/uniforms'], function(gl, twgl, uniforms)
{
	function Entity(geometry, shader)
	{
		if (!geometry || !geometry.bufferInfo)
			throw new Error('Geometry is undefined.');

		if (!shader)
			throw new Error('Shader is undefined.');

		this.geometry = geometry;
		this.shader = shader;
		this.matrix = twgl.m4.identity();
	}

	Entity.prototype.draw = function()
	{
		var bufferInfo = this.geometry.bufferInfo;
		var programInfo = this.shader;
		uniforms.u_model = this.matrix;
		gl.useProgram(programInfo.program);
		twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
		twgl.setUniforms(programInfo, uniforms);
		gl.drawElements(this.geometry.mode, bufferInfo.numElements, bufferInfo.elementType, 0);
	};

	Entity.prototype.update = function(time)
	{
	};

	return Entity;
});
