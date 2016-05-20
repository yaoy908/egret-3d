//attribute vec4 attribute_color;

attribute vec3 attribute_offsetPosition;

uniform mat4 uniform_cameraMatrix;
const float PI = 3.1415926 ;
float currentTime = 0.0;
float totalTime = 0.0;

vec4 localPosition;
vec4 globalPosition;

varying vec3 varyingViewDir ;

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
	
	ret *= mat4(
	vec4(1.0, 0.0, 0.0, 0.0),
	vec4(0.0, c, s, 0.0),
	vec4(0.0, -s, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	);
	
	s = sin(rot.y);
	c = cos(rot.y);
	
	ret *= mat4(
	vec4(c, 0.0, -s, 0.0),
	vec4(0.0, 1.0, 0.0, 0.0),
	vec4(s, 0.0, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	);

	s = sin(rot.z);
	c = cos(rot.z);

	ret *= mat4(
	vec4(c, s, 0.0, 0.0),
	vec4(-s, c, 0.0, 0.0),
	vec4(0.0, 0.0, 1.0, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	);

	return ret;
}

void main(void) {
	varying_color = vec4(1.0, 1.0, 1.0, 1.0);



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

	mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; 
	mat3 normalMatrix = transpose(inverse(mat3( modeViewMatrix ))); 
	
	localPosition = outPosition = vec4(e_position, 1.0); 
	globalPosition.xyz = vec3(0.0,0.0,0.0);
	globalPosition.xyz += attribute_offsetPosition; 
}