attribute vec3 attribute_uniformSpeed ;
float particle(  ParticleData emit ){
	//globalPosition.xyz += currentTime * attribute_uniformSpeed ;
	vec4 uniformSpeed = vec4(attribute_uniformSpeed.xyz, 1.0);
	uniformSpeed = followRotMatrix * uniformSpeed;
	globalPosition.xyz += currentTime * uniformSpeed.xyz;
 			

}