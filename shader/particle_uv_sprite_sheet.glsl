uniform float uniform_particleSpriteSheet[2];
void calcUVCoord(vec3 particleVertex) {
	uv_0.xy += vec2(particleVertex.x * uniform_particleSpriteSheet[0], particleVertex.x * uniform_particleSpriteSheet[1]);
}

