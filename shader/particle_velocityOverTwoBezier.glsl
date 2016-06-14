uniform float uniform_velocityOverX[18];
uniform float uniform_velocityOverY[18];
uniform float uniform_velocityOverZ[18];

uniform float uniform_velocityOverX2[18];
uniform float uniform_velocityOverY2[18];
uniform float uniform_velocityOverZ2[18];

attribute float attribute_velocityOverRandomSeed;

void main() {
	if(discard_particle == 0.0){
		velocityOverVec3.x = calcDoubleBezier(uniform_velocityOverX, uniform_velocityOverX2, currentTime/curParticle.life, attribute_velocityOverRandomSeed);
		velocityOverVec3.y = calcDoubleBezier(uniform_velocityOverY, uniform_velocityOverY2, currentTime/curParticle.life, attribute_velocityOverRandomSeed);
		velocityOverVec3.z = calcDoubleBezier(uniform_velocityOverZ, uniform_velocityOverZ2, currentTime/curParticle.life, attribute_velocityOverRandomSeed);
	}
}