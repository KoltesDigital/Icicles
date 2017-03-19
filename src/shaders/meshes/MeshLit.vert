attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main ()
{
  vec4 position = u_model * a_position;

  v_texCoord = a_texcoord;
  v_normal = (u_worldInverseTranspose * u_model * vec4(a_normal, 0)).xyz;
  v_surfaceToLight = u_lightWorldPos - (u_world * position).xyz;
  v_surfaceToView = (u_viewInverse[3] - (u_world * position)).xyz;

  gl_Position = u_worldViewProjection * position;
}
