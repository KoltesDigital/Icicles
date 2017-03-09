
var Shader = function (shaderName)
{
	this.programInfo = twgl.createProgramInfo(gl, [assets[shaderName+".vert"],assets[shaderName+".frag"]]);
}