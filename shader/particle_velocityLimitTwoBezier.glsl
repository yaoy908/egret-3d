uniform float uniform_velocityLimit[15];
uniform float uniform_velocityLimit2[15];
attribute float attribute_velocityLimitRandomSeed;

void main() {
	if(discard_particle < TrueOrFalse){
		velocityLimitVec2.x = calcDoubleBezierArea(uniform_velocityLimit, uniform_velocityLimit2, currentTime, curParticle.life, attribute_velocityLimitRandomSeed);

		if(velocityLimitVec2.x < 0.0){
			velocityLimitVec2.x = 0.0;
		}
		velocityLimitVec2.y = 1.0;
	} 
}

