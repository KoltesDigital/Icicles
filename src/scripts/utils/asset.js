
var assets = {};
var assetsIsLoaded = false;

loadFiles(
	[
	"shaders/meshes/MeshSkyCube.frag",
	"shaders/meshes/MeshSkyCube.vert",
	"shaders/meshes/MeshScreen.frag",
	"shaders/meshes/MeshScreen.vert",
	"shaders/meshes/MeshLit.frag",
	"shaders/meshes/MeshLit.vert",
	"shaders/meshes/MeshText.frag",
	"shaders/meshes/MeshText.vert",
	"shaders/meshes/MeshLandscape.frag",
	"shaders/meshes/MeshLandscape.vert",
	"shaders/particles/ParticleBush.frag",
	"shaders/particles/ParticleBush.vert",
	"shaders/particles/ParticleGround.frag",
	"shaders/particles/ParticleGround.vert",
	"shaders/lines/Simple.frag",
	"shaders/lines/Simple.vert",
	"shaders/header.glsl",
	"shaders/uniforms.glsl",
	"shaders/modifiers.glsl",
	"shaders/utils.glsl",
	], 
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