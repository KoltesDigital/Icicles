define(['actions', 'blenderHTML5Animations', 'gl', 'twgl', 'utils/loader'], function(actionsDescriptor, blenderHTML5Animations, gl, twgl, loader) {
	var textureDescriptors = {
		'ground': {
			src: "images/ground.jpg",
		},
	};

	var shaderDescriptors = {
		'Simple': 'lines/Simple',
		'MeshFullScreen': 'meshes/MeshFullScreen',
		'MeshLandscape': 'meshes/MeshLandscape',
		'MeshLit': 'meshes/MeshLit',
		'MeshSkyCube': 'meshes/MeshSkyCube',
		'MeshText': 'meshes/MeshText',
		'ParticleBush': 'particles/ParticleBush',
		'ParticleGround': 'particles/ParticleGround',
	};

	var shaderBaseURL = 'shaders/';


	var pendingCallbacks = [];
	var isLoaded = false;

	function load(callback) {
		if (isLoaded) {
			return setTimeout(function() {
				return callback(assets);
			});
		}

		return pendingCallbacks.push(callback);
	}

	var assets = {
		'actions': new blenderHTML5Animations.ActionLibrary(actionsDescriptor),
		'load': load,
	};

	function notify() {
		isLoaded = assets.shaders && assets.textures;

		if (isLoaded) {
			return pendingCallbacks.forEach(function(callback) {
				return callback();
			});
		}
	}

	var shaderURLs = [
		"header.glsl",
		"uniforms.glsl",
		"modifiers.glsl",
		"utils.glsl",
	].map(function(name) {
		return shaderBaseURL + name;
	});

	Object.keys(shaderDescriptors).forEach(function(name) {
		var url = shaderDescriptors[name];
		shaderURLs.push(
			shaderBaseURL + url + '.vert',
			shaderBaseURL + url + '.frag'
		);
	});

	loader.loadFiles(shaderURLs, function (err, files) {
		if (err) throw err;

		var headers = files[shaderBaseURL + "header.glsl"]
			+ files[shaderBaseURL + "uniforms.glsl"]
			+ files[shaderBaseURL + "utils.glsl"]
			+ files[shaderBaseURL + "modifiers.glsl"];

		function fileWithHeaders(name) {
			return headers + files[name];
		}

		var shaders = {};
		Object.keys(shaderDescriptors).forEach(function(name) {
			var url = shaderDescriptors[name];
			var programInfo = twgl.createProgramInfo(gl, [
				fileWithHeaders(shaderBaseURL + url + '.vert'),
				fileWithHeaders(shaderBaseURL + url + '.frag'),
			]);
			shaders[name] = programInfo;
		});

		assets.shaders = shaders;
		return notify();
	});

	twgl.createTextures(gl, textureDescriptors, function(err, textures) {
		if (err) throw err;

		assets.textures = textures;
		return notify();
	});

	return assets;
});
