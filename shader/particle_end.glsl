float particle( ParticleData emit ){
	return 1.0 ;
}
void main(void) {

	if(discard_particle == 1.0){ 
		outPosition = vec4(0.0,0.0,0.0,0.0); 
	}else{
		if(uniform_particleProperty[2] == 1.0){
		  globalPosition = followTargetMatrix * globalPosition;
		}else{
		  globalPosition = uniform_ModelMatrix * globalPosition; 
		}
		localPosition.xyz *= vec3(uniform_particleProperty[3], uniform_particleProperty[4], uniform_particleProperty[5]);
		outPosition = billboardMatrix * localPosition;
		outPosition.xyz += globalPosition.xyz;
		outPosition = uniform_ViewMatrix * outPosition;
	} 
	gl_Position = uniform_ProjectionMatrix * outPosition ; 
}
	