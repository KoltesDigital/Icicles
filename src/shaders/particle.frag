
varying vec2 vTexcoord;
varying vec2 vAnchor;
varying vec3 vColor;
varying vec3 vPosition;
uniform vec2 resolution;
uniform float time;

void main()	{
	if (length(vAnchor) > 0.5) discard;
	gl_FragColor = vec4(vColor,1.);
}