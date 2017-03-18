define(['gl', 'twgl'], function(gl, twgl)
{
	function Geometry(arrays, mode)
	{
		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
		this.mode = mode;
	}

	return Geometry;
});
