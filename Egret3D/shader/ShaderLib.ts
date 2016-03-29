module egret3d {
	/**
	* @private
	*/
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"base_fs":
			"vec3 flatNormals(vec3 pos) { \n" +
			"vec3 fdx = dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n" +
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
			"vec3 perturb(vec3 map, vec3 N, vec3 V, vec2 texcoord) { \n" +
			"mat3 TBN = cotangentFrame_8_1(N, -V, texcoord); \n" +
			"return normalize(TBN * map); \n" +
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
			"float phongSpecular( \n" +
			"vec3 lightDirection, \n" +
			"vec3 viewDirection, \n" +
			"vec3 surfaceNormal, \n" +
			"float shininess) { \n" +
			"vec3 R = -reflect(lightDirection, surfaceNormal); \n" +
			"return pow(max(0.0, dot(viewDirection, R)), shininess); \n" +
			"} \n" +
			"float attenuation(float r, float f, float d) { \n" +
			"float denom = d / r + 1.0; \n" +
			"float attenuation = 1.0 / (denom*denom); \n" +
			"float t = (attenuation - f) / (1.0 - f); \n" +
			"return max(t, 0.0); \n" +
			"} \n",

			"base_vs":
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
			"} \n",

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
			"vec4 diffuseTex; \n" +
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
			"materialSource.diffuse.xyz = materialSource.diffuse * materialSource.diffusePower ; \n" +
			"materialSource.specular.xyz = materialSource.specular * materialSource.specularPower ; \n" +
			"materialSource.ambient.xyz = materialSource.ambient * materialSource.ambientPower ; \n" +
			"normal = varying_eyeNormal; \n" +
			"endColor = vec4(materialSource.diffuse,materialSource.alpha); \n" +
			"eyedir = varying_eyedir.xyz - varying_pos.xyz ; \n" +
			"diffuseTex = vec4(1.0,1.0,1.0,1.0); \n" +
			"ambient = vec4(1.0,1.0,1.0,1.0); \n" +
			"specular = vec4(0.0,0.0,0.0,0.0); \n" +
			"} \n",

			"Color_vertex":
			"attribute vec3 attribute_position ; \n" +
			"attribute vec3 attribute_normal ; \n" +
			"attribute vec3 attribute_tangent ; \n" +
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
			"endPosition = vec4(0.0, 0.0, 0.0, 0.0) ; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"endPosition =  uniform_ModelMatrix * temp_position ; \n" +
			"varying_eyedir = uniform_eyepos ; \n" +
			"varying_pos =  endPosition ; \n" +
			"endPosition = uniform_ProjectionMatrix * endPosition ; \n" +
			"varying_eyeNormal =  (uniform_ProjectionMatrix*uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ; \n" +
			"varying_color = attribute_color ; \n" +
			"} \n",

			"cube_fragment":
			"uniform samplerCube diffuseTexture ; \n" +
			"varying vec3 varying_pos; \n" +
			"void main(void){ \n" +
			"vec3 uvw = normalize(varying_pos.xyz); \n" +
			"vec4 ref = vec4(textureCube(diffuseTexture, uvw.xyz)); \n" +
			"gl_FragColor = ref ; \n" +
			"} \n",

			"cube_vertex":
			"attribute vec3 attribute_position; \n" +
			"uniform mat4 uniform_ProjectionMatrix; \n" +
			"uniform mat4 uniform_ModelMatrix; \n" +
			"varying vec3 varying_pos; \n" +
			"void main(void){ \n" +
			"varying_pos =  attribute_position; \n" +
			"gl_Position = uniform_ProjectionMatrix * uniform_ModelMatrix * vec4(varying_pos,1.0); \n" +
			"} \n",

			"diffuse_fragment":
			"#extension GL_OES_standard_derivatives : enable \n" +
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
			"vec4 endColor; \n" +
			"vec4 specular; \n" +
			"vec4 diffuse; \n" +
			"vec4 diffuseTex; \n" +
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
			"materialSource.diffuse.xyz = materialSource.diffuse * materialSource.diffusePower ; \n" +
			"materialSource.specular.xyz = materialSource.specular * materialSource.specularPower ; \n" +
			"materialSource.ambient.xyz = materialSource.ambient * materialSource.ambientPower ; \n" +
			"ambient = vec4(1.0,1.0,1.0,1.0); \n" +
			"specularTexColor = vec4(1.0,1.0,1.0,1.0); \n" +
			"specular = vec4(0.0,0.0,0.0,0.0); \n" +
			"normal = varying_eyeNormal; \n" +
			"diffuseTex = texture2D(diffuseTexture , varying_uv0 ); \n" +
			"eyedir = varying_eyedir.xyz - varying_pos.xyz ; \n" +
			"} \n",

			"diffuse_vertex":
			"attribute vec3 attribute_position ; \n" +
			"attribute vec3 attribute_normal ; \n" +
			"attribute vec3 attribute_tangent ; \n" +
			"attribute vec4 attribute_color ; \n" +
			"attribute vec2 attribute_uv0 ; \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"uniform mat4 uniform_normalMatrix ; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"varying vec4 varying_pos        ; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec4 varying_color  ; \n" +
			"varying vec3 varying_eyedir  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec3 varying_tangent	; \n" +
			"vec4 endPosition ; \n" +
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
			"endPosition = vec4(0.0, 0.0, 0.0, 0.0) ; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"endPosition =  uniform_ModelMatrix * temp_position ; \n" +
			"varying_eyedir = uniform_eyepos ; \n" +
			"varying_pos =  endPosition ; \n" +
			"endPosition = uniform_ProjectionMatrix * endPosition ; \n" +
			"mat3 normalMatrix = transpose(inverse(mat3(uniform_ModelMatrix))); \n" +
			"varying_eyeNormal = normalize(normalMatrix * attribute_normal); \n" +
			"varying_tangent = attribute_tangent ; \n" +
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
			"float phongSpecular(vec3 lightDirection,vec3 viewDirection,vec3 surfaceNormal,float shininess) { \n" +
			"vec3 R = -reflect(lightDirection, surfaceNormal); \n" +
			"return pow(max(0.0, dot(viewDirection, R)), shininess); \n" +
			"} \n" +
			"vec3 flatNormal(vec3 pos){ \n" +
			"vec3 fdx = -dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n" +
			"void calculateDirectLight( MaterialSource materialSource ){ \n" +
			"float specularfract,NdotL ; \n" +
			"vec3 vReflect,ldir,ndir,N; \n" +
			"N = normalize(normal.xyz); \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight L ; \n" +
			"L.direction = vec3(uniform_directLightSource[i*10+0],uniform_directLightSource[i*10+1],uniform_directLightSource[i*10+2]); \n" +
			"L.diffuse = vec3(uniform_directLightSource[i*10+3],uniform_directLightSource[i*10+4],uniform_directLightSource[i*10+5]); \n" +
			"L.halfColor = vec3(uniform_directLightSource[i*10+6],uniform_directLightSource[i*10+7],uniform_directLightSource[i*10+8]); \n" +
			"L.intensity = uniform_directLightSource[i*7+9]; \n" +
			"L.halfIntensity = uniform_directLightSource[i*7+10]; \n" +
			"ambient.xyz *= L.diffuse.xyz ; \n" +
			"ldir = L.direction ; \n" +
			"ndir = normalize(L.direction) ; \n" +
			"NdotL = clamp(dot( N , ndir ),0.0,1.0); \n" +
			"float lambertTerm = NdotL* L.intensity ; \n" +
			"light.xyz += L.diffuse * lambertTerm ; \n" +
			"float halfLambertTerm = clamp(dot(N,-ldir),0.0,1.0); \n" +
			"light.xyz += ( halfLambertTerm * L.halfColor * 0.25 + L.halfColor * 0.25 ) * L.halfIntensity; \n" +
			"specular.xyz += L.diffuse * phongSpecular(ndir,normalize(varying_eyedir),N,materialSource.shininess) ; \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculateDirectLight( materialSource ); \n" +
			"} \n",

			"end_fs":
			"vec4 endColor ; \n" +
			"vec4 specular ; \n" +
			"vec4 diffuse ; \n" +
			"vec4 light ; \n" +
			"vec3 ambient; \n" +
			"vec4 diffuseTex; \n" +
			"vec4 specularTexColor; \n" +
			"void main() { \n" +
			"diffuseTex.xyz = materialSource.diffuse.xyz * diffuseTex.xyz * materialSource.diffusePower ; \n" +
			"ambient.xyz = ambient.xyz * materialSource.ambientPower * materialSource.ambient.xyz ; \n" +
			"endColor.xyz = (ambient.xyz + light.xyz) * diffuseTex.xyz ; \n" +
			"endColor.xyz += specular.xyz * materialSource.specular.xyz * specularTexColor.xyz ; \n" +
			"endColor.w = materialSource.alpha * diffuseTex.w ; \n" +
			"gl_FragColor = endColor ; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"void main() { \n" +
			"gl_PointSize = 50.0; \n" +
			"gl_Position =  endPosition ; \n" +
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
			"float phongSpecularA(vec3 lightDirection,vec3 viewDirection,vec3 surfaceNormal,float shininess) { \n" +
			"vec3 R = -reflect(lightDirection, surfaceNormal); \n" +
			"return pow(max(0.0, dot(viewDirection, R)), shininess); \n" +
			"} \n",

			"materialSource_fs":
			"uniform float uniform_materialSource[18] ; \n" +
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
			"}; \n" +
			"MaterialSource materialSource ; \n" +
			"main(){ \n" +
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
			"} \n",

			"normalMap_fragment":
			"uniform sampler2D normalTexture; \n" +
			"mat3 TBN ; \n" +
			"varying vec4 varying_pos        ; \n" +
			"varying vec2 varying_uv0        ; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec3 varying_tangent	; \n" +
			"void main(void){ \n" +
			"TBN[0] = varying_tangent ; \n" +
			"TBN[2] = normalize( varying_eyeNormal.xyz ) ; \n" +
			"TBN[1] = normalize( cross(TBN[0],TBN[2]) ); \n" +
			"normal = 2.0 * texture2D( normalTexture , varying_uv0 ).xyz - 1.0; \n" +
			"normal = TBN * normalize(normal)  ; \n" +
			"} \n",

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
			"ambient.xyz *= L.color.xyz ; \n" +
			"ldir = L.lightPos - varying_pos.xyz ; \n" +
			"ndir = normalize(ldir); \n" +
			"dist = length(ndir); \n" +
			"NdotL = clamp(dot( N , ndir ),0.0,1.0); \n" +
			"lambertTerm = ( L.intensity  ) / ( dist * dist ) *NdotL ; \n" +
			"light.xyz = lambertTerm *  L.color.xyz  ; \n" +
			"specular.xyz += L.color * phongSpecular(ndir,normalize(varying_eyedir),N,materialSource.shininess) ; \n" +
			"}; \n" +
			"} \n" +
			"float phongSpecular(vec3 lightDirection,vec3 viewDirection,vec3 surfaceNormal,float shininess) { \n" +
			"vec3 R = -reflect(lightDirection, surfaceNormal); \n" +
			"return pow(max(0.0, dot(viewDirection, R)), shininess); \n" +
			"} \n" +
			"void main() { \n" +
			"calculatePointLight(materialSource); \n" +
			"} \n",

			"skeleton_vertex":
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
			"vec4 temp_n = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"vec4 temp_normal = vec4(attribute_normal, 0.0) ; \n" +
			"mat4 m0 = buildMat4(int(attribute_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(attribute_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(attribute_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(attribute_boneIndex.w)); \n" +
			"endPosition += m0 * temp_position * attribute_boneWeight.x; \n" +
			"endPosition += m1 * temp_position * attribute_boneWeight.y; \n" +
			"endPosition += m2 * temp_position * attribute_boneWeight.z; \n" +
			"endPosition += m3 * temp_position * attribute_boneWeight.w; \n" +
			"temp_n += m0 * temp_normal * attribute_boneWeight.x; \n" +
			"temp_n += m1 * temp_normal * attribute_boneWeight.y; \n" +
			"temp_n += m2 * temp_normal * attribute_boneWeight.z; \n" +
			"temp_n += m3 * temp_normal * attribute_boneWeight.w; \n" +
			"endPosition =  uniform_ModelMatrix * endPosition ; \n" +
			"varying_eyedir = uniform_eyepos ; \n" +
			"varying_pos =  endPosition ; \n" +
			"endPosition = uniform_ProjectionMatrix * endPosition ; \n" +
			"varying_eyeNormal =  (uniform_normalMatrix * vec4(normalize(temp_n.xyz),0.0)).xyz ; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"varying_color = attribute_color ; \n" +
			"} \n",

			"specularMap_fragment":
			"uniform sampler2D specularTexture; \n" +
			"vec4 specularTexColor; \n" +
			"void main(void){ \n" +
			"specularTexColor.xyz = texture2D( specularTexture , varying_uv0 ).xyz ; \n" +
			"} \n",

			"spotLight_fragment":
			"const int max_sportLight = 1 ; \n" +
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
			"ambient.xyz *= L.spotColor.xyz ; \n" +
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
			"specular.xyz += L.spotColor * phongSpecular(ndir,normalize(varying_eyedir),N,materialSource.shininess) ; \n" +
			"lambertTerm = (1.0 - (1.0 - SpotFactor) * 1.0/(1.0 - L.spotCosCutoff)); \n" +
			"light.xyz = color * lambertTerm ; \n" +
			"} \n" +
			"} \n" +
			"} \n" +
			"float phongSpecular(vec3 lightDirection,vec3 viewDirection,vec3 surfaceNormal,float shininess) { \n" +
			"vec3 R = -reflect(lightDirection, surfaceNormal); \n" +
			"return pow(max(0.0, dot(viewDirection, R)), shininess); \n" +
			"} \n" +
			"void main() { \n" +
			"calculateSpotLight( materialSource ); \n" +
			"} \n",


		};
	}
}
