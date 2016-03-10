vec4 endColor ;
vec4 specular ;
vec4 light ;
vec3 ambient;

void main() {
		endColor.xyz = endColor.xyz + light.xyz + specular.xyz + ambient.xyz ;
        gl_FragColor =  endColor ;
}
