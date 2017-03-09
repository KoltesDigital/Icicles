
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