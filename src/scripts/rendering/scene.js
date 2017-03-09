
var Scene = function ()
{
	this.projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 1000);
	this.eye = [1, 30, -80];
	this.target = [0, 3, 0];
	this.up = [0, 1, 0];

	this.camera = m4.lookAt(this.eye, this.target, this.up);
	this.view = m4.inverse(this.camera);
	this.viewProjection = m4.multiply(this.projection, this.view);
	this.world = m4.rotationY(0);

	this.updateUniforms = function (uniforms)
	{
		uniforms.u_viewInverse = this.camera;
		uniforms.u_world = this.world;
		uniforms.u_worldInverseTranspose = m4.transpose(m4.inverse(this.world));
		uniforms.u_worldViewProjection = m4.multiply(this.viewProjection, this.world);
	}
}