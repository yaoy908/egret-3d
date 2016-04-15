uniform sampler2D lightTexture ;
void main(void){
    diffuseColor.xyz *= texture2D( lightTexture , varying_uv1 ).xyz * 2.0 ;
}

