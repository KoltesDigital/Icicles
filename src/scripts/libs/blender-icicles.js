// Light version of https://github.com/KoltesDigital/websocket-server-for-blender

BlenderWebSocket = (function() {
	function isObject(input) {
		return (Object.prototype.toString.call(input) === "[object Object]");
	};

	// recursive
	function merge(target) {
		for (var i = 1, n = arguments.length; i < n; ++i) {
			var arg = arguments[i];
			if (!isObject(arg)) continue;
			for (var prop in arg) {
				if (isObjeéct(target[prop]) && isObject(arg[prop]))
					merge(target[prop], arg[prop]);
				else
					target[prop] = arg[prop];
			}
		}
		return target;
	}

	function BlenderWebSocket(options) {
		var listeners = this.listeners = {};

		function emit(event) {
			var handlers = listeners[event];
			if (handlers) {
				var args = Array.prototype.slice.call(arguments, 1);
				handlers.forEach(function(handler) {
					handler.apply(null, args);
				});
			}
		}

		options = merge({
			url: "ws://localhost:8137/"
		}, options);

		var websocket;

		function connect() {
			websocket = new WebSocket(options.url);

			websocket.onopen = function() {
				emit("open");
			};

			websocket.onclose = function() {
				emit("close");
				setTimeout(connect, 100);
			};

			websocket.onerror = function() {
				emit("error");
			};

			websocket.onmessage = function(event) {
				try {
					var data = JSON.parse(event.data);
				} catch(err) {
					emit("badFormat", event.data);
					return;
				}

				switch (data[0]) {
					case "refresh":
						emit("refresh");
						break;

					case "time":
						self.time = data[1];
						emit("time", self.time);
						break;

					default:
						emit("unknownMessage", data);
						break;
				}
			};
		}

		connect();
	}

	BlenderWebSocket.prototype.addListener = BlenderWebSocket.prototype.on = function(event, handler) {
		if (!this.listeners[event])
			this.listeners[event] = [handler];
		else
			this.listeners[event].push(handler);
	};

	BlenderWebSocket.prototype.removeListener = BlenderWebSocket.prototype.off = function(event, handler) {
		if (!this.listeners[event])
			return;
		var index = this.listeners[event].indexOf(handler);
		if (index !== -1)
			this.listeners[event].splice(index, 1);
	};

	return BlenderWebSocket;
})();
