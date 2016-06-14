attribute vec3 attribute_accelerationSpeed ;
float particle(   ParticleData curParticle ){
	//u = at^2
	accelerationOffset.xyz = currentTime * currentTime * attribute_accelerationSpeed.xyz;
}