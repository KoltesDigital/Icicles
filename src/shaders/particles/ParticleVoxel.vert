
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

varying vec2 v_texCoord;
varying vec4 v_position;
varying vec4 v_color;
varying vec3 v_normal;
varying float v_depth;

void main ()
{
	float aspect = u_resolution.y / u_resolution.x;
	vec4 position = a_position;

	float voxelSize = u_voxelSize;//1.;
	vec3 gridSize = u_gridSize;//vec3(8,8,8);
	// vec3 targetWorld = vec3(4,0,0) / voxelSize;
	vec3 targetWorld = u_target / voxelSize;
	vec3 target = floor(targetWorld * gridSize + 0.5);
	position.xyz -= gridSize / 2.;
	position.xyz += target;

	float distanceCenter = distance(position.xyz / gridSize, targetWorld);
	float ratio = 1. - clamp(distanceCenter * 2., 0., 1.);

	vec3 noiseRange = vec3(0.2);//u_noiseRange;
	float noise1 = noiseIQ(position.xyz * noiseRange);
	float noise2 = noiseIQ(position.xyz * noiseRange + vec3(4.0, 8.0, 2.0));
	float noise3 = noiseIQ(position.xyz * noiseRange + vec3(32.0, 10.0, 7.0));

	vec3 normal = vec3(noise1, noise2, noise3);
	// vec3 normal = vec3(0,1,0);
	vec3 colorA = vec3(152. / 255., 177. / 255., 109. / 255.);
	vec3 colorB = vec3(35. / 255., 66. / 255., 9. / 255.);
	vec3 color = mix(colorA, colorB, noise1);

	vec2 leafSize = 8. * vec2(1,10) * ratio;// * noise1;//smoothstep(0.25, 1., noise1);
	// vec2 leafSize = u_leafSize * ratio * noise1;//smoothstep(0.25, 1., noise1);

	normal = normalize(normal * 2.0 - 1.0);

	position.xyz /= gridSize;
	position.xyz *= voxelSize;
	position.xyz += normal * 2.;//u_displacementScale;
	// position.xyz += normalize(position.xyz - targetWorld) * 2.;

	float angle = atan(normal.z, normal.x) + 3.1416 * .5;
	vec2 up = vec2(cos(angle) * aspect, sin(angle));
	vec2 right = vec2(up.y * aspect, -up.x);

	vec2 coord = a_texcoord;
	coord.x = coord.x * 2. - 1.;

	color.rgb *= abs(coord.y);

	position = (u_worldViewProjection * position);
	position.xy += up * coord.x * leafSize.x;
	position.xy += right * coord.y * leafSize.y;

	v_color = vec4(color, 1);
	gl_Position = position;
}
