
//目标位置
attribute vec3 attribute_followPosition ;
float particle(  ParticleData emit ){
	globalPosition.xyz += attribute_followPosition.xyz;
}
	