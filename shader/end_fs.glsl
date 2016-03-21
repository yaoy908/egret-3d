vec4 endColor ;
vec4 specular ;
vec4 diffuse ;
vec4 light ;
vec3 ambient;
vec4 diffuseTex;
vec4 specularTexColor;

void main() {	
    diffuseTex.xyz = materialSource.diffuse.xyz * diffuseTex.xyz * materialSource.diffusePower ;
	ambient.xyz = ambient.xyz * materialSource.ambientPower * materialSource.ambient.xyz ;

	endColor.xyz = (ambient.xyz + light.xyz) * diffuseTex.xyz ;
	endColor.xyz += specular.xyz * materialSource.specular.xyz * specularTexColor.xyz ;
	endColor.w = materialSource.alpha * diffuseTex.w ;
    gl_FragColor = endColor ;
}
