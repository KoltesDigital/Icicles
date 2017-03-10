
varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;

void main() {
  // vec3 a_normal = normalize(v_normal);
  // vec3 surfaceToView = normalize(v_surfaceToView);
  // float litR = dot(a_normal, -surfaceToView) * 0.5 + 0.5;
  // gl_FragColor = outColor;
  // gl_FragColor = vec4(a_normal * 0.5 + 0.5, 1);
  vec3 green = vec3(0.55, 0.82, 0.35);
  vec3 brown = vec3(0.81, 0.56, 0.28);
  // vec3 ground = texture2D(u_groundTexture, v_texCoord).rgb;
  vec3 color = green * v_color.rgb;// * dot(v_normal, vec3(0,0,1));
  // litR = segment(litR, 32.);
  gl_FragColor = vec4(color, 1);
}