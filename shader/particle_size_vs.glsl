uniform float uniform_size_compressed[27];
void main() {
	localPosition.xyz *= calcOneBezierSize(uniform_size_compressed, currentTime, curParticle.life, 1.0);
}

