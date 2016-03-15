vec4 endColor ;
vec4 specular ;
vec4 diffuse ;
vec4 light ;
vec3 ambient;

void main() {	
	endColor.xyz = (diffuse.xyz * (endColor.xyz * light.xyz) ) + (specular.xyz * materialSource.specular.xyz) + (diffuse.xyz * materialSource.ambient.xyz) ;
    gl_FragColor = endColor ;
}
