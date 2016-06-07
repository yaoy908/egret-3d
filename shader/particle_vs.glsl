attribute vec4 attribute_color;
attribute vec3 attribute_offsetPosition;

uniform mat4 uniform_cameraMatrix;
uniform float uniform_particleState[11];


uniform mat4 uniform_ModelMatrix;
uniform mat4 uniform_ViewMatrix;

const float PI = 3.1415926 ;
float currentTime = 0.0;
float totalTime = 0.0;

vec4 localPosition = vec4(0.0,0.0,0.0,1.0);
vec4 globalPosition = vec4(0.0,0.0,0.0,1.0);
vec3 accelerationOffset = vec3(0.0,0.0,0.0);
mat4 followTargetMatrix;
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

	float loopTime;					//一个周期的时间
	float delay;					//延迟发射时间
	float duration;					//发射器时间
	float gravity;					//重力大小
	float accelerationWorld;		//加速度为全局位置
};     


mat4 buildRotMat4(vec3 rot)
{
    mat4 ret = mat4(
	vec4(1.0, 0.0, 0.0, 0.0),
	vec4(0.0, 1.0, 0.0, 0.0),
	vec4(0.0, 0.0, 1.0, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	);

	float s;
	float c;

	s = sin(rot.x);
	c = cos(rot.x);
	
	ret = mat4(
	vec4(1.0, 0.0, 0.0, 0.0),
	vec4(0.0, c, s, 0.0),
	vec4(0.0, -s, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	) * ret;
	
	s = sin(rot.y);
	c = cos(rot.y);
	
	ret = mat4(
	vec4(c, 0.0, -s, 0.0),
	vec4(0.0, 1.0, 0.0, 0.0),
	vec4(s, 0.0, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	) * ret;

	s = sin(rot.z);
	c = cos(rot.z);

	ret = mat4(
	vec4(c, s, 0.0, 0.0),
	vec4(-s, c, 0.0, 0.0),
	vec4(0.0, 0.0, 1.0, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	) * ret;

	return ret;
}

void main(void) {

	particleStateData.time					= uniform_particleState[0];
	particleStateData.loop					= uniform_particleState[1];
	particleStateData.worldSpace			= uniform_particleState[2];
	particleStateData.scaleX				= uniform_particleState[3];
	particleStateData.scaleY				= uniform_particleState[4];
	particleStateData.scaleZ				= uniform_particleState[5];
	particleStateData.loopTime				= uniform_particleState[6];
	particleStateData.delay					= uniform_particleState[7];
	particleStateData.duration				= uniform_particleState[8];
	particleStateData.gravity				= uniform_particleState[9];
	particleStateData.accelerationWorld		= uniform_particleState[10];
	

	mat4 billboardMatrix = mat4(
						vec4(1.0, 0.0, 0.0, 0.0),
						vec4(0.0, 1.0, 0.0, 0.0),
						vec4(0.0, 0.0, 1.0, 0.0),
						vec4(0.0, 0.0, 0.0, 1.0));

	
		billboardMatrix = mat4(
				uniform_cameraMatrix[0],
				uniform_cameraMatrix[1],
				uniform_cameraMatrix[2],
				vec4(0.0, 0.0,1.0, 1.0));

	mat4 modeViewMatrix = uniform_ModelViewMatrix ; 
	
	outPosition = localPosition = vec4(e_position, 1.0); 
	globalPosition.xyz = vec3(0.0,0.0,0.0);
	followTargetMatrix = mat4(
						vec4(1.0, 0.0, 0.0, 0.0),
						vec4(0.0, 1.0, 0.0, 0.0),
						vec4(0.0, 0.0, 1.0, 0.0),
						vec4(0.0, 0.0, 0.0, 1.0));
	globalPosition.xyz += attribute_offsetPosition;

}