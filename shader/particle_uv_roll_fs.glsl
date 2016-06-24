uniform float uniform_particleUVRoll[2];
void main() {
	particleUVRoll = vec2(particleVertex.x * uniform_particleUVRoll[0], particleVertex.x * uniform_particleUVRoll[1]);
}