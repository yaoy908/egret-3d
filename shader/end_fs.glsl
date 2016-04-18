vec4 diffuseColor ;
vec4 specularColor ;
vec4 ambientColor;
vec4 light ;

void main() {
	if( varying_color.w == 0.0){
		discard;
	}

    diffuseColor.xyz = materialSource.diffuse.xyz * diffuseColor.xyz ;
	outColor.xyz = (ambientColor.xyz + materialSource.ambient.xyz + light.xyz) * diffuseColor.xyz + specularColor.xyz * materialSource.specularScale;
	outColor.w = materialSource.alpha * diffuseColor.w ;

    gl_FragColor = outColor * varying_color;
}
