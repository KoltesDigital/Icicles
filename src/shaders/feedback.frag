
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D frame;
uniform sampler2D positionTexture;

void main()	{
	vec4 color = texture2D(frame, vUv);
	gl_FragColor = color;
}