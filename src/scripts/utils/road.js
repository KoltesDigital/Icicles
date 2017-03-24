define(['gl-matrix', 'RNG', 'utils/generateBSpline'], function(glMatrix, RNG, generateBSpline) {
	'use strict';

	var pointCount = 1000;
	var spawnZMin = 500;
	var spawnZMax = 1000;
	var getSpawnRange = function(time) {
		return 1000 || time;
	};

	var rng = new RNG(0);

	var mat4 = glMatrix.mat4;
	var vec3 = glMatrix.vec3;

	var points = [];
	var nextSapwnZ = 0;
	while (points.length < pointCount) {
		var range = getSpawnRange(nextSapwnZ);
		var newPoint = vec3.create();
		vec3.set(newPoint,
			(rng.uniform() - 0.5) * range,
			(rng.uniform() - 0.5) * range,
			nextSapwnZ
		);
		points.push(newPoint);
		nextSapwnZ += rng.random(spawnZMin, spawnZMax);
	}

	var curves = generateBSpline(points);
	console.log('Total distance generated by road: %f', curves.totalDistance);

	function getTiltedMatrix(outMatrix, distance) {
		var point = vec3.create();
		var derivative = vec3.create();
		curves.getPointAndDerivative(point, derivative, distance);
		mat4.identity(outMatrix);
		mat4.translate(outMatrix, outMatrix, point);
		mat4.rotateY(outMatrix, outMatrix, Math.atan2(derivative[0], derivative[2]));
		mat4.rotateX(outMatrix, outMatrix, -Math.atan2(derivative[1], Math.sqrt(derivative[0] * derivative[0] + derivative[2] * derivative[2])));
	}

	function getUprightMatrix(outMatrix, distance) {
		var point = vec3.create();
		var derivative = vec3.create();
		curves.getPointAndDerivative(point, derivative, distance);
		mat4.identity(outMatrix);
		mat4.translate(outMatrix, outMatrix, point);
		mat4.rotateY(outMatrix, outMatrix, Math.atan2(derivative[0], derivative[2]));
	}

	return {
		'getTiltedMatrix': getTiltedMatrix,
		'getUprightMatrix': getUprightMatrix,
	};
});
