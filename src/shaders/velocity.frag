
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frameBuffer;
uniform sampler2D spawnTexture;
uniform sampler2D positionTexture;

void main()	{
	vec4 spawn = texture2D(spawnTexture, vUv);
	vec4 buffer = texture2D(frameBuffer, vUv);
	vec4 position = texture2D(positionTexture, vUv);
	vec3 offset = vec3(0.);
	vec3 seed = spawn.xyz+position.xyz;
	seed = rotateX(rotateY(seed, time*0.3), time*0.6);
	offset.x += (noiseIQ(seed.xyz*2.5)*2.-1.)*0.1;
	offset.y += (noiseIQ(seed.xyz*0.4)*2.-1.)*0.1;
	offset.z += (noiseIQ(seed.xyz*1.3)*2.-1.)*0.1;
	offset.xyz *= 0.01;
	// buffer.xyz += normalize(buffer.xyz)*0.1;
	//spawn.xyz = rotateX(rotateY(spawn.xyz, time*0.2),time*0.1);
	float should = smoothstep(0.4,0.6,abs(noiseIQ(spawn.xyz*3.)));
	// gl_FragColor.xyz = buffer.xyz * 0.95 + mix(vec3(0), offset, should);
	buffer.xyz *= 0.99;
	gl_FragColor.xyz = mix(buffer.xyz, buffer.xyz + offset, 0.5);
	float spawnOffset = rand(vUv) * 0.01 + 0.001;
	gl_FragColor.w = mix(mod(buffer.w + spawnOffset, 1.0), -1.0, step(1.0, buffer.w + spawnOffset));
	// gl_FragColor.w = mod(buffer.w + spawnOffset, 1.0);
}