const int max_pointLight = 0 ;
uniform float uniform_pointLightSource[7*max_pointLight] ;

struct PointLight{
        vec3 lightPos ;
        vec3 color ;
        float intensity;
};

void calculatePointLight(MaterialSource materialSource){
	vec3 ldir,vReflect;
    float NdotL,dist,lambertTerm;
	for(int i = 0 ; i < max_pointLight ; i++){
		PointLight L;
		L.lightPos = vec3(uniform_pointLightSource[i*7],uniform_pointLightSource[i*7+1],uniform_pointLightSource[i*7+2]);
		L.color = vec3(uniform_pointLightSource[i*7+3],uniform_pointLightSource[i*7+4],uniform_pointLightSource[i*7+5]);
		L.intensity = uniform_pointLightSource[i*7+6];

		ldir = L.lightPos - varying_pos.xyz ;
		dist = length(ldir);
		ldir = normalize(ldir );
		NdotL = max(dot(normal,ldir),0.0);
		lambertTerm = ( L.intensity  ) / ( dist * dist )  ;
		light.xyz += lambertTerm * (NdotL * L.color.xyz)  ;

		if(lambertTerm>=0.0){
			 vReflect = normalize( materialSource.gloss * dot( normal, ldir ) * normal - ldir );
			 specular.xyz = specular.xyz * min(pow( max( 0.0 , dot(vReflect,eyedir) ) , materialSource.shininess  ),1.0);
		}
	};
}

void main() {
   calculatePointLight(materialSource);
}
