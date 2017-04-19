define(['blenderHTML5Animations', 'actions', 'gl-matrix'], function (blenderHTML5Animations, actions, glMatrix) {

	var Blender = function ()
	{
		this.actions = new blenderHTML5Animations.ActionLibrary(actions);

		this.evaluate = function (matrix, actionName, time)
		{
			this.actions[actionName].toWorld(matrix.elements, time, blenderHTML5Animations.Action.RotationMode.EULER_XYZ);
		}
	}

	var blender = new Blender();	
	return blender;
});