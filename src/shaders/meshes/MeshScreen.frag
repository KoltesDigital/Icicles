
varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;

void main() {
  vec2 uv = v_texCoord;
  // uv.x += sin(uv.y * 1000.) * 0.01;
  // float angle = rand(uv) * PI2;
  // uv.xy += vec2(cos(angle), sin(angle)) * 0.002;
  vec4 background = texture2D(u_frameBackground, uv);
  vec4 color = texture2D(u_frameBuffer, uv);
  color = mix(background, color, step(0.0001,luminance(color.rgb)));
  gl_FragColor = color;
}