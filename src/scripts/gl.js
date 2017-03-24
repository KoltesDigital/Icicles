define(['twgl'], function(twgl) {
	twgl.setDefaults({
		attribPrefix: "a_",
	});

	var gl = twgl.getWebGLContext(document.getElementById("c"), {
		premultipliedAlpha: false,
		alpha: false,
		antialias: true,
	});

	gl.clearColor(1, 0, 0, 1);

	return gl;
});
