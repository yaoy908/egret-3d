const int max_pointLight = 0 ;
uniform float uniform_pointLightSource[12*max_pointLight] ;

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

		ambientColor.xyz += pointLight.diffuse.xyz * pointLight.ambient ;
        vec4 lightVirePos = uniform_ViewMatrix * vec4(pointLight.position.xyz,1.0) ;
        vec3 lightDir = varying_ViewPose.xyz - (lightVirePos.xyz/lightVirePos.w) ; 
        lightDir = normalize(lightDir);
        float distance = length( lightDir );
   
        float lambertTerm = pointLight.intensity / ( distance * distance )  ;
  
        float NdotL = dot( N, lightDir ); 
        NdotL = clamp( NdotL ,0.0,1.0 ); 
  
        light.xyz += pointLight.diffuse * NdotL * lambertTerm ; 

		if( lambertTerm> 0.0){
			vec3 viewDir = normalize(varying_ViewPose); 
			vec3 H = normalize( lightDir + viewDir ); 
			float NdotH = dot( normal, H ); 
			lambertTerm = pow( clamp( NdotH ,0.0,1.0),materialSource.shininess ); 
			specularColor.xyz += lambertTerm * materialSource.specular * materialSource.specularScale ; 
		}
	};
}

void main() {
   calculatePointLight(materialSource);
}
