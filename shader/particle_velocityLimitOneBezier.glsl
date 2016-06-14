uniform float uniform_velocityLimit[18];


void main() {
	if(discard_particle == 0.0){
		velocityLimitVec2.x = calcVelocityLimitBezier(emit);
		velocityLimitVec2.y = 1.0;
	} 
}

float calcVelocityLimitBezier(ParticleData particle){
	vec2 bezierPoints[16];
	for(int vox = 0; vox < 16; vox ++){
		bezierPoints[vox] = decompressFloat(uniform_velocityLimit[16], uniform_velocityLimit[17], uniform_velocityLimit[vox]);
	}
	float res = calcBezier(bezierPoints, currentTime/particle.life);
	if(res < 0.0){
		res = 0.0;
	}
	return res;
}