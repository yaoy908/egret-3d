uniform sampler2D diffuseTexture;
vec4 diffuseColor ;


void calcUVCoord(vec3 particleVertex){

}

void main() {
    if( diffuseColor.w == 0.0 ){
		discard;
	}
	calcUVCoord(particleVertex);
	diffuseColor = texture2D(diffuseTexture , uv_0 );
    
    if( diffuseColor.w <= materialSource.cutAlpha ){
			discard;
	}else
			diffuseColor.xyz *= diffuseColor.w ;
}



