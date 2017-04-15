
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frame;
uniform sampler2D positionTexture;

void main()	{
	vec4 spawn = texture2D(positionTexture, vUv);
	vec4 buffer = texture2D(frame, vUv);
	buffer.x += (noiseIQ(spawn.xyz+buffer.xyz*5.)*2.-1.)*0.1;
	buffer.y += (noiseIQ(spawn.xyz+buffer.xyz*4.)*2.-1.)*0.1;
	buffer.z += (noiseIQ(spawn.xyz+buffer.xyz*6.)*2.-1.)*0.1;
	// buffer.xyz += normalize(buffer.xyz)*0.1;
	spawn.xyz = rotateX(rotateY(spawn.xyz, time*0.2),time*0.1);
	gl_FragColor = mix(spawn, buffer, smoothstep(0.4,0.6,abs(noiseIQ(spawn.xyz*3.))));
}