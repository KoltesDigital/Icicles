
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D feedbackTexture;
uniform sampler2D raymarchingTexture;
uniform sampler2D sceneTexture;

void main()	{
	vec4 color = texture2D(feedbackTexture, vUv);
	gl_FragColor = color;
}