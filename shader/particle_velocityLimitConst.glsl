attribute float attribute_velocityLimit;
float particle(  ParticleData emit ){
	velocityLimitVec2.x = attribute_velocityLimit;
	if(velocityLimitVec2.x < 0.0){
		velocityLimitVec2.x = 0.0;
	}
	velocityLimitVec2.y = 1.0;
}