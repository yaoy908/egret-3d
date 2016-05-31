float particle( ParticleData emit ){
	return 1.0 ;
}
void main(void) {

	if(discard_particle == 1.0){
		outPosition = vec4(0.0,0.0,0.0,0.0);
	}else{
		outPosition.xyz = localPosition.xyz  ;
		outPosition = billboardMatrix * outPosition;
		outPosition.xyz += globalPosition.xyz;
		outPosition = modeViewMatrix * outPosition; 
	}

	gl_Position = uniform_ProjectionMatrix * outPosition ;
}
	