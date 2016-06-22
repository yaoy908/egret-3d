uniform float uniform_size_compressed[18];
void main() {
	localPosition.xyz *= calcSingleBezier(uniform_size_compressed, currentTime/curParticle.life);
}
