mat4 getRenderModeMatrix(mat4 cameraMatrix) {
	mat4 matrix = mat4(
		cameraMatrix[0],
		cameraMatrix[1],
		cameraMatrix[2],
		vec4(0.0, 0.0, 1.0, 1.0));
	return matrix;
}


void updateStretchedBillBoard(vec4 startPos, vec4 newPos){

	localPosition.x *= particleStateData.lengthScale;
  
	startPos =  uniform_ViewMatrix * startPos; 
	startPos =  uniform_ProjectionMatrix * startPos; 
	newPos =  uniform_ViewMatrix * newPos; 
	newPos =  uniform_ProjectionMatrix * newPos; 

	vec3 dirVector = vec3(newPos.x - startPos.x, newPos.y - startPos.y, newPos.z - startPos.z);
    if(dirVector.x == 0.0 && dirVector.y == 0.0 && dirVector.z == 0.0){
		dirVector = attribute_offsetPosition;
	}
	if(dirVector.x == 0.0 && dirVector.y == 0.0 && dirVector.z == 0.0){
		return;
	}

	float scaleBefore = dirVector.x * dirVector.x + dirVector.y * dirVector.y + dirVector.z * dirVector.z; 
	scaleBefore = sqrt(scaleBefore); 
	float scaleAfter = dirVector.x * dirVector.x + dirVector.y * dirVector.y; 
	scaleAfter = sqrt(scaleAfter);
	scaleAfter = scaleAfter / scaleBefore; 
	scaleAfter = sqrt(scaleAfter);
	localPosition.y *= scaleAfter;

	dirVector.z = 0.0;

	vec3 dirStartVector = vec3(0.0, 1.0, 0.0);

	dirVector = normalize(dirVector); 
	float added = 0.0;
	if(dirVector.x > 0.0){
		dirVector.xy *= -1.0;
		added = PI;
	}
	float acosValue = dot(dirStartVector, dirVector); 
	float angle = acos(acosValue) + 0.5 * PI + added; 
  
  

	mat4 headMat = buildRotMat4(vec3(0.0, 0.0, angle)); 
	localPosition = headMat * localPosition; 


}
