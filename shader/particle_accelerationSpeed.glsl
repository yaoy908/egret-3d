attribute vec3 attribute_accelerationSpeed ;
float particle(  ){
	//u = at^2
	globalPosition.xyz += currentTime * currentTime * attribute_accelerationSpeed  ;
}