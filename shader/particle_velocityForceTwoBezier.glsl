uniform float uniform_velocityForceX[15];
uniform float uniform_velocityForceY[15];
uniform float uniform_velocityForceZ[15];

uniform float uniform_velocityForceX2[15];
uniform float uniform_velocityForceY2[15];
uniform float uniform_velocityForceZ2[15];

attribute float attribute_velocityForceRandomSeed;

void main() {
	if(discard_particle < TrueOrFalse){
		velocityForceVec3.x = calcDoubleBezierArea(uniform_velocityForceX, uniform_velocityForceX2, currentTime, curParticle.life, attribute_velocityForceRandomSeed);
		velocityForceVec3.y = calcDoubleBezierArea(uniform_velocityForceY, uniform_velocityForceY2, currentTime, curParticle.life, attribute_velocityForceRandomSeed);
		velocityForceVec3.z = calcDoubleBezierArea(uniform_velocityForceZ, uniform_velocityForceZ2, currentTime, curParticle.life, attribute_velocityForceRandomSeed);
	}
}