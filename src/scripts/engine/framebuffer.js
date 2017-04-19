define(['THREE', 'engine/renderer'], function (THREE, renderer) {

	function FrameBuffer (width, height, format, type)
	{
		this.renderTextures = [];
		this.current = 0;
		this.count = 2;
		width = width || window.innerWidth;
		height = height || window.innerHeight;
		format = format || THREE.RGBAFormat;
		type = type || THREE.UnsignedByteType;
		for (var i = 0; i < this.count; ++i) {
			this.renderTextures.push(new THREE.WebGLRenderTarget(width, height, { 
				minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: format, type: type }));
		}

		this.getTarget = function ()
		{
			return this.renderTextures[this.current];
		}

		this.getTexture = function ()
		{
			return this.renderTextures[this.current].texture;
		}

		this.swap = function ()
		{
			this.current = (this.current + 1) % this.count;
		}

		if (type == THREE.UnsignedByteType) {
			var self = this;
			renderer.resizeCallbacks.push(function (width, height) {
				for (var i = 0; i < self.count; ++i) {
					self.renderTextures[i].setSize(width, height);
				}
			});
		}
	}
	return FrameBuffer;
});