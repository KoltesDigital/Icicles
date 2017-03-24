define(['twgl', 'gl', 'assets', 'engine/uniforms', 'engine/Entity', 'geometries/createMesh', 'geometries/createWiredMesh'],
function(twgl, gl, assets, uniforms, Entity, createMesh, createWiredMesh) {

	return function () {

		var geometry = createWiredMesh(assets.meshes.building1quad);
		var entity = new Entity(geometry, assets.shaders.LineBuilding);

		entity.update = function(time) {
		}

		return entity;
	};
});
