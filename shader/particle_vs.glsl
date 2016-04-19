attribute vec3 attribute_offset;
attribute vec3 attribute_lifecycle;
attribute vec3 attribute_direction;
attribute vec2 attribute_speed;


uniform mat4 uniform_cameraMatrix;
uniform float uniform_time;
uniform float uniform_enableBillboardXYZ;

uniform vec3 uniform_startColor;
uniform vec3 uniform_endColor;

uniform vec3 uniform_startScale;
uniform vec3 uniform_endScale;

uniform vec3 uniform_startRot;
uniform vec3 uniform_endRot;

const float PI = 3.1415926 ;
vec4 position;
float currentTime = 0.0;
float totalTime = 0.0;

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

	if (uniform_enableBillboardXYZ == 111.0)
	{
		billboardMatrix = mat4(
				uniform_cameraMatrix[0],
				uniform_cameraMatrix[1],
				uniform_cameraMatrix[2],
				vec4(0.0, 0.0,1.0, 1.0));
	}
	else
	{
		if (mod(uniform_enableBillboardXYZ, 10.0) == 1.0)
		{
			billboardMatrix *= mat4(
			vec4(1.0, 0.0, 0.0, 0.0),
			vec4(0.0, uniform_cameraMatrix[1].y, uniform_cameraMatrix[1].z, 0.0),
			vec4(0.0, uniform_cameraMatrix[2].y, uniform_cameraMatrix[2].z, 0.0),
			vec4(0.0, 0.0, 0.0, 1.0));
		}
	
		if (mod(uniform_enableBillboardXYZ, 100.0) / 10.0 > 1.0)
		{
			billboardMatrix *= mat4(
				vec4(uniform_cameraMatrix[0].x, 0.0, uniform_cameraMatrix[0].z, 0.0),
				vec4(0.0, 1.0, 0.0, 0.0),
				vec4(uniform_cameraMatrix[2].x, 0.0, uniform_cameraMatrix[2].z, 0.0),
				vec4(0.0, 0.0, 0.0, 1.0));
		}
		
		if (uniform_enableBillboardXYZ / 100.0 > 1.0)
		{
			billboardMatrix *= mat4(
				vec4(1.0, 0.0, 0.0, 0.0),
				vec4(0.0, uniform_cameraMatrix[1].y, uniform_cameraMatrix[1].z, 0.0),
				vec4(0.0, uniform_cameraMatrix[2].y, uniform_cameraMatrix[2].z, 0.0),
				vec4(0.0, 0.0, 0.0, 1.0));
		}
	}

	mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; 
	mat3 normalMatrix = transpose(inverse(mat3( modeViewMatrix ))); 
	varying_eyeNormal = normalize(normalMatrix * -e_normal); 
	position = vec4(attribute_offset, 1.0);
	outPosition = vec4(e_position, 1.0);
	outPosition = billboardMatrix * outPosition;

	totalTime = attribute_lifecycle.x + attribute_lifecycle.y;

	if (attribute_lifecycle.z == 1.0)
	{
		currentTime = mod(uniform_time, totalTime);
		if (currentTime >= attribute_lifecycle.x && currentTime <= totalTime)
		{
			currentTime = currentTime - attribute_lifecycle.x;
		}
		else
		{
			varying_color.w = 0.0;
		}
	}
	else
	{
		if (uniform_time < attribute_lifecycle.x || uniform_time > totalTime)
		{
			varying_color.w = 0.0;
		}
		else
		{
			currentTime = uniform_time - attribute_lifecycle.x;
		}
	}

	if (currentTime > 0.0)
	{
		float t = currentTime * 0.001;
		float ratio = currentTime / attribute_lifecycle.y;
		position.xyz += attribute_direction * (t * (attribute_speed.x + attribute_speed.y * t));
		varying_color.xyz += uniform_startColor + (uniform_endColor - uniform_startColor) *  ratio;

		//outPosition.xyz *= uniform_startScale + (uniform_endScale - uniform_startScale) *  ratio;

		vec3 rot = uniform_startRot + (uniform_endRot - uniform_startRot) *  ratio;
		rot  *= (PI / 180.0);

		position = buildRotMat4(rot) * position;
	}


	position = uniform_ModelMatrix * position;
	outPosition.xyz += position.xyz;
	outPosition = uniform_ViewMatrix * outPosition;

	varying_ViewPose = outPosition.xyz / outPosition.w;
}