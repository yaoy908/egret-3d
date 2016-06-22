uniform float uniform_bezierSize[15];
void main() {
	float bezierSize = calcOneBezierSize(uniform_bezierSize, currentTime, curParticle.life, 1.0);
	localPosition.xyz *= bezierSize;
}

