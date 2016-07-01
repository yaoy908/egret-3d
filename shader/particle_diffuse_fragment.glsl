uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
varying float varying_posZ;

void calcUVCoord(){

}

void fadeOutParticleByZ(){
	float fadeAlpha = (4000.0 - varying_posZ) / 4000.0;
	fadeAlpha = clamp(fadeAlpha, 0.0, 1.0);
	fadeAlpha *= fadeAlpha;
	outColor.w *= fadeAlpha;
}

void main() {
    if( diffuseColor.w == 0.0 ){
		discard;
	}
	calcUVCoord();
	diffuseColor = texture2D(diffuseTexture , uv_0 );
    
    if( diffuseColor.w <= materialSource.cutAlpha ){
		discard;
	}else
		diffuseColor.xyz *= diffuseColor.w ;
}



