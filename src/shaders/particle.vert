
attribute vec3 color;
attribute vec2 texcoord;
varying vec2 vTexcoord;
varying vec3 vColor;
varying vec3 vPosition;
uniform sampler2D spawnTexture;
uniform sampler2D positionTexture;
uniform float time;

void main() {
	vTexcoord = texcoord;
	vPosition = position;
	vColor = color;
	vec3 pos = texture2D(positionTexture, position.xy).xyz;
	pos = rotateX(rotateY(pos, time*0.2),time*0.1);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
	gl_Position.xy += texcoord * 0.05;
}