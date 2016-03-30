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
	float lambertian , specular ; 
    vec3 N = normal; 
    for(int i = 0 ; i < max_directLight ; i++){ 
		DirectLight directLight ; 
		directLight.direction = vec3(uniform_directLightSource[i*10+0],uniform_directLightSource[i*10+1],uniform_directLightSource[i*10+2]); 
		directLight.diffuse = vec3(uniform_directLightSource[i*10+3],uniform_directLightSource[i*10+4],uniform_directLightSource[i*10+5]); 
		directLight.ambient = vec3(uniform_directLightSource[i*10+6],uniform_directLightSource[i*10+7],uniform_directLightSource[i*10+8]); 
		directLight.intensity = uniform_directLightSource[i*10+9]; 
		directLight.halfIntensity = uniform_directLightSource[i*10+10]; 
       
        ambientColor.xyz *= directLight.ambient.xyz ;
        vec3 lightDir = mat3(uniform_ModelViewMatrix)*normalize(-directLight.direction); 
        lambertian = max(dot(lightDir,N), 0.0); 
        specular = 0.0; 
  
        vec3 viewDir = normalize(varying_ViewPose); 
        vec3 halfDir = normalize(lightDir + viewDir); 
        float specAngle = max(dot(halfDir, N), 0.0); 

        specular = pow(specAngle, materialSource.shininess ); 
        light.xyz += directLight.diffuse * lambertian * directLight.intensity ; 
        specularColor.xyz += materialSource.specular * specular ; 
    }
}

void main() {
	calculateDirectLight( materialSource );
}
