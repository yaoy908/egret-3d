attribute vec2 attribute_ScaleByLife ;
float particle(  ){
	float scale = -(attribute_ScaleByLife.y - attribute_ScaleByLife.x); 
	float l = clamp(max(scale,0.0),0.0,1.0);  
	localPosition.xyz = (emit.life*l - currentTime ) * localPosition.xyz * scale; 
}