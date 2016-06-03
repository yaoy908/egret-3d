attribute vec3 attribute_accelerationSpeed ;
float particle(   ParticleData emit ){
	vec4 accelerationSpeed = vec4(attribute_accelerationSpeed, 1.0);
	accelerationSpeed = followRotMatrix * accelerationSpeed;
	//u = at^2
	globalPosition.xyz += currentTime * currentTime * accelerationSpeed.xyz  ;
}