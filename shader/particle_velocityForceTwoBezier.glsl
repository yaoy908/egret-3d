uniform float uniform_velocityForceX[18];
uniform float uniform_velocityForceY[18];
uniform float uniform_velocityForceZ[18];

uniform float uniform_velocityForceX2[18];
uniform float uniform_velocityForceY2[18];
uniform float uniform_velocityForceZ2[18];

attribute float attribute_velocityForceRandomSeed;

void main() {
	if(discard_particle == 0.0){
		velocityForceVec3.x = calcDoubleBezier(uniform_velocityForceX, uniform_velocityForceX2, currentTime/curParticle.life, attribute_velocityForceRandomSeed);
		velocityForceVec3.y = calcDoubleBezier(uniform_velocityForceY, uniform_velocityForceY2, currentTime/curParticle.life, attribute_velocityForceRandomSeed);
		velocityForceVec3.z = calcDoubleBezier(uniform_velocityForceZ, uniform_velocityForceZ2, currentTime/curParticle.life, attribute_velocityForceRandomSeed);
	}
}