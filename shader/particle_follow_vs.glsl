//目标位置
attribute vec3 attribute_followPosition ;
attribute vec3 attribute_followRotation ;
attribute vec3 attribute_followScale;

float particle(  ParticleData emit ){

	followTargetMatrix = mat4( 
	  vec4(attribute_followScale.x, 0.0, 0.0, 0.0), 
	  vec4(0.0, attribute_followScale.y, 0.0, 0.0), 
	  vec4(0.0, 0.0, attribute_followScale.z, 0.0), 
	  vec4(0.0, 0.0, 0.0, 1.0) 
	);
	followTargetMatrix = buildRotMat4(attribute_followRotation.xyz) * followTargetMatrix; 
  
	//平移
	followTargetMatrix[3][0] = attribute_followPosition.x;
	followTargetMatrix[3][1] = attribute_followPosition.y;
	followTargetMatrix[3][2] = attribute_followPosition.z;
}
	