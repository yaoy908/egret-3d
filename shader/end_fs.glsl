vec4 diffuseColor ;
vec4 specularColor ;
vec4 ambientColor;
vec4 light ;

void main() {
	if( varying_color.w == 0.0){
		discard;
	}

	if (diffuseColor.x + diffuseColor.y + diffuseColor.z == 0.0)
    {
		diffuseColor.xyz = materialSource.diffuse.xyz + diffuseColor.xyz; 
	}
	else
	{
		diffuseColor.xyz = materialSource.diffuse.xyz * diffuseColor.xyz;

	}

	outColor.xyz = (ambientColor.xyz + materialSource.ambient.xyz + light.xyz) * diffuseColor.xyz + specularColor.xyz * materialSource.specularScale;
	outColor.w = materialSource.alpha * diffuseColor.w ;
	
	if (varying_color.x + varying_color.y + varying_color.z == 0.0)
    {
		gl_FragColor = outColor;
	}
	else
	{
		gl_FragColor = outColor * varying_color;
	}
}
