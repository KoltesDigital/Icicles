define(['assets', 'engine/Entity', 'engine/uniforms', 'geometries/createLeavesFromPoints'],
function(assets, Entity, uniforms, createLeavesFromPoints) {

	return function(gridSize, voxelSize) {

		var points = [];
		var count = gridSize[0] * gridSize[1] * gridSize[2];
		for (var i = 0; i < count; ++i) {	
			var x = i % gridSize[0];
			var y = Math.floor(i / (gridSize[0] * gridSize[2]));
			var z = Math.floor(i / gridSize[0]) % gridSize[2];
			var point = { x: x, y: y, z: z };
			point.normal = { x: 0, y: 1, z: 0 };
			point.color = { r: 0, g: .8, b: 0, a: 1 };
			points.push(point);
		}

		var geometry = createLeavesFromPoints(points);

		var entity = new Entity(geometry, assets.shaders.ParticleVoxel);

		uniforms.u_gridSize = gridSize;
		uniforms.u_voxelSize = voxelSize;

		entity.update = function(time) {
			var angle = time * 0.8;
			var radius = 30;
			uniforms.u_target = [Math.cos(angle)*radius, 0, Math.sin(angle)*radius];
		}

		return entity;
	};
});
