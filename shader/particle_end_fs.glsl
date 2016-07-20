//far
//near
//blendMode
uniform float uniform_particleFsData[3];
void main() {
	float blendMode = uniform_particleFsData[2];
	outColor.xyz = diffuseColor.xyz * materialSource.diffuse * varying_color.xyz * globalColor.xyz;
	outColor.w = materialSource.alpha * diffuseColor.w * varying_color.w * globalColor.w;
	outColor.xyz *= outColor.w;
	// Add Mode
	//if(blendMode == 4.0){
	//	outColor.xyz *= 1.8;
	//}
    gl_FragColor = outColor;
}





