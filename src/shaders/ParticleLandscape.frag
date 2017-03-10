
varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;

void main() {
  // vec3 a_normal = normalize(v_normal);
  // vec3 surfaceToView = normalize(v_surfaceToView);
  // float litR = dot(a_normal, -surfaceToView) * 0.5 + 0.5;
  // gl_FragColor = outColor;
  // gl_FragColor = vec4(a_normal * 0.5 + 0.5, 1);
  vec3 green2 = vec3(0.66, 0.86, 0.51);
  vec3 blue = vec3(0.61, 0.89, 0.85);
  // vec3 ground = texture2D(u_groundTexture, v_texCoord).rgb;
  vec3 color = blue * v_color.rgb;// * dot(v_normal, vec3(0,0,1));
  // litR = segment(litR, 32.);
  gl_FragColor = vec4(color, 1);
}