
varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;

void main ()
{
  vec3 blue = vec3(0.61, 0.89, 0.85);
  gl_FragColor = vec4(blue, 1) * v_color;
}