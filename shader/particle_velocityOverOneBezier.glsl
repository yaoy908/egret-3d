uniform float uniform_velocityOverX[18];
uniform float uniform_velocityOverY[18];
uniform float uniform_velocityOverZ[18];
void main() {
	velocityOverVec3.xyz = calcVelocityOverBezierXYZ(emit);
}


vec3 calcVelocityOverBezierXYZ(ParticleData particle){
	vec3 res = vec3(0.0,0.0,0.0);

	vec2 velocityOverPointsX[16];
	for(int vox = 0; vox < 16; vox ++){
		velocityOverPointsX[vox] = decompressFloat(uniform_velocityOverX[16], uniform_velocityOverX[17], uniform_velocityOverX[vox]);
	}
	res.x = calcBezier(velocityOverPointsX, currentTime/particle.life);


	vec2 velocityOverPointsY[16];
	for(int voy = 0; voy < 16; voy ++){
		velocityOverPointsY[voy] = decompressFloat(uniform_velocityOverY[16], uniform_velocityOverY[17], uniform_velocityOverY[voy]);
	}
	res.y = calcBezier(velocityOverPointsY, currentTime/particle.life);


	vec2 velocityOverPointsZ[16];
	for(int voz = 0; voz < 16; voz ++){
		velocityOverPointsZ[voz] = decompressFloat(uniform_velocityOverZ[16], uniform_velocityOverZ[17], uniform_velocityOverZ[voz]);
	}
	res.z = calcBezier(velocityOverPointsZ, currentTime/particle.life);

	return res;
}