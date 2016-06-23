uniform float uniform_velocityOverX[15];
uniform float uniform_velocityOverY[15];
uniform float uniform_velocityOverZ[15];

void main() {
	if(discard_particle < TrueOrFalse){
		velocityOverVec3.x = calcOneBezierArea(uniform_velocityOverX, currentTime, curParticle.life, 1.0);
		velocityOverVec3.y = calcOneBezierArea(uniform_velocityOverY, currentTime, curParticle.life, 1.0);
		velocityOverVec3.z = calcOneBezierArea(uniform_velocityOverZ, currentTime, curParticle.life, 1.0);
	} 
}
