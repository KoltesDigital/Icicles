
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D feedbackTexture;
uniform sampler2D raymarchingTexture;
uniform sampler2D sceneTexture;

void main()	{
	vec2 uv = vUv;
	// uv.x += sin(time+uv.y*10.)*0.1;
	vec4 color = texture2D(feedbackTexture, uv);
	gl_FragColor = color;
}