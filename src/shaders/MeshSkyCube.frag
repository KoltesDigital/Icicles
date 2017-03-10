
varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToView;
varying vec3 v_positionWorld;

void main() {
  vec3 blue = vec3(0.23, 0.85, 1.00);
  vec3 blueLight = vec3(0.73, 0.94, 0.99);
  blue = mix(blue, blueLight, clamp(v_positionWorld.y,0.,1.));
  blue.rgb *= step(0., v_positionWorld.y);
  gl_FragColor = vec4(blue, 1);
}