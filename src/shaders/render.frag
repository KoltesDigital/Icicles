
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frame;
uniform sampler2D positionTexture;
uniform sampler2D spawnTexture;

void main()	{
	vec4 color = abs(texture2D(spawnTexture, vUv));
	gl_FragColor = color;
}