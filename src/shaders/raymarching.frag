
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frameBuffer;
uniform sampler2D spawnTexture;
uniform sampler2D velocityTexture;
uniform mat4 cameraMatrix;

// Raymarching
const float rayEpsilon = 0.000001;
const float rayMin = 0.1;
const float rayMax = 1000.0;
const int rayCount = 50;

// Camera
uniform vec3 eye;
uniform vec3 front;
uniform vec3 right;
uniform vec3 up;
// vec3 right = vec3(1, 0, 0);
// vec3 up = vec3(0, 1, 0);

// Colors
vec3 lightColor = vec3(1.0, 1.0, 1.0);
vec3 skyColor = vec3(0, 0, 0.1);
vec3 shadowColor = vec3(0, 0, 0);

void main()	{

	// Ray from UV
	vec2 uv = vUv.xy * 2.0 - 1.0;
	uv.x *= resolution.x / resolution.y;
	vec3 ray = normalize(front + right * uv.x + up * uv.y);

	// Color
	vec3 color = skyColor;
	vec3 gridSize = vec3(1.0);

	// right = cross(normalize(front), up);

	// Raymarching
	float t = 0.0;
	for (int r = 0; r < rayCount; ++r)
	{
		// Ray Position
		vec3 p = eye + ray * t;

		// Distance to Sphere
		// p = mod(p, gridSize) - gridSize/2.;
		float c = pModPolar(p.xz, 5.);
		p.x -= sin(time) * 0.5 + 0.5;
		p.xyz = rotateY(rotateX(rotateZ(p.xyz, time*0.3), time*0.2), time*0.1);
		// p.xz += c;
		p.x += (noiseIQ(p.xyz*3.0)*2.-1.)*0.2;
		p.y += (noiseIQ(p.xyz*3.5)*2.-1.)*0.2;
		p.z += (noiseIQ(p.xyz*2.5)*2.-1.)*0.2;
		float d = sdBox(p, vec3(0.5));
		// float d = sphere(p, 0.2);

		// Distance min or max reached
		if (d < rayEpsilon || t > rayMax)
		{
			// Shadow from ray count
			color = mix(lightColor, shadowColor, float(r) / float(rayCount));
			// Sky color from distance
			// color = mix(color, skyColor, smoothstep(rayMin, rayMax, t));
			break;
		}

		// Distance field step
		t += d;
	}

	// Hop
	gl_FragColor = vec4(color, 1);
}