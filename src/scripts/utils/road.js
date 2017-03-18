"use strict";

function angleSub(a, b) {
	var d = a - b;
	while (d >= Math.PI)
		d -= 2 * Math.PI;
	while (d < -Math.PI)
		d += 2 * Math.PI;
	return d;
}

function sinc(x) {
	if (x === 0)
		return 1;

	x *= Math.PI;
	return Math.sin(x) / x;
}

// options:
// - seed
// - pointCount
// - spawnZMin
// - spawnZMax
// - getSpawnRange(time)
// - divisonCount
// - divisonsPerSpaceUnit
// - divisonOffset
// - sincNeighbors
// - bisectionEpsilon
function Road(options) {
	this.options = options;
	this.rng = new RNG(options.seed);

	this.points = [];
	this.spawnPoints();

	this.spaceDivisions = new Array(this.options.divisonCount);
	this.marchSpace();

	this.angleDivisions = new Array(this.options.divisonCount);
	this.computeAngles();
}

Road.prototype.spawnPoints = function() {
	var nextSapwnZ = 0;
	while (this.points.length < this.options.pointCount) {
		var range = this.options.getSpawnRange(nextSapwnZ);
		var newPoint = vec2.create();
		vec2.set(newPoint,
			(this.rng.uniform() - 0.5) * range,
			nextSapwnZ
		);
		this.points.push(newPoint);
		nextSapwnZ += this.rng.random(this.options.spawnZMin, this.options.spawnZMax);
	}
};

Road.prototype.marchSpace = function() {
	var sqrAdvance = 1 / this.options.divisonsPerSpaceUnit / this.options.divisonsPerSpaceUnit;
	var point = this.points[0];
	var t = 0;
	for (var i = 0, n = this.options.divisonCount; i < n; ++i) {
		var a = t;
		var b = a + 1;
		var bisectionPoint = vec2.create();

		while (b - a > this.options.bisectionEpsilon) {
			var c = (b + a) / 2;
			this.getPointFromCurve(bisectionPoint, c);
			var sqrDistance = vec2.squaredDistance(point, bisectionPoint);
			if (sqrDistance < sqrAdvance) {
				a = c;
			} else {
				b = c;
			}
		}

		this.spaceDivisions[i] = bisectionPoint;
		point = bisectionPoint;
		t = c;
	}
};

Road.prototype.getPointFromCurve = function(outPoint, t) {
	var index = Math.floor(t);
	var minIndex = Math.max(index - this.options.sincNeighbors, 0);
	var maxIndex = Math.min(index + 1 + this.options.sincNeighbors, this.points.length);

	vec2.set(outPoint, 0, 0);
	var total = 0;
	for (var i = minIndex; i < maxIndex; ++i) {
		var point = this.points[i];
		var weight = sinc(t - i);
		vec2.scaleAndAdd(outPoint, outPoint, point, weight);
		total += weight;
	}
	vec2.scale(outPoint, outPoint, 1 / total);
};

Road.prototype.computeAngles = function() {
	var point = vec2.create();
	for (var i = 1, n = this.options.divisonCount - 1; i < n; ++i) {
		vec2.subtract(point, this.spaceDivisions[i + 1], this.spaceDivisions[i - 1]);
		var angle = Math.atan2(point[0], point[1]);
		this.angleDivisions[i] = angle;
	}
};

Road.prototype.getPointAndAngle = function(outPoint, spaceUnit) {
	var t = this.options.divisonOffset + spaceUnit * this.options.divisonsPerSpaceUnit;
	var lowIndex = Math.floor(t);
	var highIndex = lowIndex + 1;
	t = t % 1;
	vec2.lerp(outPoint, this.spaceDivisions[lowIndex], this.spaceDivisions[highIndex], t);
	var da = angleSub(this.angleDivisions[highIndex], this.angleDivisions[lowIndex]);
	var angle = this.angleDivisions[lowIndex] + da * t;
	return angle;
};
