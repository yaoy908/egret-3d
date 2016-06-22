uniform float uniform_rotationBezier[18];
uniform float uniform_rotationBezier2[18];
attribute float attribute_rotationRandomSeed;

float particle(  ParticleData curParticle ){
	if(discard_particle == 0.0){
		float rot = calcDoubleBezier(uniform_rotationBezier, uniform_rotationBezier2, currentTime/curParticle.life, attribute_rotationRandomSeed);
		rot = currentTime * rot * (PI / 180.0);
		localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition;
	}
}