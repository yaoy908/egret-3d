uniform float uniform_velocityOverX[18];
uniform float uniform_velocityOverY[18];
uniform float uniform_velocityOverZ[18];

uniform float uniform_velocityOverX2[18];
uniform float uniform_velocityOverY2[18];
uniform float uniform_velocityOverZ2[18];

attribute float attribute_velocityOverRandomSeed;

void main() {
	velocityOverVec3.xyz = calcVelocityOverBezierRandom(emit);
}

vec3 calcVelocityOverBezierRandom(ParticleData particle){
	vec3 res1 = vec3(0.0,0.0,0.0);
	vec3 res2 = vec3(0.0,0.0,0.0);

	//____x
	vec2 velocityOverPointsX[16];
	vec2 velocityOverPointsX2[16];
	for(int vox = 0; vox < 16; vox ++){
		velocityOverPointsX[vox] = decompressFloat(uniform_velocityOverX[16], uniform_velocityOverX[17], uniform_velocityOverX[vox]);
		velocityOverPointsX2[vox] = decompressFloat(uniform_velocityOverX2[16], uniform_velocityOverX2[17], uniform_velocityOverX2[vox]);
	}
	res1.x = calcBezier(velocityOverPointsX, currentTime/particle.life);
	res2.x = calcBezier(velocityOverPointsX2, currentTime/particle.life);
	//___y
	vec2 velocityOverPointsY[16];
	vec2 velocityOverPointsY2[16];
	for(int voy = 0; voy < 16; voy ++){
		velocityOverPointsY[voy] = decompressFloat(uniform_velocityOverY[16], uniform_velocityOverY[17], uniform_velocityOverY[voy]);
		velocityOverPointsY2[voy] = decompressFloat(uniform_velocityOverY2[16], uniform_velocityOverY2[17], uniform_velocityOverY2[voy]);
	}
	res1.y = calcBezier(velocityOverPointsY, currentTime/particle.life);
	res2.y = calcBezier(velocityOverPointsY2, currentTime/particle.life);
	//___z
	vec2 velocityOverPointsZ[16];
	vec2 velocityOverPointsZ2[16];
	for(int voz = 0; voz < 16; voz ++){
		velocityOverPointsZ[voz] = decompressFloat(uniform_velocityOverZ[16], uniform_velocityOverZ[17], uniform_velocityOverZ[voz]);
		velocityOverPointsZ2[voz] = decompressFloat(uniform_velocityOverZ2[16], uniform_velocityOverZ2[17], uniform_velocityOverZ2[voz]);
	}
	res1.z = calcBezier(velocityOverPointsZ, currentTime/particle.life);
	res2.z = calcBezier(velocityOverPointsZ2, currentTime/particle.life);
	//

	res1 = attribute_velocityOverRandomSeed * res1 + (1.0 - attribute_velocityOverRandomSeed) * res2;
	return res1;
}
