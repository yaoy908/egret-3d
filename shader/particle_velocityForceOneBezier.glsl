uniform float uniform_velocityForceX[15];
uniform float uniform_velocityForceY[15];
uniform float uniform_velocityForceZ[15];

void main() {
	if(discard_particle < TrueOrFalse){
		velocityForceVec3.x = calcOneBezierArea(uniform_velocityOverX, currentTime, curParticle.life, 1.0);
		velocityForceVec3.y = calcOneBezierArea(uniform_velocityOverY, currentTime, curParticle.life, 1.0);
		velocityForceVec3.z = calcOneBezierArea(uniform_velocityOverZ, currentTime, curParticle.life, 1.0);
	} 
}
