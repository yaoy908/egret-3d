uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
    if( diffuseColor.w == 0.0 ){
		discard;
	}

	diffuseColor = texture2D(diffuseTexture , uv_0 );
    
    if( diffuseColor.w <= materialSource.cutAlpha ){
			discard;
		}else
			diffuseColor.xyz *= diffuseColor.w ;
}



