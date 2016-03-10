module egret3d_dev {
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"Color_fragment":
			"uniform float uniform_materialSource[16] ; \n" +
			"struct MaterialSource{ \n" +
			"vec3 diffuse; \n" +
			"vec3 ambient; \n" +
			"vec3 specular; \n" +
			"float alpha; \n" +
			"float cutAlpha; \n" +
			"float shininess; \n" +
			"float diffusePower; \n" +
			"float specularPower; \n" +
			"float ambientPower; \n" +
			"float normalPower; \n" +
			"}; \n" +
			"varying vec4 varying_pos        ; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec4 varying_color  ; \n" +
			"varying vec3 varying_eyedir  ; \n" +
			"vec4 endColor ; \n" +
			"vec4 diffuse  ; \n" +
			"vec4 specular ; \n" +
			"vec3 normal  ; \n" +
			"vec3 eyedir  ; \n" +
			"vec4 light ; \n" +
			"vec4 ambient; \n" +
			"void main() { \n" +
			"MaterialSource materialSource ; \n" +
			"materialSource.diffuse.x = uniform_materialSource[0]; \n" +
			"materialSource.diffuse.y = uniform_materialSource[1]; \n" +
			"materialSource.diffuse.z = uniform_materialSource[2]; \n" +
			"materialSource.ambient.x = uniform_materialSource[3]; \n" +
			"materialSource.ambient.y = uniform_materialSource[4]; \n" +
			"materialSource.ambient.z = uniform_materialSource[5]; \n" +
			"materialSource.specular.x = uniform_materialSource[6]; \n" +
			"materialSource.specular.y = uniform_materialSource[7]; \n" +
			"materialSource.specular.z = uniform_materialSource[8]; \n" +
			"materialSource.alpha = uniform_materialSource[9]; \n" +
			"materialSource.cutAlpha = uniform_materialSource[10]; \n" +
			"materialSource.shininess = uniform_materialSource[11]; \n" +
			"materialSource.diffusePower = uniform_materialSource[12]; \n" +
			"materialSource.specularPower = uniform_materialSource[13]; \n" +
			"materialSource.ambientPower = uniform_materialSource[14]; \n" +
			"materialSource.normalPower = uniform_materialSource[15]; \n" +
			"normal = varying_eyeNormal; \n" +
			"endColor = vec4(materialSource.diffuse,materialSource.alpha); \n" +
			"eyedir = varying_eyedir.xyz - varying_pos.xyz ; \n" +
			"} \n",

			"Color_vertex":
			"attribute vec3 attribute_position ; \n" +
			"attribute vec3 attribute_normal ; \n" +
			"attribute vec4 attribute_color ; \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"uniform mat4 uniform_normalMatrix ; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"varying vec4 varying_pos        ; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec4 varying_color  ; \n" +
			"varying vec3 varying_eyedir  ; \n" +
			"vec4 endPosition ; \n" +
			"void main(void){ \n" +
			"endPosition =  vec4(attribute_position,1.0) ; \n" +
			"endPosition =  uniform_ModelMatrix * endPosition ; \n" +
			"varying_eyedir = uniform_eyepos ; \n" +
			"varying_pos =  endPosition ; \n" +
			"endPosition = uniform_ProjectionMatrix * endPosition ; \n" +
			"varying_eyeNormal =  (uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ; \n" +
			"varying_color = attribute_color ; \n" +
			"} \n",

			"directLight_fragment":
			"const int max_directLight = 1 ; \n" +
			"uniform float uniform_directLightSource[11*max_directLight] ; \n" +
			"struct DirectLight{ \n" +
			"vec3 direction; \n" +
			"vec3 diffuse; \n" +
			"vec3 halfColor; \n" +
			"float intensity; \n" +
			"float halfIntensity; \n" +
			"}; \n" +
			"vec4 light ; \n" +
			"void calculateDirectLight( MaterialSource materialSource ){ \n" +
			"float specularfract ; \n" +
			"vec3 halfV,ldir; \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight l ; \n" +
			"l.direction = vec3(uniform_directLightSource[i*10+0],uniform_directLightSource[i*10+1],uniform_directLightSource[i*10+2]); \n" +
			"l.diffuse = vec3(uniform_directLightSource[i*10+3],uniform_directLightSource[i*10+4],uniform_directLightSource[i*10+5]); \n" +
			"l.halfColor = vec3(uniform_directLightSource[i*10+6],uniform_directLightSource[i*10+7],uniform_directLightSource[i*10+8]); \n" +
			"l.intensity = uniform_directLightSource[i*7+9]; \n" +
			"l.halfIntensity = uniform_directLightSource[i*7+10]; \n" +
			"vec3 N = normalize(normal) ; \n" +
			"ldir = normalize(l.direction) ; \n" +
			"float lambertTerm = min(1.0,max(0.0,dot(N,ldir))) ; \n" +
			"light.xyz += l.diffuse * lambertTerm  * l.intensity ; \n" +
			"float halfLambertTerm = min(1.0,dot(N,-ldir)); \n" +
			"light.xyz += ( halfLambertTerm * l.halfColor * 0.25 + l.halfColor * 0.25 ) * l.halfIntensity; \n" +
			"if(lambertTerm>0.0){ \n" +
			"halfV = normalize(ldir + normalize(eyedir)); \n" +
			"specularfract = max( dot(halfV, N ) , 0.0 ); \n" +
			"specularfract = pow(specularfract, materialSource.shininess ); \n" +
			"specular.w += specularfract ; \n" +
			"} \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculateDirectLight( materialSource ); \n" +
			"} \n",

			"end_fs":
			"vec4 endColor ; \n" +
			"vec4 specular ; \n" +
			"vec4 light ; \n" +
			"vec3 ambient; \n" +
			"void main() { \n" +
			"endColor.xyz = endColor.xyz + light.xyz + specular.xyz + ambient.xyz ; \n" +
			"gl_FragColor =  endColor ; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"void main() { \n" +
			"gl_Position =  endPosition ; \n" +
			"} \n" +
			"                       \n",


		};
	}
}
