
precision mediump float;

uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;
uniform float u_time;

attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
attribute vec2 a_center;

varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

vec3 displaceWave (vec3 p)
{
  p.y += sin(length(p) * 0.3 - u_time) * 4.;
  p.y *= 1. - clamp(length(p.xyz)*0.02,0.,1.);
  return p;
}

vec3 getOffset ()
{
  // return vec3(0);
  return vec3(u_time * 10. + 1000.,0,0);
}

vec3 displace (vec3 p)
{
  vec3 offset = getOffset();
  p.y += noiseIQ((p + offset) * 0.03) * 3.;
  p.y += noiseIQ((p + offset) * 0.07) * 6.;
  return p;
}

void main() {
  v_color = a_color;
  vec4 p = a_position;
  p.xyz = displace(p.xyz);
  // p.y *= length

  // p.xyz += getOffset();
  // p.x = mod(abs(p.x), 100.) - 50.;
  // p.x *= -1.;

  vec3 c = vec3(a_center.x, 0, a_center.y);
  c += getOffset();
  // p.y += noiseIQ(c*0.1);

  // vec3 green = vec3(0.55, 0.82, 0.35);
  vec3 brown = vec3(0.81, 0.56, 0.28);
  v_color = vec4(brown * noiseIQ(c.xyz * 0.1), 1.);

  float neighbor = 1.;
  vec3 north = displace(p.xyz + vec3(0,0,neighbor));
  vec3 south = displace(p.xyz + vec3(0,0,-neighbor));
  vec3 east = displace(p.xyz + vec3(neighbor,0,0));
  vec3 west = displace(p.xyz + vec3(-neighbor,0,0));
  vec3 normal = cross(normalize(south - north), normalize(west - east));

  // p.xyz -= normalize(vec3(normal.x,0,normal.z));

  v_position = (u_worldViewProjection * p);
  v_normal = (u_worldInverseTranspose * vec4(normal, 0)).xyz;
  v_surfaceToLight = u_lightWorldPos - (u_world * p).xyz;
  v_surfaceToView = (u_viewInverse[3] - (u_world * p)).xyz;
  gl_Position = v_position;

  float uvScale = 0.005;
  p.xyz += getOffset();
  v_texCoord = mod(abs(p.xz*uvScale), 1.);
}