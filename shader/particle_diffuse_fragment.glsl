uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
vec2 particleUVRoll = vec2(0.0);
void main() {
    if( diffuseColor.w == 0.0 ){
		discard;
	}
	uv_0 += particleUVRoll;
	diffuseColor = texture2D(diffuseTexture , uv_0 );
    
    if( diffuseColor.w <= materialSource.cutAlpha ){
			discard;
	}else
			diffuseColor.xyz *= diffuseColor.w ;
}



