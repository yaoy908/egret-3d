uniform float uniform_rotationBezier[15];
uniform float uniform_rotationBezier2[15];
attribute float attribute_rotationRandomSeed;

float particle(  ParticleData curParticle ){
	if(discard_particle < TrueOrFalse){
		float rot = calcDoubleBezierArea(uniform_rotationBezier, uniform_rotationBezier2, currentTime, curParticle.life, attribute_rotationRandomSeed);
		rot = currentTime * rot * (PI / 180.0);
		localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition;
	}
}