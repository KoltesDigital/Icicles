define(['gl-matrix'], function(glMatrix) {
	'use strict';

	var vec3 = glMatrix.vec3;

	var divisonCount = 100;

	function BezierCurve(p0, p1, p2, p3) {
		this.p0 = p0;
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;

		this.computeDivisions();
	}

	BezierCurve.prototype.compute = function(outPoint, t) {
		var mt = 1 - t;
		vec3.scale(outPoint, this.p0, mt * mt * mt);
		vec3.scaleAndAdd(outPoint, outPoint, this.p1, 3 * t * mt * mt);
		vec3.scaleAndAdd(outPoint, outPoint, this.p2, 3 * t * t * mt);
		vec3.scaleAndAdd(outPoint, outPoint, this.p3, t * t * t);
	};

	BezierCurve.prototype.computeDerivative = function(outDerivative, t) {
		var mt = 1 - t;
		var tmp = vec3.create();
		vec3.subtract(tmp, this.p1, this.p0);
		vec3.scale(outDerivative, tmp, 3 * mt * mt);
		vec3.subtract(tmp, this.p2, this.p1);
		vec3.scaleAndAdd(outDerivative, outDerivative, tmp, 6 * t * mt);
		vec3.subtract(tmp, this.p3, this.p2);
		vec3.scaleAndAdd(outDerivative, outDerivative, tmp, 3 * t * t);
	};

	BezierCurve.prototype.computeDivisions = function() {
		this.points = [];
		this.derivatives = [];

		var i;
		for (i = 0; i <= divisonCount; ++i) {
			var point = vec3.create();
			this.compute(point, i / divisonCount);
			this.points.push(point);

			var derivative = vec3.create();
			this.computeDerivative(derivative, i / divisonCount);
			this.derivatives.push(derivative);
		}

		this.distances = [];
		this.totalDistance = 0;
		for (i = 0; i < divisonCount; ++i) {
			this.distances.push(this.totalDistance);
			var divisionDistance = vec3.distance(this.points[i], this.points[i+1]);
			this.totalDistance += divisionDistance;
		}
		this.distances.push(this.totalDistance);
	};

	BezierCurve.prototype.getPointAndDerivative = function(outPoint, outDerivative, distance) {
		var a = 0;
		var b = divisonCount;
		var c;
		while (b - a > 1) {
			c = Math.floor((b + a) / 2);
			if (distance > this.distances[c])
				a = c;
			else
				b = c;
		}

		var t = (distance - this.distances[a]) / (this.distances[b] - this.distances[a]);
		vec3.lerp(outPoint, this.points[a], this.points[b], t);
		vec3.lerp(outDerivative, this.derivatives[a], this.derivatives[b], t);
	};

	return BezierCurve;
});
