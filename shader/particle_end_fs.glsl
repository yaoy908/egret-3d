vec4 diffuseColor ;

uniform float uniform_particleFsData[3];
varying float varying_posZ;


void fadeOutParticleByZ(float scaleFrom, float scaleTo){
	
	float threshold = uniform_particleFsData[0] * scaleFrom;
	if(varying_posZ < threshold)
		return;
	threshold = uniform_particleFsData[0] * scaleTo;
	if(varying_posZ > threshold){
		discard;
	}
	//fade out
	float fadeAlpha = (threshold - varying_posZ) / threshold;
	fadeAlpha = clamp(fadeAlpha, 0.0, 1.0);
	outColor.w *= fadeAlpha;

	if( diffuseColor.w <= materialSource.cutAlpha ){
		discard;
	}

}

void main() {
	outColor.xyz = diffuseColor.xyz * materialSource.diffuse ;
	outColor.w = materialSource.alpha * diffuseColor.w ;
	if(uniform_particleFsData[2] > TrueOrFalse){
		//alpha mode
		outColor.xyz *= outColor.w * varying_color.w;
	}
    gl_FragColor = outColor * varying_color;
}





