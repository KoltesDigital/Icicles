define(function() {
	return function(segment) {
		var circle = {
			position: { numComponents: 3, data: [] },
			color: { numComponents: 4, data: [] },
			texcoord: { numComponents: 2, data: [] },
		};

		segment = segment || 32;

		for (var i = 0; i < segment; ++i) {
			var ratio = i / segment;

			// positions
			Array.prototype.push.apply(circle.position.data, [ 0, 0, 0 ]);

			// textures coordinates
			Array.prototype.push.apply(circle.texcoord.data, [ ratio, 0 ]);

			// color
			Array.prototype.push.apply(circle.color.data, [ 1, 0, 0, 1 ]);
		}

		return circle;
	};
});
