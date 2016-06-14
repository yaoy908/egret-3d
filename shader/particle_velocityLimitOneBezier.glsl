uniform float uniform_velocityLimit[18];

void main() {
	if(discard_particle == 0.0){
		velocityLimitVec2.x = calcSingleBezier(uniform_velocityLimit, currentTime/curParticle.life);
		velocityLimitVec2.y = 1.0;
	}
}