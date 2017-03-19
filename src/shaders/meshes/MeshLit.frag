
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main ()
{
  vec3 a_normal = normalize(v_normal);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  vec3 surfaceToView = normalize(v_surfaceToView);
  float lit = dot(a_normal, surfaceToView) * 0.5 + 0.5;

  gl_FragColor = vec4(vec3(1)*lit,1);
}
