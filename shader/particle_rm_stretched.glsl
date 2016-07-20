mat4 getRenderModeMatrix(mat4 cameraMatrix, mat4 modelMatrix) {
	mat4 matrix = mat4(
		cameraMatrix[0],
		cameraMatrix[1],
		cameraMatrix[2],
		vec4(0.0, 0.0, 1.0, 1.0));
	return matrix;
}


float updateStretchedBillBoard(vec4 startPos, vec4 newPos){
	vec3 dirVector = newPos.xyz - startPos.xyz;

	float lengthScale = particleStateData.lengthScale;
	float speedScale = dirVector.x * dirVector.x + dirVector.y * dirVector.y + dirVector.z * dirVector.z;
	speedScale = sqrt(speedScale) * 0.01 / currentTime;
	localPosition.x *= particleStateData.lengthScale + speedScale * particleStateData.speedScale;

	mat4 temp = uniform_ViewMatrix;
	startPos = temp * startPos; 
	newPos = temp * newPos; 


	
	float scaleBefore = dirVector.x * dirVector.x + dirVector.y * dirVector.y + dirVector.z * dirVector.z; 
	scaleBefore = sqrt(scaleBefore);
	//too small cannot calc direction;
	if(scaleBefore < Tiny){
		return 0.0;
	}
	float scaleAfter = dirVector.x * dirVector.x + dirVector.y * dirVector.y; 
	scaleAfter = sqrt(scaleAfter); 
	scaleAfter = scaleAfter / scaleBefore; 
	//scaleAfter = sqrt(scaleAfter); 
	localPosition.x *= scaleAfter; 
  
	startPos.xyz /= startPos.z; 
	newPos.xyz /= newPos.z; 
	dirVector = newPos.xyz - startPos.xyz;
	dirVector = normalize(dirVector); 

	vec3 dirStartVector = vec3(0.0, 1.0, 0.0); 

	float added = -0.5 * PI;//ÈÃÍ¼Æ¬·Åµ¹
	if(dirVector.x > 0.0){ 
		dirVector.xy *= -1.0; 
		added += PI; 
	} 
	float acosValue = dot(dirStartVector, dirVector); 
	float angle = acos(acosValue) + added; 
	temp = buildRotMat4(vec3(0.0, 0.0, angle)); 
	localPosition = temp * localPosition;

	return 1.0;

}
