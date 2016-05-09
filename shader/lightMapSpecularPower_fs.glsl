uniform sampler2D lightTexture ;
varying vec2 varying_uv1 ;
void main(void){
	vec3 lightmap = texture2D( lightTexture , varying_uv1 ).xyz * 1.5;
    diffuseColor.xyz *= lightmap ;
	specularColor.xyz *= lightmap;
}

