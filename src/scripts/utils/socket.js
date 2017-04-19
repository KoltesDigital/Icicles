define(['socket-io'], function(io) {
	var socket;

	function connect() {
		socket = io('http://localhost:5776');
		socket.on('add', function(data) { console.log('added', data.path); });
		socket.on('change', change);
		socket.on('disconnect', connect);
	}

	function change (data) {
		console.log('changed', data.path);
		var infos = data.path.split('.');
		var extension = infos[infos.length-1];
		if (extension == 'frag' || extension == 'vert') {

		}
	}

	connect();

	return socket;
})