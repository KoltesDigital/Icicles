
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
attribute vec2 a_center;

varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToView;
varying vec3 v_positionWorld;

void main() {
  vec4 p = a_position;
  v_positionWorld = p.xyz;
  float range = 2000.;
  p.xz *= range;
  p.y *= 300.;
  v_position = (u_worldViewProjection * p);
  gl_Position = v_position;
}