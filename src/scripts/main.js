var container, stats;
var camera, scene, sceneBuffer, renderer;
var uniforms, frameBuffer, particles;

init();
animate();

function init() {

	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
	camera.position.z = 10;
	scene = new THREE.Scene();
	sceneBuffer = new THREE.Scene();
	var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

	uniforms = {
		time: { value: 1.0 },
		frame: { value: 0 },
		positionFrame: { value: 0 },
		positionTexture: { value: 0 },
		resolution: { value: new THREE.Vector2() }
	};
	// buffer
	sceneBuffer.add( new THREE.Mesh( geometry, new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShaderBuffer' ).textContent
	})));

	// render
	// scene.add( new THREE.Mesh( geometry, new THREE.ShaderMaterial( {
	// 	uniforms: uniforms,
	// 	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	// 	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	// })));

	// particles
	particles = new Particles(uniforms);
	scene.add(particles.mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	if ( ! renderer.extensions.get( "OES_texture_float" ) ) {
		return "No OES_texture_float support for float textures.";
	}
	container.appendChild( renderer.domElement );
	onWindowResize();
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize( event ) {
	renderer.setSize( window.innerWidth, window.innerHeight );
	uniforms.resolution.value.x = renderer.domElement.width;
	uniforms.resolution.value.y = renderer.domElement.height;
}
function animate() {
	requestAnimationFrame( animate );
	uniforms.time.value += 0.05;
	uniforms.frame.value = particles.positionFrame.getTexture();
	uniforms.positionTexture.value = particles.dataTexture;
	particles.mesh.updateMatrix();
	particles.positionFrame.swap();
	renderer.render(sceneBuffer, camera, particles.positionFrame.getTarget(), true);
	renderer.render(scene, camera);
}