uniform float uniform_velocityOverX[27];
uniform float uniform_velocityOverY[27];
uniform float uniform_velocityOverZ[27];

void main() {
	if(discard_particle == 0.0){
		velocityOverVec3.x = calcOneBezierArea(uniform_velocityOverX, currentTime, curParticle.life, 1.0);
		velocityOverVec3.y = calcOneBezierArea(uniform_velocityOverY, currentTime, curParticle.life, 1.0);
		velocityOverVec3.z = calcOneBezierArea(uniform_velocityOverZ, currentTime, curParticle.life, 1.0);
	} 
}
