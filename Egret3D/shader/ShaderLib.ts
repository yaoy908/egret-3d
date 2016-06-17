module egret3d {
	/**
	* @private
	*/
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"alphaMask_fs":
			"uniform sampler2D maskTexture ; \n" +
			"void main(void){ \n" +
			"float maskAlpha = texture2D( maskTexture , uv_0 ).x; \n" +
			"if(maskAlpha * diffuseColor.w < 0.001){ \n" +
			"discard; \n" +
			"} \n" +
			"materialSource.alpha *= maskAlpha; \n" +
			"} \n",

			"AOMap_fs":
			"uniform sampler2D aoTexture ; \n" +
			"uniform float aoPower ; \n" +
			"void main(void){ \n" +
			"float ao = texture2D( aoTexture , varying_uv1 ).x ; \n" +
			"diffuseColor.xyz *= (ao * aoPower) ; \n" +
			"} \n",

			"baseShadowPass_fs":
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec4 varying_color; \n" +
			"vec4 outColor ; \n" +
			"vec2 uv_0; \n" +
			"void main() { \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"baseShadowPass_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"attribute vec4 attribute_color; \n" +
			"uniform mat4 uniform_ModelViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"vec3 e_position = vec3(0.0, 0.0, 0.0); \n" +
			"vec4 outPosition ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_color = attribute_color; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"base_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec4 varying_color; \n" +
			"varying vec3 varying_ViewDir ; \n" +
			"uniform mat4 uniform_ViewMatrix ; \n" +
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
			"diffuseColor  = vec4(1.0,1.0,1.0,1.0); \n" +
			"specularColor = vec4(0.0,0.0,0.0,0.0); \n" +
			"ambientColor  = vec4(0.0,0.0,0.0,0.0); \n" +
			"light         = vec4(0.25,0.25,0.25,0.25); \n" +
			"normal = normalize(varying_eyeNormal) ; \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"base_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"vec3 e_position = vec3(0.0, 0.0, 0.0); \n" +
			"uniform mat4 uniform_ModelViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"uniform vec3 uniform_eyepos ; \n" +
			"varying vec4 varying_ViewPose; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"varying vec3 varying_ViewDir ; \n" +
			"vec4 outPosition ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_color = attribute_color; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"bezier":
			"vec2 quadratic_bezier(vec2 A, vec2 B, vec2 C, float t) \n" +
			"{ \n" +
			"vec2 D = mix(A, B, t); \n" +
			"vec2 E = mix(B, C, t); \n" +
			"return mix(D, E, t); \n" +
			"} \n" +
			"vec2 cubic_bezier(vec2 A, vec2 B, vec2 C, vec2 D, float t) \n" +
			"{ \n" +
			"vec2 E = mix(A, B, t); \n" +
			"vec2 F = mix(B, C, t); \n" +
			"vec2 G = mix(C, D, t); \n" +
			"return quadratic_bezier(E, F, G, t); \n" +
			"} \n",

			"bloom_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main() \n" +
			"{ \n" +
			"vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y); \n" +
			"float dx = 1.0/float(1024.0); \n" +
			"float dy = 1.0/float(1024.0); \n" +
			"vec4 outColor ; \n" +
			"vec4 color = outColor = texture2D(diffuseTexture,uv.xy); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,0.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy*2.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy*2.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy*3.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy*3.0)); \n" +
			"color /= 8.0; \n" +
			"vec4 cout = vec4(0.0,0.0,0.0,0.0); \n" +
			"float lum = color.x * 0.3 + color.y *0.59 + color.z * 0.11; \n" +
			"vec4 p = color*(lum/0.1); \n" +
			"p /= vec4(vec4(1.0,1.0,1.0,0.0)+p); \n" +
			"float luml = (p.x+p.y+p.z)/3.0; \n" +
			"if (luml > 0.8) \n" +
			"{ \n" +
			"cout = color ; \n" +
			"} \n" +
			"gl_FragColor = cout ; \n" +
			"} \n",

			"colorGradients_fs":
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_colorGradientsSource[10] ; \n" +
			"void main(void){ \n" +
			"vec3 posStart = vec3(uniform_colorGradientsSource[0], uniform_colorGradientsSource[1], uniform_colorGradientsSource[2]); \n" +
			"vec3 posEnd = vec3(uniform_colorGradientsSource[3], uniform_colorGradientsSource[4], uniform_colorGradientsSource[5]); \n" +
			"vec4 color = vec4(uniform_colorGradientsSource[6], uniform_colorGradientsSource[7], uniform_colorGradientsSource[8], uniform_colorGradientsSource[9]); \n" +
			"color.w = color.w * clamp((varying_pos.y - posStart.y) / (posEnd.y - posStart.y), 0.0, 1.0); \n" +
			"diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0); \n" +
			"diffuseColor.xyz = diffuseColor.xyz * (1.0 - color.w) + color.xyz * color.w; \n" +
			"} \n" +
			"  \n",

			"colorTransform_fs":
			"uniform vec4 uniform_colorTransformVec4 ; \n" +
			"uniform mat4 uniform_colorTransformM44 ; \n" +
			"void main(){ \n" +
			"diffuseColor = uniform_colorTransformM44 * diffuseColor; \n" +
			"diffuseColor = diffuseColor + uniform_colorTransformVec4; \n" +
			"} \n",

			"color_fragment":
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = vec4(1.0, 1.0, 1.0, 1.0); \n" +
			"if( diffuseColor.w <= materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"}else \n" +
			"diffuseColor.xyz *= diffuseColor.w ; \n" +
			"} \n",

			"combin_fs":
			"uniform sampler2D colorTexture; \n" +
			"void main(void){ \n" +
			"} \n",

			"cube_fragment":
			"uniform samplerCube diffuseTexture ; \n" +
			"varying vec3 varying_pos; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"vec3 uvw = normalize(varying_pos.xyz); \n" +
			"diffuseColor = vec4(textureCube(diffuseTexture, uvw.xyz)); \n" +
			"if( diffuseColor.w <= materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"}else \n" +
			"diffuseColor.xyz *= diffuseColor.w ; \n" +
			"} \n",

			"cube_vertex":
			"varying vec3 varying_pos; \n" +
			"void main(void){ \n" +
			"varying_pos =  e_position; \n" +
			"}  \n",

			"detail_Bending_vs":
			"uniform float uniformTime[4] ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"varying_color = attribute_color; \n" +
			"vec4 curve = SmoothTriangleWave(vec4(sin(uniformTime[0]*0.001),1.0,1.0,1.0)); \n" +
			"e_position.xyz += curve.x * vec3(1.0,0.5,0.0) * ( attribute_color.xyz) ; \n" +
			"} \n",

			"diffuseShadowPass_fs":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor = varying_color ; \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"if( diffuseColor.w <= 0.3 ){ \n" +
			"discard; \n" +
			"} \n" +
			"} \n",

			"diffuse_fragment":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"if( diffuseColor.w <= materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"}else \n" +
			"diffuseColor.xyz *= diffuseColor.w ; \n" +
			"} \n",

			"diffuse_vertex":
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"varying vec3 varying_ViewDir ; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main(void){ \n" +
			"mat3 normalMatrix = mat3(uniform_NormalMatrix); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -attribute_normal); \n" +
			"varying_ViewPose = vec4(normalMatrix*e_position, 1.0) ; \n" +
			"varying_ViewDir = normalize(normalMatrix * (uniform_eyepos.xyz - e_position)) ; \n" +
			"outPosition = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; \n" +
			"varying_color = attribute_color; \n" +
			"} \n",

			"directLight_fragment":
			"const int max_directLight = 0 ; \n" +
			"uniform float uniform_directLightSource[6*max_directLight] ; \n" +
			"varying vec3 varying_ViewDir; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"struct DirectLight{ \n" +
			"vec3 direction; \n" +
			"vec3 diffuse; \n" +
			"}; \n" +
			"void calculateDirectLight( MaterialSource materialSource ){ \n" +
			"float lambertTerm , specular ; \n" +
			"vec3 N = normal; \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight directLight ; \n" +
			"directLight.direction = vec3(uniform_directLightSource[i*6+0],uniform_directLightSource[i*6+1],uniform_directLightSource[i*6+2]); \n" +
			"directLight.diffuse = vec3(uniform_directLightSource[i*6+3],uniform_directLightSource[i*6+4],uniform_directLightSource[i*6+5]); \n" +
			"vec3 lightDir = -normalize(mat3(uniform_NormalMatrix) * directLight.direction); \n" +
			"light += LightingBlinnPhong(normalize(lightDir),vec3(1.0,1.0,1.0),normal,-varying_ViewDir,0.5); \n" +
			"} \n" +
			"} \n" +
			"void main() { \n" +
			"calculateDirectLight( materialSource ); \n" +
			"} \n",

			"endShadowPass_fs":
			"void main() { \n" +
			"if(varying_color.w<=0.0){ \n" +
			"discard; \n" +
			"} \n" +
			"outColor.x =  outColor.y = outColor.z = varying_ViewPose.z/varying_ViewPose.w  ; \n" +
			"outColor.w = 1.0 ; \n" +
			"gl_FragColor = outColor ; \n" +
			"} \n",

			"endShadowPass_vs":
			"void main() { \n" +
			"outPosition = uniform_ProjectionMatrix * outPosition ; \n" +
			"varying_ViewPose = outPosition ; \n" +
			"gl_Position = outPosition ; \n" +
			"} \n" +
			"                       \n",

			"end_fs":
			"vec4 diffuseColor ; \n" +
			"vec4 specularColor ; \n" +
			"vec4 ambientColor; \n" +
			"vec4 light ; \n" +
			"void main() { \n" +
			"diffuseColor.xyz = materialSource.diffuse.xyz * diffuseColor.xyz ; \n" +
			"outColor.xyz = light.xyz * diffuseColor.xyz * materialSource.diffuse ; \n" +
			"outColor.w = materialSource.alpha * diffuseColor.w ; \n" +
			"gl_FragColor = outColor * varying_color; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"uniform float uniform_materialSource[20]; \n" +
			"void main() { \n" +
			"gl_PointSize = 50.0; \n" +
			"gl_PointSize = uniform_materialSource[18]; \n" +
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

			"gaussian_H_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main() \n" +
			"{ \n" +
			"vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y); \n" +
			"float d = 1.0/float(1024.0); \n" +
			"vec4 color = vec4(0.0,0.0,0.0,0.0); \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-8.0*d,0.0))* 0.001; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-7.0*d,0.0))* 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-6.0*d,0.0))* 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-5.0*d,0.0))* 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-4.0*d,0.0))* 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-3.0*d,0.0))* 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-2.0*d,0.0))* 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-1.0*d,0.0))* 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy) * 1.0; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(1.0*d,0.0)) * 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(2.0*d,0.0)) * 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(3.0*d,0.0)) * 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(4.0*d,0.0)) * 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(5.0*d,0.0)) * 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(6.0*d,0.0)) * 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(7.0*d,0.0)) * 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(8.0*d,0.0)) * 0.001; \n" +
			"color /= 8.0; \n" +
			"gl_FragColor = color ; \n" +
			"} \n",

			"gaussian_V_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"uniform sampler2D colorTexture; \n" +
			"void main() \n" +
			"{ \n" +
			"vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y); \n" +
			"float d = 1.0/float(1024.0); \n" +
			"vec4 color = vec4(0.0,0.0,0.0,0.0); \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-8.0*d)) * 0.001; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-7.0*d)) * 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-6.0*d)) * 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-5.0*d)) * 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-4.0*d)) * 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-3.0*d)) * 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-2.0*d)) * 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-1.0*d)) * 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy) * 1.0; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 1.0*d)) * 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 2.0*d)) * 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 3.0*d)) * 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 4.0*d)) * 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 5.0*d)) * 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 6.0*d)) * 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 7.0*d)) * 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 8.0*d)) * 0.001; \n" +
			"color /= 8.0; \n" +
			"gl_FragColor = color + texture2D(colorTexture,uv.xy); \n" +
			"} \n",

			"hud_H_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main(void) { \n" +
			"vec2 uv = vec2(varying_uv0.x ,1.0-varying_uv0.y); \n" +
			"vec4 color = texture2D(diffuseTexture, uv); \n" +
			"gl_FragColor  = color; \n" +
			"} \n",

			"hud_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"varying  vec2 varying_uv0; \n" +
			"uniform  mat4 uniform_ViewProjectionMatrix; \n" +
			"void main(void) { \n" +
			"vec4 pos = vec4(attribute_position, 1.0); \n" +
			"gl_Position = uniform_ViewProjectionMatrix * pos; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"hud_V_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main(void) { \n" +
			"vec4 color = texture2D(diffuseTexture, varying_uv0); \n" +
			"gl_FragColor  = color; \n" +
			"} \n",

			"lightingBase_fs":
			"vec4 LightingBlinnPhong(vec3 lightDir, vec3 lightColor , vec3 normal , vec3 viewDir, float atten){ \n" +
			"vec3 ambient = materialSource.ambient ; \n" +
			"float NdotL = clamp(dot (normal, lightDir),0.0,1.0); \n" +
			"vec3 diffuse = lightColor.xyz * NdotL ; \n" +
			"vec3 h = normalize (lightDir + viewDir); \n" +
			"float nh = clamp(dot (normal, h),0.0,1.0); \n" +
			"float specPower = pow (nh, materialSource.shininess ) * materialSource.specularScale ; \n" +
			"vec3 specular = lightColor.xyz * specPower * materialSource.specular ; \n" +
			"vec4 c; \n" +
			"c.rgb = (ambient + diffuse + specular) * (atten * 2.0 ); \n" +
			"c.a = materialSource.alpha + (specPower * atten); \n" +
			"return c; \n" +
			"} \n",

			"lightMapSpecularPower_fs":
			"uniform sampler2D lightTexture ; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"void main(void){ \n" +
			"vec3 lightmap = texture2D( lightTexture , varying_uv1 ).xyz * 1.5; \n" +
			"diffuseColor.xyz *= lightmap ; \n" +
			"specularColor.xyz *= lightmap; \n" +
			"} \n",

			"lightMap_fs":
			"uniform sampler2D lightTexture ; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"void main(void){ \n" +
			"vec3 lightmap = texture2D( lightTexture , varying_uv1 ).xyz * 1.5; \n" +
			"diffuseColor.xyz *= lightmap ; \n" +
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

			"matCapPass_vs":
			"varying vec2 capCoord ; \n" +
			"void main(void){ \n" +
			"capCoord.x = dot(normalMatrix[0].xyz,normal); \n" +
			"capCoord.y = dot(normalMatrix[1].xyz,normal); \n" +
			"capCoord = capCoord * 0.5 + 0.5; \n" +
			"ambientColor.xyz +=  + capCoord.xyz * 2.0 - 1.0 ; \n" +
			"} \n",

			"matCap_TextureAdd_fs":
			"uniform sampler2D matcapTexture; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main() { \n" +
			"vec4 capCoord ; \n" +
			"capCoord.x = -normal.x; \n" +
			"capCoord.y = normal.y; \n" +
			"capCoord.xy = capCoord.xy * 0.5 + 0.5; \n" +
			"capCoord = texture2D(matcapTexture , capCoord.xy ) * 2.0 - 1.0 ; \n" +
			"ambientColor.xyz += capCoord.xyz ; \n" +
			"} \n",

			"matCap_TextureMult_fs":
			"uniform sampler2D matcapTexture; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main() { \n" +
			"vec4 capCoord ; \n" +
			"capCoord.x = -normal.x; \n" +
			"capCoord.y = normal.y; \n" +
			"capCoord.xy = capCoord.xy * 0.5 + 0.5; \n" +
			"capCoord = texture2D(matcapTexture , capCoord.xy ) ; \n" +
			"diffuseColor.xyz *= capCoord.xyz * 2.0 ; \n" +
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
			"materialSource.specularScale = uniform_materialSource[12]; \n" +
			"materialSource.albedo = uniform_materialSource[13]; \n" +
			"materialSource.uvRectangle.x = uniform_materialSource[14]; \n" +
			"materialSource.uvRectangle.y = uniform_materialSource[15]; \n" +
			"materialSource.uvRectangle.z = uniform_materialSource[16]; \n" +
			"materialSource.uvRectangle.w = uniform_materialSource[17]; \n" +
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

			"particle_bezier":
			"float cubic_bezier(float p0, float p1, float p2, float p3, float t) { \n" +
			"float progress = 1.0 - t; \n" +
			"float progress2 = progress * progress; \n" +
			"float progress3 = progress2 * progress; \n" +
			"float t2 = t * t; \n" +
			"float t3 = t2 * t; \n" +
			"t = p0 * progress3 + 3.0 * p1 * t * progress2 + 3.0 * p2 * t2 * progress + p3 * t3; \n" +
			"return t; \n" +
			"} \n" +
			"float calcBezier(vec2 points[16], float t){ \n" +
			"vec2 A0 ; \n" +
			"vec2 B0 ; \n" +
			"vec2 A1 ; \n" +
			"vec2 B1 ; \n" +
			"for( int i = 0 ; i < 4 ; i++ ){ \n" +
			"if( t >= points[i*4].x && t <= points[i*4+3].x ){ \n" +
			"A0 = points[i*4] ; \n" +
			"B0 = points[i*4+1] ; \n" +
			"A1 = points[i*4+2] ; \n" +
			"B1 = points[i*4+3] ; \n" +
			"break; \n" +
			"} \n" +
			"} \n" +
			"t = (t - A0.x) / (A1.x - A0.x); \n" +
			"return cubic_bezier(A0.y, B0.y, B1.y, A1.y, t); \n" +
			"} \n" +
			"vec2 decompressFloat(float min, float range, float mergeFloat){ \n" +
			"float convert_1_4096 = 1.0 / 4096.0; \n" +
			"float value2 = fract(mergeFloat); \n" +
			"float value1 = mergeFloat - value2; \n" +
			"value1 *= convert_1_4096; \n" +
			"value1 *= range; \n" +
			"value2 *= range; \n" +
			"value1 += min; \n" +
			"value2 += min; \n" +
			"return vec2(value1, value2); \n" +
			"} \n" +
			"float calcDoubleBezier(float bezierData[18], float bezierData2[18], float particleProgress, float randomSeed){ \n" +
			"vec2 bezierPoints[16]; \n" +
			"vec2 bezierPoints2[16]; \n" +
			"for(int i = 0; i < 16; i ++){ \n" +
			"bezierPoints[i] = decompressFloat(bezierData[16], bezierData[17], bezierData[i]); \n" +
			"bezierPoints2[i] = decompressFloat(bezierData2[16], bezierData2[17], bezierData2[i]); \n" +
			"} \n" +
			"float res1 = calcBezier(bezierPoints, particleProgress); \n" +
			"float res2 = calcBezier(bezierPoints2, particleProgress); \n" +
			"res1 = randomSeed * res1 + (1.0 - randomSeed) * res2; \n" +
			"return res1; \n" +
			"} \n" +
			"float calcSingleBezier(float bezierData[18], float particleProgress){ \n" +
			"vec2 bezierPoints[16]; \n" +
			"for(int i = 0; i < 16; i ++){ \n" +
			"bezierPoints[i] = decompressFloat(bezierData[16], bezierData[17], bezierData[i]); \n" +
			"} \n" +
			"float res = calcBezier(bezierPoints, particleProgress); \n" +
			"return res; \n" +
			"} \n",

			"particle_color_fs":
			"uniform float uniform_colorTransform[40]; \n" +
			"vec3 unpack_color(float rgb_data) \n" +
			"{ \n" +
			"vec3 res; \n" +
			"res.z = fract( rgb_data ); \n" +
			"rgb_data -= res.z; \n" +
			"rgb_data = rgb_data/256.0; \n" +
			"res.y = fract( rgb_data ); \n" +
			"rgb_data -= res.y; \n" +
			"res.x = rgb_data/256.0; \n" +
			"return res; \n" +
			"} \n" +
			"void main() { \n" +
			"float startColor ; \n" +
			"float startSegment ; \n" +
			"float nextColor ; \n" +
			"float nextSegment ; \n" +
			"float startAlpha; \n" +
			"float nextAlpha; \n" +
			"float progress = particleVertex.x/particleVertex.y; \n" +
			"const int maxColorCount = 20; \n" +
			"for( int i = 1 ; i < maxColorCount ; i++ ){ \n" +
			"if( progress >= fract(uniform_colorTransform[i+maxColorCount-1]) ){ \n" +
			"startColor = uniform_colorTransform[i-1] ; \n" +
			"startSegment = fract(uniform_colorTransform[i+maxColorCount-1]) ; \n" +
			"nextColor = uniform_colorTransform[i]; \n" +
			"nextSegment = fract(uniform_colorTransform[i+maxColorCount]) ; \n" +
			"startAlpha = uniform_colorTransform[i+maxColorCount-1] - startSegment; \n" +
			"nextAlpha = uniform_colorTransform[i+maxColorCount] - nextSegment; \n" +
			"}else{ \n" +
			"break; \n" +
			"} \n" +
			"} \n" +
			"float len = nextSegment - startSegment ; \n" +
			"float ws = ( progress - startSegment ) / len ; \n" +
			"vec4 color = mix(vec4(unpack_color(startColor).xyz,startAlpha / 256.0),vec4(unpack_color(nextColor).xyz, nextAlpha / 256.0),ws) ; \n" +
			"diffuseColor *= color; \n" +
			"} \n",

			"particle_color_vs":
			"float particle(  ParticleData curParticle ){ \n" +
			"} \n",

			"particle_end":
			"float particle( ParticleData curParticle ){ \n" +
			"return 1.0 ; \n" +
			"} \n" +
			"mat4 buildModelMatrix(vec4 quat, vec3 scale, vec3 position) \n" +
			"{ \n" +
			"mat4 ret = mat4( \n" +
			"vec4(scale.x, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, scale.y, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, scale.z, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			"); \n" +
			"ret = buildMat4Quat(quat) * ret; \n" +
			"ret[3][0] = position.x; \n" +
			"ret[3][1] = position.y; \n" +
			"ret[3][2] = position.z; \n" +
			"return ret; \n" +
			"} \n" +
			"vec3 calcParticleMove(vec3 speedXYZ, vec3 forceXYZ){ \n" +
			"vec3 distanceXYZ = speedXYZ * currentTime; \n" +
			"distanceXYZ += forceXYZ * currentTime * currentTime; \n" +
			"if(velocityLimitVec2.y == 1.0){ \n" +
			"vec3 temp = distanceXYZ * distanceXYZ; \n" +
			"float distanceCurrent = sqrt(temp.x + temp.y + temp.z); \n" +
			"float distanceLimit = currentTime * velocityLimitVec2.x; \n" +
			"if(distanceCurrent > distanceLimit){ \n" +
			"distanceXYZ *= distanceLimit / distanceCurrent; \n" +
			"} \n" +
			"} \n" +
			"return distanceXYZ; \n" +
			"} \n" +
			"void main(void) { \n" +
			"if(discard_particle == 1.0){ \n" +
			"outPosition = vec4(0.0,0.0,0.0,0.0); \n" +
			"}else{ \n" +
			"vec3 position_emitter = attribute_offsetPosition; \n" +
			"vec3 velocityLocalVec3 = velocityBaseVec3; \n" +
			"vec3 velocityWorldVec3 = vec3(0.0,0.0,0.0); \n" +
			"vec3 velocityMultiVec3 = vec3(0.0,0.0,0.0); \n" +
			"if(particleStateData.velocityOverWorldSpace == 0.0){ \n" +
			"velocityLocalVec3 += velocityOverVec3; \n" +
			"}else{ \n" +
			"velocityWorldVec3 += velocityOverVec3; \n" +
			"} \n" +
			"if(particleStateData.worldSpace == 1.0){ \n" +
			"}else{ \n" +
			"followTargetPosition.x = particleStateData.positionX; \n" +
			"followTargetPosition.y = particleStateData.positionY; \n" +
			"followTargetPosition.z = particleStateData.positionZ; \n" +
			"followTargetScale.x = particleStateData.scaleX; \n" +
			"followTargetScale.y = particleStateData.scaleY; \n" +
			"followTargetScale.z = particleStateData.scaleZ; \n" +
			"followTargetRotation.x = particleStateData.rotationX; \n" +
			"followTargetRotation.y = particleStateData.rotationY; \n" +
			"followTargetRotation.z = particleStateData.rotationZ; \n" +
			"followTargetRotation.w = particleStateData.rotationW; \n" +
			"mat4 followRotQuat = buildMat4Quat(followTargetRotation); \n" +
			"velocityLocalVec3 = (followRotQuat * vec4(velocityLocalVec3, 1.0)).xyz; \n" +
			"velocityForceVec3 = (followRotQuat * vec4(velocityForceVec3, 1.0)).xyz; \n" +
			"} \n" +
			"mat4 modelMatrix = buildModelMatrix(followTargetRotation, followTargetScale, followTargetPosition); \n" +
			"position_emitter = (modelMatrix * vec4(position_emitter, 1.0)).xyz; \n" +
			"velocityMultiVec3 = velocityLocalVec3 + velocityWorldVec3; \n" +
			"position_emitter += calcParticleMove(velocityMultiVec3, velocityForceVec3) * followTargetScale; \n" +
			"position_emitter.y -= currentTime * currentTime * particleStateData.gravity; \n" +
			"localPosition.xyz *= vec3(particleStateData.scaleX, particleStateData.scaleY, particleStateData.scaleZ); \n" +
			"outPosition = billboardMatrix * localPosition; \n" +
			"outPosition.xyz += position_emitter.xyz; \n" +
			"outPosition = uniform_ViewMatrix * outPosition; \n" +
			"} \n" +
			"gl_Position = uniform_ProjectionMatrix * outPosition ; \n" +
			"} \n" +
			"	 \n",

			"particle_follow_vs":
			"attribute vec3 attribute_followPosition ; \n" +
			"attribute vec4 attribute_followRotation ; \n" +
			"attribute vec3 attribute_followScale; \n" +
			"float particle(  ParticleData curParticle ){ \n" +
			"followTargetPosition = attribute_followPosition; \n" +
			"followTargetScale = attribute_followScale; \n" +
			"followTargetRotation = attribute_followRotation; \n" +
			"} \n" +
			"	 \n",

			"particle_rotationConst":
			"attribute float attribute_rotationZ ; \n" +
			"float particle(  ParticleData curParticle ){ \n" +
			"float rot = currentTime * attribute_rotationZ * (PI / 180.0); \n" +
			"localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition; \n" +
			"} \n",

			"particle_rotationOneBezier":
			"uniform float uniform_rotationBezier[18]; \n" +
			"float particle(  ParticleData curParticle ){ \n" +
			"if(discard_particle == 0.0){ \n" +
			"float rot = calcSingleBezier(uniform_rotationBezier, currentTime/curParticle.life);; \n" +
			"rot = currentTime * rot * (PI / 180.0); \n" +
			"localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition; \n" +
			"} \n" +
			"} \n",

			"particle_rotationTwoBezier":
			"uniform float uniform_rotationBezier[18]; \n" +
			"uniform float uniform_rotationBezier2[18]; \n" +
			"attribute float attribute_rotationRandomSeed; \n" +
			"float particle(  ParticleData curParticle ){ \n" +
			"if(discard_particle == 0.0){ \n" +
			"float rot = calcDoubleBezier(uniform_rotationBezier, uniform_rotationBezier2, currentTime/curParticle.life, attribute_rotationRandomSeed); \n" +
			"rot = currentTime * rot * (PI / 180.0); \n" +
			"localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition; \n" +
			"} \n" +
			"} \n",

			"particle_size_vs":
			"uniform float uniform_size_compressed[18]; \n" +
			"void main() { \n" +
			"localPosition.xyz *= calcSingleBezier(uniform_size_compressed, currentTime/curParticle.life); \n" +
			"} \n",

			"particle_time_fs":
			"varying vec3 varying_particleData; \n" +
			"void main(void) { \n" +
			"vec3 particleVertex = varying_particleData ; \n" +
			"} \n",

			"particle_time_vs":
			"attribute vec3 attribute_time ; \n" +
			"float currentTime = 0.0; \n" +
			"varying vec3 varying_particleData; \n" +
			"struct ParticleData{ \n" +
			"float bornTime; \n" +
			"float life; \n" +
			"float index; \n" +
			"}; \n" +
			"float particle( ParticleData curParticle ){ \n" +
			"float time = particleStateData.time - particleStateData.delay; \n" +
			"if(time <= curParticle.bornTime){ \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"if(particleStateData.loop == 0.0){ \n" +
			"float emitterDuring = particleStateData.duration - particleStateData.delay; \n" +
			"if(curParticle.bornTime >= emitterDuring) \n" +
			"{ \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"if(time >= curParticle.life + curParticle.bornTime) \n" +
			"{ \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"} \n" +
			"currentTime = time - curParticle.bornTime; \n" +
			"currentTime = mod(currentTime, particleStateData.loopTime); \n" +
			"if(currentTime >= curParticle.life){ \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"if( currentTime <= 0.0 ) \n" +
			"return currentTime = 0.0; \n" +
			"} \n" +
			"void main(void) { \n" +
			"ParticleData curParticle ; \n" +
			"curParticle.bornTime = attribute_time.x ; \n" +
			"curParticle.life = attribute_time.y ; \n" +
			"curParticle.index = attribute_time.z ; \n" +
			"float active = particle( curParticle ) ; \n" +
			"varying_particleData.x = currentTime; \n" +
			"varying_particleData.y = curParticle.life ; \n" +
			"varying_particleData.z = curParticle.index; \n" +
			"if( active == 0.0 ){ \n" +
			"e_discard(); \n" +
			"}else{ \n" +
			"} \n" +
			"} \n",

			"particle_velocity":
			"attribute vec3 attribute_velocity; \n" +
			"float particle(  ParticleData curParticle ){ \n" +
			"velocityBaseVec3 = attribute_velocity; \n" +
			"} \n",

			"particle_velocityForceConst":
			"attribute vec3 attribute_velocityForceConst ; \n" +
			"float particle(   ParticleData curParticle ){ \n" +
			"velocityForceVec3 = attribute_velocityForceConst; \n" +
			"} \n",

			"particle_velocityForceOneBezier":
			"uniform float uniform_velocityForceX[18]; \n" +
			"uniform float uniform_velocityForceY[18]; \n" +
			"uniform float uniform_velocityForceZ[18]; \n" +
			"void main() { \n" +
			"if(discard_particle == 0.0){ \n" +
			"velocityForceVec3.x = calcSingleBezier(uniform_velocityForceX, currentTime/curParticle.life); \n" +
			"velocityForceVec3.y = calcSingleBezier(uniform_velocityForceY, currentTime/curParticle.life); \n" +
			"velocityForceVec3.z = calcSingleBezier(uniform_velocityForceZ, currentTime/curParticle.life); \n" +
			"} \n" +
			"} \n",

			"particle_velocityForceTwoBezier":
			"uniform float uniform_velocityForceX[18]; \n" +
			"uniform float uniform_velocityForceY[18]; \n" +
			"uniform float uniform_velocityForceZ[18]; \n" +
			"uniform float uniform_velocityForceX2[18]; \n" +
			"uniform float uniform_velocityForceY2[18]; \n" +
			"uniform float uniform_velocityForceZ2[18]; \n" +
			"attribute float attribute_velocityForceRandomSeed; \n" +
			"void main() { \n" +
			"if(discard_particle == 0.0){ \n" +
			"velocityForceVec3.x = calcDoubleBezier(uniform_velocityForceX, uniform_velocityForceX2, currentTime/curParticle.life, attribute_velocityForceRandomSeed); \n" +
			"velocityForceVec3.y = calcDoubleBezier(uniform_velocityForceY, uniform_velocityForceY2, currentTime/curParticle.life, attribute_velocityForceRandomSeed); \n" +
			"velocityForceVec3.z = calcDoubleBezier(uniform_velocityForceZ, uniform_velocityForceZ2, currentTime/curParticle.life, attribute_velocityForceRandomSeed); \n" +
			"} \n" +
			"} \n",

			"particle_velocityLimitConst":
			"attribute float attribute_velocityLimit; \n" +
			"float particle(  ParticleData curParticle ){ \n" +
			"velocityLimitVec2.x = attribute_velocityLimit; \n" +
			"if(velocityLimitVec2.x < 0.0){ \n" +
			"velocityLimitVec2.x = 0.0; \n" +
			"} \n" +
			"velocityLimitVec2.y = 1.0; \n" +
			"} \n",

			"particle_velocityLimitOneBezier":
			"uniform float uniform_velocityLimit[18]; \n" +
			"void main() { \n" +
			"if(discard_particle == 0.0){ \n" +
			"velocityLimitVec2.x = calcSingleBezier(uniform_velocityLimit, currentTime/curParticle.life); \n" +
			"velocityLimitVec2.y = 1.0; \n" +
			"} \n" +
			"} \n",

			"particle_velocityLimitTwoBezier":
			"uniform float uniform_velocityLimit[18]; \n" +
			"uniform float uniform_velocityLimit2[18]; \n" +
			"attribute float attribute_velocityLimitRandomSeed; \n" +
			"void main() { \n" +
			"if(discard_particle == 0.0){ \n" +
			"velocityLimitVec2.x = calcDoubleBezier(uniform_velocityLimit, uniform_velocityLimit2, currentTime/curParticle.life, attribute_velocityLimitRandomSeed); \n" +
			"if(velocityLimitVec2.x < 0.0){ \n" +
			"velocityLimitVec2.x = 0.0; \n" +
			"} \n" +
			"velocityLimitVec2.y = 1.0; \n" +
			"} \n" +
			"} \n",

			"particle_velocityOverConst":
			"attribute vec3 attribute_velocityOverVec3; \n" +
			"float particle(  ParticleData curParticle ){ \n" +
			"velocityOverVec3 = attribute_velocityOverVec3; \n" +
			"} \n",

			"particle_velocityOverOneBezier":
			"uniform float uniform_velocityOverX[18]; \n" +
			"uniform float uniform_velocityOverY[18]; \n" +
			"uniform float uniform_velocityOverZ[18]; \n" +
			"void main() { \n" +
			"if(discard_particle == 0.0){ \n" +
			"velocityOverVec3.x = calcSingleBezier(uniform_velocityOverX, currentTime/curParticle.life); \n" +
			"velocityOverVec3.y = calcSingleBezier(uniform_velocityOverY, currentTime/curParticle.life); \n" +
			"velocityOverVec3.z = calcSingleBezier(uniform_velocityOverZ, currentTime/curParticle.life); \n" +
			"} \n" +
			"} \n",

			"particle_velocityOverTwoBezier":
			"uniform float uniform_velocityOverX[18]; \n" +
			"uniform float uniform_velocityOverY[18]; \n" +
			"uniform float uniform_velocityOverZ[18]; \n" +
			"uniform float uniform_velocityOverX2[18]; \n" +
			"uniform float uniform_velocityOverY2[18]; \n" +
			"uniform float uniform_velocityOverZ2[18]; \n" +
			"attribute float attribute_velocityOverRandomSeed; \n" +
			"void main() { \n" +
			"if(discard_particle == 0.0){ \n" +
			"velocityOverVec3.x = calcDoubleBezier(uniform_velocityOverX, uniform_velocityOverX2, currentTime/curParticle.life, attribute_velocityOverRandomSeed); \n" +
			"velocityOverVec3.y = calcDoubleBezier(uniform_velocityOverY, uniform_velocityOverY2, currentTime/curParticle.life, attribute_velocityOverRandomSeed); \n" +
			"velocityOverVec3.z = calcDoubleBezier(uniform_velocityOverZ, uniform_velocityOverZ2, currentTime/curParticle.life, attribute_velocityOverRandomSeed); \n" +
			"} \n" +
			"} \n",

			"particle_vs":
			"attribute vec4 attribute_color; \n" +
			"attribute vec3 attribute_offsetPosition; \n" +
			"uniform mat4 uniform_cameraMatrix; \n" +
			"uniform float uniform_particleState[18]; \n" +
			"uniform mat4 uniform_ViewMatrix; \n" +
			"const float PI = 3.1415926 ; \n" +
			"float currentTime = 0.0; \n" +
			"float totalTime = 0.0; \n" +
			"vec4 localPosition = vec4(0.0,0.0,0.0,1.0); \n" +
			"vec3 velocityBaseVec3 = vec3(0.0,0.0,0.0); \n" +
			"vec3 velocityOverVec3 = vec3(0.0,0.0,0.0); \n" +
			"vec3 velocityForceVec3 = vec3(0.0,0.0,0.0); \n" +
			"vec2 velocityBezierWeightVec2 = vec2(1.0, 1.0); \n" +
			"vec2 velocityLimitVec2 = vec2(0.0,0.0); \n" +
			"vec3 followTargetPosition = vec3(0.0,0.0,0.0); \n" +
			"vec3 followTargetScale = vec3(1.0,1.0,1.0); \n" +
			"vec4 followTargetRotation = vec4(0.0,0.0,0.0,0.0); \n" +
			"varying vec3 varyingViewDir ; \n" +
			"float discard_particle = 0.0; \n" +
			"ParticleStateData particleStateData; \n" +
			"void e_discard(){ \n" +
			"discard_particle = 1.0; \n" +
			"} \n" +
			"struct ParticleStateData{ \n" +
			"float time; \n" +
			"float loop; \n" +
			"float worldSpace; \n" +
			"float scaleX; \n" +
			"float scaleY; \n" +
			"float scaleZ; \n" +
			"float rotationX; \n" +
			"float rotationY; \n" +
			"float rotationZ; \n" +
			"float rotationW; \n" +
			"float positionX; \n" +
			"float positionY; \n" +
			"float positionZ; \n" +
			"float loopTime; \n" +
			"float delay; \n" +
			"float duration; \n" +
			"float gravity; \n" +
			"float velocityOverWorldSpace; \n" +
			"}; \n" +
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
			"ret = mat4( \n" +
			"vec4(1.0, 0.0, 0.0, 0.0), \n" +
			"vec4(0.0, c, s, 0.0), \n" +
			"vec4(0.0, -s, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			") * ret; \n" +
			"s = sin(rot.y); \n" +
			"c = cos(rot.y); \n" +
			"ret = mat4( \n" +
			"vec4(c, 0.0, -s, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0), \n" +
			"vec4(s, 0.0, c, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			") * ret; \n" +
			"s = sin(rot.z); \n" +
			"c = cos(rot.z); \n" +
			"ret = mat4( \n" +
			"vec4(c, s, 0.0, 0.0), \n" +
			"vec4(-s, c, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0) \n" +
			") * ret; \n" +
			"return ret; \n" +
			"} \n" +
			"mat4 buildMat4Quat(vec4 quat){ \n" +
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
			"0.0,							0.0,					0.0,					1 \n" +
			"); \n" +
			"} \n" +
			"void main(void) { \n" +
			"particleStateData.time							= uniform_particleState[0]; \n" +
			"particleStateData.loop							= uniform_particleState[1]; \n" +
			"particleStateData.worldSpace					= uniform_particleState[2]; \n" +
			"particleStateData.scaleX						= uniform_particleState[3]; \n" +
			"particleStateData.scaleY						= uniform_particleState[4]; \n" +
			"particleStateData.scaleZ						= uniform_particleState[5]; \n" +
			"particleStateData.rotationX						= uniform_particleState[6]; \n" +
			"particleStateData.rotationY						= uniform_particleState[7]; \n" +
			"particleStateData.rotationZ						= uniform_particleState[8]; \n" +
			"particleStateData.rotationW						= uniform_particleState[9]; \n" +
			"particleStateData.positionX						= uniform_particleState[10]; \n" +
			"particleStateData.positionY						= uniform_particleState[11]; \n" +
			"particleStateData.positionZ						= uniform_particleState[12]; \n" +
			"particleStateData.loopTime						= uniform_particleState[13]; \n" +
			"particleStateData.delay							= uniform_particleState[14]; \n" +
			"particleStateData.duration						= uniform_particleState[15]; \n" +
			"particleStateData.gravity						= uniform_particleState[16]; \n" +
			"particleStateData.velocityOverWorldSpace		= uniform_particleState[17]; \n" +
			"mat4 billboardMatrix = mat4( \n" +
			"uniform_cameraMatrix[0], \n" +
			"uniform_cameraMatrix[1], \n" +
			"uniform_cameraMatrix[2], \n" +
			"vec4(0.0, 0.0, 1.0, 1.0)); \n" +
			"mat4 modeViewMatrix = uniform_ModelViewMatrix ; \n" +
			"outPosition = localPosition = vec4(e_position, 1.0); \n" +
			"} \n",

			"pointLight_fragment":
			"const int max_pointLight = 0 ; \n" +
			"uniform float uniform_pointLightSource[6*max_pointLight] ; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"struct PointLight{ \n" +
			"vec3 position ; \n" +
			"vec3 diffuse ; \n" +
			"}; \n" +
			"void calculatePointLight(MaterialSource materialSource){ \n" +
			"vec3 N = normal; \n" +
			"for(int i = 0 ; i < max_pointLight ; i++){ \n" +
			"PointLight pointLight; \n" +
			"pointLight.position = vec3(uniform_pointLightSource[i*6],uniform_pointLightSource[i*6+1],uniform_pointLightSource[i*6+2]); \n" +
			"pointLight.diffuse = vec3(uniform_pointLightSource[i*6+3],uniform_pointLightSource[i*6+4],uniform_pointLightSource[i*6+5]); \n" +
			"vec3 viewDir = normalize(varying_ViewPose.xyz/varying_ViewPose.w); \n" +
			"vec4 lightVirePos = uniform_NormalMatrix * vec4(pointLight.position.xyz,1.0) ; \n" +
			"vec3 lightDir = varying_ViewPose.xyz - lightVirePos.xyz ; \n" +
			"float lightDist = length( lightDir ); \n" +
			"float attenuation = 1.0 / (3.0 + 0.001 * lightDist +  0.00009 * lightDist * lightDist); \n" +
			"light += LightingBlinnPhong(normalize(lightDir),vec3(1.0,1.0,1.0),normal,-varying_ViewDir,attenuation); \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculatePointLight(materialSource); \n" +
			"} \n",

			"secondaryUV_vs":
			"attribute vec2 attribute_uv1; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"void main(void){ \n" +
			"varying_uv1 = attribute_uv1 ; \n" +
			"} \n",

			"shadowMapping_fs":
			"uniform sampler2D shadowMapTexture; \n" +
			"uniform vec3 uniform_ShadowColor; \n" +
			"varying vec4 varying_ShadowCoord; \n" +
			"float unpackDepth(vec4 rgbaDepth){ \n" +
			"vec4 bitShift = vec4( 1.0 , 1.0/256.0 , 1.0/(256.0*256.0) , 1.0/(256.0*256.0*256.0) ); \n" +
			"float depth = dot(rgbaDepth,bitShift); \n" +
			"return depth ; \n" +
			"} \n" +
			"void main() { \n" +
			"vec3 shadowColor = vec3(1.0,1.0,1.0); \n" +
			"float shadow = 0.0; \n" +
			"if (varying_ShadowCoord.w > 0.0) { \n" +
			"vec3 shadowDepth = varying_ShadowCoord.xyz / varying_ShadowCoord.w * 0.5 + 0.5; \n" +
			"vec2 sample = clamp(shadowDepth.xy,0.0,1.0); \n" +
			"float sampleDepth = texture2D(shadowMapTexture, sample).z; \n" +
			"if(sampleDepth > shadowDepth.z) \n" +
			"shadowColor = uniform_ShadowColor; \n" +
			"} \n" +
			"diffuseColor.xyz = diffuseColor.xyz * shadowColor; \n" +
			"} \n",

			"shadowMapping_vs":
			"uniform mat4 uniform_ShadowMatrix; \n" +
			"uniform mat4 uniform_ModelMatrix; \n" +
			"varying vec4 varying_ShadowCoord; \n" +
			"void main() { \n" +
			"varying_ShadowCoord = uniform_ShadowMatrix * uniform_ModelMatrix * vec4(e_position, 1.0); \n" +
			"} \n",

			"skeletonShadowPass_vs":
			"attribute vec4 attribute_boneIndex; \n" +
			"attribute vec4 attribute_boneWeight; \n" +
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
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
			"varying_color = attribute_color; \n" +
			"e_boneIndex = attribute_boneIndex; \n" +
			"e_boneWeight = attribute_boneWeight; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"mat4 m0 = buildMat4(int(e_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(e_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(e_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(e_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * e_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * e_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * e_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * e_boneWeight.w; \n" +
			"e_position = outPosition.xyz; \n" +
			"outPosition = uniform_ModelViewMatrix * outPosition; \n" +
			"} \n",

			"skeleton_vs":
			"attribute vec4 attribute_boneIndex; \n" +
			"attribute vec4 attribute_boneWeight; \n" +
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"uniform mat4 uniform_NormalMatrix ; \n" +
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
			"e_boneIndex = attribute_boneIndex; \n" +
			"e_boneWeight = attribute_boneWeight; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"vec4 temp_normal = vec4(attribute_normal, 0.0) ; \n" +
			"mat4 m0 = buildMat4(int(e_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(e_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(e_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(e_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * e_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * e_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * e_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * e_boneWeight.w; \n" +
			"e_position = outPosition.xyz; \n" +
			"vec4 temp_n ; \n" +
			"temp_n = m0 * temp_normal * e_boneWeight.x; \n" +
			"temp_n += m1 * temp_normal * e_boneWeight.y; \n" +
			"temp_n += m2 * temp_normal * e_boneWeight.z; \n" +
			"temp_n += m3 * temp_normal * e_boneWeight.w; \n" +
			"mat3 normalMatrix = mat3(uniform_NormalMatrix); \n" +
			"varying_eyeNormal = normalize(normalMatrix * -temp_n.xyz); \n" +
			"varying_ViewPose = vec4(normalMatrix*outPosition.xyz, 1.0) ; \n" +
			"outPosition = uniform_ModelViewMatrix * outPosition; \n" +
			"} \n",

			"specularMap_fragment":
			"uniform sampler2D specularTexture; \n" +
			"void main(void){ \n" +
			"specularColor.xyz *= texture2D( specularTexture , uv_0 ).xyz ; \n" +
			"} \n",

			"staticShadowPass_vs":
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"void main(void){ \n" +
			"varying_color = attribute_color; \n" +
			"outPosition = vec4(attribute_position, 1.0) ; \n" +
			"e_position = outPosition.xyz; \n" +
			"outPosition = uniform_ModelViewMatrix * outPosition; \n" +
			"} \n",

			"tangent_vs":
			"attribute vec3 attribute_tangent; \n" +
			"void main(void){ \n" +
			"}  \n",

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
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy += vec2(uvRoll[0],uvRoll[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0); \n" +
			"} \n",

			"uvSpriteSheet_fs":
			"uniform float uvSpriteSheet[4] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy *= vec2(uvSpriteSheet[2],uvSpriteSheet[3]); \n" +
			"uv_0.xy += vec2(uvSpriteSheet[0],uvSpriteSheet[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"} \n",

			"uvStreamerRoll_fs":
			"uniform float uvRoll[3] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"uniform sampler2D streamerTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor = texture2D(diffuseTexture , varying_uv0 ); \n" +
			"vec2 rollUV = varying_uv0 + vec2(uvRoll[0],uvRoll[1]) + vec2(normal.xz) * 0.5 ; \n" +
			"diffuseColor.xyz += texture2D(streamerTexture , rollUV ).xyz * uvRoll[2] ; \n" +
			"} \n",

			"varyingViewDir_vs":
			"varying vec3 varying_ViewDir; \n" +
			"uniform vec3 uniform_eyepos; \n" +
			"uniform mat4 uniform_NormalMatrix; \n" +
			"void main(void){ \n" +
			"varying_ViewDir = normalize(mat3(uniform_NormalMatrix)*(uniform_eyepos.xyz - e_position)) ; \n" +
			"} \n",

			"vertexPos_vs":
			"varying vec4 varying_pos; \n" +
			"void main() { \n" +
			"varying_pos = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; \n" +
			"} \n" +
			"                       \n",


		};
	}
}
