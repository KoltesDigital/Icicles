define(['THREE', 'engine/uniforms'],	function(THREE, uniforms) {

	var container = document.getElementById('container');
	var renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	if (!renderer.extensions.get("OES_texture_float")) {
		return "No OES_texture_float support for float textures.";
	}
	container.appendChild(renderer.domElement);
	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);

	function onWindowResize (event) {
		renderer.setSize(window.innerWidth, window.innerHeight);
		uniforms.resolution.value.x = renderer.domElement.width;
		uniforms.resolution.value.y = renderer.domElement.height;
	}

	return renderer;
});