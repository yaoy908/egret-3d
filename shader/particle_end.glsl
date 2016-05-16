float particle( ParticleData emit ){
	return 1.0 ;
}
void main(void) {
	outPosition.xyz = localPosition.xyz  ;
	outPosition = billboardMatrix * outPosition;
	outPosition.xyz += globalPosition.xyz;
	outPosition = uniform_ModelMatrix * outPosition; 
	outPosition = uniform_ViewMatrix * outPosition; 
	gl_Position = uniform_ProjectionMatrix * outPosition ;
}
	