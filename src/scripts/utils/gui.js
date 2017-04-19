define(['dat-gui', 'engine/parameters'], function(dat, parameters) {

	var gui = new dat.gui.GUI();
	gui.remember(parameters);
	var keys = Object.keys(parameters);
	var count = keys.length;
	for (var i = 0; i < count; ++i) {
		var item = gui.add(parameters, ''+keys[i]);
		var name = keys[i].toLowerCase();
		if (name.indexOf('blend') != -1 || name.indexOf('range') != -1 || name.indexOf('ratio') != -1 || name.indexOf('damping') != -1) {
			item.min(0).max(1).step(0.01);
		}
	}

	return gui;
});