
varying vec2 vTexcoord;
varying vec3 vColor;
varying vec3 vPosition;
uniform vec2 resolution;
uniform float time;

void main()	{
	gl_FragColor = vec4(vColor,1.);
}