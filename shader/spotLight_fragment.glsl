const int max_sportLight = 1 ;
uniform float uniform_sportLightSource[14*max_sportLight] ;

struct SpotLight{
       vec3 lightPos ;
       vec3 spotDirection ;
       vec3 spotColor ;
       float spotExponent ;
       float spotCosCutoff ;
       float constantAttenuation ;
       float linearAttenuation ;
       float quadrAttenuation ;
};

void calculateSpotLight( MaterialSource materialSource ){ 
  	vec3 ld,ndir,vReflect; 
	float NdotL,dist,lambertTerm; 
	vec3 N = normalize(normal); 
	for(int i = 0 ; i < max_sportLight ; i++){ 
		SpotLight L; 
		L.lightPos = vec3(uniform_sportLightSource[i*max_sportLight],uniform_sportLightSource[i*max_sportLight+1],uniform_sportLightSource[i*max_sportLight+2]); 
		L.spotDirection = vec3(uniform_sportLightSource[i*max_sportLight+3],uniform_sportLightSource[i*max_sportLight+4],uniform_sportLightSource[i*max_sportLight+5]); 
		L.spotColor = vec3(uniform_sportLightSource[i*max_sportLight+6],uniform_sportLightSource[i*max_sportLight+7],uniform_sportLightSource[i*max_sportLight+8]); 
		L.spotExponent = uniform_sportLightSource[i*max_sportLight+9]; 
		L.spotCosCutoff = uniform_sportLightSource[i*max_sportLight+10]; 
		L.constantAttenuation = uniform_sportLightSource[i*max_sportLight+11]; 
		L.linearAttenuation = uniform_sportLightSource[i*max_sportLight+12]; 
		L.quadrAttenuation = uniform_sportLightSource[i*max_sportLight+13]; 

		ld = L.lightPos - varying_pos.xyz ; 
		ndir = normalize(ld); 
		vec3 D = normalize(L.spotDirection); 
		float SpotFactor = dot(ndir, D); 
		if ( SpotFactor > L.spotCosCutoff) 
		{ 
			dist = length(ndir); 
			NdotL = max(dot(N,ndir),0.0); 
			lambertTerm = 1.0 /  (dist * dist)  ; 
			lambertTerm = lambertTerm * NdotL ; 
			vec3 color = lambertTerm * L.spotColor.xyz ; 
			lambertTerm = (1.0 - (1.0 - SpotFactor) * 1.0/(1.0 - L.spotCosCutoff)); 
			light.xyz = color * lambertTerm ; 

			if(dist>0.0){
				vReflect = normalize(2.0*NdotL*N - ndir); 
				specular.xyz += materialSource.specular.xyz *  pow( clamp( dot(vReflect,eyedir) ,0.0,1.0),materialSource.shininess )* L.spotColor ;
			}
		}
  } 
}

void main() {
	calculateSpotLight( materialSource );
}
