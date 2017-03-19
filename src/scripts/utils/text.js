define(function() {
	var ctx = document.createElement("canvas").getContext("2d");

	return function(text)
	{
		ctx.font = "20px monospace";
		var t = ctx.measureText(text);
		ctx.canvas.width  = Math.ceil(t.width) + 2;
		ctx.canvas.height = 24;
		ctx.font = "20px monospace";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.textBaseAlign = "middle";
		ctx.fillText(text, ctx.canvas.width / 2 | 0, ctx.canvas.height / 2 | 0);
		return ctx.canvas;
	};
});
