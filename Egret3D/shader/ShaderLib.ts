module egret3d {
	/**
	* @private
	*/
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"AOMap_fs":
			"uniform sampler2D aoTexture ; \n" +
			"uniform float aoPower ; \n" +
			"void main(void){ \n" +
			"float ao = texture2D( aoTexture , varying_uv1 ).x ; \n" +
			"diffuseColor.xyz *= (ao * aoPower) ; \n" +
			"} \n",

			"attribute_color_vs":
			"attribute vec4 attribute_color; \n" +
			"void main(void){ \n" +
			"e_color = attribute_color; \n" +
			"} \n",

			"attribute_normal_vs":
			"attribute vec3 attribute_normal; \n" +
			"void main(void){ \n" +
			"e_normal = attribute_normal; \n" +
			"} \n",

			"attribute_position_vs":
			"attribute vec3 attribute_position; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"} \n",

			"attribute_skin_vs":
			"attribute vec4 attribute_boneIndex; \n" +
			"attribute vec4 attribute_boneWeight; \n" +
			"void main(void){ \n" +
			"e_boneIndex = attribute_boneIndex; \n" +
			"e_boneWeight = attribute_boneWeight; \n" +
			"} \n",

			"attribute_tangent_vs":
			"attribute vec3 attribute_tangent; \n" +
			"void main(void){ \n" +
			"e_tangent = attribute_tangent; \n" +
			"} \n",

			"attribute_uv0_vs":
			"attribute vec2 attribute_uv0; \n" +
			"void main(void){ \n" +
			"e_uv0 = attribute_uv0; \n" +
			"} \n",

			"attribute_uv1_vs":
			"attribute vec2 attribute_uv1; \n" +
			"void main(void){ \n" +
			"e_uv1 = attribute_uv1; \n" +
			"} \n",

			"base_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec3 varying_ViewPose; \n" +
			"varying vec4 varying_color; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"uniform mat4 uniform_ViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix; \n" +
			"vec4 outColor ; \n" +
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
			"if(varying_color.w == 0.0 ) \n" +
			"discard ; \n" +
			"diffuseColor  = vec4(1.0,1.0,1.0,1.0); \n" +
			"specularColor = vec4(0.0,0.0,0.0,0.0); \n" +
			"ambientColor  = vec4(0.0,0.0,0.0,0.0); \n" +
			"light         = vec4(0.0,0.0,0.0,0.0); \n" +
			"normal = normalize(varying_eyeNormal) ; \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"base_vs":
			"vec3 e_position = vec3(0.0, 0.0, 0.0); \n" +
			"vec3 e_normal = vec3(0.0, 0.0, 0.0); \n" +
			"vec3 e_tangent = vec3(0.0, 0.0, 0.0); \n" +
			"vec4 e_color = vec4(1.0, 1.0, 1.0, 1.0); \n" +
			"vec2 e_uv0 = vec2(0.0, 0.0); \n" +
			"vec2 e_uv1 = vec2(0.0, 0.0); \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"varying vec3 varying_ViewPose; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
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
			"varying_color = e_color; \n" +
			"varying_uv0 = e_uv0; \n" +
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
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ViewProjectionMatrix ; \n" +
			"uniform mat4 uniform_NormalMatrix ; \n" +
			"varying vec3 varying_pos; \n" +
			"void main(void){ \n" +
			"varying_pos =  attribute_position; \n" +
			"gl_Position = uniform_ViewProjectionMatrix * uniform_ModelMatrix * vec4(attribute_position, 1.0) ; \n" +
			"} \n",

			"diffuse_fragment":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"if( diffuseColor.w == materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"} \n" +
			"} \n",

			"diffuse_vertex":
			"void main(void){ \n" +
			"mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; \n" +
			"mat3 normalMatrix = transpose( inverse(mat3( modeViewMatrix )) ); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -e_normal); \n" +
			"outPosition = uniform_ViewMatrix * uniform_ModelMatrix * vec4(e_position, 1.0) ; \n" +
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
			"float lambertTerm , specular ; \n" +
			"vec3 N = normal; \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight directLight ; \n" +
			"directLight.direction = vec3(uniform_directLightSource[i*11+0],uniform_directLightSource[i*11+1],uniform_directLightSource[i*11+2]); \n" +
			"directLight.diffuse = vec3(uniform_directLightSource[i*11+3],uniform_directLightSource[i*11+4],uniform_directLightSource[i*11+5]); \n" +
			"directLight.ambient = vec3(uniform_directLightSource[i*11+6],uniform_directLightSource[i*11+7],uniform_directLightSource[i*11+8]); \n" +
			"directLight.intensity = uniform_directLightSource[i*11+9]; \n" +
			"directLight.halfIntensity = uniform_directLightSource[i*11+10]; \n" +
			"ambientColor.xyz += directLight.ambient.xyz * directLight.diffuse ; \n" +
			"vec3 lightDir = normalize(directLight.direction); \n" +
			"lambertTerm = max(dot(lightDir,N), 0.0); \n" +
			"light.xyz += directLight.diffuse * lambertTerm * directLight.intensity ; \n" +
			"specular = 0.0; \n" +
			"vec3 viewDir = normalize(varying_ViewPose); \n" +
			"vec3 halfDir = normalize(lightDir + viewDir); \n" +
			"float specAngle = max(dot(halfDir, N), 0.0); \n" +
			"if( lambertTerm> 0.0){ \n" +
			"specular = pow(specAngle, materialSource.shininess ); \n" +
			"specularColor.xyz += materialSource.specular * specular ; \n" +
			"} \n" +
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
			"outColor.xyz = (ambientColor.xyz + materialSource.ambient.xyz + light.xyz) * diffuseColor.xyz + specularColor.xyz * materialSource.specularScale; \n" +
			"outColor.w = materialSource.alpha * diffuseColor.w ; \n" +
			"gl_FragColor = outColor * varying_color; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"void main() { \n" +
			"gl_PointSize = 50.0; \n" +
			"gl_Position = uniform_ProjectionMatrix * outPosition ; \n" +
			"} \n" +
			"                       \n",

			"expFog_fs":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"vec3 distance ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.distance = vec2(uniform_globalFog[4], uniform_globalFog[5]); \n" +
			"float d = distance(uniform_eyepos,varying_pos.xyz); \n" +
			"float distFog = max( 0.0 , d - fog.distance.x )* fog.distance.y; \n" +
			"float fogFactor = (1.0-exp( -distFog * 0.000001 * fog.globalDensity )) ; \n" +
			"diffuseColor.xyz = mix( diffuseColor.xyz  , fog.fogColor , min(fogFactor,1.0) ); \n" +
			"} \n" +
			"  \n",

			"expHeightFog_fs":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"float fogStartDistance ; \n" +
			"float fogHeightStart ; \n" +
			"float fogAlpha ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"vec3 applyFog( float yDistance, vec3  vpos , Fog fog ) \n" +
			"{ \n" +
			"float d = distance(uniform_eyepos,varying_pos.xyz); \n" +
			"float distFog = max( 0.0 , d - fog.fogStartDistance ) ; \n" +
			"float yFog = max(0.0, (vpos.y - fog.fogHeightStart - yDistance) )  ; \n" +
			"float fogAmount =  1.0-(exp(-distFog * fog.globalDensity )) + (exp(-yFog * fog.globalDensity )); \n" +
			"return mix( diffuseColor.xyz,fog.fogColor, clamp(fogAmount,0.0,fog.fogAlpha) ); \n" +
			"} \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.fogStartDistance = uniform_globalFog[4] ; \n" +
			"fog.fogHeightStart = uniform_globalFog[5] ; \n" +
			"fog.fogAlpha = uniform_globalFog[6] ; \n" +
			"float yd = uniform_eyepos.y - varying_pos.y ; \n" +
			"diffuseColor.xyz = applyFog( yd , varying_pos.xyz , fog ); \n" +
			"} \n" +
			"  \n",

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

			"lightMap_fs":
			"uniform sampler2D lightTexture ; \n" +
			"void main(void){ \n" +
			"diffuseColor.xyz *= texture2D( lightTexture , varying_uv1 ).xyz * 2.0 ; \n" +
			"} \n",

			"lineFog":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"vec3 distance ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.distance = vec2(uniform_globalFog[4], uniform_globalFog[5]); \n" +
			"float dist = abs( varying_ViewPose.z ); \n" +
			"float fogFactor = ( fog.distance.y - dist) / (fog.distance.y - fog.distance.x); \n" +
			"fogFactor = clamp( fogFactor, 0.0, 1.0 ); \n" +
			"diffuseColor.xyz = mix( fog.fogColor, diffuseColor.xyz, fogFactor ); \n" +
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

			"particle_accelerationSpeed":
			"attribute vec3 attribute_accelerationSpeed ; \n" +
			"float particle(  ){ \n" +
			"globalPosition.xyz += currentTime * currentTime * attribute_accelerationSpeed  ; \n" +
			"} \n",

			"particle_end":
			"uniform vec4 uniform_follow ; \n" +
			"float particle(  ){ \n" +
			"return 1.0 ; \n" +
			"} \n" +
			"void main(void) { \n" +
			"outPosition.xyz = localPosition.xyz  ; \n" +
			"outPosition = billboardMatrix * outPosition; \n" +
			"outPosition.xyz += globalPosition.xyz; \n" +
			"outPosition = uniform_ModelMatrix * outPosition; \n" +
			"outPosition = uniform_ViewMatrix * outPosition; \n" +
			"} \n" +
			"	 \n",

			"particle_follow_vs":
			"attribute vec4 attribute_followPosition ; \n" +
			"float particle(  ){ \n" +
			"globalPosition.xyz += attribute_followPosition.xyz; \n" +
			"} \n" +
			"	 \n",

			"particle_Rotation":
			"attribute float attribute_Rotation ; \n" +
			"float particle(  ){ \n" +
			"float rot = currentTime * attribute_Rotation  * (3.1415926 / 180.0); \n" +
			"localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition; \n" +
			"} \n",

			"particle_ScaleByLife":
			"attribute vec2 attribute_ScaleByLife ; \n" +
			"float particle(  ){ \n" +
			"float scale = (attribute_ScaleByLife.y - attribute_ScaleByLife.x); \n" +
			"localPosition.xyz += (currentTime/life) * outPosition.xyz * scale; \n" +
			"} \n",

			"particle_time":
			"attribute vec4 attribute_time ; \n" +
			"uniform vec4 uniform_time ; \n" +
			"float currentTime = 0.0; \n" +
			"struct ParticleData{ \n" +
			"float delay; \n" +
			"float life; \n" +
			"float rate; \n" +
			"float index; \n" +
			"}; \n" +
			"float particle(  ){ \n" +
			"ParticleData emit ; \n" +
			"emit.delay = attribute_time.x ; \n" +
			"emit.life = attribute_time.y ; \n" +
			"emit.rate = attribute_time.z ; \n" +
			"emit.index = attribute_time.w ; \n" +
			"float time = uniform_time.x ; \n" +
			"float duration = uniform_time.y ; \n" +
			"float loop = uniform_time.z ; \n" +
			"float maxLife = uniform_time.w ; \n" +
			"float numberSpace = emit.index * emit.rate ; \n" +
			"currentTime = max(time - numberSpace - emit.delay,0.0) ; \n" +
			"if(loop==0.0){ \n" +
			"if( numberSpace > duration ) \n" +
			"return currentTime = 0.0 ; \n" +
			"}else{ \n" +
			"duration = uniform_time.w ; \n" +
			"currentTime = mod(currentTime,duration); \n" +
			"if( currentTime > emit.life ) \n" +
			"return currentTime = 0.0 ; \n" +
			"} \n" +
			"if( currentTime <= 0.0 ) \n" +
			"return currentTime ; \n" +
			"} \n" +
			"void e_discard(){ \n" +
			"varying_color.w = 0.0 ; \n" +
			"} \n" +
			"void main(void) { \n" +
			"float active = particle(  ) ; \n" +
			"if( active == 0.0 ){ \n" +
			"e_discard(); \n" +
			"}else{ \n" +
			"} \n" +
			"} \n",

			"particle_uniformSpeed":
			"attribute vec3 attribute_uniformSpeed ; \n" +
			"float particle(  ){ \n" +
			"globalPosition.xyz += currentTime * attribute_uniformSpeed ; \n" +
			"} \n",

			"particle_vs":
			"attribute vec3 attribute_offsetPosition ; \n" +
			"uniform mat4 uniform_cameraMatrix; \n" +
			"uniform vec4 offestPosition; \n" +
			"const float PI = 3.1415926 ; \n" +
			"float currentTime = 0.0; \n" +
			"float totalTime = 0.0; \n" +
			"vec4 localPosition; \n" +
			"vec4 globalPosition; \n" +
			"mat4 buildRotMat4(vec3 rot) \n" +
			"{ \n" +
			"mat4 ret = mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"float s; \n" +
			"float c; \n" +
			"s = sin(rot.x); \n" +
			"c = cos(rot.x); \n" +
			"ret *= mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, c, s, 0.0), \n" +
			"vec4(0.0, -s, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"s = sin(rot.y); \n" +
			"c = cos(rot.y); \n" +
			"ret *= mat4( \n" +
			"vec4(c, 0.0, -s, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(s, 0.0, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"s = sin(rot.z); \n" +
			"c = cos(rot.z); \n" +
			"ret *= mat4( \n" +
			"vec4(c, s, 0.0, 0.0), \n" +
			"vec4(-s, c, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"return ret; \n" +
			"} \n" +
			"void main(void) { \n" +
			"varying_color = vec4(1.0, 1.0, 1.0, 1.0); \n" +
			"mat4 billboardMatrix = mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)); \n" +
			"billboardMatrix = mat4( \n" +
			"uniform_cameraMatrix[0], \n" +
			"uniform_cameraMatrix[1], \n" +
			"uniform_cameraMatrix[2], \n" +
			"vec4(0.0, 0.0,1.0, 1.0)); \n" +
			"mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; \n" +
			"mat3 normalMatrix = transpose(inverse(mat3( modeViewMatrix ))); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -e_normal); \n" +
			"localPosition = outPosition = vec4(e_position, 1.0); \n" +
			"globalPosition.xyz = attribute_offsetPosition; \n" +
			"} \n",

			"particle_vsback":
			"attribute vec3 attribute_offset; \n" +
			"attribute vec3 attribute_lifecycle; \n" +
			"attribute vec3 attribute_direction; \n" +
			"attribute vec2 attribute_speed; \n" +
			"uniform mat4 uniform_cameraMatrix; \n" +
			"uniform float uniform_time; \n" +
			"const float PI = 3.1415926 ; \n" +
			"vec4 position; \n" +
			"float currentTime = 0.0; \n" +
			"float totalTime = 0.0; \n" +
			"mat4 buildRotMat4(vec3 rot) \n" +
			"{ \n" +
			"mat4 ret = mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"float s; \n" +
			"float c; \n" +
			"s = sin(rot.x); \n" +
			"c = cos(rot.x); \n" +
			"ret *= mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, c, s, 0.0), \n" +
			"vec4(0.0, -s, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"s = sin(rot.y); \n" +
			"c = cos(rot.y); \n" +
			"ret *= mat4( \n" +
			"vec4(c, 0.0, -s, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(s, 0.0, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"s = sin(rot.z); \n" +
			"c = cos(rot.z); \n" +
			"ret *= mat4( \n" +
			"vec4(c, s, 0.0, 0.0), \n" +
			"vec4(-s, c, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"return ret; \n" +
			"} \n" +
			"void main(void) { \n" +
			"varying_color = vec4(1.0, 1.0, 1.0, 1.0); \n" +
			"mat4 billboardMatrix = mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)); \n" +
			"if (uniform_enableBillboardXYZ == 111.0) \n" +
			"{ \n" +
			"billboardMatrix = mat4( \n" +
			"uniform_cameraMatrix[0], \n" +
			"uniform_cameraMatrix[1], \n" +
			"uniform_cameraMatrix[2], \n" +
			"vec4(0.0, 0.0,1.0, 1.0)); \n" +
			"} \n" +
			"else \n" +
			"{ \n" +
			"if (mod(uniform_enableBillboardXYZ, 10.0) == 1.0) \n" +
			"{ \n" +
			"billboardMatrix *= mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, uniform_cameraMatrix[1].y, uniform_cameraMatrix[1].z, 0.0), \n" +
			"vec4(0.0, uniform_cameraMatrix[2].y, uniform_cameraMatrix[2].z, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)); \n" +
			"} \n" +
			"if (mod(uniform_enableBillboardXYZ, 100.0) / 10.0 > 1.0) \n" +
			"{ \n" +
			"billboardMatrix *= mat4( \n" +
			"vec4(uniform_cameraMatrix[0].x, 0.0, uniform_cameraMatrix[0].z, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(uniform_cameraMatrix[2].x, 0.0, uniform_cameraMatrix[2].z, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)); \n" +
			"} \n" +
			"if (uniform_enableBillboardXYZ / 100.0 > 1.0) \n" +
			"{ \n" +
			"billboardMatrix *= mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, uniform_cameraMatrix[1].y, uniform_cameraMatrix[1].z, 0.0), \n" +
			"vec4(0.0, uniform_cameraMatrix[2].y, uniform_cameraMatrix[2].z, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)); \n" +
			"} \n" +
			"} \n" +
			"mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; \n" +
			"mat3 normalMatrix = transpose(inverse(mat3( modeViewMatrix ))); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -e_normal); \n" +
			"position = vec4(attribute_offset, 1.0); \n" +
			"outPosition = vec4(e_position, 1.0); \n" +
			"outPosition = billboardMatrix * outPosition; \n" +
			"totalTime = attribute_lifecycle.x + attribute_lifecycle.y; \n" +
			"if (attribute_lifecycle.z == 1.0) \n" +
			"{ \n" +
			"currentTime = mod(uniform_time, totalTime); \n" +
			"if (currentTime >= attribute_lifecycle.x && currentTime <= totalTime) \n" +
			"{ \n" +
			"currentTime = currentTime - attribute_lifecycle.x; \n" +
			"} \n" +
			"else \n" +
			"{ \n" +
			"varying_color.w = 0.0; \n" +
			"} \n" +
			"} \n" +
			"else \n" +
			"{ \n" +
			"if (uniform_time < attribute_lifecycle.x || uniform_time > totalTime) \n" +
			"{ \n" +
			"varying_color.w = 0.0; \n" +
			"} \n" +
			"else \n" +
			"{ \n" +
			"currentTime = uniform_time - attribute_lifecycle.x; \n" +
			"} \n" +
			"} \n" +
			"if (currentTime > 0.0) \n" +
			"{ \n" +
			"float t = currentTime * 0.001; \n" +
			"float ratio = currentTime / attribute_lifecycle.y; \n" +
			"position.xyz += attribute_direction * (t * (attribute_speed.x + attribute_speed.y * t)); \n" +
			"varying_color.xyz += uniform_startColor + (uniform_endColor - uniform_startColor) *  ratio; \n" +
			"vec3 rot = uniform_startRot + (uniform_endRot - uniform_startRot) *  ratio; \n" +
			"rot  *= (PI / 180.0); \n" +
			"position = buildRotMat4(rot) * position; \n" +
			"} \n" +
			"position = uniform_ModelMatrix * position; \n" +
			"outPosition.xyz += position.xyz; \n" +
			"outPosition = uniform_ViewMatrix * outPosition; \n" +
			"varying_ViewPose = outPosition.xyz / outPosition.w; \n" +
			"} \n",

			"PBRSource":
			"#define ALBEDO \n" +
			"#define REFLECTION \n" +
			"#define REFLECTIVITY \n" +
			"#define SPECULAROVERALPHA \n" +
			"#define LIGHT0 \n" +
			"#define POINTLIGHT0 \n" +
			"#define SPECULARTERM \n" +
			"#define NORMAL \n" +
			"#define UV1 \n" +
			"#define NUM_BONE_INFLUENCERS 0 \n" +
			"#define BonesPerMesh 0 \n" +
			"#define MICROSURFACEFROMREFLECTIVITYMAP \n" +
			"#define REFLECTIONMAP_3D \n" +
			"#define REFLECTIONMAP_CUBIC \n" +
			"#define CAMERATONEMAP \n" +
			"#define CAMERACONTRAST \n" +
			"#define USESPHERICALFROMREFLECTIONMAP \n" +
			"#ifdef BUMP \n" +
			"#extension GL_OES_standard_derivatives : enable \n" +
			"#endif \n" +
			"#ifdef LOGARITHMICDEPTH \n" +
			"#extension GL_EXT_frag_depth : enable \n" +
			"#endif \n" +
			"precision highp float; \n" +
			"#define RECIPROCAL_PI2 0.15915494 \n" +
			"#define FRESNEL_MAXIMUM_ON_ROUGH 0.25 \n" +
			"uniform vec3 vEyePosition; \n" +
			"uniform vec3 vAmbientColor; \n" +
			"uniform vec3 vReflectionColor; \n" +
			"uniform vec4 vAlbedoColor; \n" +
			"uniform vec4 vLightingIntensity; \n" +
			"uniform vec4 vCameraInfos; \n" +
			"#ifdef OVERLOADEDVALUES \n" +
			"uniform vec4 vOverloadedIntensity; \n" +
			"uniform vec3 vOverloadedAmbient; \n" +
			"uniform vec3 vOverloadedAlbedo; \n" +
			"uniform vec3 vOverloadedReflectivity; \n" +
			"uniform vec3 vOverloadedEmissive; \n" +
			"uniform vec3 vOverloadedReflection; \n" +
			"uniform vec3 vOverloadedMicroSurface; \n" +
			"#endif \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"uniform vec4 vOverloadedShadowIntensity; \n" +
			"#endif \n" +
			"#ifdef USESPHERICALFROMREFLECTIONMAP \n" +
			"uniform vec3 vSphericalX; \n" +
			"uniform vec3 vSphericalY; \n" +
			"uniform vec3 vSphericalZ; \n" +
			"uniform vec3 vSphericalXX; \n" +
			"uniform vec3 vSphericalYY; \n" +
			"uniform vec3 vSphericalZZ; \n" +
			"uniform vec3 vSphericalXY; \n" +
			"uniform vec3 vSphericalYZ; \n" +
			"uniform vec3 vSphericalZX; \n" +
			"vec3 EnvironmentIrradiance(vec3 normal) \n" +
			"{ \n" +
			"vec3 result = \n" +
			"vSphericalX * normal.x + \n" +
			"vSphericalY * normal.y + \n" +
			"vSphericalZ * normal.z + \n" +
			"vSphericalXX * normal.x * normal.x + \n" +
			"vSphericalYY * normal.y * normal.y + \n" +
			"vSphericalZZ * normal.z * normal.z + \n" +
			"vSphericalYZ * normal.y * normal.z + \n" +
			"vSphericalZX * normal.z * normal.x + \n" +
			"vSphericalXY * normal.x * normal.y; \n" +
			"return result.rgb; \n" +
			"} \n" +
			"#endif \n" +
			"const float kPi = 3.1415926535897932384626433832795; \n" +
			"#ifdef PoissonSamplingEnvironment \n" +
			"const int poissonSphereSamplersCount = 32; \n" +
			"vec3 poissonSphereSamplers[poissonSphereSamplersCount]; \n" +
			"void initSamplers() \n" +
			"{ \n" +
			"poissonSphereSamplers[0] = vec3( -0.552198926093, 0.801049753814, -0.0322487480415 ); \n" +
			"poissonSphereSamplers[1] = vec3( 0.344874796559, -0.650989584719, 0.283038477033 ); \n" +
			"poissonSphereSamplers[2] = vec3( -0.0710183703467, 0.163770497767, -0.95022416734 ); \n" +
			"poissonSphereSamplers[3] = vec3( 0.422221832073, 0.576613638193, 0.519157625948 ); \n" +
			"poissonSphereSamplers[4] = vec3( -0.561872200916, -0.665581249881, -0.131630473211 ); \n" +
			"poissonSphereSamplers[5] = vec3( -0.409905973809, 0.0250731510778, 0.674676954809 ); \n" +
			"poissonSphereSamplers[6] = vec3( 0.206829570551, -0.190199352704, 0.919073906156 ); \n" +
			"poissonSphereSamplers[7] = vec3( -0.857514664463, 0.0274425010091, -0.475068738967 ); \n" +
			"poissonSphereSamplers[8] = vec3( -0.816275009951, -0.0432916479141, 0.40394579291 ); \n" +
			"poissonSphereSamplers[9] = vec3( 0.397976181928, -0.633227519667, -0.617794410447 ); \n" +
			"poissonSphereSamplers[10] = vec3( -0.181484199014, 0.0155418272003, -0.34675720703 ); \n" +
			"poissonSphereSamplers[11] = vec3( 0.591734926919, 0.489930882201, -0.51675303188 ); \n" +
			"poissonSphereSamplers[12] = vec3( -0.264514973057, 0.834248662136, 0.464624235985 ); \n" +
			"poissonSphereSamplers[13] = vec3( -0.125845223505, 0.812029586099, -0.46213797731 ); \n" +
			"poissonSphereSamplers[14] = vec3( 0.0345715424639, 0.349983742938, 0.855109899027 ); \n" +
			"poissonSphereSamplers[15] = vec3( 0.694340492749, -0.281052190209, -0.379600605543 ); \n" +
			"poissonSphereSamplers[16] = vec3( -0.241055518078, -0.580199280578, 0.435381168431 ); \n" +
			"poissonSphereSamplers[17] = vec3( 0.126313722289, 0.715113642744, 0.124385788055 ); \n" +
			"poissonSphereSamplers[18] = vec3( 0.752862552387, 0.277075021888, 0.275059597549 ); \n" +
			"poissonSphereSamplers[19] = vec3( -0.400896300918, -0.309374534321, -0.74285782627 ); \n" +
			"poissonSphereSamplers[20] = vec3( 0.121843331941, -0.00381197918195, 0.322441835258 ); \n" +
			"poissonSphereSamplers[21] = vec3( 0.741656771351, -0.472083016745, 0.14589173819 ); \n" +
			"poissonSphereSamplers[22] = vec3( -0.120347565985, -0.397252703556, -0.00153836114051 ); \n" +
			"poissonSphereSamplers[23] = vec3( -0.846258835203, -0.433763808754, 0.168732209784 ); \n" +
			"poissonSphereSamplers[24] = vec3( 0.257765618362, -0.546470581239, -0.242234375624 ); \n" +
			"poissonSphereSamplers[25] = vec3( -0.640343473361, 0.51920903395, 0.549310644325 ); \n" +
			"poissonSphereSamplers[26] = vec3( -0.894309984621, 0.297394061018, 0.0884583225292 ); \n" +
			"poissonSphereSamplers[27] = vec3( -0.126241933628, -0.535151016335, -0.440093659672 ); \n" +
			"poissonSphereSamplers[28] = vec3( -0.158176440297, -0.393125021578, 0.890727226039 ); \n" +
			"poissonSphereSamplers[29] = vec3( 0.896024272938, 0.203068725821, -0.11198597748 ); \n" +
			"poissonSphereSamplers[30] = vec3( 0.568671758933, -0.314144243629, 0.509070768816 ); \n" +
			"poissonSphereSamplers[31] = vec3( 0.289665332178, 0.104356977462, -0.348379247171 ); \n" +
			"} \n" +
			"vec3 environmentSampler(samplerCube cubeMapSampler, vec3 centralDirection, float microsurfaceAverageSlope) \n" +
			"{ \n" +
			"vec3 result = vec3(0., 0., 0.); \n" +
			"for(int i = 0; i < poissonSphereSamplersCount; i++) \n" +
			"{ \n" +
			"vec3 offset = poissonSphereSamplers[i]; \n" +
			"vec3 direction = centralDirection + microsurfaceAverageSlope * offset; \n" +
			"result += textureCube(cubeMapSampler, direction, 0.).rgb; \n" +
			"} \n" +
			"result /= 32.0; \n" +
			"return result; \n" +
			"} \n" +
			"#endif \n" +
			"float Square(float value) \n" +
			"{ \n" +
			"return value * value; \n" +
			"} \n" +
			"float getLuminance(vec3 color) \n" +
			"{ \n" +
			"return clamp(dot(color, vec3(0.2126, 0.7152, 0.0722)), 0., 1.); \n" +
			"} \n" +
			"float convertRoughnessToAverageSlope(float roughness) \n" +
			"{ \n" +
			"const float kMinimumVariance = 0.0005; \n" +
			"float alphaG = Square(roughness) + kMinimumVariance; \n" +
			"return alphaG; \n" +
			"} \n" +
			"float smithVisibilityG1_TrowbridgeReitzGGX(float dot, float alphaG) \n" +
			"{ \n" +
			"float tanSquared = (1.0 - dot * dot) / (dot * dot); \n" +
			"return 2.0 / (1.0 + sqrt(1.0 + alphaG * alphaG * tanSquared)); \n" +
			"} \n" +
			"float smithVisibilityG_TrowbridgeReitzGGX_Walter(float NdotL, float NdotV, float alphaG) \n" +
			"{ \n" +
			"return smithVisibilityG1_TrowbridgeReitzGGX(NdotL, alphaG) * smithVisibilityG1_TrowbridgeReitzGGX(NdotV, alphaG); \n" +
			"} \n" +
			"float normalDistributionFunction_TrowbridgeReitzGGX(float NdotH, float alphaG) \n" +
			"{ \n" +
			"float a2 = Square(alphaG); \n" +
			"float d = NdotH * NdotH * (a2 - 1.0) + 1.0; \n" +
			"return a2 / (kPi * d * d); \n" +
			"} \n" +
			"vec3 fresnelSchlickGGX(float VdotH, vec3 reflectance0, vec3 reflectance90) \n" +
			"{ \n" +
			"return reflectance0 + (reflectance90 - reflectance0) * pow(clamp(1.0 - VdotH, 0., 1.), 5.0); \n" +
			"} \n" +
			"vec3 FresnelSchlickEnvironmentGGX(float VdotN, vec3 reflectance0, vec3 reflectance90, float smoothness) \n" +
			"{ \n" +
			"float weight = mix(FRESNEL_MAXIMUM_ON_ROUGH, 1.0, smoothness); \n" +
			"return reflectance0 + weight * (reflectance90 - reflectance0) * pow(clamp(1.0 - VdotN, 0., 1.), 5.0); \n" +
			"} \n" +
			"vec3 computeSpecularTerm(float NdotH, float NdotL, float NdotV, float VdotH, float roughness, vec3 specularColor) \n" +
			"{ \n" +
			"float alphaG = convertRoughnessToAverageSlope(roughness); \n" +
			"float distribution = normalDistributionFunction_TrowbridgeReitzGGX(NdotH, alphaG); \n" +
			"float visibility = smithVisibilityG_TrowbridgeReitzGGX_Walter(NdotL, NdotV, alphaG); \n" +
			"visibility /= (4.0 * NdotL * NdotV); \n" +
			"vec3 fresnel = fresnelSchlickGGX(VdotH, specularColor, vec3(1., 1., 1.)); \n" +
			"float specTerm = max(0., visibility * distribution) * NdotL; \n" +
			"return fresnel * specTerm * kPi; \n" +
			"} \n" +
			"float computeDiffuseTerm(float NdotL, float NdotV, float VdotH, float roughness) \n" +
			"{ \n" +
			"float diffuseFresnelNV = pow(clamp(1.0 - NdotL, 0.000001, 1.), 5.0); \n" +
			"float diffuseFresnelNL = pow(clamp(1.0 - NdotV, 0.000001, 1.), 5.0); \n" +
			"float diffuseFresnel90 = 0.5 + 2.0 * VdotH * VdotH * roughness; \n" +
			"float diffuseFresnelTerm = \n" +
			"(1.0 + (diffuseFresnel90 - 1.0) * diffuseFresnelNL) * \n" +
			"(1.0 + (diffuseFresnel90 - 1.0) * diffuseFresnelNV); \n" +
			"return diffuseFresnelTerm * NdotL; \n" +
			"} \n" +
			"float computeDefaultMicroSurface(float microSurface, vec3 reflectivityColor) \n" +
			"{ \n" +
			"float kReflectivityNoAlphaWorkflow_SmoothnessMax = 0.95; \n" +
			"float reflectivityLuminance = getLuminance(reflectivityColor); \n" +
			"float reflectivityLuma = sqrt(reflectivityLuminance); \n" +
			"microSurface = reflectivityLuma * kReflectivityNoAlphaWorkflow_SmoothnessMax; \n" +
			"return microSurface; \n" +
			"} \n" +
			"vec3 toLinearSpace(vec3 color) \n" +
			"{ \n" +
			"return vec3(pow(color.r, 2.2), pow(color.g, 2.2), pow(color.b, 2.2)); \n" +
			"} \n" +
			"vec3 toGammaSpace(vec3 color) \n" +
			"{ \n" +
			"return vec3(pow(color.r, 1.0 / 2.2), pow(color.g, 1.0 / 2.2), pow(color.b, 1.0 / 2.2)); \n" +
			"} \n" +
			"#ifdef CAMERATONEMAP \n" +
			"vec3 toneMaps(vec3 color) \n" +
			"{ \n" +
			"color = max(color, 0.0); \n" +
			"color.rgb = color.rgb * vCameraInfos.x; \n" +
			"float tuning = 1.5; \n" +
			"vec3 tonemapped = 1.0 - exp2(-color.rgb * tuning); \n" +
			"color.rgb = mix(color.rgb, tonemapped, 1.0); \n" +
			"return color; \n" +
			"} \n" +
			"#endif \n" +
			"#ifdef CAMERACONTRAST \n" +
			"vec4 contrasts(vec4 color) \n" +
			"{ \n" +
			"color = clamp(color, 0.0, 1.0); \n" +
			"vec3 resultHighContrast = color.rgb * color.rgb * (3.0 - 2.0 * color.rgb); \n" +
			"float contrast = vCameraInfos.y; \n" +
			"if (contrast < 1.0) \n" +
			"{ \n" +
			"color.rgb = mix(vec3(0.5, 0.5, 0.5), color.rgb, contrast); \n" +
			"} \n" +
			"else \n" +
			"{ \n" +
			"color.rgb = mix(color.rgb, resultHighContrast, contrast - 1.0); \n" +
			"} \n" +
			"return color; \n" +
			"} \n" +
			"#endif \n" +
			"uniform vec4 vReflectivityColor; \n" +
			"uniform vec3 vEmissiveColor; \n" +
			"varying vec3 vPositionW; \n" +
			"#ifdef NORMAL \n" +
			"varying vec3 vNormalW; \n" +
			"#endif \n" +
			"#ifdef VERTEXCOLOR \n" +
			"varying vec4 vColor; \n" +
			"#endif \n" +
			"#ifdef LIGHT0 \n" +
			"uniform vec4 vLightData0; \n" +
			"uniform vec4 vLightDiffuse0; \n" +
			"#ifdef SPECULARTERM \n" +
			"uniform vec3 vLightSpecular0; \n" +
			"#endif \n" +
			"#ifdef SHADOW0 \n" +
			"#if defined(SPOTLIGHT0) || defined(DIRLIGHT0) \n" +
			"varying vec4 vPositionFromLight0; \n" +
			"uniform sampler2D shadowSampler0; \n" +
			"#else \n" +
			"uniform samplerCube shadowSampler0; \n" +
			"#endif \n" +
			"uniform vec3 shadowsInfo0; \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT0 \n" +
			"uniform vec4 vLightDirection0; \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT0 \n" +
			"uniform vec3 vLightGround0; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef LIGHT1 \n" +
			"uniform vec4 vLightData1; \n" +
			"uniform vec4 vLightDiffuse1; \n" +
			"#ifdef SPECULARTERM \n" +
			"uniform vec3 vLightSpecular1; \n" +
			"#endif \n" +
			"#ifdef SHADOW1 \n" +
			"#if defined(SPOTLIGHT1) || defined(DIRLIGHT1) \n" +
			"varying vec4 vPositionFromLight1; \n" +
			"uniform sampler2D shadowSampler1; \n" +
			"#else \n" +
			"uniform samplerCube shadowSampler1; \n" +
			"#endif \n" +
			"uniform vec3 shadowsInfo1; \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT1 \n" +
			"uniform vec4 vLightDirection1; \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT1 \n" +
			"uniform vec3 vLightGround1; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef LIGHT2 \n" +
			"uniform vec4 vLightData2; \n" +
			"uniform vec4 vLightDiffuse2; \n" +
			"#ifdef SPECULARTERM \n" +
			"uniform vec3 vLightSpecular2; \n" +
			"#endif \n" +
			"#ifdef SHADOW2 \n" +
			"#if defined(SPOTLIGHT2) || defined(DIRLIGHT2) \n" +
			"varying vec4 vPositionFromLight2; \n" +
			"uniform sampler2D shadowSampler2; \n" +
			"#else \n" +
			"uniform samplerCube shadowSampler2; \n" +
			"#endif \n" +
			"uniform vec3 shadowsInfo2; \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT2 \n" +
			"uniform vec4 vLightDirection2; \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT2 \n" +
			"uniform vec3 vLightGround2; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef LIGHT3 \n" +
			"uniform vec4 vLightData3; \n" +
			"uniform vec4 vLightDiffuse3; \n" +
			"#ifdef SPECULARTERM \n" +
			"uniform vec3 vLightSpecular3; \n" +
			"#endif \n" +
			"#ifdef SHADOW3 \n" +
			"#if defined(SPOTLIGHT3) || defined(DIRLIGHT3) \n" +
			"varying vec4 vPositionFromLight3; \n" +
			"uniform sampler2D shadowSampler3; \n" +
			"#else \n" +
			"uniform samplerCube shadowSampler3; \n" +
			"#endif \n" +
			"uniform vec3 shadowsInfo3; \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT3 \n" +
			"uniform vec4 vLightDirection3; \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT3 \n" +
			"uniform vec3 vLightGround3; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef ALBEDO \n" +
			"varying vec2 vAlbedoUV; \n" +
			"uniform sampler2D albedoSampler; \n" +
			"uniform vec2 vAlbedoInfos; \n" +
			"#endif \n" +
			"#ifdef AMBIENT \n" +
			"varying vec2 vAmbientUV; \n" +
			"uniform sampler2D ambientSampler; \n" +
			"uniform vec2 vAmbientInfos; \n" +
			"#endif \n" +
			"#ifdef OPACITY \n" +
			"varying vec2 vOpacityUV; \n" +
			"uniform sampler2D opacitySampler; \n" +
			"uniform vec2 vOpacityInfos; \n" +
			"#endif \n" +
			"#ifdef EMISSIVE \n" +
			"varying vec2 vEmissiveUV; \n" +
			"uniform vec2 vEmissiveInfos; \n" +
			"uniform sampler2D emissiveSampler; \n" +
			"#endif \n" +
			"#ifdef LIGHTMAP \n" +
			"varying vec2 vLightmapUV; \n" +
			"uniform vec2 vLightmapInfos; \n" +
			"uniform sampler2D lightmapSampler; \n" +
			"#endif \n" +
			"#if defined(REFLECTIVITY) \n" +
			"varying vec2 vReflectivityUV; \n" +
			"uniform vec2 vReflectivityInfos; \n" +
			"uniform sampler2D reflectivitySampler; \n" +
			"#endif \n" +
			"#ifdef FRESNEL \n" +
			"float computeFresnelTerm(vec3 viewDirection, vec3 worldNormal, float bias, float power) \n" +
			"{ \n" +
			"float fresnelTerm = pow(bias + abs(dot(viewDirection, worldNormal)), power); \n" +
			"return clamp(fresnelTerm, 0., 1.); \n" +
			"} \n" +
			"#endif \n" +
			"#ifdef OPACITYFRESNEL \n" +
			"uniform vec4 opacityParts; \n" +
			"#endif \n" +
			"#ifdef EMISSIVEFRESNEL \n" +
			"uniform vec4 emissiveLeftColor; \n" +
			"uniform vec4 emissiveRightColor; \n" +
			"#endif \n" +
			"#if defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_PROJECTION) || defined(REFRACTION) \n" +
			"uniform mat4 view; \n" +
			"#endif \n" +
			"#ifdef REFRACTION \n" +
			"uniform vec4 vRefractionInfos; \n" +
			"#ifdef REFRACTIONMAP_3D \n" +
			"uniform samplerCube refractionCubeSampler; \n" +
			"#else \n" +
			"uniform sampler2D refraction2DSampler; \n" +
			"uniform mat4 refractionMatrix; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef REFLECTION \n" +
			"uniform vec2 vReflectionInfos; \n" +
			"#ifdef REFLECTIONMAP_3D \n" +
			"uniform samplerCube reflectionCubeSampler; \n" +
			"#else \n" +
			"uniform sampler2D reflection2DSampler; \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_SKYBOX \n" +
			"varying vec3 vPositionUVW; \n" +
			"#else \n" +
			"#ifdef REFLECTIONMAP_EQUIRECTANGULAR_FIXED \n" +
			"varying vec3 vDirectionW; \n" +
			"#endif \n" +
			"#if defined(REFLECTIONMAP_PLANAR) || defined(REFLECTIONMAP_CUBIC) || defined(REFLECTIONMAP_PROJECTION) \n" +
			"uniform mat4 reflectionMatrix; \n" +
			"#endif \n" +
			"#endif \n" +
			"vec3 computeReflectionCoords(vec4 worldPos, vec3 worldNormal) \n" +
			"{ \n" +
			"#ifdef REFLECTIONMAP_EQUIRECTANGULAR_FIXED \n" +
			"vec3 direction = normalize(vDirectionW); \n" +
			"float t = clamp(direction.y * -0.5 + 0.5, 0., 1.0); \n" +
			"float s = atan(direction.z, direction.x) * RECIPROCAL_PI2 + 0.5; \n" +
			"return vec3(s, t, 0); \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_EQUIRECTANGULAR \n" +
			"vec3 cameraToVertex = normalize(worldPos.xyz - vEyePosition); \n" +
			"vec3 r = reflect(cameraToVertex, worldNormal); \n" +
			"float t = clamp(r.y * -0.5 + 0.5, 0., 1.0); \n" +
			"float s = atan(r.z, r.x) * RECIPROCAL_PI2 + 0.5; \n" +
			"return vec3(s, t, 0); \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_SPHERICAL \n" +
			"vec3 viewDir = normalize(vec3(view * worldPos)); \n" +
			"vec3 viewNormal = normalize(vec3(view * vec4(worldNormal, 0.0))); \n" +
			"vec3 r = reflect(viewDir, viewNormal); \n" +
			"r.z = r.z - 1.0; \n" +
			"float m = 2.0 * length(r); \n" +
			"return vec3(r.x / m + 0.5, 1.0 - r.y / m - 0.5, 0); \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_PLANAR \n" +
			"vec3 viewDir = worldPos.xyz - vEyePosition; \n" +
			"vec3 coords = normalize(reflect(viewDir, worldNormal)); \n" +
			"return vec3(reflectionMatrix * vec4(coords, 1)); \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_CUBIC \n" +
			"vec3 viewDir = worldPos.xyz - vEyePosition; \n" +
			"vec3 coords = reflect(viewDir, worldNormal); \n" +
			"#ifdef INVERTCUBICMAP \n" +
			"coords.y = 1.0 - coords.y; \n" +
			"#endif \n" +
			"return vec3(reflectionMatrix * vec4(coords, 0)); \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_PROJECTION \n" +
			"return vec3(reflectionMatrix * (view * worldPos)); \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_SKYBOX \n" +
			"return vPositionUVW; \n" +
			"#endif \n" +
			"#ifdef REFLECTIONMAP_EXPLICIT \n" +
			"return vec3(0, 0, 0); \n" +
			"#endif \n" +
			"} \n" +
			"#endif \n" +
			"#ifdef SHADOWS \n" +
			"float unpack(vec4 color) \n" +
			"{ \n" +
			"const vec4 bit_shift = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0); \n" +
			"return dot(color, bit_shift); \n" +
			"} \n" +
			"#if defined(POINTLIGHT0) || defined(POINTLIGHT1) || defined(POINTLIGHT2) || defined(POINTLIGHT3) \n" +
			"uniform vec2 depthValues; \n" +
			"float computeShadowCube(vec3 lightPosition, samplerCube shadowSampler, float darkness, float bias) \n" +
			"{ \n" +
			"vec3 directionToLight = vPositionW - lightPosition; \n" +
			"float depth = length(directionToLight); \n" +
			"depth = clamp(depth, 0., 1.0); \n" +
			"directionToLight = normalize(directionToLight); \n" +
			"directionToLight.y = - directionToLight.y; \n" +
			"float shadow = unpack(textureCube(shadowSampler, directionToLight)) + bias; \n" +
			"if (depth > shadow) \n" +
			"{ \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"return mix(1.0, darkness, vOverloadedShadowIntensity.x); \n" +
			"#else \n" +
			"return darkness; \n" +
			"#endif \n" +
			"} \n" +
			"return 1.0; \n" +
			"} \n" +
			"float computeShadowWithPCFCube(vec3 lightPosition, samplerCube shadowSampler, float mapSize, float bias, float darkness) \n" +
			"{ \n" +
			"vec3 directionToLight = vPositionW - lightPosition; \n" +
			"float depth = length(directionToLight); \n" +
			"depth = clamp(depth, 0., 1.0); \n" +
			"float diskScale = 2.0 / mapSize; \n" +
			"directionToLight = normalize(directionToLight); \n" +
			"directionToLight.y = -directionToLight.y; \n" +
			"float visibility = 1.; \n" +
			"vec3 poissonDisk[4]; \n" +
			"poissonDisk[0] = vec3(-1.0, 1.0, -1.0); \n" +
			"poissonDisk[1] = vec3(1.0, -1.0, -1.0); \n" +
			"poissonDisk[2] = vec3(-1.0, -1.0, -1.0); \n" +
			"poissonDisk[3] = vec3(1.0, -1.0, 1.0); \n" +
			"float biasedDepth = depth - bias; \n" +
			"if (unpack(textureCube(shadowSampler, directionToLight + poissonDisk[0] * diskScale)) < biasedDepth) visibility -= 0.25; \n" +
			"if (unpack(textureCube(shadowSampler, directionToLight + poissonDisk[1] * diskScale)) < biasedDepth) visibility -= 0.25; \n" +
			"if (unpack(textureCube(shadowSampler, directionToLight + poissonDisk[2] * diskScale)) < biasedDepth) visibility -= 0.25; \n" +
			"if (unpack(textureCube(shadowSampler, directionToLight + poissonDisk[3] * diskScale)) < biasedDepth) visibility -= 0.25; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"return  min(1.0, mix(1.0, visibility + darkness, vOverloadedShadowIntensity.x)); \n" +
			"#else \n" +
			"return  min(1.0, visibility + darkness); \n" +
			"#endif \n" +
			"} \n" +
			"#endif \n" +
			"#if defined(SPOTLIGHT0) || defined(SPOTLIGHT1) || defined(SPOTLIGHT2) || defined(SPOTLIGHT3) ||  defined(DIRLIGHT0) || defined(DIRLIGHT1) || defined(DIRLIGHT2) || defined(DIRLIGHT3) \n" +
			"float computeShadow(vec4 vPositionFromLight, sampler2D shadowSampler, float darkness, float bias) \n" +
			"{ \n" +
			"vec3 depth = vPositionFromLight.xyz / vPositionFromLight.w; \n" +
			"depth = 0.5 * depth + vec3(0.5); \n" +
			"vec2 uv = depth.xy; \n" +
			"if (uv.x < 0. || uv.x > 1.0 || uv.y < 0. || uv.y > 1.0) \n" +
			"{ \n" +
			"return 1.0; \n" +
			"} \n" +
			"float shadow = unpack(texture2D(shadowSampler, uv)) + bias; \n" +
			"if (depth.z > shadow) \n" +
			"{ \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"return mix(1.0, darkness, vOverloadedShadowIntensity.x); \n" +
			"#else \n" +
			"return darkness; \n" +
			"#endif \n" +
			"} \n" +
			"return 1.; \n" +
			"} \n" +
			"float computeShadowWithPCF(vec4 vPositionFromLight, sampler2D shadowSampler, float mapSize, float bias, float darkness) \n" +
			"{ \n" +
			"vec3 depth = vPositionFromLight.xyz / vPositionFromLight.w; \n" +
			"depth = 0.5 * depth + vec3(0.5); \n" +
			"vec2 uv = depth.xy; \n" +
			"if (uv.x < 0. || uv.x > 1.0 || uv.y < 0. || uv.y > 1.0) \n" +
			"{ \n" +
			"return 1.0; \n" +
			"} \n" +
			"float visibility = 1.; \n" +
			"vec2 poissonDisk[4]; \n" +
			"poissonDisk[0] = vec2(-0.94201624, -0.39906216); \n" +
			"poissonDisk[1] = vec2(0.94558609, -0.76890725); \n" +
			"poissonDisk[2] = vec2(-0.094184101, -0.92938870); \n" +
			"poissonDisk[3] = vec2(0.34495938, 0.29387760); \n" +
			"float biasedDepth = depth.z - bias; \n" +
			"if (unpack(texture2D(shadowSampler, uv + poissonDisk[0] / mapSize)) < biasedDepth) visibility -= 0.25; \n" +
			"if (unpack(texture2D(shadowSampler, uv + poissonDisk[1] / mapSize)) < biasedDepth) visibility -= 0.25; \n" +
			"if (unpack(texture2D(shadowSampler, uv + poissonDisk[2] / mapSize)) < biasedDepth) visibility -= 0.25; \n" +
			"if (unpack(texture2D(shadowSampler, uv + poissonDisk[3] / mapSize)) < biasedDepth) visibility -= 0.25; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"return  min(1.0, mix(1.0, visibility + darkness, vOverloadedShadowIntensity.x)); \n" +
			"#else \n" +
			"return  min(1.0, visibility + darkness); \n" +
			"#endif \n" +
			"} \n" +
			"float unpackHalf(vec2 color) \n" +
			"{ \n" +
			"return color.x + (color.y / 255.0); \n" +
			"} \n" +
			"float linstep(float low, float high, float v) { \n" +
			"return clamp((v - low) / (high - low), 0.0, 1.0); \n" +
			"} \n" +
			"float ChebychevInequality(vec2 moments, float compare, float bias) \n" +
			"{ \n" +
			"float p = smoothstep(compare - bias, compare, moments.x); \n" +
			"float variance = max(moments.y - moments.x * moments.x, 0.02); \n" +
			"float d = compare - moments.x; \n" +
			"float p_max = linstep(0.2, 1.0, variance / (variance + d * d)); \n" +
			"return clamp(max(p, p_max), 0.0, 1.0); \n" +
			"} \n" +
			"float computeShadowWithVSM(vec4 vPositionFromLight, sampler2D shadowSampler, float bias, float darkness) \n" +
			"{ \n" +
			"vec3 depth = vPositionFromLight.xyz / vPositionFromLight.w; \n" +
			"depth = 0.5 * depth + vec3(0.5); \n" +
			"vec2 uv = depth.xy; \n" +
			"if (uv.x < 0. || uv.x > 1.0 || uv.y < 0. || uv.y > 1.0 || depth.z >= 1.0) \n" +
			"{ \n" +
			"return 1.0; \n" +
			"} \n" +
			"vec4 texel = texture2D(shadowSampler, uv); \n" +
			"vec2 moments = vec2(unpackHalf(texel.xy), unpackHalf(texel.zw)); \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"return min(1.0, mix(1.0, 1.0 - ChebychevInequality(moments, depth.z, bias) + darkness, vOverloadedShadowIntensity.x)); \n" +
			"#else \n" +
			"return min(1.0, 1.0 - ChebychevInequality(moments, depth.z, bias) + darkness); \n" +
			"#endif \n" +
			"} \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef BUMP \n" +
			"varying vec2 vBumpUV; \n" +
			"uniform vec2 vBumpInfos; \n" +
			"uniform sampler2D bumpSampler; \n" +
			"mat3 cotangent_frame(vec3 normal, vec3 p, vec2 uv) \n" +
			"{ \n" +
			"vec3 dp1 = dFdx(p); \n" +
			"vec3 dp2 = dFdy(p); \n" +
			"vec2 duv1 = dFdx(uv); \n" +
			"vec2 duv2 = dFdy(uv); \n" +
			"vec3 dp2perp = cross(dp2, normal); \n" +
			"vec3 dp1perp = cross(normal, dp1); \n" +
			"vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x; \n" +
			"vec3 binormal = dp2perp * duv1.y + dp1perp * duv2.y; \n" +
			"float invmax = inversesqrt(max(dot(tangent, tangent), dot(binormal, binormal))); \n" +
			"return mat3(tangent * invmax, binormal * invmax, normal); \n" +
			"} \n" +
			"vec3 perturbNormal(vec3 viewDir) \n" +
			"{ \n" +
			"vec3 map = texture2D(bumpSampler, vBumpUV).xyz; \n" +
			"map = map * 255. / 127. - 128. / 127.; \n" +
			"mat3 TBN = cotangent_frame(vNormalW * vBumpInfos.y, -viewDir, vBumpUV); \n" +
			"return normalize(TBN * map); \n" +
			"} \n" +
			"#endif \n" +
			"#ifdef CLIPPLANE \n" +
			"varying float fClipDistance; \n" +
			"#endif \n" +
			"#ifdef LOGARITHMICDEPTH \n" +
			"uniform float logarithmicDepthConstant; \n" +
			"varying float vFragmentDepth; \n" +
			"#endif \n" +
			"#ifdef FOG \n" +
			"#define FOGMODE_NONE    0. \n" +
			"#define FOGMODE_EXP     1. \n" +
			"#define FOGMODE_EXP2    2. \n" +
			"#define FOGMODE_LINEAR  3. \n" +
			"#define E 2.71828 \n" +
			"uniform vec4 vFogInfos; \n" +
			"uniform vec3 vFogColor; \n" +
			"varying float fFogDistance; \n" +
			"float CalcFogFactor() \n" +
			"{ \n" +
			"float fogCoeff = 1.0; \n" +
			"float fogStart = vFogInfos.y; \n" +
			"float fogEnd = vFogInfos.z; \n" +
			"float fogDensity = vFogInfos.w; \n" +
			"if (FOGMODE_LINEAR == vFogInfos.x) \n" +
			"{ \n" +
			"fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart); \n" +
			"} \n" +
			"else if (FOGMODE_EXP == vFogInfos.x) \n" +
			"{ \n" +
			"fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity); \n" +
			"} \n" +
			"else if (FOGMODE_EXP2 == vFogInfos.x) \n" +
			"{ \n" +
			"fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity); \n" +
			"} \n" +
			"return clamp(fogCoeff, 0.0, 1.0); \n" +
			"} \n" +
			"#endif \n" +
			"struct lightingInfo \n" +
			"{ \n" +
			"vec3 diffuse; \n" +
			"#ifdef SPECULARTERM \n" +
			"vec3 specular; \n" +
			"#endif \n" +
			"}; \n" +
			"lightingInfo computeLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec3 diffuseColor, vec3 specularColor, float range, float roughness, float NdotV) { \n" +
			"lightingInfo result; \n" +
			"vec3 lightVectorW; \n" +
			"float attenuation = 1.0; \n" +
			"if (lightData.w == 0.) \n" +
			"{ \n" +
			"vec3 direction = lightData.xyz - vPositionW; \n" +
			"attenuation = max(0., 1.0 - length(direction) / range); \n" +
			"lightVectorW = normalize(direction); \n" +
			"} \n" +
			"else \n" +
			"{ \n" +
			"lightVectorW = normalize(-lightData.xyz); \n" +
			"} \n" +
			"vec3 H = normalize(viewDirectionW + lightVectorW); \n" +
			"float NdotL = max(0.00000000001, dot(vNormal, lightVectorW)); \n" +
			"float VdotH = clamp(0.00000000001, 1.0, dot(viewDirectionW, H)); \n" +
			"float diffuseTerm = computeDiffuseTerm(NdotL, NdotV, VdotH, roughness); \n" +
			"result.diffuse = diffuseTerm * diffuseColor * attenuation; \n" +
			"#ifdef SPECULARTERM \n" +
			"float NdotH = max(0.00000000001, dot(vNormal, H)); \n" +
			"vec3 specTerm = computeSpecularTerm(NdotH, NdotL, NdotV, VdotH, roughness, specularColor); \n" +
			"result.specular = specTerm * attenuation; \n" +
			"#endif \n" +
			"return result; \n" +
			"} \n" +
			"lightingInfo computeHemisphericLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec3 diffuseColor, vec3 specularColor, vec3 groundColor, float roughness, float NdotV) { \n" +
			"lightingInfo result; \n" +
			"vec3 lightVectorW = normalize(lightData.xyz); \n" +
			"float ndl = dot(vNormal, lightData.xyz) * 0.5 + 0.5; \n" +
			"result.diffuse = mix(groundColor, diffuseColor, ndl); \n" +
			"#ifdef SPECULARTERM \n" +
			"vec3 H = normalize(viewDirectionW + lightVectorW); \n" +
			"float NdotH = max(0.00000000001, dot(vNormal, H)); \n" +
			"float NdotL = max(0.00000000001, ndl); \n" +
			"float VdotH = clamp(0.00000000001, 1.0, dot(viewDirectionW, H)); \n" +
			"vec3 specTerm = computeSpecularTerm(NdotH, NdotL, NdotV, VdotH, roughness, specularColor); \n" +
			"result.specular = specTerm; \n" +
			"#endif \n" +
			"return result; \n" +
			"} \n" +
			"void main(void) { \n" +
			"#ifdef PoissonSamplingEnvironment \n" +
			"initSamplers(); \n" +
			"#endif \n" +
			"#ifdef CLIPPLANE \n" +
			"if (fClipDistance > 0.0) \n" +
			"discard; \n" +
			"#endif \n" +
			"vec3 viewDirectionW = normalize(vEyePosition - vPositionW); \n" +
			"vec4 surfaceAlbedo = vec4(1., 1., 1., 1.); \n" +
			"vec3 surfaceAlbedoContribution = vAlbedoColor.rgb; \n" +
			"float alpha = vAlbedoColor.a; \n" +
			"surfaceAlbedo.rgb = surfaceAlbedoContribution; \n" +
			"surfaceAlbedoContribution = vec3(1., 1., 1.); \n" +
			"vec3 normalW = normalize(vNormalW); \n" +
			"vec3 ambientColor = vec3(1., 1., 1.); \n" +
			"float microSurface = vReflectivityColor.a; \n" +
			"vec3 surfaceReflectivityColor = vReflectivityColor.rgb; \n" +
			"#ifdef OVERLOADEDVALUES \n" +
			"surfaceReflectivityColor.rgb = mix(surfaceReflectivityColor.rgb, vOverloadedReflectivity, vOverloadedIntensity.z); \n" +
			"#endif \n" +
			"#ifdef REFLECTIVITY \n" +
			"vec4 surfaceReflectivityColorMap = texture2D(reflectivitySampler, vReflectivityUV); \n" +
			"surfaceReflectivityColor = surfaceReflectivityColorMap.rgb; \n" +
			"surfaceReflectivityColor = toLinearSpace(surfaceReflectivityColor); \n" +
			"#ifdef OVERLOADEDVALUES \n" +
			"surfaceReflectivityColor = mix(surfaceReflectivityColor, vOverloadedReflectivity, vOverloadedIntensity.z); \n" +
			"#endif \n" +
			"#ifdef MICROSURFACEFROMREFLECTIVITYMAP \n" +
			"microSurface = surfaceReflectivityColorMap.a; \n" +
			"#else \n" +
			"microSurface = computeDefaultMicroSurface(microSurface, surfaceReflectivityColor); \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef OVERLOADEDVALUES \n" +
			"microSurface = mix(microSurface, vOverloadedMicroSurface.x, vOverloadedMicroSurface.y); \n" +
			"#endif \n" +
			"float NdotV = max(0.00000000001, dot(normalW, viewDirectionW)); \n" +
			"microSurface = clamp(microSurface, 0., 1.) * 0.98; \n" +
			"float rough = clamp(1. - microSurface, 0.000001, 1.0); \n" +
			"vec3 lightDiffuseContribution = vec3(0., 0., 0.); \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"vec3 shadowedOnlyLightDiffuseContribution = vec3(1., 1., 1.); \n" +
			"#endif \n" +
			"#ifdef SPECULARTERM \n" +
			"vec3 lightSpecularContribution= vec3(0., 0., 0.); \n" +
			"#endif \n" +
			"float notShadowLevel = 1.; \n" +
			"#ifdef LIGHT0 \n" +
			"#ifndef SPECULARTERM \n" +
			"vec3 vLightSpecular0 = vec3(0.0); \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT0 \n" +
			"lightingInfo info = computeSpotLighting(viewDirectionW, normalW, vLightData0, vLightDirection0, vLightDiffuse0.rgb, vLightSpecular0, vLightDiffuse0.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT0 \n" +
			"lightingInfo info = computeHemisphericLighting(viewDirectionW, normalW, vLightData0, vLightDiffuse0.rgb, vLightSpecular0, vLightGround0, rough, NdotV); \n" +
			"#endif \n" +
			"#if defined(POINTLIGHT0) || defined(DIRLIGHT0) \n" +
			"lightingInfo info = computeLighting(viewDirectionW, normalW, vLightData0, vLightDiffuse0.rgb, vLightSpecular0, vLightDiffuse0.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef SHADOW0 \n" +
			"#ifdef SHADOWVSM0 \n" +
			"notShadowLevel = computeShadowWithVSM(vPositionFromLight0, shadowSampler0, shadowsInfo0.z, shadowsInfo0.x); \n" +
			"#else \n" +
			"#ifdef SHADOWPCF0 \n" +
			"#if defined(POINTLIGHT0) \n" +
			"notShadowLevel = computeShadowWithPCFCube(vLightData0.xyz, shadowSampler0, shadowsInfo0.y, shadowsInfo0.z, shadowsInfo0.x); \n" +
			"#else \n" +
			"notShadowLevel = computeShadowWithPCF(vPositionFromLight0, shadowSampler0, shadowsInfo0.y, shadowsInfo0.z, shadowsInfo0.x); \n" +
			"#endif \n" +
			"#else \n" +
			"#if defined(POINTLIGHT0) \n" +
			"notShadowLevel = computeShadowCube(vLightData0.xyz, shadowSampler0, shadowsInfo0.x, shadowsInfo0.z); \n" +
			"#else \n" +
			"notShadowLevel = computeShadow(vPositionFromLight0, shadowSampler0, shadowsInfo0.x, shadowsInfo0.z); \n" +
			"#endif \n" +
			"#endif \n" +
			"#endif \n" +
			"#else \n" +
			"notShadowLevel = 1.; \n" +
			"#endif \n" +
			"lightDiffuseContribution += info.diffuse * notShadowLevel; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"shadowedOnlyLightDiffuseContribution *= notShadowLevel; \n" +
			"#endif \n" +
			"#ifdef SPECULARTERM \n" +
			"lightSpecularContribution += info.specular * notShadowLevel; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef LIGHT1 \n" +
			"#ifndef SPECULARTERM \n" +
			"vec3 vLightSpecular1 = vec3(0.0); \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT1 \n" +
			"info = computeSpotLighting(viewDirectionW, normalW, vLightData1, vLightDirection1, vLightDiffuse1.rgb, vLightSpecular1, vLightDiffuse1.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT1 \n" +
			"info = computeHemisphericLighting(viewDirectionW, normalW, vLightData1, vLightDiffuse1.rgb, vLightSpecular1, vLightGround1, rough, NdotV); \n" +
			"#endif \n" +
			"#if defined(POINTLIGHT1) || defined(DIRLIGHT1) \n" +
			"info = computeLighting(viewDirectionW, normalW, vLightData1, vLightDiffuse1.rgb, vLightSpecular1, vLightDiffuse1.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef SHADOW1 \n" +
			"#ifdef SHADOWVSM1 \n" +
			"notShadowLevel = computeShadowWithVSM(vPositionFromLight1, shadowSampler1, shadowsInfo1.z, shadowsInfo1.x); \n" +
			"#else \n" +
			"#ifdef SHADOWPCF1 \n" +
			"#if defined(POINTLIGHT1) \n" +
			"notShadowLevel = computeShadowWithPCFCube(vLightData1.xyz, shadowSampler1, shadowsInfo1.y, shadowsInfo1.z, shadowsInfo1.x); \n" +
			"#else \n" +
			"notShadowLevel = computeShadowWithPCF(vPositionFromLight1, shadowSampler1, shadowsInfo1.y, shadowsInfo1.z, shadowsInfo1.x); \n" +
			"#endif \n" +
			"#else \n" +
			"#if defined(POINTLIGHT1) \n" +
			"notShadowLevel = computeShadowCube(vLightData1.xyz, shadowSampler1, shadowsInfo1.x, shadowsInfo1.z); \n" +
			"#else \n" +
			"notShadowLevel = computeShadow(vPositionFromLight1, shadowSampler1, shadowsInfo1.x, shadowsInfo1.z); \n" +
			"#endif \n" +
			"#endif \n" +
			"#endif \n" +
			"#else \n" +
			"notShadowLevel = 1.; \n" +
			"#endif \n" +
			"lightDiffuseContribution += info.diffuse * notShadowLevel; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"shadowedOnlyLightDiffuseContribution *= notShadowLevel; \n" +
			"#endif \n" +
			"#ifdef SPECULARTERM \n" +
			"lightSpecularContribution += info.specular * notShadowLevel; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef LIGHT2 \n" +
			"#ifndef SPECULARTERM \n" +
			"vec3 vLightSpecular2 = vec3(0.0); \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT2 \n" +
			"info = computeSpotLighting(viewDirectionW, normalW, vLightData2, vLightDirection2, vLightDiffuse2.rgb, vLightSpecular2, vLightDiffuse2.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT2 \n" +
			"info = computeHemisphericLighting(viewDirectionW, normalW, vLightData2, vLightDiffuse2.rgb, vLightSpecular2, vLightGround2, rough, NdotV); \n" +
			"#endif \n" +
			"#if defined(POINTLIGHT2) || defined(DIRLIGHT2) \n" +
			"info = computeLighting(viewDirectionW, normalW, vLightData2, vLightDiffuse2.rgb, vLightSpecular2, vLightDiffuse2.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef SHADOW2 \n" +
			"#ifdef SHADOWVSM2 \n" +
			"notShadowLevel = computeShadowWithVSM(vPositionFromLight2, shadowSampler2, shadowsInfo2.z, shadowsInfo2.x); \n" +
			"#else \n" +
			"#ifdef SHADOWPCF2 \n" +
			"#if defined(POINTLIGHT2) \n" +
			"notShadowLevel = computeShadowWithPCFCube(vLightData2.xyz, shadowSampler2, shadowsInfo2.y, shadowsInfo2.z, shadowsInfo2.x); \n" +
			"#else \n" +
			"notShadowLevel = computeShadowWithPCF(vPositionFromLight2, shadowSampler2, shadowsInfo2.y, shadowsInfo2.z, shadowsInfo2.x); \n" +
			"#endif \n" +
			"#else \n" +
			"#if defined(POINTLIGHT2) \n" +
			"notShadowLevel = computeShadowCube(vLightData2.xyz, shadowSampler2, shadowsInfo2.x, shadowsInfo2.z); \n" +
			"#else \n" +
			"notShadowLevel = computeShadow(vPositionFromLight2, shadowSampler2, shadowsInfo2.x, shadowsInfo2.z); \n" +
			"#endif \n" +
			"#endif \n" +
			"#endif \n" +
			"#else \n" +
			"notShadowLevel = 1.; \n" +
			"#endif \n" +
			"lightDiffuseContribution += info.diffuse * notShadowLevel; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"shadowedOnlyLightDiffuseContribution *= notShadowLevel; \n" +
			"#endif \n" +
			"#ifdef SPECULARTERM \n" +
			"lightSpecularContribution += info.specular * notShadowLevel; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef LIGHT3 \n" +
			"#ifndef SPECULARTERM \n" +
			"vec3 vLightSpecular3 = vec3(0.0); \n" +
			"#endif \n" +
			"#ifdef SPOTLIGHT3 \n" +
			"info = computeSpotLighting(viewDirectionW, normalW, vLightData3, vLightDirection3, vLightDiffuse3.rgb, vLightSpecular3, vLightDiffuse3.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef HEMILIGHT3 \n" +
			"info = computeHemisphericLighting(viewDirectionW, normalW, vLightData3, vLightDiffuse3.rgb, vLightSpecular3, vLightGround3, rough, NdotV); \n" +
			"#endif \n" +
			"#if defined(POINTLIGHT3) || defined(DIRLIGHT3) \n" +
			"info = computeLighting(viewDirectionW, normalW, vLightData3, vLightDiffuse3.rgb, vLightSpecular3, vLightDiffuse3.a, rough, NdotV); \n" +
			"#endif \n" +
			"#ifdef SHADOW3 \n" +
			"#ifdef SHADOWVSM3 \n" +
			"notShadowLevel = computeShadowWithVSM(vPositionFromLight3, shadowSampler3, shadowsInfo3.z, shadowsInfo3.x); \n" +
			"#else \n" +
			"#ifdef SHADOWPCF3 \n" +
			"#if defined(POINTLIGHT3) \n" +
			"notShadowLevel = computeShadowWithPCFCube(vLightData3.xyz, shadowSampler3, shadowsInfo3.y, shadowsInfo3.z, shadowsInfo3.x); \n" +
			"#else \n" +
			"notShadowLevel = computeShadowWithPCF(vPositionFromLight3, shadowSampler3, shadowsInfo3.y, shadowsInfo3.z, shadowsInfo3.x); \n" +
			"#endif \n" +
			"#else \n" +
			"#if defined(POINTLIGHT3) \n" +
			"notShadowLevel = computeShadowCube(vLightData3.xyz, shadowSampler3, shadowsInfo3.x, shadowsInfo3.z); \n" +
			"#else \n" +
			"notShadowLevel = computeShadow(vPositionFromLight3, shadowSampler3, shadowsInfo3.x, shadowsInfo3.z); \n" +
			"#endif \n" +
			"#endif \n" +
			"#endif \n" +
			"#else \n" +
			"notShadowLevel = 1.; \n" +
			"#endif \n" +
			"lightDiffuseContribution += info.diffuse * notShadowLevel; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"shadowedOnlyLightDiffuseContribution *= notShadowLevel; \n" +
			"#endif \n" +
			"#ifdef SPECULARTERM \n" +
			"lightSpecularContribution += info.specular * notShadowLevel; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef SPECULARTERM \n" +
			"lightSpecularContribution *= vLightingIntensity.w; \n" +
			"#endif \n" +
			"#ifdef OPACITY \n" +
			"vec4 opacityMap = texture2D(opacitySampler, vOpacityUV); \n" +
			"#ifdef OPACITYRGB \n" +
			"opacityMap.rgb = opacityMap.rgb * vec3(0.3, 0.59, 0.11); \n" +
			"alpha *= (opacityMap.x + opacityMap.y + opacityMap.z)* vOpacityInfos.y; \n" +
			"#else \n" +
			"alpha *= opacityMap.a * vOpacityInfos.y; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef VERTEXALPHA \n" +
			"alpha *= vColor.a; \n" +
			"#endif \n" +
			"#ifdef OPACITYFRESNEL \n" +
			"float opacityFresnelTerm = computeFresnelTerm(viewDirectionW, normalW, opacityParts.z, opacityParts.w); \n" +
			"alpha += opacityParts.x * (1.0 - opacityFresnelTerm) + opacityFresnelTerm * opacityParts.y; \n" +
			"#endif \n" +
			"vec3 surfaceRefractionColor = vec3(0., 0., 0.); \n" +
			"float bias = 20. * (1.0 - microSurface); \n" +
			"#ifdef REFRACTION \n" +
			"vec3 refractionVector = normalize(refract(-viewDirectionW, normalW, vRefractionInfos.y)); \n" +
			"#ifdef REFRACTIONMAP_3D \n" +
			"refractionVector.y = refractionVector.y * vRefractionInfos.w; \n" +
			"if (dot(refractionVector, viewDirectionW) < 1.0) \n" +
			"{ \n" +
			"surfaceRefractionColor = textureCube(refractionCubeSampler, refractionVector, bias).rgb * vRefractionInfos.x; \n" +
			"} \n" +
			"#ifndef REFRACTIONMAPINLINEARSPACE \n" +
			"surfaceRefractionColor = toLinearSpace(surfaceRefractionColor.rgb); \n" +
			"#endif \n" +
			"#else \n" +
			"vec3 vRefractionUVW = vec3(refractionMatrix * (view * vec4(vPositionW + refractionVector * vRefractionInfos.z, 1.0))); \n" +
			"vec2 refractionCoords = vRefractionUVW.xy / vRefractionUVW.z; \n" +
			"refractionCoords.y = 1.0 - refractionCoords.y; \n" +
			"surfaceRefractionColor = texture2D(refraction2DSampler, refractionCoords).rgb * vRefractionInfos.x; \n" +
			"surfaceRefractionColor = toLinearSpace(surfaceRefractionColor.rgb); \n" +
			"#endif \n" +
			"#endif \n" +
			"vec3 environmentRadiance = vReflectionColor.rgb; \n" +
			"vec3 environmentIrradiance = vReflectionColor.rgb; \n" +
			"#ifdef REFLECTION \n" +
			"vec3 vReflectionUVW = computeReflectionCoords(vec4(vPositionW, 1.0), normalW); \n" +
			"#ifdef REFLECTIONMAP_3D \n" +
			"environmentRadiance = textureCube(reflectionCubeSampler, vReflectionUVW, bias).rgb * vReflectionInfos.x; \n" +
			"#ifdef PoissonSamplingEnvironment \n" +
			"float alphaG = convertRoughnessToAverageSlope(rough); \n" +
			"environmentRadiance = environmentSampler(reflectionCubeSampler, vReflectionUVW, alphaG) * vReflectionInfos.x; \n" +
			"#endif \n" +
			"#ifdef USESPHERICALFROMREFLECTIONMAP \n" +
			"#ifndef REFLECTIONMAP_SKYBOX \n" +
			"vec3 normalEnvironmentSpace = (reflectionMatrix * vec4(normalW, 1)).xyz; \n" +
			"environmentIrradiance = EnvironmentIrradiance(normalEnvironmentSpace); \n" +
			"#endif \n" +
			"#else \n" +
			"environmentRadiance = toLinearSpace(environmentRadiance.rgb); \n" +
			"environmentIrradiance = textureCube(reflectionCubeSampler, normalW, 20.).rgb * vReflectionInfos.x; \n" +
			"environmentIrradiance = toLinearSpace(environmentIrradiance.rgb); \n" +
			"environmentIrradiance *= 0.2; \n" +
			"#endif \n" +
			"#else \n" +
			"vec2 coords = vReflectionUVW.xy; \n" +
			"#ifdef REFLECTIONMAP_PROJECTION \n" +
			"coords /= vReflectionUVW.z; \n" +
			"#endif \n" +
			"coords.y = 1.0 - coords.y; \n" +
			"environmentRadiance = texture2D(reflection2DSampler, coords).rgb * vReflectionInfos.x; \n" +
			"environmentRadiance = toLinearSpace(environmentRadiance.rgb); \n" +
			"environmentIrradiance = texture2D(reflection2DSampler, coords, 20.).rgb * vReflectionInfos.x; \n" +
			"environmentIrradiance = toLinearSpace(environmentIrradiance.rgb); \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef OVERLOADEDVALUES \n" +
			"environmentIrradiance = mix(environmentIrradiance, vOverloadedReflection, vOverloadedMicroSurface.z); \n" +
			"environmentRadiance = mix(environmentRadiance, vOverloadedReflection, vOverloadedMicroSurface.z); \n" +
			"#endif \n" +
			"environmentRadiance *= vLightingIntensity.z; \n" +
			"environmentIrradiance *= vLightingIntensity.z; \n" +
			"vec3 specularEnvironmentR0 = surfaceReflectivityColor.rgb; \n" +
			"vec3 specularEnvironmentR90 = vec3(1.0, 1.0, 1.0); \n" +
			"vec3 specularEnvironmentReflectance = FresnelSchlickEnvironmentGGX(clamp(NdotV, 0., 1.), specularEnvironmentR0, specularEnvironmentR90, sqrt(microSurface)); \n" +
			"vec3 refractance = vec3(0.0 , 0.0, 0.0); \n" +
			"#ifdef REFRACTION \n" +
			"vec3 transmission = vec3(1.0 , 1.0, 1.0); \n" +
			"#ifdef LINKREFRACTIONTOTRANSPARENCY \n" +
			"transmission *= (1.0 - alpha); \n" +
			"vec3 mixedAlbedo = surfaceAlbedoContribution.rgb * surfaceAlbedo.rgb; \n" +
			"float maxChannel = max(max(mixedAlbedo.r, mixedAlbedo.g), mixedAlbedo.b); \n" +
			"vec3 tint = clamp(maxChannel * mixedAlbedo, 0.0, 1.0); \n" +
			"surfaceAlbedoContribution *= alpha; \n" +
			"environmentIrradiance *= alpha; \n" +
			"surfaceRefractionColor *= tint; \n" +
			"alpha = 1.0; \n" +
			"#endif \n" +
			"vec3 bounceSpecularEnvironmentReflectance = (2.0 * specularEnvironmentReflectance) / (1.0 + specularEnvironmentReflectance); \n" +
			"specularEnvironmentReflectance = mix(bounceSpecularEnvironmentReflectance, specularEnvironmentReflectance, alpha); \n" +
			"transmission *= 1.0 - specularEnvironmentReflectance; \n" +
			"refractance = surfaceRefractionColor * transmission; \n" +
			"#endif \n" +
			"float reflectance = max(max(surfaceReflectivityColor.r, surfaceReflectivityColor.g), surfaceReflectivityColor.b); \n" +
			"surfaceAlbedo.rgb = (1. - reflectance) * surfaceAlbedo.rgb; \n" +
			"refractance *= vLightingIntensity.z; \n" +
			"environmentRadiance *= specularEnvironmentReflectance; \n" +
			"vec3 surfaceEmissiveColor = vEmissiveColor; \n" +
			"#ifdef EMISSIVE \n" +
			"vec3 emissiveColorTex = texture2D(emissiveSampler, vEmissiveUV).rgb; \n" +
			"surfaceEmissiveColor = toLinearSpace(emissiveColorTex.rgb) * surfaceEmissiveColor * vEmissiveInfos.y; \n" +
			"#endif \n" +
			"#ifdef OVERLOADEDVALUES \n" +
			"surfaceEmissiveColor = mix(surfaceEmissiveColor, vOverloadedEmissive, vOverloadedIntensity.w); \n" +
			"#endif \n" +
			"#ifdef EMISSIVEFRESNEL \n" +
			"float emissiveFresnelTerm = computeFresnelTerm(viewDirectionW, normalW, emissiveRightColor.a, emissiveLeftColor.a); \n" +
			"surfaceEmissiveColor *= emissiveLeftColor.rgb * (1.0 - emissiveFresnelTerm) + emissiveFresnelTerm * emissiveRightColor.rgb; \n" +
			"#endif \n" +
			"#ifdef EMISSIVEASILLUMINATION \n" +
			"vec3 finalDiffuse = max(lightDiffuseContribution * surfaceAlbedoContribution + vAmbientColor, 0.0) * surfaceAlbedo.rgb; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"shadowedOnlyLightDiffuseContribution = max(shadowedOnlyLightDiffuseContribution * surfaceAlbedoContribution + vAmbientColor, 0.0) * surfaceAlbedo.rgb; \n" +
			"#endif \n" +
			"#else \n" +
			"#ifdef LINKEMISSIVEWITHALBEDO \n" +
			"vec3 finalDiffuse = max((lightDiffuseContribution + surfaceEmissiveColor) * surfaceAlbedoContribution + vAmbientColor, 0.0) * surfaceAlbedo.rgb; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"shadowedOnlyLightDiffuseContribution = max((shadowedOnlyLightDiffuseContribution + surfaceEmissiveColor) * surfaceAlbedoContribution + vAmbientColor, 0.0) * surfaceAlbedo.rgb; \n" +
			"#endif \n" +
			"#else \n" +
			"vec3 finalDiffuse = max(lightDiffuseContribution * surfaceAlbedoContribution + surfaceEmissiveColor + vAmbientColor, 0.0) * surfaceAlbedo.rgb; \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"shadowedOnlyLightDiffuseContribution = max(shadowedOnlyLightDiffuseContribution * surfaceAlbedoContribution + surfaceEmissiveColor + vAmbientColor, 0.0) * surfaceAlbedo.rgb; \n" +
			"#endif \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"finalDiffuse = mix(finalDiffuse, shadowedOnlyLightDiffuseContribution, (1.0 - vOverloadedShadowIntensity.y)); \n" +
			"#endif \n" +
			"#ifdef SPECULARTERM \n" +
			"vec3 finalSpecular = lightSpecularContribution * surfaceReflectivityColor; \n" +
			"#else \n" +
			"vec3 finalSpecular = vec3(0.0); \n" +
			"#endif \n" +
			"#ifdef OVERLOADEDSHADOWVALUES \n" +
			"finalSpecular = mix(finalSpecular, vec3(0.0), (1.0 - vOverloadedShadowIntensity.y)); \n" +
			"#endif \n" +
			"#ifdef SPECULAROVERALPHA \n" +
			"alpha = clamp(alpha + dot(finalSpecular, vec3(0.3, 0.59, 0.11)), 0., 1.); \n" +
			"#endif \n" +
			"#ifdef EMISSIVEASILLUMINATION \n" +
			"vec4 finalColor = vec4(finalDiffuse * ambientColor * vLightingIntensity.x + surfaceAlbedo.rgb * environmentIrradiance + finalSpecular * vLightingIntensity.x + environmentRadiance + surfaceEmissiveColor * vLightingIntensity.y + refractance, alpha); \n" +
			"#else \n" +
			"vec4 finalColor = vec4(finalDiffuse * ambientColor * vLightingIntensity.x + surfaceAlbedo.rgb * environmentIrradiance + finalSpecular * vLightingIntensity.x + environmentRadiance + refractance, alpha); \n" +
			"#endif \n" +
			"#ifdef LIGHTMAP \n" +
			"vec3 lightmapColor = texture2D(lightmapSampler, vLightmapUV).rgb * vLightmapInfos.y; \n" +
			"#ifdef USELIGHTMAPASSHADOWMAP \n" +
			"finalColor.rgb *= lightmapColor; \n" +
			"#else \n" +
			"finalColor.rgb += lightmapColor; \n" +
			"#endif \n" +
			"#endif \n" +
			"#ifdef FOG \n" +
			"float fog = CalcFogFactor(); \n" +
			"finalColor.rgb = fog * finalColor.rgb + (1.0 - fog) * vFogColor; \n" +
			"#endif \n" +
			"finalColor = max(finalColor, 0.0); \n" +
			"#ifdef CAMERATONEMAP \n" +
			"finalColor.rgb = toneMaps(finalColor.rgb); \n" +
			"#endif \n" +
			"finalColor.rgb = toGammaSpace(finalColor.rgb); \n" +
			"#ifdef CAMERACONTRAST \n" +
			"finalColor = contrasts(finalColor); \n" +
			"#endif \n" +
			"gl_FragColor = finalColor; \n" +
			"} \n",

			"PBR_fs":
			"const float kPi = 3.1415926535897932384626433832795; \n" +
			"void main(){ \n" +
			"outColor.xyz = uniform_eyepos.xyz ; \n" +
			"}  \n",

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
			"ambientColor.xyz += pointLight.diffuse.xyz * pointLight.ambient ; \n" +
			"vec4 lightVirePos = uniform_ViewMatrix * vec4(pointLight.position.xyz,1.0) ; \n" +
			"vec3 lightDir = varying_ViewPose.xyz - (lightVirePos.xyz/lightVirePos.w) ; \n" +
			"lightDir = normalize(lightDir); \n" +
			"float distance = length( lightDir ); \n" +
			"float lambertTerm = pointLight.intensity / ( distance * distance )  ; \n" +
			"float NdotL = dot( N, lightDir ); \n" +
			"NdotL = clamp( NdotL ,0.0,1.0 ); \n" +
			"light.xyz += pointLight.diffuse * NdotL * lambertTerm ; \n" +
			"if( lambertTerm> 0.0){ \n" +
			"vec3 viewDir = normalize(varying_ViewPose); \n" +
			"vec3 H = normalize( lightDir + viewDir ); \n" +
			"float NdotH = dot( normal, H ); \n" +
			"lambertTerm = pow( clamp( NdotH ,0.0,1.0),materialSource.shininess ); \n" +
			"specularColor.xyz += lambertTerm * materialSource.specular * materialSource.specularScale ; \n" +
			"} \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculatePointLight(materialSource); \n" +
			"} \n",

			"skeleton_vertex":
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
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
			"e_normal = attribute_normal ; \n" +
			"e_color = attribute_color; \n" +
			"vec4 temp_position = vec4(e_position, 1.0) ; \n" +
			"vec4 temp_normal = vec4(e_normal, 0.0) ; \n" +
			"mat4 m0 = buildMat4(int(e_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(e_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(e_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(e_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * e_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * e_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * e_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * e_boneWeight.w; \n" +
			"vec4 temp_n ; \n" +
			"temp_n = m0 * temp_normal * e_boneWeight.x; \n" +
			"temp_n += m1 * temp_normal * e_boneWeight.y; \n" +
			"temp_n += m2 * temp_normal * e_boneWeight.z; \n" +
			"temp_n += m3 * temp_normal * e_boneWeight.w; \n" +
			"mat3 normalMatrix = transpose( inverse(mat3(uniform_ProjectionMatrix * uniform_ViewMatrix))); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -temp_n.xyz); \n" +
			"outPosition = uniform_ViewMatrix * uniform_ModelMatrix * outPosition; \n" +
			"varying_ViewPose = outPosition.xyz / outPosition.w; \n" +
			"} \n",

			"specularMap_fragment":
			"uniform sampler2D specularTexture; \n" +
			"void main(void){ \n" +
			"specularColor.xyz *= texture2D( specularTexture , uv_0 ).xyz ; \n" +
			"} \n",

			"terrainRGBA_fragment":
			"uniform sampler2D blendMaskTexture ; \n" +
			"uniform sampler2D splat_0Tex ; \n" +
			"uniform sampler2D splat_1Tex ; \n" +
			"uniform sampler2D splat_2Tex ; \n" +
			"uniform sampler2D splat_3Tex ; \n" +
			"uniform float uvs[8]; \n" +
			"void main() { \n" +
			"vec4 splat_control = texture2D ( blendMaskTexture , varying_uv0 ); \n" +
			"vec4 cc = vec4(0.0,0.0,0.0,1.0); \n" +
			"vec2 uv = varying_uv0 ; \n" +
			"cc.xyz = splat_control.x * texture2D (splat_0Tex, uv * vec2(uvs[0],uvs[1])).xyz ; \n" +
			"cc.xyz += splat_control.y * texture2D (splat_1Tex, uv * vec2(uvs[2],uvs[3]) ).xyz; \n" +
			"cc.xyz += splat_control.z * vec4(texture2D (splat_2Tex, uv* vec2(uvs[4],uvs[5]))).xyz; \n" +
			"cc.xyz += (1.0-length(splat_control.xyz)) * vec4(texture2D (splat_3Tex, uv* vec2(uvs[6],uvs[7]))).xyz; \n" +
			"diffuseColor.xyz = cc.xyz ; \n" +
			"} \n",

			"uvRoll_fs":
			"uniform float uvRoll[2] ; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy += vec2(uvRoll[0],uvRoll[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"} \n",

			"uvSpriteSheet_fs":
			"uniform float uvSpriteSheet[4] ; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy *= vec2(uvSpriteSheet[2],uvSpriteSheet[3]); \n" +
			"uv_0.xy += vec2(uvSpriteSheet[0],uvSpriteSheet[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"} \n",

			"vertexPos_vs":
			"varying vec4 varying_pos; \n" +
			"void main() { \n" +
			"varying_pos = uniform_ModelMatrix * vec4(e_position, 1.0) ; \n" +
			"} \n" +
			"                       \n",


		};
	}
}
