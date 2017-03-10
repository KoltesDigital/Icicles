
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_center;
attribute vec2 a_grid;

varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;

void main ()
{
  vec4 p = a_position;

  float range = 10.;

  // p.xyz = rotateZ
  p.xyz *= range * 10.;

  p.y = noiseIQ(p.xyz * 16.);
  p.y += 3.0;

  v_color = vec4(vec3(1) * (noiseIQ(p.xyz) * 0.5 + 0.5), 1);

  // float ratio = (p.x / 10.) + p.z * 0.02;
  // p.xyz += getOffset();
  // p.x = mod((p.x), range) - range/2.;

  v_position = u_worldViewProjection * p;
  gl_Position = v_position;
}