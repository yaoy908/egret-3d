//near
//far
//blendMode
uniform float uniform_particleFsData[3];
void main() {
	outColor.xyz = diffuseColor.xyz * materialSource.diffuse * varying_color.xyz ;
	outColor.w = materialSource.alpha * diffuseColor.w * varying_color.w;
	outColor.xyz *= outColor.w;
	outColor.xyz *= 1.8;
    gl_FragColor = outColor;
}





