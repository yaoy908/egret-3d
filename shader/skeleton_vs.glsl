attribute vec4 attribute_boneIndex ;
attribute vec4 attribute_boneWeight ;

const int bonesNumber = 0;
uniform vec4 uniform_PoseMatrix[bonesNumber];
uniform mat4 uniform_ModelMatrix ;

mat4 buildMat4(int index){

  vec4 quat = uniform_PoseMatrix[index * 2 + 0];

  vec4 translation = uniform_PoseMatrix[index * 2 + 1];

  float xx = quat.x * quat.x;
  float xy = quat.x * quat.y;
  float xz = quat.x * quat.z;
  float xw = quat.x * quat.w;

  float yy = quat.y * quat.y;
  float yz = quat.y * quat.z;
  float yw = quat.y * quat.w;

  float zz = quat.z * quat.z;
  float zw = quat.z * quat.w;

   return mat4(
	   1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0,
	   2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0,
	   2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0,
	   translation.x,				translation.y,			translation.z,			1
   );
}

void main(void){
	vec4 temp_position = vec4(attribute_position, 1.0) ;
	vec4 temp_normal = vec4(outNormal, 0.0) ;

	mat4 m0 = buildMat4(int(attribute_boneIndex.x));
	mat4 m1 = buildMat4(int(attribute_boneIndex.y));
	mat4 m2 = buildMat4(int(attribute_boneIndex.z));
	mat4 m3 = buildMat4(int(attribute_boneIndex.w));

	outPosition = m0 * temp_position * attribute_boneWeight.x;
	outPosition += m1 * temp_position * attribute_boneWeight.y;
	outPosition += m2 * temp_position * attribute_boneWeight.z;
	outPosition += m3 * temp_position * attribute_boneWeight.w;

	vec4 temp_n ;
	temp_n = m0 * temp_normal * attribute_boneWeight.x;
	temp_n += m1 * temp_normal * attribute_boneWeight.y;
	temp_n += m2 * temp_normal * attribute_boneWeight.z;
	temp_n += m3 * temp_normal * attribute_boneWeight.w;

    mat3 normalMatrix = transpose( inverse(mat3(uniform_ProjectionMatrix * uniform_ViewMatrix))); 
    varying_eyeNormal = normalize(normalMatrix * -temp_n.xyz);
   
	outPosition = uniform_ViewMatrix * uniform_ModelMatrix * outPosition; 
  
    varying_ViewPose = outPosition.xyz / outPosition.w;
}