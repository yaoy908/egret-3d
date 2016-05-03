
//目标位置
attribute vec4 attribute_followPosition ;
float particle(  ){
	globalPosition.xyz += attribute_followPosition.xyz;
}
	