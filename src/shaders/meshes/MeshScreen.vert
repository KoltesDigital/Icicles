
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;

void main() {
  v_color = a_color;
  v_texCoord = a_texcoord;
  v_position = a_position;
  gl_Position = v_position;
}