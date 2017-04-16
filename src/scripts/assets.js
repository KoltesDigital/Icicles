

var textureDescriptors = {
	'panorama': "images/Room.jpg",
	'mallard': "images/mallard.png",
	'male': "images/male.png",
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
	'mallard': 'meshes/mallard.obj',
	'male': 'meshes/male.obj',
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


loadFiles(shaderURLs, function (err, files) {
	if (err) throw err;

	var headers = files[shaderBaseURL + "utils.glsl"];// + files[shaderBaseURL + "hg_sdf.glsl"];

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
