
varying vec2 vTexcoord;
varying vec2 vAnchor;
varying vec3 vColor;
varying vec3 vViewDir;
varying vec3 vNormal;
varying vec3 vPosition;
uniform vec2 resolution;
uniform sampler2D panoramaTexture;
uniform float time;

void main()	{
	if (length(vAnchor) > 0.5) discard;

	// Convert to Spherical Coordinates
	vec3 viewDir = normalize(vViewDir);
	// vec3 sphere_pnt = viewDir;
	float panoRatio = sin(time*0.2)*0.5+0.5;
	vec3 sphere_pnt = mix(cross(viewDir, normalize(vNormal)), viewDir, panoRatio);
	sphere_pnt = rotateX(sphere_pnt, -PI/2.);
	float r = length(sphere_pnt);
	float lon = atan(sphere_pnt.y, sphere_pnt.x);
	float lat = acos(sphere_pnt.z / r);
	vec2 uvPanorama = vec2((lon / PI) * 0.5 + 0.5, lat / PI);
	vec4 color = texture2D(panoramaTexture, uvPanorama);
	color = mix(vec4(vColor,1.), color, panoRatio);
	gl_FragColor = color;
}