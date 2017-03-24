define(['utils/BezierCurve'], function(BezierCurve) {
	'use strict';

	function BezierCurves() {
		this.curves = [];
		this.distances = [];
		this.totalDistance = 0;
	}

	BezierCurves.prototype.add = function(p0, p1, p2, p3) {
		var curve = new BezierCurve(p0, p1, p2, p3);
		this.curves.push(curve);

		var distance = curve.totalDistance;
		this.distances.push(this.totalDistance);
		this.totalDistance += distance;
	};

	BezierCurves.prototype.getPointAndDerivative = function(outPoint, outDerivative, distance) {
		var a = 0;
		var b = this.distances.length;
		var c;
		while (b - a > 1) {
			c = Math.floor((b + a) / 2);
			if (distance > this.distances[c])
				a = c;
			else
				b = c;
		}

		var curve = this.curves[a];
		var curveDistance = this.distances[a];
		return curve.getPointAndDerivative(outPoint, outDerivative, distance - curveDistance);
	};

	return BezierCurves;
});
