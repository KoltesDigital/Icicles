var textureDescriptors = {
	// 'ground': {
	// 	src: "images/ground.jpg",
	// },
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

var shaderDescriptors = {
	'fullscreen.vert': 'fullscreen.vert',
	'particle.vert': 'particle.vert',
	'particle.frag': 'particle.frag',
	'render.frag': 'render.frag',
	'position.frag': 'position.frag',
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
};

function notify() {
	isLoaded = assets.shaders;// && assets.textures && assets.meshes;

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
].map(function(name) {
	return shaderBaseURL + name;
});

Object.keys(shaderDescriptors).forEach(function(name) {
	var url = shaderDescriptors[name];
	shaderURLs.push( shaderBaseURL + url );
});


loadFiles(shaderURLs, function (err, files) {
	if (err) throw err;

	var headers = files[shaderBaseURL + "utils.glsl"];

	function fileWithHeaders(name) {
		return headers + files[name];
	}

	var shaders = {};
	Object.keys(shaderDescriptors).forEach(function(name) {
		var url = shaderDescriptors[name];
		// var programInfo = twgl.createProgramInfo(gl, [
		// 	fileWithHeaders(shaderBaseURL + url + '.vert'),
		// 	fileWithHeaders(shaderBaseURL + url + '.frag'),
		// ]);
		shaders[name] = fileWithHeaders(shaderBaseURL + url);
	});

	assets.shaders = shaders;
	return notify();
});

// twgl.createTextures(gl, textureDescriptors, function(err, textures) {
// 	if (err) throw err;

// 	assets.textures = textures;
// 	return notify();
// });


// var meshURLs = [];
// Object.keys(meshDescriptors).forEach(function(name) {
// 	meshURLs.push(meshDescriptors[name]);
// });

// loadFiles(meshURLs, function (err, files) {
// 	var meshes = {};
// 	Object.keys(meshDescriptors).forEach(function(name, index) {
// 		meshes[name] = files[meshDescriptors[name]];
// 	});
// 	assets.meshes = meshes;
// 	return notify();
// });
