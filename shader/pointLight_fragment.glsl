const int max_pointLight = 0 ;
uniform float uniform_pointLightSource[7*max_pointLight] ;

struct PointLight{
        vec3 lightPos ;
        vec3 color ;
        float intensity;
};

void calculatePointLight(MaterialSource materialSource){
	vec3 ldir,ndir,vReflect,N;
    float NdotL,dist,lambertTerm;
	N = normalize(normal);
	for(int i = 0 ; i < max_pointLight ; i++){
		PointLight L;
		L.lightPos = vec3(uniform_pointLightSource[i*7],uniform_pointLightSource[i*7+1],uniform_pointLightSource[i*7+2]);
		L.color = vec3(uniform_pointLightSource[i*7+3],uniform_pointLightSource[i*7+4],uniform_pointLightSource[i*7+5]);
		L.intensity = uniform_pointLightSource[i*7+6];

		ambient.xyz *= L.color.xyz ;
		ldir = L.lightPos - varying_pos.xyz ;
		ndir = normalize(ldir);
		dist = length(ndir);
		NdotL = clamp(dot( N , ndir ),0.0,1.0);

		lambertTerm = ( L.intensity  ) / ( dist * dist ) *NdotL ;
		light.xyz = lambertTerm *  L.color.xyz  ;
		specular.xyz += L.color * phongSpecular(ndir,normalize(varying_eyedir),N,materialSource.shininess) ;	
	};
}

float phongSpecular(vec3 lightDirection,vec3 viewDirection,vec3 surfaceNormal,float shininess) {
  vec3 R = -reflect(lightDirection, surfaceNormal);
  return pow(max(0.0, dot(viewDirection, R)), shininess);
}

void main() {
   calculatePointLight(materialSource);
}
