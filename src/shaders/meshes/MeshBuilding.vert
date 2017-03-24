attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec4 v_color;

void main ()
{
  vec4 position = u_model * a_position;

  v_texCoord = a_texcoord;
  v_normal = normalize((u_worldInverseTranspose * u_model * vec4(a_normal, 0)).xyz);
  vec3 surfaceToView = normalize((u_viewInverse[3] - (u_world * position)).xyz);

  float lit = dot(v_normal, surfaceToView);
  v_color = vec4(1);
  v_color.rgb *= lit;
  gl_Position = u_worldViewProjection * position;
}
