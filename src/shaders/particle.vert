
attribute vec3 color;
attribute vec2 texcoord;
attribute vec2 anchor;
varying vec2 vTexcoord;
varying vec2 vAnchor;
varying vec3 vColor;
uniform sampler2D spawnTexture;
uniform sampler2D colorTexture;
uniform sampler2D positionTexture;
uniform sampler2D velocityTexture;
uniform float time;

void main() {
	vTexcoord = texcoord;
	vAnchor = anchor;

	vec3 pos = position;//texture2D(positionTexture, vTexcoord).xyz;
	vec3 col = texture2D(colorTexture, vTexcoord).xyz;
	// pos = rotateX(rotateY(pos, time*0.2),time*0.1);
	vec4 posWorld = modelMatrix * vec4( pos, 1.0 );
	
	vec3 viewDir = normalize(posWorld.xyz - cameraPosition.xyz);
	vec4 velocity = texture2D(velocityTexture, vTexcoord);
	// vColor = normalize(velocity.xyz) * 0.5 + 0.5;
	vColor = col;
	// vColor = vec3(vTexcoord.xy,0);
	// vColor = normal * 0.5 + 0.5;

	float fade = smoothstep(0.0, 0.1, velocity.w) * (1. - smoothstep(0.9, 1.0, velocity.w));
	fade = mix(fade, 1., step(1., velocity.w));

	vec3 tangent = normalize(cross(vec3(0,1,0), normal));
	vec3 up = normalize(cross(tangent, normal));

	posWorld.xyz += (anchor.x * tangent + anchor.y * up) * 0.025;

	gl_Position = projectionMatrix * viewMatrix * posWorld;
	// gl_Position.xy += anchor * 0.025;// * fade;
}