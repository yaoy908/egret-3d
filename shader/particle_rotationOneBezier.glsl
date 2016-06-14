uniform float uniform_rotationBezier[18];

float particle(  ParticleData curParticle ){
	if(discard_particle == 0.0){
		float rot = calcSingleBezier(uniform_rotationBezier, currentTime/curParticle.life);;
		rot = currentTime * rot * (PI / 180.0);
		localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition;
	}
}