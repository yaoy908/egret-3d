uniform float uniform_velocityLimit[18];
uniform float uniform_velocityLimit2[18];
attribute float attribute_velocityLimitRandomSeed;

void main() {
	if(discard_particle == 0.0){
		velocityLimitVec2.x = calcVelocityLimitBezier(emit);
		velocityLimitVec2.y = 1.0;
	} 
}

float calcVelocityLimitBezier(ParticleData particle){
	vec2 bezierPoints[16];
	vec2 bezierPoints2[16];
	for(int vL = 0; vL < 16; vL ++){
		bezierPoints[vL] = decompressFloat(uniform_velocityLimit[16], uniform_velocityLimit[17], uniform_velocityLimit[vL]);
		bezierPoints2[vL] = decompressFloat(uniform_velocityLimit2[16], uniform_velocityLimit2[17], uniform_velocityLimit2[vL]);
	}
	float res1 = calcBezier(bezierPoints, currentTime/particle.life);
	float res2 = calcBezier(bezierPoints2, currentTime/particle.life);
	if(res1 < 0.0){
		res1 = 0.0;
	}

	res1 = attribute_velocityOverRandomSeed * res1 + (1.0 - attribute_velocityOverRandomSeed) * res2;
	return res1;
}