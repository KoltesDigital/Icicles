
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frameBuffer;
uniform sampler2D spawnTexture;
uniform sampler2D positionTexture;
uniform sampler2D colorTexture;
uniform sampler2D normalTexture;

void main()	{
	vec3 spawn = texture2D(spawnTexture, vUv).xyz;
	vec4 buffer = texture2D(frameBuffer, vUv);
	vec3 position = texture2D(positionTexture, vUv).xyz;
	vec3 normal = texture2D(normalTexture, vUv).xyz;
	vec3 color = texture2D(colorTexture, vUv).rgb;
	vec3 target = vec3(0);

	float speed = 0.01;
	vec3 epsilon = vec3(1)*0.00001;

	// noisey
	vec3 noisey = vec3(0.);
	vec3 seed = spawn+position+buffer.xyz;
	// seed = rotateX(rotateY(seed, time*0.03), time*0.06);
	noisey.x += (noiseIQ(seed.xyz*2.5)*2.-1.)*0.2;
	noisey.y += (noiseIQ(seed.xyz*1.4)*2.-1.)*0.2;
	noisey.z += (noiseIQ(seed.xyz*3.3)*2.-1.)*0.2;
	noisey.xyz *= speed;

	// tornardo
	float tornadoSpeed = 0.1;
	vec3 tornado = normalize(epsilon + position - (target + rotateY(position - target, abs(position.y )))) * speed * tornadoSpeed;

	// dir
	float dirSpeed = 0.05;
	vec3 dir = vec3(0,1,0) * speed * dirSpeed;

	// origin
	float originSpeed = 0.1;
	vec3 origin = normalize(spawn.xyz - position.xyz + epsilon) * speed * originSpeed;

	// apply
	// spawn.xyz = rotateX(rotateY(spawn.xyz, time*0.2),time*0.1);
	float should = smoothstep(0.3,0.7,mod(noiseIQ(seed) + time * 0.05,1.0));
	gl_FragColor.xyz  = buffer.xyz * 0.9 + (tornado + dir + noisey) * should + origin * (1. - should);// * step(1.0, length(spawn.xyz - position.xyz));

	// spawning
	float spawnOffset = rand(vUv) * 0.003 + 0.003;
	gl_FragColor.w = mix(mod(buffer.w + spawnOffset, 1.0), -1.0, step(1.0, buffer.w + spawnOffset));
	// gl_FragColor.w = mix(0.5, gl_FragColor.w, should);
}