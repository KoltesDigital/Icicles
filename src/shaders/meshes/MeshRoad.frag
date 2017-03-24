
varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;
varying vec4 v_positionView;
varying vec2 v_texcoord;

void main ()
{
  vec3 gray = vec3(0.54, 0.56, 0.58);
  float shade = 1.-smoothstep(0.0,0.9,abs(v_texcoord.x));
  // vec4 color = vec4(gray * shade, 1);
  float far = 1. - clamp(abs(v_positionView.z) * 0.0008,0.,1.);
  vec4 color = vec4(0,0,0,1);
  vec2 uv = v_texcoord;
  uv.y *= 0.25;
  uv = mod(abs(uv),1.);
  color.rgb = mix(color.rgb, vec3(1), step(uv.x,0.075) * step(uv.y,0.3));
  color.rgb += (1.-shade) * vec3(1) * smoothstep(0.4, 0.8, sin(uv.x * PI * 60.));
  // color.rgb += (1.-shade) * vec3(1) * step(0.8, sin(uv.x * PI * 60.));
  // color.rgb = mix(gray, color.rgb, far);
  gl_FragColor = color;
}