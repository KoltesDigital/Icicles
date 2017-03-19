define(['blenderHTML5Animations', 'assets', 'engine/Entity', 'geometries/createCube'],
function(blenderHTML5Animations, assets, Entity, createCube) {
	var geometry = createCube();

	return function() {
		var entity = new Entity(geometry, assets.shaders.MeshLit);

		entity.update = function(time) {
			assets.actions['CubeAction'].toWorld(entity.matrix, time, blenderHTML5Animations.Action.RotationMode.EULER_XYZ);
		};

		return entity;
	};
});
