uniform float uniform_particleUVRoll[2];
void calcUVCoord(vec3 particleVertex) {
	uv_0.xy += vec2(particleVertex.x * uniform_particleUVRoll[0], particleVertex.x * uniform_particleUVRoll[1]);
}

