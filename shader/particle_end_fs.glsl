vec4 diffuseColor ;
vec4 specularColor ;
vec4 ambientColor;
vec4 light ;

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
    ambientColor.xyz = materialSource.ambient.xyz ;
    diffuseColor.xyz = materialSource.diffuse.xyz * diffuseColor.xyz ;
	outColor.xyz = (light.xyz+ambientColor.xyz) * diffuseColor.xyz * materialSource.diffuse ;
	outColor.w = materialSource.alpha * diffuseColor.w ;
	if(uniform_particleFsData[2] > TrueOrFalse){
		//alpha mode
		outColor.xyz *= outColor.w * varying_color.w;
	}else{
		outColor.xyz *= 0.7;
	}
    gl_FragColor = outColor * varying_color;
}





