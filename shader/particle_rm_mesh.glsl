mat4 getRenderModeMatrix(mat4 cameraMatrix) {
	mat4 ret = mat4( 
		vec4(1.0, 0.0, 0.0, 0.0), 
		vec4(0.0, 1.0, 0.0, 0.0), 
		vec4(0.0, 0.0, 1.0, 0.0), 
		vec4(0.0, 0.0, 0.0, 1.0) 
	);
	return ret;
}


