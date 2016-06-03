//目标位置
attribute vec3 attribute_followPosition ;
attribute vec3 attribute_followRotation ;
float particle(  ParticleData emit ){
	globalPosition.xyz += attribute_followPosition.xyz;
	followRotMatrix = buildRotMat4(attribute_followRotation.xyz);
	vec4 vertexPos = vec4(localPosition.xyz, 1.0);
	outPosition.xyz = localPosition.xyz = (followRotMatrix * vertexPos).xyz;
}
	