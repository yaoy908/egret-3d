module egret3d {
	/**
	* @private
	*/
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"base_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec3 varying_ViewPose; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"uniform mat4 uniform_ModelViewMatrix ; \n" +
			"vec4 outColor; \n" +
			"vec4 diffuseColor ; \n" +
			"vec4 specularColor ; \n" +
			"vec4 ambientColor; \n" +
			"vec4 light ; \n" +
			"vec3 normal; \n" +
			"vec2 uv_0; \n" +
			"vec3 flatNormals(vec3 pos) { \n" +
			"vec3 fdx = dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n" +
			"void main() { \n" +
			"diffuseColor  = vec4(1.0,1.0,1.0,1.0); \n" +
			"specularColor = vec4(0.0,0.0,0.0,0.0); \n" +
			"ambientColor  = vec4(1.0,1.0,1.0,1.0); \n" +
			"light         = vec4(0.0,0.0,0.0,0.0); \n" +
			"normal = normalize(varying_eyeNormal) ; \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"base_vs":
			"attribute vec3 attribute_position ; \n" +
			"attribute vec3 attribute_normal ; \n" +
			"attribute vec2 attribute_uv0 ; \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ModelViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"varying vec3 varying_ViewPose; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"vec4 outPosition ; \n" +
			"mat3 transpose(mat3 m) { \n" +
			"return mat3(m[0][0], m[1][0], m[2][0], \n" +
			"m[0][1], m[1][1], m[2][1], \n" +
			"m[0][2], m[1][2], m[2][2]); \n" +
			"} \n" +
			"mat3 inverse(mat3 m) { \n" +
			"float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2]; \n" +
			"float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2]; \n" +
			"float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2]; \n" +
			"float b01 = a22 * a11 - a12 * a21; \n" +
			"float b11 = -a22 * a10 + a12 * a20; \n" +
			"float b21 = a21 * a10 - a11 * a20; \n" +
			"float det = a00 * b01 + a01 * b11 + a02 * b21; \n" +
			"return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11), \n" +
			"b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10), \n" +
			"b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det; \n" +
			"} \n" +
			"void main(void){ \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"diffuse_fragment":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor = textureLinear(diffuseTexture , uv_0 ); \n" +
			"} \n",

			"diffuse_vertex":
			"void main(void){ \n" +
			"mat3 normalMatrix = transpose( inverse(mat3(uniform_ModelViewMatrix )) ); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -attribute_normal); \n" +
			"outPosition = uniform_ModelViewMatrix * vec4(attribute_position, 1.0) ; \n" +
			"varying_ViewPose = outPosition.xyz / outPosition.w; \n" +
			"} \n",

			"directLight_fragment":
			"const int max_directLight = 0 ; \n" +
			"uniform float uniform_directLightSource[11*max_directLight] ; \n" +
			"struct DirectLight{ \n" +
			"vec3 direction; \n" +
			"vec3 diffuse; \n" +
			"vec3 ambient; \n" +
			"float intensity; \n" +
			"float halfIntensity; \n" +
			"}; \n" +
			"void calculateDirectLight( MaterialSource materialSource ){ \n" +
			"float lambertian , specular ; \n" +
			"vec3 N = normal; \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight directLight ; \n" +
			"directLight.direction = vec3(uniform_directLightSource[i*10+0],uniform_directLightSource[i*10+1],uniform_directLightSource[i*10+2]); \n" +
			"directLight.diffuse = vec3(uniform_directLightSource[i*10+3],uniform_directLightSource[i*10+4],uniform_directLightSource[i*10+5]); \n" +
			"directLight.ambient = vec3(uniform_directLightSource[i*10+6],uniform_directLightSource[i*10+7],uniform_directLightSource[i*10+8]); \n" +
			"directLight.intensity = uniform_directLightSource[i*10+9]; \n" +
			"directLight.halfIntensity = uniform_directLightSource[i*10+10]; \n" +
			"ambientColor.xyz *= directLight.ambient.xyz ; \n" +
			"vec3 lightDir = mat3(uniform_ModelViewMatrix)*normalize(-directLight.direction); \n" +
			"lambertian = max(dot(lightDir,N), 0.0); \n" +
			"specular = 0.0; \n" +
			"vec3 viewDir = normalize(varying_ViewPose); \n" +
			"vec3 halfDir = normalize(lightDir + viewDir); \n" +
			"float specAngle = max(dot(halfDir, N), 0.0); \n" +
			"specular = pow(specAngle, materialSource.shininess ); \n" +
			"light.xyz += directLight.diffuse * lambertian * directLight.intensity ; \n" +
			"specularColor.xyz += materialSource.specular * specular ; \n" +
			"} \n" +
			"} \n" +
			"void main() { \n" +
			"calculateDirectLight( materialSource ); \n" +
			"} \n",

			"end_fs":
			"vec4 diffuseColor ; \n" +
			"vec4 specularColor ; \n" +
			"vec4 ambientColor; \n" +
			"vec4 light ; \n" +
			"void main() { \n" +
			"diffuseColor.xyz = materialSource.diffuse.xyz * diffuseColor.xyz ; \n" +
			"outColor.xyz = (ambientColor.xyz + light.xyz) * diffuseColor.xyz + specularColor.xyz * materialSource.specularScale; \n" +
			"outColor.w = materialSource.alpha * diffuseColor.w ; \n" +
			"gl_FragColor = outColor ; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"void main() { \n" +
			"gl_PointSize = 50.0; \n" +
			"gl_Position = uniform_ProjectionMatrix * outPosition ; \n" +
			"} \n" +
			"                       \n",

			"flatNormal_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"vec3 flatNormal(vec3 pos){ \n" +
			"vec3 fdx = dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n",

			"gamma_fs":
			"const float gamma = 2.2; \n" +
			"float toLinear_float_v1(float v) { \n" +
			"return pow(v, gamma); \n" +
			"} \n" +
			"vec2 toLinear_vec2_v1(vec2 v) { \n" +
			"return pow(v, vec2(gamma)); \n" +
			"} \n" +
			"vec3 toLinear_vec3_v1(vec3 v) { \n" +
			"return pow(v, vec3(gamma)); \n" +
			"} \n" +
			"vec4 toLinear_vec4_v1(vec4 v) { \n" +
			"return vec4(toLinear_vec3_v1(v.rgb), v.a); \n" +
			"} \n" +
			"float toGamma_float_v2(float v) { \n" +
			"return pow(v, 1.0 / gamma); \n" +
			"} \n" +
			"vec2 toGamma_vec2_v2(vec2 v) { \n" +
			"return pow(v, vec2(1.0 / gamma)); \n" +
			"} \n" +
			"vec3 toGamma_vec3_v2(vec3 v) { \n" +
			"return pow(v, vec3(1.0 / gamma)); \n" +
			"} \n" +
			"vec4 toGamma_vec4_v2(vec4 v) { \n" +
			"return vec4(toGamma_vec3_v2(v.rgb), v.a); \n" +
			"} \n" +
			"vec4 textureLinear(sampler2D uTex, vec2 uv) { \n" +
			"return toLinear_vec4_v1(texture2D(uTex, uv)); \n" +
			"} \n",

			"lightingBase_fs":
			"float phongSpecular(vec3 lightDirection,vec3 viewDirection,vec3 surfaceNormal,float shininess) { \n" +
			"vec3 R = -reflect(lightDirection, surfaceNormal); \n" +
			"return pow(max(0.0, dot(viewDirection, R)), shininess); \n" +
			"} \n" +
			"float orenNayarDiffuse( \n" +
			"vec3 lightDirection, \n" +
			"vec3 viewDirection, \n" +
			"vec3 surfaceNormal, \n" +
			"float roughness, \n" +
			"float albedo) { \n" +
			"float LdotV = dot(lightDirection, viewDirection); \n" +
			"float NdotL = dot(lightDirection, surfaceNormal); \n" +
			"float NdotV = dot(surfaceNormal, viewDirection); \n" +
			"float s = LdotV - NdotL * NdotV; \n" +
			"float t = mix(1.0, max(NdotL, NdotV), step(0.0, s)); \n" +
			"float sigma2 = roughness * roughness; \n" +
			"float A = 1.0 + sigma2 * (albedo / (sigma2 + 0.13) + 0.5 / (sigma2 + 0.33)); \n" +
			"float B = 0.45 * sigma2 / (sigma2 + 0.09); \n" +
			"return albedo * max(0.0, NdotL) * (A + B * s / t) / 3.14159265; \n" +
			"} \n" +
			"float attenuation(float r, float f, float d) { \n" +
			"float denom = d / r + 1.0; \n" +
			"float attenuation = 1.0 / (denom*denom); \n" +
			"float t = (attenuation - f) / (1.0 - f); \n" +
			"return max(t, 0.0); \n" +
			"} \n",

			"materialSource_fs":
			"struct MaterialSource{ \n" +
			"vec3 diffuse; \n" +
			"vec3 ambient; \n" +
			"vec3 specular; \n" +
			"float alpha; \n" +
			"float cutAlpha; \n" +
			"float shininess; \n" +
			"float roughness; \n" +
			"float albedo; \n" +
			"vec4 uvRectangle; \n" +
			"float specularScale; \n" +
			"float normalScale; \n" +
			"}; \n" +
			"uniform float uniform_materialSource[20] ; \n" +
			"MaterialSource materialSource ; \n" +
			"void main(){ \n" +
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
			"materialSource.roughness = uniform_materialSource[12]; \n" +
			"materialSource.albedo = uniform_materialSource[13]; \n" +
			"materialSource.uvRectangle.x = uniform_materialSource[14]; \n" +
			"materialSource.uvRectangle.y = uniform_materialSource[15]; \n" +
			"materialSource.uvRectangle.z = uniform_materialSource[16]; \n" +
			"materialSource.uvRectangle.w = uniform_materialSource[17]; \n" +
			"materialSource.specularScale = uniform_materialSource[18]; \n" +
			"materialSource.normalScale = uniform_materialSource[19]; \n" +
			"uv_0 = varying_uv0.xy * materialSource.uvRectangle.zw + materialSource.uvRectangle.xy ; \n" +
			"} \n",

			"normalMap_fragment":
			"uniform sampler2D normalTexture; \n" +
			"varying vec2 varying_uv0        ; \n" +
			"mat3 TBN ; \n" +
			"mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) { \n" +
			"vec3 dp1 = dFdx(p); \n" +
			"vec3 dp2 = dFdy(p); \n" +
			"vec2 duv1 = dFdx(uv); \n" +
			"vec2 duv2 = dFdy(uv); \n" +
			"vec3 dp2perp = cross(dp2, N); \n" +
			"vec3 dp1perp = cross(N, dp1); \n" +
			"vec3 T = dp2perp * duv1.x + dp1perp * duv2.x; \n" +
			"vec3 B = dp2perp * duv1.y + dp1perp * duv2.y; \n" +
			"float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B))); \n" +
			"return mat3(T * invmax, B * invmax, N); \n" +
			"} \n" +
			"vec3 tbn(vec3 map, vec3 N, vec3 V, vec2 texcoord) { \n" +
			"mat3 TBN = cotangentFrame(N, -V, texcoord); \n" +
			"return normalize(TBN * map); \n" +
			"} \n" +
			"void main(){ \n" +
			"vec3 normalTex = texture2D(normalTexture,uv_0).xyz *2.0 - 1.0; \n" +
			"normalTex.y *= -1.0; \n" +
			"normal.xyz = tbn( normalTex.xyz , normal.xyz , normalize(varying_ViewPose.xyz) , uv_0 ) ; \n" +
			"} \n",

			"pointLight_fragment":
			"const int max_pointLight = 0 ; \n" +
			"uniform float uniform_pointLightSource[12*max_pointLight] ; \n" +
			"struct PointLight{ \n" +
			"vec3 position ; \n" +
			"vec3 diffuse ; \n" +
			"vec3 ambient ; \n" +
			"float intensity; \n" +
			"float radius; \n" +
			"float falloff; \n" +
			"}; \n" +
			"void calculatePointLight(MaterialSource materialSource){ \n" +
			"vec3 N = normal; \n" +
			"for(int i = 0 ; i < max_pointLight ; i++){ \n" +
			"PointLight pointLight; \n" +
			"pointLight.position = vec3(uniform_pointLightSource[i*12],uniform_pointLightSource[i*12+1],uniform_pointLightSource[i*12+2]); \n" +
			"pointLight.diffuse = vec3(uniform_pointLightSource[i*12+3],uniform_pointLightSource[i*12+4],uniform_pointLightSource[i*12+5]); \n" +
			"pointLight.ambient = vec3(uniform_pointLightSource[i*12+6],uniform_pointLightSource[i*12+7],uniform_pointLightSource[i*12+8]); \n" +
			"pointLight.intensity = uniform_pointLightSource[i*12+9]; \n" +
			"pointLight.radius = uniform_pointLightSource[i*12+10]; \n" +
			"pointLight.falloff = uniform_pointLightSource[i*12+11]; \n" +
			"ambientColor.xyz *= pointLight.diffuse.xyz * pointLight.ambient ; \n" +
			"vec4 lightVirePos = uniform_ModelViewMatrix * vec4(pointLight.position.xyz,1.0) ; \n" +
			"vec3 lightDir = varying_ViewPose.xyz - (lightVirePos.xyz/lightVirePos.w) ; \n" +
			"lightDir = normalize(lightDir); \n" +
			"float distance = length( lightDir ); \n" +
			"float lambertTerm = pointLight.intensity / ( distance * distance )  ; \n" +
			"float NdotL = dot( N, lightDir ); \n" +
			"NdotL = clamp( NdotL ,0.0,1.0 ); \n" +
			"light.xyz = pointLight.diffuse * NdotL * lambertTerm ; \n" +
			"vec3 viewDir = normalize(-varying_ViewPose); \n" +
			"vec3 H = normalize( lightDir + viewDir ); \n" +
			"float NdotH = dot( normal, H ); \n" +
			"lambertTerm = pow( clamp( NdotH ,0.0,materialSource.shininess), 1.0 ); \n" +
			"specularColor.xyz += lambertTerm * materialSource.specular * materialSource.specularScale ; \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculatePointLight(materialSource); \n" +
			"} \n",

			"skeleton_vertex":
			"attribute vec4 attribute_boneIndex ; \n" +
			"attribute vec4 attribute_boneWeight ; \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
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
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"vec4 temp_normal = vec4(attribute_normal, 0.0) ; \n" +
			"mat4 m0 = buildMat4(int(attribute_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(attribute_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(attribute_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(attribute_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * attribute_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * attribute_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * attribute_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * attribute_boneWeight.w; \n" +
			"vec4 temp_n ; \n" +
			"temp_n = m0 * temp_normal * attribute_boneWeight.x; \n" +
			"temp_n += m1 * temp_normal * attribute_boneWeight.y; \n" +
			"temp_n += m2 * temp_normal * attribute_boneWeight.z; \n" +
			"temp_n += m3 * temp_normal * attribute_boneWeight.w; \n" +
			"mat3 normalMatrix = transpose( inverse(mat3(uniform_ModelViewMatrix )) ); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -temp_n.xyz); \n" +
			"outPosition =  uniform_ModelViewMatrix * outPosition ; \n" +
			"varying_ViewPose = outPosition.xyz / outPosition.w; \n" +
			"} \n",

			"specularMap_fragment":
			"uniform sampler2D specularTexture; \n" +
			"void main(void){ \n" +
			"specularColor.xyz *= texture2D( specularTexture , uv_0 ).xyz ; \n" +
			"} \n",


		};
	}
}
