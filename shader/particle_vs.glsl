attribute vec4 attribute_color;
attribute vec3 attribute_offsetPosition;

uniform mat4 uniform_cameraMatrix;
uniform float uniform_particleState[18];

uniform mat4 uniform_ViewMatrix;

const float PI = 3.1415926 ;
float currentTime = 0.0;
float totalTime = 0.0;

vec4 localPosition = vec4(0.0,0.0,0.0,1.0);
vec3 velocityBaseVec3 = vec3(0.0,0.0,0.0);
vec3 velocityOverVec3 = vec3(0.0,0.0,0.0);
vec2 velocityBezierWeightVec2 = vec2(1.0, 1.0);

vec3 followTargetPosition = vec3(0.0,0.0,0.0);
vec3 followTargetScale = vec3(1.0,1.0,1.0);
vec4 followTargetRotation = vec4(0.0,0.0,0.0,0.0);

varying vec3 varyingViewDir ;

float discard_particle = 0.0;

ParticleStateData particleStateData;

void e_discard(){
	discard_particle = 1.0;
}

struct ParticleStateData{
	float time;						//粒子当前时间
	float loop;						//是否循环
	float worldSpace;				//是否使用世界空间坐标

	float scaleX;					//x缩放
	float scaleY;					//y缩放
	float scaleZ;					//z缩放
	float rotationX;				//x旋转
	float rotationY;				//y旋转
	float rotationZ;				//z旋转
	float rotationW;

	float positionX;				//x平移
	float positionY;				//y平移
	float positionZ;				//z平移

	float loopTime;					//一个周期的时间
	float delay;					//延迟发射时间
	float duration;					//发射器时间
	float gravity;					//重力大小
	float velocityOverWorldSpace;	//叠加速度是否为世界空间坐标
};


mat4 buildMat4Quat(vec4 quat){

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
	   0.0,							0.0,					0.0,					1
   );
}

//_____________解压缩数据
vec2 decompressFloat(float min, float range, float mergeFloat){
	
	float convert_1_4096 = 1.0 / 4096.0;
	float value2 = fract(mergeFloat);
	float value1 = mergeFloat - value2;
	value1 *= convert_1_4096;

	value1 *= range;
	value2 *= range;

	value1 += min;
	value2 += min;

	return vec2(value1, value2);
}


void main(void) {

	particleStateData.time							= uniform_particleState[0];
	particleStateData.loop							= uniform_particleState[1];
	particleStateData.worldSpace					= uniform_particleState[2];
	particleStateData.scaleX						= uniform_particleState[3];
	particleStateData.scaleY						= uniform_particleState[4];
	particleStateData.scaleZ						= uniform_particleState[5];
	particleStateData.rotationX						= uniform_particleState[6];
	particleStateData.rotationY						= uniform_particleState[7];
	particleStateData.rotationZ						= uniform_particleState[8];
	particleStateData.rotationW						= uniform_particleState[9];
	particleStateData.positionX						= uniform_particleState[10];
	particleStateData.positionY						= uniform_particleState[11];
	particleStateData.positionZ						= uniform_particleState[12];
	particleStateData.loopTime						= uniform_particleState[13];
	particleStateData.delay							= uniform_particleState[14];
	particleStateData.duration						= uniform_particleState[15];
	particleStateData.gravity						= uniform_particleState[16];
	particleStateData.velocityOverWorldSpace		= uniform_particleState[17];


	mat4 billboardMatrix = mat4(
				uniform_cameraMatrix[0],
				uniform_cameraMatrix[1],
				uniform_cameraMatrix[2],
				vec4(0.0, 0.0, 1.0, 1.0));

	mat4 modeViewMatrix = uniform_ModelViewMatrix ; 
	outPosition = localPosition = vec4(e_position, 1.0);

}