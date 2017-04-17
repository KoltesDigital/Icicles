
attribute vec3 color;
attribute vec2 anchor;
attribute vec2 texcoord;
attribute vec2 uvMesh;
varying vec2 vTexcoord;
varying vec2 vUVMesh;
varying vec2 vAnchor;
varying vec2 vScreenUV;
varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vViewDir;
uniform sampler2D spawnTexture;
uniform sampler2D colorTexture;
uniform sampler2D positionTexture;
uniform sampler2D velocityTexture;
uniform float time;

void main() {
	vTexcoord = texcoord;
	vAnchor = anchor;
	vUVMesh = uvMesh;

	vec3 pos = texture2D(positionTexture, vTexcoord).xyz;
	vec3 col = texture2D(colorTexture, vTexcoord).xyz;
	// pos = rotateX(rotateY(pos, time*0.2),time*0.1);
	vec4 posWorld = modelMatrix * vec4( pos, 1.0 );
	
	vec3 viewDir = normalize(posWorld.xyz - cameraPosition.xyz);
	vec4 velocity = texture2D(velocityTexture, vTexcoord);
	float magnitude = length(velocity.xyz);
	// vColor = normalize(velocity.xyz) * 0.5 + 0.5;
	vColor = col;
	// vColor = vec3(vTexcoord.xy,0);
	// vColor = normal * 0.5 + 0.5;
	vNormal = (modelMatrix * vec4(normal,0)).xyz;

	float fade = smoothstep(0.0, 0.1, velocity.w) * (1. - smoothstep(0.9, 1.0, velocity.w));
	fade = mix(fade, 1., step(1., velocity.w));

	float stretch = (1.+magnitude*100.);

	// world space
	vec3 tangent = normalize(cross(vec3(0,1,0), normal));
	vec3 up = normalize(cross(tangent, normal));

	float moving = step(0.01, magnitude);
	// velocity space
	vec3 e = vec3(0.00001);
	tangent = mix(tangent, normalize(cross(normalize(velocity.xyz + e), normal)), moving);
	up = mix(up, normalize(velocity.xyz + e)*stretch, moving);

	float size = 0.01 + rand(vTexcoord) * 0.01 + magnitude;
	posWorld.xyz += (anchor.x * tangent + anchor.y * up) * size * fade;

	vViewDir = posWorld.xyz - cameraPosition;

	gl_Position = projectionMatrix * viewMatrix * posWorld;

	// screen space
	// gl_Position.xy += anchor * size;// * fade;

	vScreenUV = (gl_Position.xy/gl_Position.w) * 0.5 + 0.5;
}