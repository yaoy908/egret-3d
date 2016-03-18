attribute vec3 attribute_position ;
attribute vec3 attribute_normal ;
attribute vec3 attribute_tangent ;
attribute vec4 attribute_color ;
attribute vec2 attribute_uv0 ;
attribute vec2 attribute_uv1 ;
attribute vec4 attribute_boneIndex ;
attribute vec4 attribute_boneWeight ;

const int bonesNumber = 0;
uniform vec4 uniform_PoseMatrix[bonesNumber];
uniform mat4 uniform_ModelMatrix ;
uniform mat4 uniform_ProjectionMatrix ;
uniform mat4 uniform_normalMatrix ;
uniform vec3 uniform_eyepos ;

varying vec4 varying_pos        ;
varying vec2 varying_uv0        ;
varying vec3 varying_eyeNormal  ;
varying vec4 varying_color  ;
varying vec3 varying_eyedir  ;
varying vec3 varying_tangent	;

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
	vec4 temp_p = vec4(0.0, 0.0, 0.0, 0.0) ;
	vec4 temp_n = vec4(0.0, 0.0, 0.0, 0.0);

	vec4 temp_position = vec4(attribute_position, 1.0) ;
	vec4 temp_normal = vec4(attribute_normal, 0.0);

	mat4 m0 = buildMat4(int(attribute_boneIndex.x));
	mat4 m1 = buildMat4(int(attribute_boneIndex.y));
	mat4 m2 = buildMat4(int(attribute_boneIndex.z));
	mat4 m3 = buildMat4(int(attribute_boneIndex.w));

	temp_p += m0 * temp_position * attribute_boneWeight.x;
	temp_p += m1 * temp_position * attribute_boneWeight.y;
	temp_p += m2 * temp_position * attribute_boneWeight.z;
	temp_p += m3 * temp_position * attribute_boneWeight.w;

	temp_n += m0 * temp_normal * attribute_boneWeight.x;
	temp_n += m1 * temp_normal * attribute_boneWeight.y;
	temp_n += m2 * temp_normal * attribute_boneWeight.z;
	temp_n += m3 * temp_normal * attribute_boneWeight.w;


	temp_p =  uniform_ModelMatrix * temp_p;
	varying_eyedir = uniform_eyepos.xyz ;
	varying_pos =  temp_p ;
	temp_p = uniform_ProjectionMatrix * temp_p ;
	gl_Position = temp_p ;
	varying_pos.w = -temp_p.z / 128.0 + 0.5 ;
	varying_eyeNormal =  (uniform_normalMatrix * normalize(temp_n.xyz)).xyz ;
	varying_uv0 = attribute_uv0;
	varying_color = vec4(1.0,1.0,1.0,1.0) ;
	//varying_eyepos = uniform_eyepos ;

	varying_tangent = normalize((uniform_ModelMatrix * vec4( attribute_tangent,0.0 )).xyz) ; 
}