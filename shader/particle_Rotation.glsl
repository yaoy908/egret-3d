attribute float attribute_Rotation ;
float particle(  ){
	//u = at^2
	float rot = currentTime * attribute_Rotation  * (3.1415926 / 180.0);
	localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition;
}