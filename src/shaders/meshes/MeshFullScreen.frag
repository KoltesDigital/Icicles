varying vec2 v_texCoord;

void main() {
	gl_FragColor = texture2D(u_frameBuffer, v_texCoord);
}
