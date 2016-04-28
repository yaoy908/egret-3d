uniform sampler2D lightTexture ;
varying vec2 varying_uv1 ;
void main(void){
    diffuseColor.xyz *= texture2D( lightTexture , varying_uv1 ).xyz * 2.0 ;
}

