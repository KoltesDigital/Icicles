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
  lit = lit * 0.5 + 0.5;
  // lit = 1. - lit;

  vec4 positionView = u_view * u_world * position;
	float far = 1.-clamp(abs(positionView.z)*0.0005,0.,1.);

  v_color = vec4(1);
  v_color.rgb *= lit * far;
  gl_Position = u_worldViewProjection * position;
}
