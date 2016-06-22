uniform float uniform_velocityForceX[18];
uniform float uniform_velocityForceY[18];
uniform float uniform_velocityForceZ[18];

void main() {
	if(discard_particle == 0.0){
		velocityForceVec3.x = calcSingleBezier(uniform_velocityForceX, currentTime/curParticle.life);
		velocityForceVec3.y = calcSingleBezier(uniform_velocityForceY, currentTime/curParticle.life);
		velocityForceVec3.z = calcSingleBezier(uniform_velocityForceZ, currentTime/curParticle.life);
	} 
}
