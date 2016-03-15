vec4 endColor ;
vec4 specular ;
vec4 light ;
vec3 ambient;

void main() {	
	endColor.xyz = endColor.xyz * light.xyz + specular.xyz * materialSource.specular + ambient.xyz + diffuse.xyz;
        gl_FragColor = endColor ;
}
