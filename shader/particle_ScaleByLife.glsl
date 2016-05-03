attribute vec2 attribute_ScaleByLife ;
float particle(  ){
	float scale = (attribute_ScaleByLife.y - attribute_ScaleByLife.x);
	localPosition.xyz += (currentTime/life) * outPosition.xyz * scale; 
}