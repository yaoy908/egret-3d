attribute vec3 attribute_uniformSpeed ;
float particle(  ){
	globalPosition.xyz += currentTime * attribute_uniformSpeed ;
}