
varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;

void main() {
  vec2 uv = v_texCoord;
  uv.x += sin(uv.y * 1000.) * 0.01;
  vec4 color = texture2D(u_frameBuffer, uv);
  gl_FragColor = color;
}