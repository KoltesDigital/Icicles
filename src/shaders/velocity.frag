
varying vec2 vUv;
uniform vec2 resolution;
uniform vec3 pivot;
uniform float time;
uniform sampler2D frameBuffer;
uniform sampler2D spawnTexture;
uniform sampler2D positionTexture;
uniform sampler2D colorTexture;
uniform sampler2D normalTexture;
uniform mat4 matrix;

void main()	{
	vec3 spawn = texture2D(spawnTexture, vUv).xyz;
	vec4 buffer = texture2D(frameBuffer, vUv);
	vec3 position = texture2D(positionTexture, vUv).xyz;
	vec3 normal = texture2D(normalTexture, vUv).xyz;
	vec3 color = texture2D(colorTexture, vUv).rgb;

	vec3 epsilon = vec3(1)*0.00001;

	// target
	vec3 target = normalize(vec3(0) - position.xyz + epsilon) * velocityTargetBlend;

	// noisey
	vec3 noisey = vec3(0.);
	vec3 seed = spawn+position+buffer.xyz;
	// seed = rotateX(rotateY(seed, time*0.03), time*0.06);
	noisey.x += (noiseIQ(seed.xyz*2.5)*2.-1.);
	noisey.y += (noiseIQ(seed.xyz*1.4)*2.-1.);
	noisey.z += (noiseIQ(seed.xyz*3.3)*2.-1.);
	noisey.xyz *= velocityNoiseBlend;

	// tornardo
	vec3 tornado = normalize(epsilon + position - (target + rotateY(position - target, abs(position.y )))) * velocityTornadoBlend;

	// dir
	vec3 dir = vec3(0,1,0) * velocityDirectionBlend;

	// origin
	vec3 origin = normalize(spawn.xyz - position.xyz + epsilon) * velocityOriginBlend;

	// apply
	// spawn.xyz = rotateX(rotateY(spawn.xyz, time*0.2),time*0.1);
	float should = smoothstep(turbulenceRangeMin,turbulenceRangeMax,mod(noiseIQ(seed) + time * 0.1,1.0));
	vec3 offset = (tornado + dir + noisey + target) * should + origin * (1. - should);
	gl_FragColor.xyz = mix(buffer.xyz * velocityFrictionBlend, offset * velocitySpeed, velocityDamping);

	// spawning
	float spawnOffset = rand(vUv) * 0.006 + 0.006;
	gl_FragColor.w = mix(mod(buffer.w + spawnOffset, 1.0), -1.0, step(1.0, buffer.w + spawnOffset));
	// gl_FragColor.w = mix(0.5, gl_FragColor.w, should);
}