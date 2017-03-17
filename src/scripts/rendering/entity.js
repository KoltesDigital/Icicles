
var Entity = function (array, shader)
{
	this.bufferInfo = twgl.createBufferInfoFromArrays(gl, array);
	this.shader = shader;
	this.matrix = m4.identity();
}