mat4 getRenderModeMatrix(mat4 cameraMatrix) {
	mat4 matrix = mat4(
		cameraMatrix[0],
		cameraMatrix[1],
		cameraMatrix[2],
		vec4(0.0, 0.0, 1.0, 1.0));
	return matrix;
}


void updateStretchedBillBoard(vec3 fromPos, vec3 toPos, mat4 viewMatrix){

  vec4 dirVector = vec4(toPos - fromPos, 0.0); 
  float scaleBefore = dirVector.x * dirVector.x + dirVector.y * dirVector.y + dirVector.z * dirVector.z; 
  scaleBefore = sqrt(scaleBefore); 
  dirVector = viewMatrix * dirVector; 
  float scaleAfter = dirVector.x * dirVector.x + dirVector.y * dirVector.y; 
  scaleAfter = sqrt(scaleAfter);
  scaleAfter = scaleAfter / scaleBefore; 
  scaleAfter = sqrt(scaleAfter);
  localPosition.y *= scaleAfter;
  dirVector.z = 0.0; 
  dirVector = normalize(dirVector); 
  vec3 dirStartVector = vec3(0.0, 1.0, 0.0); 
  float angleAdded = 0.0;

  if(dirVector.x > 0.0){
    angleAdded = PI;
    dirVector *= -1.0;
  }
  float acosValue = dot(dirStartVector, vec3(dirVector.x, dirVector.y, dirVector.z)); 
  float angle = acos(acosValue) + angleAdded;
 
  mat4 headMat = buildRotMat4(vec3(0.0, 0.0, angle)); 
  localPosition = headMat * localPosition;

}