attribute vec2 a_texCoord;

varying vec2 v_texCoord;

void main() {
	v_texCoord = a_texCoord;
	gl_Position = vec4(
		mix(-1., 1., a_texCoord.x),
		mix(-1., 1., a_texCoord.y),
		0.,
		1.
	);
}
