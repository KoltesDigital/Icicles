
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frameBuffer;
uniform sampler2D spawnTexture;
uniform sampler2D velocityTexture;

void main()	{
	vec4 spawn = texture2D(spawnTexture, vUv);
	vec4 velocity = texture2D(velocityTexture, vUv);
	vec4 buffer = texture2D(frameBuffer, vUv);
	buffer.xyz += velocity.xyz;
	// buffer.xyz += normalize(buffer.xyz)*0.1;
	// spawn.xyz = rotateX(rotateY(spawn.xyz, time*0.2),time*0.1);
	float shouldRespawn = step(velocity.w, 0.0);
	// gl_FragColor = mix(buffer, spawn, shouldRespawn);
	gl_FragColor = spawn;
}