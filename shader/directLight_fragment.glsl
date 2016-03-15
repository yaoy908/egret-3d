const int max_directLight = 0 ;
uniform float uniform_directLightSource[11*max_directLight] ;

struct DirectLight{
    vec3 direction;
	vec3 diffuse;
	vec3 halfColor;
    float intensity;
    float halfIntensity;
};

vec4 light ;
void calculateDirectLight( MaterialSource materialSource ){
	  	float specularfract,NdotL ; 
    vec3 vReflect,ldir,ndir,N;
    N = normalize(normal);
    for(int i = 0 ; i < max_directLight ; i++){ 
		  DirectLight l ; 
		  l.direction = vec3(uniform_directLightSource[i*10+0],uniform_directLightSource[i*10+1],uniform_directLightSource[i*10+2]); 
		  l.diffuse = vec3(uniform_directLightSource[i*10+3],uniform_directLightSource[i*10+4],uniform_directLightSource[i*10+5]); 
		  l.halfColor = vec3(uniform_directLightSource[i*10+6],uniform_directLightSource[i*10+7],uniform_directLightSource[i*10+8]); 
		  l.intensity = uniform_directLightSource[i*7+9]; 
		  l.halfIntensity = uniform_directLightSource[i*7+10]; 
      
		  ldir = l.direction ;       
		  ndir = normalize(l.direction) ; 
		  NdotL = clamp(dot( N , ndir ),0.0,1.0);

		  float lambertTerm = NdotL* l.intensity ; 
		  light.xyz += l.diffuse * lambertTerm ; 
      
		  float halfLambertTerm = clamp(dot(N,-ldir),0.0,1.0); 
		  light.xyz += ( halfLambertTerm * l.halfColor * 0.25 + l.halfColor * 0.25 ) * l.halfIntensity; 
		  vReflect = normalize(2.0*NdotL*N - ndir); 
		  specular.xyz += l.diffuse * pow( clamp( dot(vReflect,normalize(eyedir)) ,0.0,1.0), materialSource.shininess ) ;	
    }; 
}

void main() {
	calculateDirectLight( materialSource );
}
