requirejs.config({
	paths:{
		'actions': '../animations/icicles',
		'blenderHTML5Animations': 'libs/blender-html5-animations.min',
		'BlenderWebSocket': 'libs/blender-icicles',
		'gl-matrix': 'libs/gl-matrix-min',
		'RNG': 'libs/rng',
		'THREE': 'libs/three',
		'dat-gui': 'libs/dat.gui.min',
	},
	shim: {
		'actions': {
			exports: 'actions',
		},
		'BlenderWebSocket': {
			exports: 'BlenderWebSocket',
		},
		'RNG': {
			exports: 'RNG',
		},
	},
});

requirejs(['main']);
