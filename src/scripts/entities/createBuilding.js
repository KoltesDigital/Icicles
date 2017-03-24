define(['assets', 'engine/Entity', 'geometries/createMesh'],
function(assets, Entity, createMesh) {

	return function () {

		var geometry = createMesh(assets.meshes.building1);
		var entity = new Entity(geometry, assets.shaders.MeshLit);

		entity.update = function(time) {
		}

		return entity;
	};
});
