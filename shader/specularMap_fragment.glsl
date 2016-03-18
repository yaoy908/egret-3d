uniform sampler2D specularTexture;
vec4 specularTexColor;
void main(void){
    specularTexColor.xyz = texture2D( specularTexture , varying_uv0 ).xyz ;
}

