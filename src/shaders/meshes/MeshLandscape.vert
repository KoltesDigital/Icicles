
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
attribute vec2 a_grid;

varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;

void main ()
{
  vec4 p = a_position;

  float height = 3.;

  p.xyz = rotateX(p.xyz, PI / 2.);
  p.y += 0.5;
  p.xyz *= 10.;
  p.x *= 100.;
  p.y *= height;
  // p.z = 1000.;
  p.z += p.y * 10.;

  float should = step(0.01, p.y);
  // p.z += sin(p.x * 3.)*100.;
  p.y += should * noiseIQ(p.xyz * 32.) * 30.;
  // p.y += should * p.z * 0.05;

  // p.y = noiseIQ(p.xyz * 16.);
  // p.y += 3.0;

  // v_color = vec4(vec3(1) * (noiseIQ(p.xyz) * 0.5 + 0.5), 1);
  // v_color = vec4(vec3(1) * mod(a_grid.y, 2.), 1);
  v_color = vec4(vec3(1) * a_texcoord.y, 1);

  // float ratio = (p.x / 10.) + p.z * 0.02;
  // float range = 1000.;
  // p.xyz += getOffset();
  // p.x = mod((p.x), range) - range/2.;

  v_position = u_worldViewProjection * p;
  gl_Position = v_position;
}