define(['THREE', 'libs/loader', 'libs/PLYLoader', 'libs/OBJLoader', 'engine/parameters'],
	function(THREE, loader, PLYLoader, OBJLoader, parameters) {
	
	var textureDescriptors = {
		'panorama': "images/Room.jpg",
		'duck': "images/duck.png",
		'zebra': "images/zebra.png",
		'watermelon': "images/watermelon.png",
		// 'LesCopains': "images/LesCopains.jpg",
		'LesCopainsSD': "images/LesCopainsSD.jpg",
	};

	var meshDescriptors = {
		// 'building1': "meshes/building1.ply",
		// 'building2': "meshes/building2.ply",
		// 'building3': "meshes/building3.ply",
		// 'pole1': "meshes/pole1.ply",
		// 'pole2': "meshes/pole2.ply",
		// 'car': "meshes/car.ply",
		// 'car2': "meshes/car2.line",
	};

	var geometryDescriptors = {
		'cookie': 'meshes/Cookie.ply',
		'duck': 'meshes/duck.obj',
		'zebra': 'meshes/zebra.obj',
		'LesCopains': 'meshes/LesCopains.obj',
		'watermelon': 'meshes/watermelon.obj',
		'test': 'meshes/test.obj',
		// 'SimonMama': 'meshes/SimonMama.ply',
		// 'Simon1': 'meshes/Simon1.ply',
	};

	var shaderDescriptors = {
		'fullscreen.vert': 'fullscreen.vert',
		'particle.vert': 'particle.vert',
		'particle.frag': 'particle.frag',
		'render.frag': 'render.frag',
		'position.frag': 'position.frag',
		'velocity.frag': 'velocity.frag',
		'feedback.frag': 'feedback.frag',
		'raymarching.frag': 'raymarching.frag',
		'simple.vert': 'simple.vert',
		'simple.frag': 'simple.frag',
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
		// 'actions': new blenderHTML5Animations.ActionLibrary(actionsDescriptor),
		'load': load,
		'geometries': {},
		'textures': {}
	};

	function notify() {
		isLoaded = assets.shaders 
		&& Object.keys(assets.textures).length == Object.keys(textureDescriptors).length 
		&& Object.keys(assets.geometries).length == Object.keys(geometryDescriptors).length;
		// && assets.meshes;

		if (isLoaded) {
			return pendingCallbacks.forEach(function(callback) {
				return callback();
			});
		}
	}

	var shaderURLs = [
		// "header.glsl",
		// "uniforms.glsl",
		// "modifiers.glsl",
		"utils.glsl",
		// "hg_sdf.glsl",
	].map(function(name) {
		return shaderBaseURL + name;
	});

	Object.keys(shaderDescriptors).forEach(function(name) {
		var url = shaderDescriptors[name];
		shaderURLs.push( shaderBaseURL + url );
	});

	var parameterList = 'uniform float ';
	var keys = Object.keys(parameters);
	var count = keys.length;
	for (var i = 0; i < count; ++i) {
		parameterList += keys[i] + (i+1!=count?', ':';');
	}

	assets.fileLoaded = {};

	function fileWithHeaders(name) {
		return assets.fileLoaded[shaderBaseURL + "utils.glsl"] + parameterList + assets.fileLoaded[name];
	}

	loader.loadFiles(shaderURLs, function (err, files) {
		if (err) throw err;

		assets.fileLoaded = files;

		var shaders = {};
		Object.keys(shaderDescriptors).forEach(function(name) {
			var url = shaderDescriptors[name];
			shaders[name] = fileWithHeaders(shaderBaseURL + url);
		});

		assets.shaders = shaders;
		return notify();
	});

	assets.reload = function (assetName, callback) {
		loader.loadFiles([shaderBaseURL + assetName], function (err, files) {
			assets.fileLoaded[shaderBaseURL + assetName] = files[shaderBaseURL + assetName];
			assets.shaders[assetName] = fileWithHeaders(shaderBaseURL + shaderDescriptors[assetName]);
			if (callback != null) callback();
		});
	};

	var textureLoader = new THREE.TextureLoader();
	Object.keys(textureDescriptors).forEach(function(name) {
		textureLoader.load(textureDescriptors[name], function(texture) {
			assets.textures[name] = texture;
			return notify();
		});
	});


	var plyLoader = new THREE.PLYLoader();
	var objLoader = new THREE.OBJLoader();

	var meshURLs = [];
	Object.keys(geometryDescriptors).forEach(function(name) {
		var url = geometryDescriptors[name];
		var infos = url.split('.');
		var extension = infos[infos.length-1];
		if (extension == 'ply') {
			plyLoader.load(url, function(geometry){
				assets.geometries[name] = geometry;
				return notify();
			});
		} else if (extension == 'obj') {
			objLoader.load(url, function(geometry){
				assets.geometries[name] = geometry;
				return notify();
			});
		}
	});


	// loadFiles(meshURLs, function (err, files) {
	// 	var meshes = {};
	// 	Object.keys(meshDescriptors).forEach(function(name, index) {
	// 		meshes[name] = files[meshDescriptors[name]];


	// 	});
	// 	assets.meshes = meshes;
	// 	return notify();
	// });

	return assets;
});