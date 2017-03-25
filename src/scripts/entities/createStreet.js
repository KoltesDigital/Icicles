define(['gl-matrix', 'twgl', 'assets', 'engine/Entity', 'entities/createBuilding', 'geometries/createWiredMesh', 'geometries/createCube', 'geometries/createWiredCube', 'utils/road'],
function(glMatrix, twgl, assets, Entity, createBuilding, createWiredMesh, createCube, createWiredCube, road) {

	return function () {

		function getRoadMatrix (i, range, offset, scale, upright)
		{
			var angle = (i % 2 == 0) ? 0 : Math.PI;
			var index = (i % 2 == 0) ? i : i - 1;
			var matrix = twgl.m4.identity();
			if (upright) {
				road.getUprightMatrix(matrix, index*range);
			} else {
				road.getTiltedMatrix(matrix, index*range);
			}
			offset[0] = (i % 2 == 0) ? -offset[0] : offset[0];
			matrix = twgl.m4.translate(matrix, offset);
			matrix = twgl.m4.scale(matrix, scale);
			matrix = twgl.m4.axisRotate(matrix, [0,1,0], angle);
			return matrix;
		}

		var drawArray = [];

		var buildingArray = [];
		var count = 24;
		for (var i = 0; i < count; ++i) {
			buildingArray.push(createBuilding(assets.meshes.building1));
			buildingArray[i].matrix = getRoadMatrix(i, 100, [30,0,0], [10,10,10], true);
		}
		Array.prototype.push.apply(drawArray, buildingArray);

		var poleArray = [];
		var poleCount = 100;
		for (var i = 0; i < poleCount; ++i) {
			poleArray.push(new Entity(createWiredMesh(assets.meshes.pole1), assets.shaders.MeshBuilding));
			poleArray[i].matrix = getRoadMatrix(i, 20, [25,0,0], [1,1,1], false);
		}
		Array.prototype.push.apply(drawArray, poleArray);

		var lampArray = [];
		var lampCount = 10;
		for (var i = 0; i < lampCount; ++i) {
			lampArray.push(new Entity(createWiredMesh(assets.meshes.pole2), assets.shaders.MeshBuilding));
			lampArray[i].matrix = getRoadMatrix(i, 100, [27,0,0], [1,1,1], false);
		}
		Array.prototype.push.apply(drawArray, lampArray);

		var entity = new Entity(createCube(), assets.shaders.MeshLit);

		entity.draw = function() {
			for (var i = 0; i < drawArray.length; ++i) {
				drawArray[i].draw();
			}
		}

		entity.update = function(time) {
		}

		return entity;
	};
});
