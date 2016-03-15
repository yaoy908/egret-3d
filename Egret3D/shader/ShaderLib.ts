module egret3d {
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
			"attribute vec3 attribute_tangent ; \n" +
			"attribute vec4 attribute_color ; \n" +
			"attribute vec2 attribute_uv0 ; \n" +
			"attribute vec4 attribute_boneIndex ; \n" +
			"attribute vec4 attribute_boneWeight ; \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"uniform mat4 uniform_normalMatrix ; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"varying vec4 varying_pos        ; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec4 varying_color  ; \n" +
			"varying vec3 varying_eyedir  ; \n" +
			"vec4 endPosition ; \n" +
			"mat4 buildMat4(int index){ \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0]; \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1]; \n" +
			"float xx = quat.x * quat.x; \n" +
			"float xy = quat.x * quat.y; \n" +
			"float xz = quat.x * quat.z; \n" +
			"float xw = quat.x * quat.w; \n" +
			"float yy = quat.y * quat.y; \n" +
			"float yz = quat.y * quat.z; \n" +
			"float yw = quat.y * quat.w; \n" +
			"float zz = quat.z * quat.z; \n" +
			"float zw = quat.z * quat.w; \n" +
			"return mat4( \n" +
			"1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0, \n" +
			"2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0, \n" +
			"2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0, \n" +
			"translation.x,				translation.y,			translation.z,			1 \n" +
			"); \n" +
			"} \n" +
			"void main(void){ \n" +
			"endPosition = vec4(0.0, 0.0, 0.0, 0.0) ; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.x)) * temp_position * attribute_boneWeight.x; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.y)) * temp_position * attribute_boneWeight.y; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.z)) * temp_position * attribute_boneWeight.z; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.w)) * temp_position * attribute_boneWeight.w; \n" +
			"endPosition =  uniform_ModelMatrix * endPosition ; \n" +
			"varying_eyedir = uniform_eyepos ; \n" +
			"varying_pos =  endPosition ; \n" +
			"endPosition = uniform_ProjectionMatrix * endPosition ; \n" +
			"varying_eyeNormal =  (uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ; \n" +
			"varying_color = attribute_color ; \n" +
			"} \n",

			"diffuse_fragment":
			"uniform float uniform_materialSource[16] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
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
			"varying vec2 varying_uv0; \n" +
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
			"diffuse = texture2D(diffuseTexture , varying_uv0 ); \n" +
			"endColor = endColor; \n" +
			"eyedir = varying_eyedir.xyz - varying_pos.xyz ; \n" +
			"} \n",

			"diffuse_vertex":
			"attribute vec3 attribute_position ; \n" +
			"attribute vec3 attribute_normal ; \n" +
			"attribute vec3 attribute_tangent ; \n" +
			"attribute vec4 attribute_color ; \n" +
			"attribute vec2 attribute_uv0 ; \n" +
			"attribute vec4 attribute_boneIndex ; \n" +
			"attribute vec4 attribute_boneWeight ; \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"uniform mat4 uniform_normalMatrix ; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"varying vec4 varying_pos        ; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec4 varying_color  ; \n" +
			"varying vec3 varying_eyedir  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"vec4 endPosition ; \n" +
			"mat4 buildMat4(int index){ \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0]; \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1]; \n" +
			"float xx = quat.x * quat.x; \n" +
			"float xy = quat.x * quat.y; \n" +
			"float xz = quat.x * quat.z; \n" +
			"float xw = quat.x * quat.w; \n" +
			"float yy = quat.y * quat.y; \n" +
			"float yz = quat.y * quat.z; \n" +
			"float yw = quat.y * quat.w; \n" +
			"float zz = quat.z * quat.z; \n" +
			"float zw = quat.z * quat.w; \n" +
			"return mat4( \n" +
			"1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0, \n" +
			"2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0, \n" +
			"2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0, \n" +
			"translation.x,				translation.y,			translation.z,			1 \n" +
			"); \n" +
			"} \n" +
			"void main(void){ \n" +
			"endPosition = vec4(0.0, 0.0, 0.0, 0.0) ; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.x)) * temp_position * attribute_boneWeight.x; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.y)) * temp_position * attribute_boneWeight.y; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.z)) * temp_position * attribute_boneWeight.z; \n" +
			"endPosition += buildMat4(int(attribute_boneIndex.w)) * temp_position * attribute_boneWeight.w; \n" +
			"endPosition =  uniform_ModelMatrix * endPosition ; \n" +
			"varying_eyedir = uniform_eyepos ; \n" +
			"varying_pos =  endPosition ; \n" +
			"endPosition = uniform_ProjectionMatrix * endPosition ; \n" +
			"varying_eyeNormal =  (uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"varying_color = attribute_color ; \n" +
			"} \n",

			"directLight_fragment":
			"const int max_directLight = 0 ; \n" +
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
			"float specularfract,NdotL ; \n" +
			"vec3 vReflect,ldir,ndir,N; \n" +
			"N = normalize(normal); \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight l ; \n" +
			"l.direction = vec3(uniform_directLightSource[i*10+0],uniform_directLightSource[i*10+1],uniform_directLightSource[i*10+2]); \n" +
			"l.diffuse = vec3(uniform_directLightSource[i*10+3],uniform_directLightSource[i*10+4],uniform_directLightSource[i*10+5]); \n" +
			"l.halfColor = vec3(uniform_directLightSource[i*10+6],uniform_directLightSource[i*10+7],uniform_directLightSource[i*10+8]); \n" +
			"l.intensity = uniform_directLightSource[i*7+9]; \n" +
			"l.halfIntensity = uniform_directLightSource[i*7+10]; \n" +
			"ldir = l.direction ; \n" +
			"ndir = normalize(l.direction) ; \n" +
			"NdotL = clamp(dot( N , ndir ),0.0,1.0); \n" +
			"float lambertTerm = NdotL* l.intensity ; \n" +
			"light.xyz += l.diffuse * lambertTerm ; \n" +
			"float halfLambertTerm = clamp(dot(N,-ldir),0.0,1.0); \n" +
			"light.xyz += ( halfLambertTerm * l.halfColor * 0.25 + l.halfColor * 0.25 ) * l.halfIntensity; \n" +
			"vReflect = normalize(2.0*NdotL*N - ndir); \n" +
			"specular.xyz += l.diffuse * pow( clamp( dot(vReflect,normalize(eyedir)) ,0.0,1.0), materialSource.shininess ) ; \n" +
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
			"endColor.xyz = endColor.xyz * light.xyz + specular.xyz * materialSource.specular + ambient.xyz + diffuse.xyz; \n" +
			"gl_FragColor = endColor ; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"void main() { \n" +
			"gl_Position =  endPosition ; \n" +
			"} \n" +
			"                       \n",

			"pointLight_fragment":
			"const int max_pointLight = 0 ; \n" +
			"uniform float uniform_pointLightSource[7*max_pointLight] ; \n" +
			"struct PointLight{ \n" +
			"vec3 lightPos ; \n" +
			"vec3 color ; \n" +
			"float intensity; \n" +
			"}; \n" +
			"void calculatePointLight(MaterialSource materialSource){ \n" +
			"vec3 ldir,ndir,vReflect,N; \n" +
			"float NdotL,dist,lambertTerm; \n" +
			"N = normalize(normal); \n" +
			"for(int i = 0 ; i < max_pointLight ; i++){ \n" +
			"PointLight L; \n" +
			"L.lightPos = vec3(uniform_pointLightSource[i*7],uniform_pointLightSource[i*7+1],uniform_pointLightSource[i*7+2]); \n" +
			"L.color = vec3(uniform_pointLightSource[i*7+3],uniform_pointLightSource[i*7+4],uniform_pointLightSource[i*7+5]); \n" +
			"L.intensity = uniform_pointLightSource[i*7+6]; \n" +
			"ldir = L.lightPos - varying_pos.xyz ; \n" +
			"ndir = normalize(ldir); \n" +
			"dist = length(ndir); \n" +
			"NdotL = clamp(dot(N,ndir),0.0,1.0); \n" +
			"lambertTerm = ( L.intensity  ) / ( dist * dist )  ; \n" +
			"light.xyz = lambertTerm * (NdotL * L.color.xyz)  ; \n" +
			"if(lambertTerm>=0.0){ \n" +
			"vReflect = normalize(2.0*NdotL*N - ndir); \n" +
			"specular.xyz += L.color * pow( clamp( dot(vReflect,normalize(eyedir)) ,0.0,1.0), materialSource.shininess ) ; \n" +
			"} \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculatePointLight(materialSource); \n" +
			"} \n",

			"spotLight_fragment":
			"const int max_sportLight = 0 ; \n" +
			"uniform float uniform_sportLightSource[14*max_sportLight] ; \n" +
			"struct SpotLight{ \n" +
			"vec3 lightPos ; \n" +
			"vec3 spotDirection ; \n" +
			"vec3 spotColor ; \n" +
			"float spotExponent ; \n" +
			"float spotCosCutoff ; \n" +
			"float constantAttenuation ; \n" +
			"float linearAttenuation ; \n" +
			"float quadrAttenuation ; \n" +
			"}; \n" +
			"void calculateSpotLight( MaterialSource materialSource ){ \n" +
			"vec3 ld,ndir,vReflect; \n" +
			"float NdotL,dist,lambertTerm; \n" +
			"vec3 N = normalize(normal); \n" +
			"for(int i = 0 ; i < max_sportLight ; i++){ \n" +
			"SpotLight L; \n" +
			"L.lightPos = vec3(uniform_sportLightSource[i*max_sportLight],uniform_sportLightSource[i*max_sportLight+1],uniform_sportLightSource[i*max_sportLight+2]); \n" +
			"L.spotDirection = vec3(uniform_sportLightSource[i*max_sportLight+3],uniform_sportLightSource[i*max_sportLight+4],uniform_sportLightSource[i*max_sportLight+5]); \n" +
			"L.spotColor = vec3(uniform_sportLightSource[i*max_sportLight+6],uniform_sportLightSource[i*max_sportLight+7],uniform_sportLightSource[i*max_sportLight+8]); \n" +
			"L.spotExponent = uniform_sportLightSource[i*max_sportLight+9]; \n" +
			"L.spotCosCutoff = uniform_sportLightSource[i*max_sportLight+10]; \n" +
			"L.constantAttenuation = uniform_sportLightSource[i*max_sportLight+11]; \n" +
			"L.linearAttenuation = uniform_sportLightSource[i*max_sportLight+12]; \n" +
			"L.quadrAttenuation = uniform_sportLightSource[i*max_sportLight+13]; \n" +
			"ld = L.lightPos - varying_pos.xyz ; \n" +
			"ndir = normalize(ld); \n" +
			"vec3 D = normalize(L.spotDirection); \n" +
			"float SpotFactor = dot(ndir, D); \n" +
			"if ( SpotFactor > L.spotCosCutoff) \n" +
			"{ \n" +
			"dist = length(ndir); \n" +
			"NdotL = max(dot(N,ndir),0.0); \n" +
			"lambertTerm = 1.0 /  (dist * dist)  ; \n" +
			"lambertTerm = lambertTerm * NdotL ; \n" +
			"vec3 color = lambertTerm * L.spotColor.xyz ; \n" +
			"lambertTerm = (1.0 - (1.0 - SpotFactor) * 1.0/(1.0 - L.spotCosCutoff)); \n" +
			"light.xyz = color * lambertTerm ; \n" +
			"vReflect = normalize(2.0*NdotL*N - ndir); \n" +
			"specular.xyz += pow( clamp( dot(vReflect,eyedir) ,0.0,1.0),materialSource.shininess )* L.spotColor ; \n" +
			"} \n" +
			"} \n" +
			"} \n" +
			"void main() { \n" +
			"calculateSpotLight( materialSource ); \n" +
			"} \n",


		};
	}
}
