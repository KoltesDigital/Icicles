define(['BlenderWebSocket'], function(BlenderWebSocket) {
	var time = 0;
	var connected = false;

	var blenderWS = new BlenderWebSocket();

	blenderWS.addListener("refresh", function() {
		location.reload();
	});

	blenderWS.addListener("time", function(newTime) {
		time = newTime;
		connected = true;
	});

	return function() {
		if (!connected)
			time += 0.016; // TODO

		return time;
	};
});
