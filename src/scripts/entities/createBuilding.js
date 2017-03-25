define(['twgl', 'gl', 'assets', 'engine/uniforms', 'engine/Entity', 'geometries/createMesh', 'geometries/createWiredMesh'],
function(twgl, gl, assets, uniforms, Entity, createMesh, createWiredMesh) {

	return function () {

		function randomBuilding ()
		{
			return assets.meshes['building' + (1+Math.floor(Math.random()*3))];
		}

		var geometry = createWiredMesh(randomBuilding());
		var entity = new Entity(geometry, assets.shaders.MeshBuilding);

		entity.update = function(time) {
		}

		return entity;
	};
});
