
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frameBuffer;
uniform sampler2D sceneTexture;

void main()	{
	vec4 scene = texture2D(sceneTexture, vUv);
	vec4 buffer = texture2D(frameBuffer, vUv);
	vec4 color = mix(buffer, scene, feedbackBlend);
	gl_FragColor = color;
}