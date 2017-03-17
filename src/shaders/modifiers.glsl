
vec3 displaceWave (vec3 p)
{
  p.y += sin(length(p) * 0.3 - u_time) * 4.;
  p.y *= 1. - clamp(length(p.xyz)*0.02,0.,1.);
  return p;
}

vec3 getOffset ()
{
  return vec3(0);
  // return vec3(-u_time * 10. - 1000.,0,0);
}

vec3 displace (vec3 pp)
{
	// pp -= getOffset();
	vec3 p = pp;
  p.y += noiseIQ((pp - getOffset()) * 0.03) * 3.;
  p.y += noiseIQ((pp - getOffset()) * 0.07) * 6.;
  // p.x += noiseIQ(pp.xyz * 0.4) * 3.;
  // p.z += noiseIQ(pp.xyz * 0.4) * 3.;
  return p;
}

vec3 getNormal (vec3 center)
{
  float neighbor = 1.;
  vec3 north = displace(center.xyz + vec3(0,0,neighbor));
  vec3 south = displace(center.xyz + vec3(0,0,-neighbor));
  vec3 east = displace(center.xyz + vec3(neighbor,0,0));
  vec3 west = displace(center.xyz + vec3(-neighbor,0,0));
  return normalize(cross(normalize(south - north), normalize(west - east)));
}