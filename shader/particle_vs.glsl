attribute vec3 attribute_position;
attribute vec3 attribute_normal;
attribute vec2 attribute_uv0;
attribute vec3 attribute_offset;
attribute float attribute_billboardXYZ;
attribute vec3 attribute_lifecycle;
attribute vec3 attribute_speed;
attribute vec3 attribute_accele;

varying vec3 varying_ViewPose; 
varying vec3 varying_eyeNormal;
varying vec2 varying_uv0; 
varying vec4 varying_color;

uniform mat4 uniform_ModelMatrix;
uniform mat4 uniform_ViewMatrix;
uniform mat4 uniform_ProjectionMatrix;
uniform mat4 uniform_cameraMatrix;
uniform float uniform_time;

vec3 position;
float currentTime = 0.0;
float totalTime = 0.0;
int a = 10;

mat3 transpose(mat3 m) { 
	return mat3(m[0][0], m[1][0], m[2][0], 
				m[0][1], m[1][1], m[2][1], 
				m[0][2], m[1][2], m[2][2]); 
}

mat3 inverse(mat3 m) { 
	float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2]; 
	float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2]; 
	float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2]; 
	float b01 = a22 * a11 - a12 * a21; 
	float b11 = -a22 * a10 + a12 * a20; 
	float b21 = a21 * a10 - a11 * a20; 
	float det = a00 * b01 + a01 * b11 + a02 * b21; 
	return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11), 
				b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10), 
				b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det; 
}

void main(void) {
	
	mat4 billboardMatrix = mat4(
						vec4(1.0, 0.0, 0.0, 0.0),
						vec4(0.0, 1.0, 0.0, 0.0),
						vec4(0.0, 0.0, 1.0, 0.0),
						vec4(0.0, 0.0, 0.0, 1.0));

	if (attribute_billboardXYZ == 111.0)
	{
		billboardMatrix = mat4(
				uniform_cameraMatrix[0],
				uniform_cameraMatrix[1],
				uniform_cameraMatrix[2],
				vec4(0.0, 0.0,1.0, 1.0));
	}
	else
	{
		if (mod(attribute_billboardXYZ, 10.0) == 1.0)
		{
			billboardMatrix *= mat4(
			vec4(1.0, 0.0, 0.0, 0.0),
			vec4(0.0, uniform_cameraMatrix[1].y, uniform_cameraMatrix[1].z, 0.0),
			vec4(0.0, uniform_cameraMatrix[2].y, uniform_cameraMatrix[2].z, 0.0),
			vec4(0.0, 0.0, 0.0, 1.0));
		}
	
		if (mod(attribute_billboardXYZ, 100.0) / 10.0 > 1.0)
		{
			billboardMatrix *= mat4(
				vec4(uniform_cameraMatrix[0].x, 0.0, uniform_cameraMatrix[0].z, 0.0),
				vec4(0.0, 1.0, 0.0, 0.0),
				vec4(uniform_cameraMatrix[2].x, 0.0, uniform_cameraMatrix[2].z, 0.0),
				vec4(0.0, 0.0, 0.0, 1.0));
		}
		
		if (attribute_billboardXYZ / 100.0 > 1.0)
		{
			billboardMatrix *= mat4(
				vec4(1.0, 0.0, 0.0, 0.0),
				vec4(0.0, uniform_cameraMatrix[1].y, uniform_cameraMatrix[1].z, 0.0),
				vec4(0.0, uniform_cameraMatrix[2].y, uniform_cameraMatrix[2].z, 0.0),
				vec4(0.0, 0.0, 0.0, 1.0));
		}
	}
	varying_color = vec4(1.0, 1.0, 1.0, 1.0); 

	mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; 
	mat3 normalMatrix = transpose(inverse(mat3( modeViewMatrix ))); 
	varying_eyeNormal = normalize(normalMatrix * -attribute_normal); 
	position = attribute_offset;
	vec4 pos = vec4(attribute_position, 1.0);
	pos = billboardMatrix * pos;

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
		position.xyz += currentTime * 0.001 * (attribute_speed + attribute_accele * currentTime * 0.001);
	}
	pos.xyz += position;

	pos = uniform_ViewMatrix * uniform_ModelMatrix * pos;

	varying_ViewPose = pos.xyz / pos.w;

	gl_Position = uniform_ProjectionMatrix * pos;

	varying_uv0 = attribute_uv0; 
}