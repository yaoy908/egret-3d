const int max_directLight = 0 ;
uniform float uniform_directLightSource[11*max_directLight] ;

struct DirectLight{
    vec3 direction;
	vec3 diffuse;
	vec3 ambient;
    float intensity;
    float halfIntensity;
};

void calculateDirectLight( MaterialSource materialSource ){
	float lambertTerm , specular ; 
    vec3 N = normal; 
    for(int i = 0 ; i < max_directLight ; i++){ 
		DirectLight directLight ; 
		directLight.direction = vec3(uniform_directLightSource[i*11+0],uniform_directLightSource[i*11+1],uniform_directLightSource[i*11+2]); 
		directLight.diffuse = vec3(uniform_directLightSource[i*11+3],uniform_directLightSource[i*11+4],uniform_directLightSource[i*11+5]); 
		directLight.ambient = vec3(uniform_directLightSource[i*11+6],uniform_directLightSource[i*11+7],uniform_directLightSource[i*11+8]); 
		directLight.intensity = uniform_directLightSource[i*11+9]; 
		directLight.halfIntensity = uniform_directLightSource[i*11+10]; 
       
        ambientColor.xyz += directLight.ambient.xyz * directLight.diffuse ;
        vec3 lightDir = mat3(uniform_ViewMatrix) * normalize(directLight.direction);
        lambertTerm = max(dot(lightDir,N), 0.0); 
        light.xyz += directLight.diffuse * lambertTerm * directLight.intensity ; 
        
        if( lambertTerm> 0.0){ 
			vec3 viewDir = normalize(varying_ViewPose.xyz/varying_ViewPose.w); 
			vec3 H = normalize( normalize(lightDir) + viewDir ); 
			float NdotH = dot( normal, H ); 
			float lambertTerm = pow( clamp( NdotH ,0.0,1.0),materialSource.shininess ); 
			specularColor.xyz += directLight.diffuse * materialSource.specular * lambertTerm; 
		} 
    }
}

void main() {
	calculateDirectLight( materialSource );
}
