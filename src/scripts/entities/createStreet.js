define(['twgl', 'assets', 'engine/Entity', 'entities/createBuilding', 'geometries/createCube'],
function(twgl, assets, Entity, createBuilding, createCube) {

	return function () {

		var buildingArray = [];
		var count = 8;
		for (var i = 0; i < count; ++i) {
			buildingArray.push(createBuilding(assets.meshes.building1));
		}

		var entity = new Entity(createCube(), assets.shaders.MeshLit);

		entity.draw = function() {
			for (var i = 0; i < buildingArray.length; ++i) {
				buildingArray[i].draw();
			}
		}

		entity.update = function(time) {
			for (var i = 0; i < buildingArray.length; ++i) {
				buildingArray[i].matrix = twgl.m4.scaling([10,10,10]);
				buildingArray[i].matrix = twgl.m4.translate(buildingArray[i].matrix, [-7,0,i * 10.]);
			}
		}

		return entity;
	};
});
