uniform float uniform_velocityOverX[18];
uniform float uniform_velocityOverY[18];
uniform float uniform_velocityOverZ[18];

void main() {
	if(discard_particle == 0.0){
		velocityOverVec3.x = calcSingleBezier(uniform_velocityOverX, currentTime/curParticle.life);
		velocityOverVec3.y = calcSingleBezier(uniform_velocityOverY, currentTime/curParticle.life);
		velocityOverVec3.z = calcSingleBezier(uniform_velocityOverZ, currentTime/curParticle.life);
	} 
}
