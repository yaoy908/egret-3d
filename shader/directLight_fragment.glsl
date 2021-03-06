const int max_directLight = 0 ;
uniform float uniform_directLightSource[6*max_directLight] ;
varying vec3 varying_ViewDir; 
uniform mat4 uniform_NormalMatrix;
struct DirectLight{
    vec3 direction;
	vec3 diffuse;
	// vec3 ambient;
    // float intensity;
    // float halfIntensity;
};

void calculateDirectLight( MaterialSource materialSource ){
	float lambertTerm , specular ; 
    vec3 N = normal; 
    for(int i = 0 ; i < max_directLight ; i++){ 
		DirectLight directLight ; 
		directLight.direction = vec3(uniform_directLightSource[i*6+0],uniform_directLightSource[i*6+1],uniform_directLightSource[i*6+2]); 
		directLight.diffuse = vec3(uniform_directLightSource[i*6+3],uniform_directLightSource[i*6+4],uniform_directLightSource[i*6+5]); 
       
	    vec3 lightDir = -normalize(directLight.direction); 
        light += LightingBlinnPhong(normalize(lightDir),vec3(1.0,1.0,1.0),normal,-varying_ViewDir,0.5);
    }
}

void main() {
	calculateDirectLight( materialSource );
}
