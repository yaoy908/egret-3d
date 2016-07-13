uniform sampler2D diffuseTexture;
vec4 diffuseColor ;


void calcUVCoord(){

}


void main() {
    if( diffuseColor.w == 0.0 ){
		discard;
	}
	calcUVCoord();
	diffuseColor = texture2D(diffuseTexture , uv_0 );
    
    if( diffuseColor.w <= materialSource.cutAlpha ){
		discard;
	}
}



