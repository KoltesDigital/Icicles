
varying vec2 vTexcoord;
varying vec2 vAnchor;
varying vec3 vColor;
varying vec3 vViewDir;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vScreenUV;
uniform vec2 resolution;
uniform sampler2D panoramaTexture;
uniform sampler2D raymarchingTexture;
uniform float time;

void main()	{
	if (length(vAnchor) > 0.5) discard;

	float ratio = sin(time*0.2)*0.5+0.5;
	float ratio1 = smoothstep(0.33, 0.66, ratio);
	float ratio2 = smoothstep(0.66, 1.0, ratio);

	// Convert to Spherical Coordinates
	vec3 viewDir = normalize(vViewDir);
	vec3 sphere_pnt = mix(cross(viewDir, normalize(vNormal)), viewDir, ratio1);
	sphere_pnt = rotateX(sphere_pnt, -PI/2.);
	float r = length(sphere_pnt);
	float lon = atan(sphere_pnt.y, sphere_pnt.x);
	float lat = acos(sphere_pnt.z / r);
	vec2 uvPanorama = vec2((lon / PI) * 0.5 + 0.5, lat / PI);
	vec4 color = texture2D(panoramaTexture, uvPanorama);
	color = mix(vec4(vColor,1.), color, ratio1);

	vec4 raymarch = texture2D(raymarchingTexture, vScreenUV);
	color = mix(color, raymarch, ratio2);
	gl_FragColor = color;
}