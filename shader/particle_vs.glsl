attribute vec3 attribute_offset;
attribute float attribute_billboardXYZ;
attribute vec3 attribute_lifecycle;
attribute vec3 attribute_speed;
attribute vec3 attribute_accele;

uniform mat4 uniform_cameraMatrix;
uniform float uniform_time;

vec3 position;
float currentTime = 0.0;
float totalTime = 0.0;

void main(void) {
	varying_color = vec4(1.0, 1.0, 1.0, 1.0); 
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

	mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; 
	mat3 normalMatrix = transpose(inverse(mat3( modeViewMatrix ))); 
	varying_eyeNormal = normalize(normalMatrix * -attribute_normal); 
	position = attribute_offset;
	outPosition = vec4(attribute_position, 1.0);
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
		position.xyz += currentTime * 0.001 * (attribute_speed + attribute_accele * currentTime * 0.001);
	}
	outPosition.xyz += position;

	outPosition = uniform_ViewMatrix * uniform_ModelMatrix * outPosition;

	varying_ViewPose = outPosition.xyz / outPosition.w;
}