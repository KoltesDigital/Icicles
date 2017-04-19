define(['THREE', 'utils/assets'],	function(THREE, assets) {
	var uniforms = {
		time: { value: 1.0 },
		frameBuffer: { value: 0 },
		positionTexture: { value: 0 },
		velocityTexture: { value: 0 },
		feedbackTexture: { value: 0 },
		sceneTexture: { value: 0 },
		colorTexture: { value: 0 },
		normalTexture: { value: 0 },
		spawnTexture: { value: 0 },
		raymarchingTexture: { value: 0 },
		panoramaTexture: { value: assets.textures.panorama },
		meshTexture: { value: assets.textures.male },
		resolution: { value: 0 },
		eye: { value: 0 },
		front: { value: 0 },
		right: { value: 0 },
		up: { value: 0 },
		feedbackBlend: { value: 0 },
	};

	return uniforms;
});