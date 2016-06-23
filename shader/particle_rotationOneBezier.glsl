uniform float uniform_rotationBezier[15];

float particle(  ParticleData curParticle ){
	if(discard_particle < TrueOrFalse){
		float rot = calcOneBezierSize(uniform_rotationBezier, currentTime, curParticle.life, 1.0);
		rot = currentTime * rot * (PI / 180.0);
		localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition;
	}
}