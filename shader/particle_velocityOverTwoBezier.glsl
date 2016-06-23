uniform float uniform_velocityOverX[15];
uniform float uniform_velocityOverY[15];
uniform float uniform_velocityOverZ[15];

uniform float uniform_velocityOverX2[15];
uniform float uniform_velocityOverY2[15];
uniform float uniform_velocityOverZ2[15];

attribute float attribute_velocityOverRandomSeed;

void main() {
	if(discard_particle < TrueOrFalse){
		velocityOverVec3.x = calcDoubleBezierArea(uniform_velocityOverX, uniform_velocityOverX2, currentTime, curParticle.life, attribute_velocityOverRandomSeed);
		velocityOverVec3.y = calcDoubleBezierArea(uniform_velocityOverY, uniform_velocityOverY2, currentTime, curParticle.life, attribute_velocityOverRandomSeed);
		velocityOverVec3.z = calcDoubleBezierArea(uniform_velocityOverZ, uniform_velocityOverZ2, currentTime, curParticle.life, attribute_velocityOverRandomSeed);
	}
}