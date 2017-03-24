
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
attribute vec2 a_grid;

varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;
varying vec4 v_positionView;
varying vec2 v_texcoord;

void main ()
{
  vec4 p = a_position;
  v_color = vec4(1);
  v_texcoord = a_texcoord;
  v_position = u_worldViewProjection * u_model * p;
  v_positionView = u_view * u_world * p;
  gl_Position = v_position;
}
