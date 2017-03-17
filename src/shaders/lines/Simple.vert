
attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 v_position;
varying vec4 v_color;

void main ()
{
  v_color = a_color;
  v_position = u_model * a_position;
  v_position = u_worldViewProjection * v_position;
  gl_Position = v_position;
}