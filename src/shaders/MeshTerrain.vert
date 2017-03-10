
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
attribute vec2 a_center;
attribute vec2 a_grid;

varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToView;

void main() {
  v_color = a_color;
  vec4 p = a_position;

  float range = 1000.;
  vec3 c = vec3(a_center.x, 0, a_center.y);
  vec3 normal = getNormal(c);

  p.xyz = displace(p.xyz);


  p.xyz = p.xyz - c;

  // c.xyz += getOffset();
  // c.x = mod((c.x), range) - range/2.;

  p.xyz = p.xyz + c;
  // p.y *= length
  // p.xyz += getOffset();
  // p.x = mod(abs(p.x), 100.) - 50.;
  // p.x *= -1.;

  // c += getOffset();
  // p.y += noiseIQ(c*0.1);

  // vec3 green = vec3(0.55, 0.82, 0.35);
  vec3 brown = vec3(0.81, 0.56, 0.28);
  v_color = vec4(brown * noiseIQ(c.xyz * 0.1), 1.);


  // p.xyz -= normalize(vec3(normal.x,0,normal.z));

  v_position = (u_worldViewProjection * p);
  v_normal = (u_worldInverseTranspose * vec4(normal, 0)).xyz;
  v_surfaceToView = (u_viewInverse[3] - (u_world * p)).xyz;
  gl_Position = v_position;

  float uvScale = 0.2;
  p.xyz += getOffset();
  v_texCoord = mod(abs(p.xz*uvScale), 1.);
}