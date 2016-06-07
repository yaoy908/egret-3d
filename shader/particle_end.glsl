float particle( ParticleData emit ){
	return 1.0 ;
}
void main(void) {

	if(discard_particle == 1.0){ 
		outPosition = vec4(0.0,0.0,0.0,0.0); 
	}else{
		//加速度为本地坐标系
		if(particleStateData.accelerationWorld == 0.0){
			globalPosition.xyz += accelerationOffset.xyz;
		}
		if(particleStateData.worldSpace == 1.0){
		  globalPosition = followTargetMatrix * globalPosition;
		}else{
		  globalPosition = uniform_ModelMatrix * globalPosition; 
		}
		//加速度为全局坐标系
		if(particleStateData.accelerationWorld == 1.0){
			globalPosition.xyz += accelerationOffset.xyz;
		}
		//重力默认为全局坐标系
		globalPosition.y -= currentTime * currentTime * particleStateData.gravity;

		localPosition.xyz *= vec3(particleStateData.scaleX, particleStateData.scaleY, particleStateData.scaleZ);
		outPosition = billboardMatrix * localPosition;
		outPosition.xyz += globalPosition.xyz;
		outPosition = uniform_ViewMatrix * outPosition;
	} 
	gl_Position = uniform_ProjectionMatrix * outPosition ; 
}
	