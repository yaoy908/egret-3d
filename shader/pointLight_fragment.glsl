const int max_pointLight = 0 ;
uniform float uniform_pointLightSource[12*max_pointLight] ;
uniform mat4 uniform_NormalMatrix;
struct PointLight{
        vec3 position ;
        vec3 diffuse ;
        vec3 ambient ;
        float intensity;
        float radius;
        float falloff;
};

void calculatePointLight(MaterialSource materialSource){
    vec3 N = normal; 
	for(int i = 0 ; i < max_pointLight ; i++){
		PointLight pointLight;
		pointLight.position = vec3(uniform_pointLightSource[i*12],uniform_pointLightSource[i*12+1],uniform_pointLightSource[i*12+2]);
		pointLight.diffuse = vec3(uniform_pointLightSource[i*12+3],uniform_pointLightSource[i*12+4],uniform_pointLightSource[i*12+5]);
		pointLight.ambient = vec3(uniform_pointLightSource[i*12+6],uniform_pointLightSource[i*12+7],uniform_pointLightSource[i*12+8]);
		pointLight.intensity = uniform_pointLightSource[i*12+9];
		pointLight.radius = uniform_pointLightSource[i*12+10];
		pointLight.falloff = uniform_pointLightSource[i*12+11];

		vec3 viewDir = normalize(varying_ViewPose.xyz/varying_ViewPose.w); 
		vec4 lightVirePos = uniform_NormalMatrix * vec4(pointLight.position.xyz,1.0) ; 
		vec3 lightDir = varying_ViewPose.xyz - lightVirePos.xyz ; 
		
		float intensity = max(dot(N,normalize(lightDir)), 0.0); 
		float lightDist = length( lightDir ); 
		float attenuation = pointLight.intensity / (3.0 + 0.001 * lightDist +  0.00009 * lightDist * lightDist); 
		
		light += LightingBlinnPhong(normalize(lightDir),vec3(1.0,1.0,1.0),normal,varying_ViewDir,attenuation);
  //-------------------
		// ambientColor.xyz += pointLight.diffuse.xyz * pointLight.ambient ;
		
		// vec4 lightVirePos = uniform_NormalMatrix * vec4(pointLight.position.xyz,1.0) ; 
        // vec3 lightDir = varying_ViewPose.xyz - lightVirePos.xyz ; 
	    // float intensity = max(dot(N,normalize(lightDir)), 0.0);
		// float lightDist = length( lightDir ); 
		// float attenuation = pointLight.intensity / (3.0 + 0.001 * lightDist +  0.00009 * lightDist * lightDist);
		// light.xyz += pointLight.diffuse * intensity * attenuation ;
		
		// if( attenuation> 0.0){ 
		// 	vec3 viewDir = normalize(varying_ViewPose.xyz/varying_ViewPose.w); 
		// 	vec3 H = normalize( normalize(lightDir) + viewDir ); 
		// 	float NdotH = dot( normal, H ); 
		// 	float lambertTerm = pow( clamp( NdotH ,0.0,1.0),materialSource.shininess ); 
		// 	specularColor.xyz += pointLight.diffuse * lambertTerm * materialSource.specular * attenuation ; 
		// } 
	};
}

void main() {
   calculatePointLight(materialSource);
}
