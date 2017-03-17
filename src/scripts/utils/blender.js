
var Blender = function ()
{
	this.actions = new blenderHTML5Animations.ActionLibrary(actions);

	this.evaluate = function (matrix, actionName, time)
	{
		this.actions[actionName].toWorld(matrix, time, blenderHTML5Animations.Action.RotationMode.EULER_XYZ);
	}
}