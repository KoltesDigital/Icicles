define(['assets', 'blenderHTML5Animations', 'gl', 'gl-matrix', 'twgl', 'engine/uniforms', 'utils/input'],
function(assets, blenderHTML5Animations, gl, glMatrix, twgl, uniforms, input)
{
	var m4 = twgl.m4;

	var useDebugCamera = false;
	var useAnimation = false;

	function Camera()
	{
		if (useDebugCamera) {
			this.matrix = m4.translation([0, 10, -20]);
			this.yaw = Math.PI;
			this.pitch = 0;
		} else {
			this.matrix = m4.identity();
		}

		this.world = m4.identity();
	}

	Camera.prototype.updateProjectionMatrix = function ()
	{
		this.projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 10000);
	};

	Camera.prototype.update = function(time)
	{
		if (useDebugCamera) {
			this.yaw -= input.mouse.delta.x * 0.01;
			this.pitch -= input.mouse.delta.y * 0.01;

			this.matrix[0] = 1;
			this.matrix[1] = 0;
			this.matrix[2] = 0;
			this.matrix[4] = 0;
			this.matrix[5] = 1;
			this.matrix[6] = 0;
			this.matrix[8] = 0;
			this.matrix[9] = 0;
			this.matrix[10] = 1;
			glMatrix.mat4.rotateY(this.matrix, this.matrix, this.yaw);
			glMatrix.mat4.rotateX(this.matrix, this.matrix, this.pitch);

			var dx = 0;
			if (input.isKeyDown('KeyA'))
				--dx;
			if (input.isKeyDown('KeyD'))
				++dx;

			var dy = 0;
			if (input.isKeyDown('KeyQ'))
				--dy;
			if (input.isKeyDown('KeyE'))
				++dy;

			var dz = 0;
			if (input.isKeyDown('KeyW'))
				--dz;
			if (input.isKeyDown('KeyS'))
				++dz;

			glMatrix.mat4.translate(this.matrix, this.matrix, [dx, dy, dz]);
		}
		else if (useAnimation)
		{
			assets.actions['CameraAction'].toWorld(this.matrix, time, blenderHTML5Animations.Action.RotationMode.EULER_XYZ);
			m4.multiply(this.matrix, m4.rotationX(-Math.PI/2.), this.matrix);
		}

		this.updateUniforms();
	};

	Camera.prototype.updateUniforms = function() {
		var view = m4.inverse(this.matrix);
		var viewProjection = m4.multiply(this.projection, view);

		// this.world = m4.rotationY(time);

		uniforms.u_viewInverse = this.matrix;
		uniforms.u_view = view;
		uniforms.u_world = this.world;
		uniforms.u_worldInverseTranspose = m4.transpose(m4.inverse(this.world));
		uniforms.u_worldViewProjection = m4.multiply(viewProjection, this.world);
	};

	return Camera;
});
