
varying vec4 v_position;
varying vec4 v_color;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToView;

void main() {
  vec4 diffuseColor = texture2D(u_diffuse, v_texCoord);
  vec3 a_normal = normalize(v_normal);
  vec3 surfaceToView = normalize(v_surfaceToView);
  float litR = dot(a_normal, -surfaceToView) * 0.5 + 0.5;
  // gl_FragColor = outColor;
  // gl_FragColor = vec4(a_normal * 0.5 + 0.5, 1);
  vec3 green = vec3(0.55, 0.82, 0.35);
  vec3 brown = vec3(0.81, 0.56, 0.28);
  // vec3 ground = texture2D(u_groundTexture, v_texCoord).rgb;
  vec3 color = mix(green, brown, dot(a_normal, vec3(0,0,1)) * 2.);
  // litR = segment(litR, 32.);
  gl_FragColor = vec4(color * litR, 1);
  // gl_FragColor = vec4(a_normal * 0.5 + 0.5, 1.);
  // gl_FragColor = v_color;
}