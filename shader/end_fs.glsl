vec4 diffuseColor ;
vec4 specularColor ;
vec4 ambientColor;
vec4 light ;

void main() {
    ambientColor.xyz = materialSource.ambient.xyz ;
    diffuseColor.xyz = materialSource.diffuse.xyz * diffuseColor.xyz ;
	outColor.xyz = (light.xyz+ambientColor.xyz) * diffuseColor.xyz * materialSource.diffuse ;
	outColor.w = materialSource.alpha * diffuseColor.w ;

    gl_FragColor = outColor * varying_color;
}
