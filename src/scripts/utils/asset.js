
var assets = {};
var assetsIsLoaded = false;

loadFiles(
	["shaders/MeshTerrain.frag",
	"shaders/MeshTerrain.vert",
	"shaders/ParticleBush.frag",
	"shaders/ParticleBush.vert",
	"shaders/header.glsl",
	"shaders/uniforms.glsl",
	"shaders/modifiers.glsl",
	"shaders/utils.glsl"], 
	function (error, content) { 
	assets = content;
	assetsIsLoaded = true;
	addHeaderToShaders();
});

function addHeaderToShaders ()
{
	for (var key in assets) {
		var k = key.split(".");
		if (assets.hasOwnProperty(key) && (k[1] === "vert" || k[1] === "frag")) {
			assets[key] = assets["header.glsl"]
				+ assets["uniforms.glsl"]
				+ assets["utils.glsl"]
				+ assets["modifiers.glsl"]
				+ assets[key];
		}
	}
};