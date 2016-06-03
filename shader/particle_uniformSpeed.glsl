attribute vec3 attribute_uniformSpeed ;
float particle(  ParticleData emit ){
	globalPosition.xyz += currentTime * attribute_uniformSpeed ;
}