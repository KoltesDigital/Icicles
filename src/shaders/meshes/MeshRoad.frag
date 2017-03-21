
varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;
varying vec2 v_texcoord;

void main ()
{
  vec3 gray = vec3(0.54, 0.56, 0.58);
  float shade = 1.-smoothstep(0.0,0.9,abs(v_texcoord.x));
  vec4 color = vec4(gray * shade, 1);
  vec2 uv = v_texcoord;
  uv.y *= 0.25;
  uv = mod(abs(uv),1.);
  color.rgb = mix(color.rgb, vec3(1), step(uv.x,0.075) * step(uv.y,0.3));
  gl_FragColor = color;
}