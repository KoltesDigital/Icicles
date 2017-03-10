
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
attribute vec2 a_center;

varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;

void main() {
  v_color = a_color;
  vec4 p = a_position;
  // p.xz = p.xz * 2. - 1.;
  float angleOffset = noiseIQ(p.xyz * 16.);
  p.x += noiseIQ(p.xyz*32.)*0.4;
  p.z += noiseIQ(p.xyz*8.)*0.1;
  p.xz -= 0.5;
  float range = 80.;
  p.xz *= range;
  // p.xyz += getOffset();
  // float size = 10. * noiseIQ(p.xyz * 0.1);
  float size = 1. + 3. * (noiseIQ(p.xyz * 32.));
  vec3 offset = vec3(a_texcoord.x * 0.5, a_texcoord.y, 0) * size;
  offset = rotateZ(offset, noiseIQ(p.xyz*12.) * 3.14159 * 2.);

  v_color = vec4(vec3(1) * noiseIQ(p.xyz), 1);
  float ratio = (p.x / 10.) + p.z * 0.02;
  p.xyz += getOffset();
  p.x = mod((p.x), range) - range/2.;
  p.xyz = displace(p.xyz);
  // p.x *= -1.;
  // size *= sin(ratio * 3.14159) * 0.5 + 0.5;
  // offset.x += a_texcoord.y * size * 0.1;
  // p.y += 0.1;
  // p.xyz += rotateY(offset, angleOffset);
  v_position = (u_worldViewProjection * p);
  v_normal = rotateY(vec3(0,0,1), angleOffset);
  v_position.xyz += offset;
  // v_position = vec4(p.xzy + offset, sin(u_time));
  gl_Position = v_position;
}