define(['twgl', 'assets', 'engine/Entity', 'entities/createBuilding', 'geometries/createCube', 'utils/road'],
function(twgl, assets, Entity, createBuilding, createCube, road) {

	return function () {

		var buildingArray = [];
		var count = 8;
		var offset = [-30,0,0];
		for (var i = 0; i < count; ++i) {
			buildingArray.push(createBuilding(assets.meshes.building1));
			var point = [0,0];
			var angle = road.getPointAndAngle(point, i*300.);
			var matrix = twgl.m4.identity();
			matrix = twgl.m4.translate(matrix, [point[0]+offset[0],offset[1],point[1]+offset[2]]);
			matrix = twgl.m4.scale(matrix, [10,10,10]);
			matrix = twgl.m4.axisRotate(matrix, [0,1,0], angle);
			buildingArray[i].matrix = matrix;
		}

		var entity = new Entity(createCube(), assets.shaders.MeshLit);

		entity.draw = function() {
			for (var i = 0; i < buildingArray.length; ++i) {
				buildingArray[i].draw();
			}
		}

		entity.update = function(time) {
			for (var i = 0; i < buildingArray.length; ++i) {
			}
		}

		return entity;
	};
});
