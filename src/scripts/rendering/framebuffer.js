
var FrameBuffer = function ()
{
	this.buffer = twgl.createFramebufferInfo(gl);

	this.recordStart = function ()
	{
		twgl.bindFramebufferInfo(gl, this.buffer);
	}

	this.recordStop = function ()
	{
		twgl.bindFramebufferInfo(gl, null);
	}

	this.getTexture = function ()
	{
		return this.buffer.attachments[0];
	}
}