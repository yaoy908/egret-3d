uniform samplerCube diffuseTexture ;
varying vec3 varying_pos;
void main(void){
	vec3 uvw = normalize(varying_pos.xyz);
	vec4 ref = vec4(textureCube(diffuseTexture, uvw.xyz));
    gl_FragColor = ref ;
}


