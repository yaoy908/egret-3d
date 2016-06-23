uniform float uniform_velocityLimit[15];

void main() {
	if(discard_particle < TrueOrFalse){
		velocityLimitVec2.x = calcOneBezierArea(uniform_velocityLimit, currentTime, curParticle.life, 1.0);
		velocityLimitVec2.y = 1.0;
	}
}