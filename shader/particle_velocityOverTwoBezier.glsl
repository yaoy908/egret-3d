uniform float uniform_velocityOverX[18];
uniform float uniform_velocityOverY[18];
uniform float uniform_velocityOverZ[18];
void main() {
	vec2 velocityOverPointsX[16];
	int i = 0;
	for(i = 0; i < 16; i ++){
		velocityOverPointsX[i] = decompressFloat(uniform_velocityOverX[16], uniform_velocityOverX[17], uniform_velocityOverX[i]);
	}
	velocityOverVec3.x = calcBezier(velocityOverPointsX, currentTime/emit.life);

	vec2 velocityOverPointsY[16];
	for(i = 0; i < 16; i ++){
		velocityOverPointsY[i] = decompressFloat(uniform_velocityOverY[16], uniform_velocityOverY[17], uniform_velocityOverY[i]);
	}
	velocityOverVec3.y = calcBezier(velocityOverPointsY, currentTime/emit.life);

	vec2 velocityOverPointsZ[16];
	for(i = 0; i < 16; i ++){
		velocityOverPointsZ[i] = decompressFloat(uniform_velocityOverZ[16], uniform_velocityOverZ[17], uniform_velocityOverZ[i]);
	}
	velocityOverVec3.z = calcBezier(velocityOverPointsZ, currentTime/emit.life);
}
