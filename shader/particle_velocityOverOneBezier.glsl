uniform float uniform_velocityOverX[18];
uniform float uniform_velocityOverY[18];
uniform float uniform_velocityOverZ[18];

void main() {
	if(discard_particle == 0.0){
		velocityOverVec3.xyz = calcVelocityOverBezierXYZ(emit);
	} 
}

vec3 calcVelocityOverBezierXYZ(ParticleData particle){
	vec3 res = vec3(0.0,0.0,0.0);
	vec2 bezierPoints[16];
	float particleProgress = currentTime/particle.life;
	//
	for(int vox = 0; vox < 16; vox ++){
		bezierPoints[vox] = decompressFloat(uniform_velocityOverX[16], uniform_velocityOverX[17], uniform_velocityOverX[vox]);
	}
	res.x = calcBezier(bezierPoints, particleProgress);
	//
	for(int voy = 0; voy < 16; voy ++){
		bezierPoints[voy] = decompressFloat(uniform_velocityOverY[16], uniform_velocityOverY[17], uniform_velocityOverY[voy]);
	}
	res.y = calcBezier(bezierPoints, particleProgress);
	//
	for(int voz = 0; voz < 16; voz ++){
		bezierPoints[voz] = decompressFloat(uniform_velocityOverZ[16], uniform_velocityOverZ[17], uniform_velocityOverZ[voz]);
	}
	res.z = calcBezier(bezierPoints, particleProgress);
	//
	return res;
}

