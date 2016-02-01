uniform samplerCube sky_texture ;
//uniform sampler2D diffuseTex ;
varying vec3 varying_pos   ;
void main(void){
	//vec4 diffuse = texture2D( diffuseTex , varying_pos.xy );
	vec3 uvw = normalize(varying_pos.xyz);
	vec4 ref = vec4(textureCube( sky_texture , uvw.xyz ));
    gl_FragColor = ref ;
}


