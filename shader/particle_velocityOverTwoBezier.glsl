uniform float uniform_velocityOverX[18];
uniform float uniform_velocityOverY[18];
uniform float uniform_velocityOverZ[18];

uniform float uniform_velocityOverX2[18];
uniform float uniform_velocityOverY2[18];
uniform float uniform_velocityOverZ2[18];

attribute float attribute_velocityOverRandomSeed;

void main() {
	if(discard_particle == 0.0){
		velocityOverVec3.xyz = calcVelocityOverBezierRandom(emit);
	}
}

vec3 calcVelocityOverBezierRandom(ParticleData particle){
	vec3 res1 = vec3(0.0,0.0,0.0);
	vec3 res2 = vec3(0.0,0.0,0.0);
	vec2 bezierPoints[16];
	vec2 bezierPoints2[16];
	float particleProgress = currentTime/particle.life;
	//____x
	vec2 velocityOverPointsX2[16];
	for(int vox = 0; vox < 16; vox ++){
		bezierPoints[vox] = decompressFloat(uniform_velocityOverX[16], uniform_velocityOverX[17], uniform_velocityOverX[vox]);
		bezierPoints2[vox] = decompressFloat(uniform_velocityOverX2[16], uniform_velocityOverX2[17], uniform_velocityOverX2[vox]);
	}
	res1.x = calcBezier(bezierPoints, particleProgress);
	res2.x = calcBezier(bezierPoints2, particleProgress);
	//___y
	for(int voy = 0; voy < 16; voy ++){
		bezierPoints[voy] = decompressFloat(uniform_velocityOverY[16], uniform_velocityOverY[17], uniform_velocityOverY[voy]);
		bezierPoints2[voy] = decompressFloat(uniform_velocityOverY2[16], uniform_velocityOverY2[17], uniform_velocityOverY2[voy]);
	}
	res1.y = calcBezier(bezierPoints, particleProgress);
	res2.y = calcBezier(bezierPoints2, particleProgress);
	//___z
	for(int voz = 0; voz < 16; voz ++){
		bezierPoints[voz] = decompressFloat(uniform_velocityOverZ[16], uniform_velocityOverZ[17], uniform_velocityOverZ[voz]);
		bezierPoints2[voz] = decompressFloat(uniform_velocityOverZ2[16], uniform_velocityOverZ2[17], uniform_velocityOverZ2[voz]);
	}
	res1.z = calcBezier(bezierPoints, particleProgress);
	res2.z = calcBezier(bezierPoints2, particleProgress);
	//
	res1 = attribute_velocityOverRandomSeed * res1 + (1.0 - attribute_velocityOverRandomSeed) * res2;
	return res1;
}
