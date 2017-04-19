
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frameBuffer;
uniform sampler2D sceneTexture;

void main()	{
	vec2 uv = vUv;
	// uv.x += sin(time+uv.y*10.)*0.1;
	vec4 scene = texture2D(sceneTexture, uv);
	vec4 buffer = texture2D(frameBuffer, uv);
	vec4 color = mix(buffer, scene, feedbackBlend);
	gl_FragColor = color;
}