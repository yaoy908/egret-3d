//far
//near
//blendMode
uniform float uniform_particleFsData[3];
void main() {
	float blendMode = uniform_particleFsData[2];
	outColor.xyz = diffuseColor.xyz * materialSource.diffuse * varying_color.xyz ;
	outColor.w = materialSource.alpha * diffuseColor.w * varying_color.w;
	outColor.xyz *= outColor.w;
	if(blendMode == 2.0 || blendMode == 8.0){
	}else{
		outColor.xyz *= 1.8;
	}
    gl_FragColor = outColor;
}





