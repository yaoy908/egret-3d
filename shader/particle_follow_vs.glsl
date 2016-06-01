//目标位置
attribute vec3 attribute_followPosition ;
attribute vec3 attribute_followRotation ;
float particle(  ParticleData emit ){
	globalPosition.xyz += attribute_followPosition.xyz;
	followRotation.xyz = attribute_followRotation.xyz;
}
	