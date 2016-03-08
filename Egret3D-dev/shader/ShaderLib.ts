module egret3d_dev {
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"AlphaEnvironmentMapping_fragment":
			"uniform samplerCube environmentMapTex ;                      \n" +
			"uniform float reflectValue;                                  \n" +
			"void main(){                                                 \n" +
			"eyedir.y = -eyedir.y ;                                       \n" +
			"diffuse.xyz = vec3(0.0,0.0,0.0);                             \n" +
			"vec3 r = reflect(-normalize(eyedir), normal  );              \n" +
			"vec4 reflectiveColor = textureCube(environmentMapTex,r.xyz); \n" +
			"diffuse.xyz = mix( diffuse.xyz,reflectiveColor.xyz, 1.0 );   \n" +
			"}                                                            \n" +
			"                                                             \n",

			"AOMap_fragment":
			"uniform sampler2D aoMapTex ;                       \n" +
			"uniform float aoPower ;                            \n" +
			"void main(void){                                   \n" +
			"float ao = texture2D( aoMapTex , varying_uv1 ).x ; \n" +
			"vec3 cc = (1.0-ao) * ttt.xyz * (1.0-aoPower);      \n" +
			"diffuse.xyz *= (ao * aoPower + cc) ;               \n" +
			"}                                                  \n",

			"back":
			"struct MaterialSource{                                                                                                           \n" +
			"vec4 ambient;                                                                                                                    \n" +
			"vec4 diffuse;                                                                                                                    \n" +
			"vec4 specular;                                                                                                                   \n" +
			"vec4 emission;                                                                                                                   \n" +
			"};                                                                                                                               \n" +
			"struct LightModelSource{                                                                                                         \n" +
			"vec4 ambient;                                                                                                                    \n" +
			"};                                                                                                                               \n" +
			"struct LightSource{                                                                                                              \n" +
			"int lightType;                                                                                                                   \n" +
			"vec3 position;                                                                                                                   \n" +
			"float spotExponent;                                                                                                              \n" +
			"vec3 spotDirection;                                                                                                              \n" +
			"float spotCutoff;                                                                                                                \n" +
			"vec3 halfVector;                                                                                                                 \n" +
			"float spotCosCutoff;                                                                                                             \n" +
			"vec3 ambient;                                                                                                                    \n" +
			"float constantAttenuation;                                                                                                       \n" +
			"vec3 diffuse;                                                                                                                    \n" +
			"float linearAttenuation;                                                                                                         \n" +
			"vec3 specular;                                                                                                                   \n" +
			"float quadraticAttenuation;                                                                                                      \n" +
			"};                                                                                                                               \n" +
			"varying vec4 varying_pos        ;                                                                                                \n" +
			"varying vec3 varying_normal     ;                                                                                                \n" +
			"varying vec2 varying_uv0        ;                                                                                                \n" +
			"varying vec3 varying_eyeNormal  ;                                                                                                \n" +
			"varying vec4 varying_color      ;                                                                                                \n" +
			"uniform vec4 uniform_materialSource[4];                                                                                          \n" +
			"uniform vec4 uniform_lightModelSource ;                                                                                          \n" +
			"uniform float uniform_LightSource[25];                                                                                           \n" +
			"void main() {                                                                                                                    \n" +
			"vec3 normal, lightDir;                                                                                                           \n" +
			"vec4 diffuse, ambient, globalAmbient , finalColor ;                                                                              \n" +
			"float NdotL;                                                                                                                     \n" +
			"finalColor = vec4(0.0,0.0,0.0,0.0);                                                                                              \n" +
			"normal = normalize(varying_eyeNormal);                                                                                           \n" +
			"MaterialSource frontMaterial = MaterialSource( materialSource[0] , materialSource[1] , materialSource[2] , materialSource[3] ) ; \n" +
			"LightModelSource lightModel = LightModelSource( uniform_lightModelSource );                                                      \n" +
			"for(int i = 0 ; i < 1 ; i++){                                                                                                    \n" +
			"LightSource light = LightSource(                                                                                                 \n" +
			"int(uniform_LightSource[i]),                                                                                                     \n" +
			"vec3(uniform_LightSource[i+1],uniform_LightSource[i+2],uniform_LightSource[i+3]),                                                \n" +
			"uniform_LightSource[i+4],                                                                                                        \n" +
			"vec3( uniform_LightSource[i+5],uniform_LightSource[i+6],uniform_LightSource[i+7]),                                               \n" +
			"uniform_LightSource[i+8],                                                                                                        \n" +
			"vec3( uniform_LightSource[i+9],uniform_LightSource[i+10],uniform_LightSource[i+11]),                                             \n" +
			"uniform_LightSource[i+12],                                                                                                       \n" +
			"vec3( uniform_LightSource[i+13],uniform_LightSource[i+14],uniform_LightSource[i+15]),                                            \n" +
			"uniform_LightSource[i+16],                                                                                                       \n" +
			"vec3( uniform_LightSource[i+17],uniform_LightSource[i+18],uniform_LightSource[i+19]),                                            \n" +
			"uniform_LightSource[i+20],                                                                                                       \n" +
			"vec3( uniform_LightSource[i+21],uniform_LightSource[i+22],uniform_LightSource[i+23]),                                            \n" +
			"uniform_LightSource[i+24]                                                                                                        \n" +
			");                                                                                                                               \n" +
			"if( light.lightType == 0 ){                                                                                                      \n" +
			"normal = normalize(varying_eyeNormal);                                                                                           \n" +
			"lightDir = normalize(light.position);                                                                                            \n" +
			"NdotL = max(dot(normal, lightDir), 0.0);                                                                                         \n" +
			"diffuse = vec4( frontMaterial.diffuse.xyz * light.diffuse , frontMaterial.diffuse.w );                                           \n" +
			"ambient = vec4( frontMaterial.ambient.xyz * light.ambient , frontMaterial.ambient.w );                                           \n" +
			"globalAmbient = frontMaterial.ambient * lightModel.ambient ;                                                                     \n" +
			"finalColor +=  NdotL * diffuse + globalAmbient + ambient;                                                                        \n" +
			"}                                                                                                                                \n" +
			"}                                                                                                                                \n" +
			"gl_FragColor =  finalColor ;                                                                                                     \n" +
			"}                                                                                                                                \n" +
			"color += att * (diffuse.xyz * NdotL + ambient.xyz);                                                                              \n" +
			"halfV = normalize(halfVector);                                                                                                   \n" +
			"NdotHV = max(dot(n,halfV),0.0);                                                                                                  \n" +
			"color += att * frontMaterial.specular.xyz * light.specular.xyz *                                                                 \n" +
			"                                                                               pow(NdotHV,frontMaterial.shininess);              \n",

			"BrightPassFilter":
			"varying vec2 uv ;                                                         \n" +
			"uniform sampler2D texture2D_1 ;                                           \n" +
			"void main(void){                                                          \n" +
			"vec4 color = texture2D( texture2D_1 , uv ) ;                              \n" +
			"float intensity = 0.2990 * color.x + 0.5870 * color.y + 0.1140* color.z ; \n" +
			"color.xyz = color.xyz - vec3(intensity,intensity,intensity) ;             \n" +
			"gl_FragColor = color ;                                                    \n" +
			"}                                                                         \n",

			"Color_fragment":
			"mat3 TBN ;                                                                            \n" +
			"struct MaterialSource{                                                                \n" +
			"vec3 diffuse;                                                                         \n" +
			"vec3 ambient;                                                                         \n" +
			"vec3 specular;                                                                        \n" +
			"float alpha;                                                                          \n" +
			"float cutAlpha;                                                                       \n" +
			"float shininess;                                                                      \n" +
			"float diffusePower;                                                                   \n" +
			"float specularPower;                                                                  \n" +
			"float ambientPower;                                                                   \n" +
			"float normalPower;                                                                    \n" +
			"};                                                                                    \n" +
			"varying vec4 varying_pos        ;                                                     \n" +
			"varying highp vec2 varying_uv0  ;                                                     \n" +
			"varying vec2 varying_uv1        ;                                                     \n" +
			"varying vec3 varying_eyeNormal  ;                                                     \n" +
			"varying vec4 varying_color		;                                                         \n" +
			"varying vec3 varying_eyedir		;                                                        \n" +
			"varying vec3 varying_tangent	;                                                        \n" +
			"uniform float uniform_materialSource[16];                                             \n" +
			"vec4 test  ;                                                                          \n" +
			"vec4 diffuse  ;                                                                       \n" +
			"vec3 light    ;                                                                       \n" +
			"vec4 specular ;                                                                       \n" +
			"vec3 normal  ;                                                                        \n" +
			"vec3 eyedir  ;                                                                        \n" +
			"vec4 ttt  ;                                                                           \n" +
			"void main() {                                                                         \n" +
			"test = vec4(1.0,1.0,1.0,1.0);                                                         \n" +
			"ttt = vec4(1.0,1.0,1.0,0.0);                                                          \n" +
			"diffuse = vec4(1.0,1.0,1.0,1.0);                                                      \n" +
			"light   = vec3(0.0,0.0,0.0);                                                          \n" +
			"normal = varying_eyeNormal ;                                                          \n" +
			"MaterialSource materialSource = MaterialSource(                                       \n" +
			"vec3(uniform_materialSource[0],uniform_materialSource[1],uniform_materialSource[2]) , \n" +
			"vec3(uniform_materialSource[3],uniform_materialSource[4],uniform_materialSource[5]) , \n" +
			"vec3(uniform_materialSource[6],uniform_materialSource[7],uniform_materialSource[8]) , \n" +
			"uniform_materialSource[9] ,                                                           \n" +
			"uniform_materialSource[10] ,                                                          \n" +
			"uniform_materialSource[11] ,                                                          \n" +
			"uniform_materialSource[12] ,                                                          \n" +
			"uniform_materialSource[13] ,                                                          \n" +
			"uniform_materialSource[14] ,                                                          \n" +
			"uniform_materialSource[15]                                                            \n" +
			") ;                                                                                   \n" +
			"specular = vec4(materialSource.specular,0.0);                                         \n" +
			"TBN[0] = -varying_tangent ;                                                           \n" +
			"TBN[2] = normalize( normal.xyz ) ;                                                    \n" +
			"TBN[1] = normalize( cross(TBN[0],TBN[2]) );                                           \n" +
			"eyedir = varying_eyedir.xyz - varying_pos.xyz ;                                       \n" +
			"}                                                                                     \n",

			"Color_vertex":
			"attribute vec3 attribute_position ;                                                       \n" +
			"attribute vec3 attribute_normal ;                                                         \n" +
			"attribute vec2 attribute_uv0 ;                                                            \n" +
			"uniform mat4 uniform_ModelMatrix ;                                                        \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                                                   \n" +
			"uniform mat4 uniform_normalMatrix ;                                                       \n" +
			"varying vec2 varying_uv0  ;                                                               \n" +
			"void main(void){                                                                          \n" +
			"highp vec4 temp_p ;                                                                       \n" +
			"temp_p =  uniform_ProjectionMatrix * uniform_ModelMatrix * vec4(attribute_position,1.0) ; \n" +
			"}                                                                                         \n",

			"Composition":
			"varying vec2 uv ;                             \n" +
			"uniform sampler2D texture2D_1 ;               \n" +
			"uniform sampler2D texture2D_2 ;               \n" +
			"void main(void){                              \n" +
			"vec4 color = texture2D(texture2D_1, uv ) ;    \n" +
			"color = texture2D(texture2D_2, uv ) + color ; \n" +
			"gl_FragColor = vec4(color.xyz, 1.0 );         \n" +
			"}                                             \n",

			"cubeDiffuseMap_fragment":
			"uniform samplerCube diffuseTex ;                             \n" +
			"void main(void){                                             \n" +
			"diffuse = vec4(textureCube( diffuseTex , varying_pos.xyz )); \n" +
			"if( materialSource.cutAlpha > diffuse.w ){                   \n" +
			"discard ;                                                    \n" +
			"}                                                            \n" +
			"}                                                            \n",

			"default_vertex":
			"attribute highp vec3 attribute_position ;                                                \n" +
			"attribute vec3 attribute_normal ;                                                        \n" +
			"attribute vec3 attribute_tangent ;                                                       \n" +
			"attribute vec4 attribute_color ;                                                         \n" +
			"attribute vec2 attribute_uv0 ;                                                           \n" +
			"attribute vec2 attribute_uv1 ;                                                           \n" +
			"uniform mat4 uniform_ModelMatrix ;                                                       \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                                                  \n" +
			"uniform mat4 uniform_normalMatrix ;                                                      \n" +
			"uniform vec3 uniform_eyepos ;                                                            \n" +
			"varying vec4 varying_pos        ;                                                        \n" +
			"varying vec4 varying_globalpos  ;                                                        \n" +
			"varying highp vec2 varying_uv0  ;                                                        \n" +
			"varying vec2 varying_uv1        ;                                                        \n" +
			"varying vec3 varying_eyeNormal  ;                                                        \n" +
			"varying vec4 varying_color  ;                                                            \n" +
			"varying vec3 varying_eyedir  ;                                                           \n" +
			"varying vec3 varying_tangent ;                                                           \n" +
			"void main(void){                                                                         \n" +
			"highp vec4 temp_p ;                                                                      \n" +
			"varying_globalpos =  vec4(attribute_position,1.0) ;                                      \n" +
			"temp_p =  uniform_ModelMatrix * varying_globalpos ;                                      \n" +
			"varying_eyedir = uniform_eyepos ;                                                        \n" +
			"varying_pos =  temp_p ;                                                                  \n" +
			"temp_p = uniform_ProjectionMatrix * temp_p ;                                             \n" +
			"varying_eyeNormal =  (uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ;            \n" +
			"varying_uv0 = attribute_uv0;                                                             \n" +
			"varying_uv1 = attribute_uv1;                                                             \n" +
			"varying_color = attribute_color ;                                                        \n" +
			"varying_tangent = normalize((uniform_ModelMatrix * vec4( attribute_tangent,0.0 )).xyz) ; \n" +
			"}                                                                                        \n",

			"depthMethod_fragment":
			"varying vec4 varying_pos        ;                            \n" +
			"void main() {                                                \n" +
			"gl_FragColor =  vec4( varying_pos.xyz/varying_pos.w , 1.0 ); \n" +
			"}                                                            \n",

			"diffuseMap_fragment":
			"uniform sampler2D diffuseTex ;                   \n" +
			"void main(void){                                 \n" +
			"diffuse = texture2D( diffuseTex , varying_uv0 ); \n" +
			"if( materialSource.cutAlpha > diffuse.w ){       \n" +
			"discard ;                                        \n" +
			"}                                                \n" +
			"}                                                \n",

			"diffuseMethod_fragment":
			"mat3 TBN ;                                                 \n" +
			"struct MaterialSource{                                     \n" +
			"vec3 diffuse;                                              \n" +
			"vec3 ambient;                                              \n" +
			"vec3 specular;                                             \n" +
			"float alpha;                                               \n" +
			"float cutAlpha;                                            \n" +
			"float shininess;                                           \n" +
			"float diffusePower;                                        \n" +
			"float specularPower;                                       \n" +
			"float ambientPower;                                        \n" +
			"float normalPower;                                         \n" +
			"};                                                         \n" +
			"varying vec4 varying_pos        ;                          \n" +
			"varying highp vec2 varying_uv0  ;                          \n" +
			"varying vec2 varying_uv1        ;                          \n" +
			"varying vec3 varying_eyeNormal  ;                          \n" +
			"varying vec4 varying_color		;                              \n" +
			"varying vec3 varying_eyedir		;                             \n" +
			"varying vec3 varying_tangent	;                             \n" +
			"uniform float uniform_materialSource[16];                  \n" +
			"vec4 shadow  ;                                             \n" +
			"vec4 diffuse  ;                                            \n" +
			"vec3 light    ;                                            \n" +
			"vec4 specular ;                                            \n" +
			"vec3 normal  ;                                             \n" +
			"vec3 eyedir  ;                                             \n" +
			"vec4 ttt  ;                                                \n" +
			"void main() {                                              \n" +
			"shadow = vec4(1.0,1.0,1.0,1.0);                            \n" +
			"ttt = vec4(1.0,1.0,1.0,0.0);                               \n" +
			"diffuse = vec4(1.0,1.0,1.0,1.0);                           \n" +
			"light   = vec3(0.0,0.0,0.0);                               \n" +
			"normal = varying_eyeNormal ;                               \n" +
			"MaterialSource materialSource;                             \n" +
			"materialSource.diffuse.x = uniform_materialSource[0];      \n" +
			"materialSource.diffuse.y = uniform_materialSource[1];      \n" +
			"materialSource.diffuse.z = uniform_materialSource[2];      \n" +
			"materialSource.ambient.x = uniform_materialSource[3];      \n" +
			"materialSource.ambient.y = uniform_materialSource[4];      \n" +
			"materialSource.ambient.z = uniform_materialSource[5];      \n" +
			"materialSource.specular.x = uniform_materialSource[6];     \n" +
			"materialSource.specular.y = uniform_materialSource[7];     \n" +
			"materialSource.specular.z = uniform_materialSource[8];     \n" +
			"materialSource.alpha = uniform_materialSource[9];          \n" +
			"materialSource.cutAlpha = uniform_materialSource[10];      \n" +
			"materialSource.shininess = uniform_materialSource[11];     \n" +
			"materialSource.diffusePower = uniform_materialSource[12];  \n" +
			"materialSource.specularPower = uniform_materialSource[13]; \n" +
			"materialSource.ambientPower = uniform_materialSource[14];  \n" +
			"materialSource.normalPower = uniform_materialSource[15];   \n" +
			"specular = vec4(materialSource.specular,0.0);              \n" +
			"TBN[0] = varying_tangent ;                                 \n" +
			"TBN[2] = normalize( normal.xyz ) ;                         \n" +
			"TBN[1] = normalize( cross(TBN[0],TBN[2]) );                \n" +
			"eyedir = varying_eyedir.xyz - varying_pos.xyz ;            \n" +
			"}                                                          \n",

			"diffuse_fragment":
			"varying vec4 varying_pos        ;                         \n" +
			"varying vec2 varying_uv0        ;                         \n" +
			"varying vec3 varying_eyeNormal  ;                         \n" +
			"varying vec4 varying_color  ;                             \n" +
			"varying vec3 varying_eyedir  ;                            \n" +
			"varying mat3 TBN ;                                        \n" +
			"uniform vec4 uniform_materialSource[4] ;                  \n" +
			"vec4 ambientColor  ;                                      \n" +
			"vec4 diffuseColor  ;                                      \n" +
			"vec4 specularColor ;                                      \n" +
			"vec4 lightColor  ;                                        \n" +
			"vec3 normalTexC ;                                         \n" +
			"uniform sampler2D diffuseTexture ;                        \n" +
			"void main(void){                                          \n" +
			"ambientColor= vec4( 1.0,1.1,0.1,1.0);                     \n" +
			"lightColor = vec4( 1.0,1.0,1.0,1.0);                      \n" +
			"specularColor = vec4( 1.0,1.0,1.0,1.0);                   \n" +
			"normalTexC = vec3( 1.0,1.0,1.0);                          \n" +
			"vec3 normal = normalize(varying_eyeNormal);               \n" +
			"diffuseColor = texture2D( diffuseTexture , varying_uv0 ); \n" +
			"gl_FragColor = diffuseColor * lightColor ;                \n" +
			"}                                                         \n",

			"diffuse_fragmentEnd":
			"void main() {                                                                                        \n" +
			"ttt.xyz = materialSource.ambient.xyz * materialSource.ambientPower;                                  \n" +
			"light.xyz = light.xyz + ttt.xyz;                                                                     \n" +
			"specular.xyz = specular.w * (specular.xyz * materialSource.specular * materialSource.specularPower); \n" +
			"diffuse.w = varying_color.w * materialSource.alpha * diffuse.w ;                                     \n" +
			"diffuse.xyz = diffuse.xyz * materialSource.diffusePower ;                                            \n" +
			"diffuse.xyz = ( (light.xyz+specular.xyz) * shadow.xyz + ttt.xyz ) * diffuse.xyz  ;                   \n" +
			"diffuse.xyz = diffuse.xyz / diffuse.w;                                                               \n" +
			"diffuse.xyz *= varying_color.xyz ;                                                                   \n" +
			"}                                                                                                    \n",

			"directLight":
			"uniform vec4 uniform_directLightSource[7] ;            \n" +
			"const int max_directLight = 4 ;                        \n" +
			"struct DirectLight{                                    \n" +
			"vec3 dir;                                              \n" +
			"vec3 diffuseColor;                                     \n" +
			"float intensity;                                       \n" +
			"};                                                     \n" +
			"void main() {                                          \n" +
			"for( int i = 0 ; i < max_directLight ; i++ ) {         \n" +
			"DirectLight l;                                         \n" +
			"l.dir = uniform_directLightSource[i*2].xyz;            \n" +
			"l.diffuseColor = uniform_directLightSource[i*2+1].xyz; \n" +
			"l.intensity = uniform_directLightSource[i*2+1].w;      \n" +
			"vec3 N = normalize(varying_normal);                    \n" +
			"vec3 L = l.dir ;                                       \n" +
			"float lambertTerm = max(0.0,dot(N,L)) ;                \n" +
			"lightColor.xyz += lambertTerm * l.intensity ;          \n" +
			"}                                                      \n" +
			"}                                                      \n",

			"directLight_fragment":
			"const int max_directLight = 1 ;                                                                                            \n" +
			"uniform float uniform_directLightSource[11*max_directLight] ;                                                              \n" +
			"struct DirectLight{                                                                                                        \n" +
			"vec3 direction;                                                                                                            \n" +
			"vec3 diffuse;                                                                                                              \n" +
			"vec3 halfColor;                                                                                                            \n" +
			"float intensity;                                                                                                           \n" +
			"float halfIntensity;                                                                                                       \n" +
			"};                                                                                                                         \n" +
			"void calculateDirectLight( MaterialSource materialSource ){                                                                \n" +
			"float specularfract ;                                                                                                      \n" +
			"vec3 halfV,ldir;                                                                                                           \n" +
			"for(int i = 0 ; i < max_directLight ; i++){                                                                                \n" +
			"DirectLight l ;                                                                                                            \n" +
			"l.direction = vec3(uniform_directLightSource[i*10+0],uniform_directLightSource[i*10+1],uniform_directLightSource[i*10+2]); \n" +
			"l.diffuse = vec3(uniform_directLightSource[i*10+3],uniform_directLightSource[i*10+4],uniform_directLightSource[i*10+5]);   \n" +
			"l.halfColor = vec3(uniform_directLightSource[i*10+6],uniform_directLightSource[i*10+7],uniform_directLightSource[i*10+8]); \n" +
			"l.intensity = uniform_directLightSource[i*7+9];                                                                            \n" +
			"l.halfIntensity = uniform_directLightSource[i*7+10];                                                                       \n" +
			"vec3 N = normalize(normal) ;                                                                                               \n" +
			"ldir = normalize(l.direction) ;                                                                                            \n" +
			"float lambertTerm = min(1.0,max(0.0,dot(N,ldir))) ;                                                                        \n" +
			"light.xyz += l.diffuse * lambertTerm  * l.intensity ;                                                                      \n" +
			"float halfLambertTerm = min(1.0,dot(N,-ldir));                                                                             \n" +
			"light.xyz += ( halfLambertTerm * l.halfColor * 0.25 + l.halfColor * 0.25 ) * l.halfIntensity;                              \n" +
			"if(lambertTerm>0.0){                                                                                                       \n" +
			"halfV = normalize(ldir + normalize(eyedir));                                                                               \n" +
			"specularfract = max( dot(halfV, N ) , 0.0 );                                                                               \n" +
			"specularfract = pow(specularfract, materialSource.shininess );                                                             \n" +
			"specular.w += specularfract ;                                                                                              \n" +
			"}                                                                                                                          \n" +
			"};                                                                                                                         \n" +
			"}                                                                                                                          \n" +
			"void main() {                                                                                                              \n" +
			"calculateDirectLight( materialSource );                                                                                    \n" +
			"}                                                                                                                          \n",

			"distanceFog_fragment":
			"struct Fog{                                                                          \n" +
			"vec3 fogColor  ;                                                                     \n" +
			"float globalDensity ;                                                                \n" +
			"vec2 startDistance ;                                                                 \n" +
			"vec2 height ;                                                                        \n" +
			"};                                                                                   \n" +
			"uniform float uniform_globalFog[8];                                                  \n" +
			"void main(void){                                                                     \n" +
			"Fog fog;                                                                             \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3];                                            \n" +
			"fog.startDistance = vec2(uniform_globalFog[4], uniform_globalFog[5]);                \n" +
			"fog.height = vec2(uniform_globalFog[6], uniform_globalFog[7]) ;                      \n" +
			"float d = distance(varying_eyedir.xyz,varying_pos.xyz);                              \n" +
			"float distFog = max( 0.0 , d - fog.startDistance.x )* fog.startDistance.y;           \n" +
			"float fogFactor = (1.0-exp(-fog.globalDensity * distFog )) ;                         \n" +
			"diffuse.xyz = mix( diffuse.xyz  , fog.fogColor , min(fogFactor,1.0) );               \n" +
			"}                                                                                    \n" +
			"                                                                                     \n",

			"EnvironmentMapping_fragment":
			"uniform samplerCube environmentMapTex ;                             \n" +
			"uniform float reflectValue;                                         \n" +
			"void main(){                                                        \n" +
			"vec3 r = reflect(-normalize(eyedir),  normal  );                    \n" +
			"vec4 reflectiveColor = textureCube(environmentMapTex,r.xyz);        \n" +
			"diffuse.xyz = mix( diffuse.xyz,reflectiveColor.xyz, reflectValue ); \n" +
			"}                                                                   \n" +
			"                                                                    \n",

			"FresnelReflectionChromaticAberration_fragment":
			"uniform samplerCube environmentMapTex ;                                                               \n" +
			"uniform float reflectValue;                                                                           \n" +
			"const float g_fEta = 0.66;                                                                            \n" +
			"const float g_fEtaR = 0.65;                                                                           \n" +
			"const float g_fEtaG = 0.67;                                                                           \n" +
			"const float g_fEtaB = 0.69;                                                                           \n" +
			"const float g_fFresnelPower = 0.8;                                                                    \n" +
			"void main(){                                                                                          \n" +
			"float f = ((1.0-g_fEta) * (1.0-g_fEta)) / ((1.0+g_fEta) * (1.0+g_fEta));                              \n" +
			"float g_fFresnelRatio = f + (1.0 - f) * pow((1.0 - dot(-normalize(eyedir), normal)),g_fFresnelPower); \n" +
			"vec3 NV = normalize(eyedir) ;                                                                         \n" +
			"vec3 N =normalize(normal);                                                                            \n" +
			"vec3  g_vec3Reflect = reflect(NV, N);                                                                 \n" +
			"g_vec3Reflect.y = -g_vec3Reflect.y;                                                                   \n" +
			"vec3 g_vec3Refract_R = refract(NV, N, g_fEtaR);                                                       \n" +
			"g_vec3Refract_R.y = -g_vec3Refract_R.y;                                                               \n" +
			"vec3 g_vec3Refract_G = refract(NV, N, g_fEtaG);                                                       \n" +
			"g_vec3Refract_G.y = -g_vec3Refract_G.y;                                                               \n" +
			"vec3  g_vec3Refract_B = refract(NV, N, g_fEtaB);                                                      \n" +
			"g_vec3Refract_B.y = -g_vec3Refract_B.y;                                                               \n" +
			"vec3 vec3ReflectColor = vec3(textureCube(environmentMapTex, g_vec3Reflect));                          \n" +
			"vec3 vec3RefractColor = vec3(0.0);                                                                    \n" +
			"vec3RefractColor.r = vec3(textureCube(environmentMapTex, g_vec3Refract_R)).r;                         \n" +
			"vec3RefractColor.g = vec3(textureCube(environmentMapTex, g_vec3Refract_G)).g;                         \n" +
			"vec3RefractColor.b = vec3(textureCube(environmentMapTex, g_vec3Refract_B)).b;                         \n" +
			"vec3 vec3FinalColor = mix(vec3RefractColor, vec3ReflectColor, g_fFresnelRatio);                       \n" +
			"vec3 r = reflect(-normalize(eyedir),  normal  );                                                      \n" +
			"vec4 reflectiveColor = textureCube(environmentMapTex,r.xyz)  ;                                        \n" +
			"diffuse.xyz = diffuse.xyz + vec3FinalColor ;                                                          \n" +
			"}                                                                                                     \n",

			"FresnelReflection_fragment":
			"uniform samplerCube environmentMapTex ;                                                               \n" +
			"uniform float reflectValue;                                                                           \n" +
			"const float g_fEta = 0.66;                                                                            \n" +
			"const float g_fEtaR = 0.65;                                                                           \n" +
			"const float g_fEtaG = 0.67;                                                                           \n" +
			"const float g_fEtaB = 0.69;                                                                           \n" +
			"const float g_fFresnelPower = 0.8;                                                                    \n" +
			"void main(){                                                                                          \n" +
			"float f = ((1.0-g_fEta) * (1.0-g_fEta)) / ((1.0+g_fEta) * (1.0+g_fEta));                              \n" +
			"float g_fFresnelRatio = f + (1.0 - f) * pow((1.0 - dot(-normalize(eyedir), normal)),g_fFresnelPower); \n" +
			"vec3 NV = -normalize(eyedir) ;                                                                        \n" +
			"vec3 N =normalize(normal);                                                                            \n" +
			"vec3  g_vec3Reflect = reflect(NV, N);                                                                 \n" +
			"g_vec3Reflect.y = g_vec3Reflect.y;                                                                    \n" +
			"vec3 g_vec3Refract = refract(NV, N, g_fEta);                                                          \n" +
			"g_vec3Refract.y = g_vec3Refract.y;                                                                    \n" +
			"vec3 vec3ReflectColor = vec3(textureCube(environmentMapTex, g_vec3Reflect));                          \n" +
			"vec3 vec3RefractColor = vec3(textureCube(environmentMapTex, g_vec3Refract));                          \n" +
			"vec3 vec3FinalColor = mix(vec3RefractColor, vec3ReflectColor, g_fFresnelRatio);                       \n" +
			"diffuse.xyz = diffuse.xyz + vec3FinalColor ;                                                          \n" +
			"}                                                                                                     \n",

			"GaussianBlurHorizontal":
			"varying vec2 uv ;                                                                              \n" +
			"uniform sampler2D texture2D_1 ;                                                                \n" +
			"uniform float uniform_sceneWidth ;                                                             \n" +
			"const int blurSize = 30 ;                                                                      \n" +
			"const float bias = 0.1 ;                                                                       \n" +
			"void main(void){                                                                               \n" +
			"float weightOffset = bias ;                                                                    \n" +
			"float blurOffset = 1.0/uniform_sceneWidth ;                                                    \n" +
			"vec3 tc = vec3(0.0, 0.0, 0.0);                                                                 \n" +
			"vec2 texCoord = uv ;                                                                           \n" +
			"tc = texture2D(texture2D_1, texCoord).xyz * weightOffset ;                                     \n" +
			"for (int i=0; i<blurSize; i++)                                                                 \n" +
			"{                                                                                              \n" +
			"weightOffset = bias - bias * float(i)/float(blurSize) ;                                        \n" +
			"tc += texture2D(texture2D_1, uv.xy + vec2( 0.0, float(i) * blurOffset ) ).xyz * weightOffset ; \n" +
			"tc += texture2D(texture2D_1, uv.xy - vec2( 0.0, float(i) * blurOffset ) ).xyz * weightOffset ; \n" +
			"}                                                                                              \n" +
			"gl_FragColor = vec4(tc, 1.0 );                                                                 \n" +
			"}                                                                                              \n",

			"GaussianBlurVertical":
			"varying vec2 uv ;                                                                               \n" +
			"uniform sampler2D texture2D_1 ;                                                                 \n" +
			"uniform float uniform_sceneHeight ;                                                             \n" +
			"const int blurSize = 30 ;                                                                       \n" +
			"const float bias = 0.1 ;                                                                        \n" +
			"void main(void){                                                                                \n" +
			"float weightOffset = bias ;                                                                     \n" +
			"float blurOffset = 1.0 / uniform_sceneHeight ;                                                  \n" +
			"vec3 tc = vec3(0.0, 0.0, 0.0);                                                                  \n" +
			"vec2 texCoord = uv ;                                                                            \n" +
			"tc = texture2D(texture2D_1, texCoord).xyz * weightOffset ;                                      \n" +
			"for (int i=0; i<blurSize; i++)                                                                  \n" +
			"{                                                                                               \n" +
			"weightOffset = bias - bias * float(i)/float(blurSize) ;                                         \n" +
			"tc += texture2D(texture2D_1, uv.xy + vec2( float(i) * blurOffset , 0.0 ) ).xyz * weightOffset ; \n" +
			"tc += texture2D(texture2D_1, uv.xy - vec2( float(i) * blurOffset , 0.0 ) ).xyz * weightOffset ; \n" +
			"}                                                                                               \n" +
			"gl_FragColor = vec4(tc, 1.0 );                                                                  \n" +
			"}                                                                                               \n",

			"globalFogMethod_fragment":
			"",

			"LightDiffuse_fragment":
			"struct MaterialSource{                                                                                                                                                                              \n" +
			"vec4 ambient;                                                                                                                                                                                       \n" +
			"vec4 diffuse;                                                                                                                                                                                       \n" +
			"vec4 specular;                                                                                                                                                                                      \n" +
			"vec3 emission;                                                                                                                                                                                      \n" +
			"float shininess;                                                                                                                                                                                    \n" +
			"};                                                                                                                                                                                                  \n" +
			"struct LightSource{                                                                                                                                                                                 \n" +
			"int lightType;                                                                                                                                                                                      \n" +
			"vec3 position;                                                                                                                                                                                      \n" +
			"float spotExponent;                                                                                                                                                                                 \n" +
			"vec3 spotDirection;                                                                                                                                                                                 \n" +
			"float spotCutoff;                                                                                                                                                                                   \n" +
			"vec3 halfVector;                                                                                                                                                                                    \n" +
			"float spotCosCutoff;                                                                                                                                                                                \n" +
			"vec3 ambient;                                                                                                                                                                                       \n" +
			"float constantAttenuation;                                                                                                                                                                          \n" +
			"vec3 diffuse;                                                                                                                                                                                       \n" +
			"float linearAttenuation;                                                                                                                                                                            \n" +
			"vec3 specular;                                                                                                                                                                                      \n" +
			"float quadraticAttenuation;                                                                                                                                                                         \n" +
			"};                                                                                                                                                                                                  \n" +
			"const int maxLight = 1 ;                                                                                                                                                                            \n" +
			"uniform float uniform_LightSource[25];                                                                                                                                                              \n" +
			"void main() {                                                                                                                                                                                       \n" +
			"lightColor = vec4( 0.0,0.0,0.0,1.0);                                                                                                                                                                \n" +
			"vec3 lightDir ,halfV;                                                                                                                                                                               \n" +
			"vec4 diffuse ;                                                                                                                                                                                      \n" +
			"float NdotL , specularfract ;                                                                                                                                                                       \n" +
			"MaterialSource frontMaterial = MaterialSource( uniform_materialSource[0] , uniform_materialSource[1] , uniform_materialSource[2] , uniform_materialSource[3].xyz , uniform_materialSource[3].w  ) ; \n" +
			"for(int i = 0 ; i < maxLight ; i++){                                                                                                                                                                \n" +
			"LightSource light;                                                                                                                                                                                  \n" +
			"light.lightType = int(uniform_LightSource[i*25]);                                                                                                                                                   \n" +
			"light.position = vec3(uniform_LightSource[i*25+1],uniform_LightSource[i*25+2],uniform_LightSource[i*25+3]);                                                                                         \n" +
			"light.spotExponent = uniform_LightSource[i*25+4];                                                                                                                                                   \n" +
			"light.spotDirection = vec3( uniform_LightSource[i*25+5],uniform_LightSource[i*25+6],uniform_LightSource[i*25+7]);                                                                                   \n" +
			"light.spotCutoff = uniform_LightSource[i*25+8];                                                                                                                                                     \n" +
			"light.halfVector = vec3( uniform_LightSource[i*25+9],uniform_LightSource[i*25+10],uniform_LightSource[i*25+11]);                                                                                    \n" +
			"light.spotCosCutoff = uniform_LightSource[i*25+12];                                                                                                                                                 \n" +
			"light.ambient = vec3( uniform_LightSource[i*25+13],uniform_LightSource[i*25+14],uniform_LightSource[i*25+15]);                                                                                      \n" +
			"light.constantAttenuation = uniform_LightSource[i*25+16];                                                                                                                                           \n" +
			"light.diffuse = vec3( uniform_LightSource[i*25+17],uniform_LightSource[i*25+18],uniform_LightSource[i*25+19]);                                                                                      \n" +
			"light.linearAttenuation = uniform_LightSource[i*25+20];                                                                                                                                             \n" +
			"light.specular = vec3( uniform_LightSource[i*25+21],uniform_LightSource[i*25+22],uniform_LightSource[i*25+23]);                                                                                     \n" +
			"light.quadraticAttenuation = uniform_LightSource[i*25+24];                                                                                                                                          \n" +
			"ambientColor *= vec4( frontMaterial.ambient.xyz * light.ambient , frontMaterial.ambient.w );                                                                                                        \n" +
			"diffuse = vec4( frontMaterial.diffuse.xyz * light.diffuse , frontMaterial.diffuse.w );                                                                                                              \n" +
			"if( light.lightType == 0 ){                                                                                                                                                                         \n" +
			"lightDir = normalize( light.spotDirection );                                                                                                                                                        \n" +
			"halfV = normalize(lightDir + varying_eyedir);                                                                                                                                                       \n" +
			"lightDir = normalize( lightDir * TBN );                                                                                                                                                             \n" +
			"NdotL = max(dot(lightDir,normal.xyz),0.0);                                                                                                                                                          \n" +
			"lightColor.xyz = NdotL * diffuse.xyz ;                                                                                                                                                              \n" +
			"specularfract = max( dot(halfV,normal) , 0.0 );                                                                                                                                                     \n" +
			"specularfract = pow(specularfract, frontMaterial.shininess );                                                                                                                                       \n" +
			"specularColor.xyz = light.specular.xyz * frontMaterial.specular.xyz * specularfract  ;                                                                                                              \n" +
			"}                                                                                                                                                                                                   \n" +
			"}                                                                                                                                                                                                   \n" +
			"}                                                                                                                                                                                                   \n" +
			"//                  }                                                                                                                                                                               \n",

			"lightMap_fragment":
			"uniform sampler2D lightMapTex ;                                   \n" +
			"void main(void){                                                  \n" +
			"diffuse.xyz *= texture2D( lightMapTex , varying_uv1 ).xyz * 2.0 ; \n" +
			"}                                                                 \n",

			"normalMap_fragment":
			"uniform sampler2D normalTex;                                                                                                   \n" +
			"void main(void){                                                                                                               \n" +
			"normal = normalize( TBN * ( normalize(  (2.0 * ( texture2D( normalTex , varying_uv0 ).xyz - vec3( 0.5 , 0.5 , 0.5 ) )) ) ) ) ; \n" +
			"}                                                                                                                              \n",

			"normalMethod_fragment":
			"mat3 TBN ;                                                                  \n" +
			"varying vec4 varying_pos        ;                                           \n" +
			"varying vec2 varying_uv0        ;                                           \n" +
			"varying vec3 varying_eyeNormal  ;                                           \n" +
			"varying vec3 varying_tangent	;                                              \n" +
			"vec4 test  ;                                                                \n" +
			"vec4 diffuse  ;                                                             \n" +
			"vec3 light    ;                                                             \n" +
			"vec3 specular ;                                                             \n" +
			"vec3 normal  ;                                                              \n" +
			"void main() {                                                               \n" +
			"TBN[0] = varying_tangent ;                                                  \n" +
			"TBN[2] = normalize( varying_eyeNormal.xyz ) ;                               \n" +
			"TBN[1] = normalize( cross(TBN[0],TBN[2]) );                                 \n" +
			"normal = 0.5 * normalize(varying_eyeNormal.xyz) + vec3( 0.5 , 0.5 , 0.5 ) ; \n" +
			"diffuse =  vec4( varying_pos.xyz , 1.0 );                                   \n" +
			"}                                                                           \n",

			"PaintFresnelReflection_fragment":
			"uniform samplerCube environmentMapTex ;                                                               \n" +
			"uniform sampler2D maskTex ;                                                                           \n" +
			"uniform float reflectValue;                                                                           \n" +
			"uniform float rimPower;                                                                               \n" +
			"uniform float envLightPower;                                                                          \n" +
			"uniform vec3 maskColor;                                                                               \n" +
			"const float g_fEta = 0.66;                                                                            \n" +
			"const float g_fEtaR = 0.65;                                                                           \n" +
			"const float g_fEtaG = 0.67;                                                                           \n" +
			"const float g_fEtaB = 0.69;                                                                           \n" +
			"const float g_fFresnelPower = 0.8;                                                                    \n" +
			"void main(){                                                                                          \n" +
			"float f = ((1.0-g_fEta) * (1.0-g_fEta)) / ((1.0+g_fEta) * (1.0+g_fEta));                              \n" +
			"float g_fFresnelRatio = f + (1.0 - f) * pow((1.0 - dot(-normalize(eyedir), normal)),g_fFresnelPower); \n" +
			"vec3 NV = -normalize(eyedir) ;                                                                        \n" +
			"vec3 N =normalize(normal);                                                                            \n" +
			"vec3  g_vec3Reflect = reflect(NV, N);                                                                 \n" +
			"g_vec3Reflect.y = g_vec3Reflect.y;                                                                    \n" +
			"vec3 g_vec3Refract = refract(NV, N, g_fEta);                                                          \n" +
			"g_vec3Refract.y = g_vec3Refract.y;                                                                    \n" +
			"vec3 vec3ReflectColor = vec3(textureCube(environmentMapTex, g_vec3Reflect));                          \n" +
			"vec3 vec3RefractColor = vec3(textureCube(environmentMapTex, g_vec3Refract));                          \n" +
			"vec3 vec3FinalColor = mix(vec3RefractColor, vec3ReflectColor, g_fFresnelRatio);                       \n" +
			"f = texture2D( maskTex , varying_uv1 * 100.0 ).x ;                                                    \n" +
			"float ff = f ;                                                                                        \n" +
			"vec3ReflectColor = ff * maskColor;                                                                    \n" +
			"float fb = f * g_fFresnelRatio ;                                                                      \n" +
			"float rim = 1.0 - clamp(dot (-NV,N),0.0,1.0) ;                                                        \n" +
			"rim = pow (rim, rimPower ) ;                                                                          \n" +
			"vec3RefractColor = (1.0-rim ) * fb * maskColor;                                                       \n" +
			"diffuse.xyz = diffuse.xyz + vec3RefractColor + vec3FinalColor * envLightPower ;                       \n" +
			"}                                                                                                     \n",

			"particle_acceleration":
			"attribute vec3 attribute_acceleration ;                                  \n" +
			"void main(void){                                                         \n" +
			"localPos.xyz += realTime * realTime * attribute_acceleration.xyz * 0.5 ; \n" +
			"}                                                                        \n",

			"particle_acceleRotate":
			"attribute vec3 attribute_acceleRotate ;                                  \n" +
			"void main(void){                                                         \n" +
			"localRot.xyz += realTime * realTime * attribute_acceleRotate.xyz * 0.5 ; \n" +
			"}                                                                        \n",

			"particle_acceleScale":
			"attribute vec3 attribute_acceleScale ;                                                      \n" +
			"void main(void){                                                                            \n" +
			"localPos.xyz *= (realTime / 1000.0 * realTime / 1000.0) * attribute_acceleScale.xyz * 0.5 ; \n" +
			"}                                                                                           \n",

			"particle_billboard":
			"attribute float attribute_billboardXYZ ;                              \n" +
			"uniform mat4 uniform_cameraMatrix ;                                   \n" +
			"uniform vec3 uniform_cameraRotate ;                                   \n" +
			"void main(void){                                                      \n" +
			"mat4 billboardMatrix;                                                 \n" +
			"if ( attribute_billboardXYZ == 111.0 ){                               \n" +
			"billboardMatrix = mat4(                                               \n" +
			"uniform_cameraMatrix[0],                                              \n" +
			"uniform_cameraMatrix[1],                                              \n" +
			"uniform_cameraMatrix[2],                                              \n" +
			"vec4(0.0, 0.0,1.0, 1.0));                                             \n" +
			"}                                                                     \n" +
			"else {                                                                \n" +
			"billboardMatrix = mat4(                                               \n" +
			"vec4(1.0, 0.0, 0.0, 0.0),                                             \n" +
			"vec4(0.0, 1.0, 0.0, 0.0),                                             \n" +
			"vec4(0.0, 0.0, 1.0, 0.0),                                             \n" +
			"vec4(0.0, 0.0, 0.0, 1.0));                                            \n" +
			"if ( mod(attribute_billboardXYZ, 10.0) == 1.0 ){                      \n" +
			"billboardMatrix *= mat4(                                              \n" +
			"vec4(1.0, 0.0, 0.0, 0.0),                                             \n" +
			"vec4(0.0, uniform_cameraMatrix[1].y, uniform_cameraMatrix[1].z, 0.0), \n" +
			"vec4(0.0, uniform_cameraMatrix[2].y, uniform_cameraMatrix[2].z, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)                                              \n" +
			");                                                                    \n" +
			"}                                                                     \n" +
			"if ( mod(attribute_billboardXYZ / 10.0, 10.0) == 1.0 ){               \n" +
			"billboardMatrix *= mat4(                                              \n" +
			"vec4(uniform_cameraMatrix[0].x, 0.0, uniform_cameraMatrix[0].z, 0.0), \n" +
			"vec4(0.0, 1.0, 0.0, 0.0),                                             \n" +
			"vec4(uniform_cameraMatrix[2].x, 0.0, uniform_cameraMatrix[2].z, 0.0), \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)                                              \n" +
			");                                                                    \n" +
			"}                                                                     \n" +
			"if ( mod(attribute_billboardXYZ / 100.0, 10.0) == 1.0 ){              \n" +
			"billboardMatrix *= mat4(                                              \n" +
			"vec4(uniform_cameraMatrix[0].x, uniform_cameraMatrix[0].y, 0.0, 0.0), \n" +
			"vec4(uniform_cameraMatrix[1].x, uniform_cameraMatrix[1].y, 0.0, 0.0), \n" +
			"vec4(0.0, 0.0, 1.0, 0.0),                                             \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)                                              \n" +
			");                                                                    \n" +
			"}                                                                     \n" +
			"}                                                                     \n" +
			"}                                                                     \n",

			"particle_color":
			"attribute vec4 attribute_startColor ; \n" +
			"attribute vec4 attribute_endColor ;   \n" +
			"void main(void){                      \n" +
			"}                                     \n",

			"particle_lifeRotate":
			"attribute vec3 attribute_lifeRotate ;                \n" +
			"void main(void){                                     \n" +
			"localRot.xyz += realTime * attribute_lifeRotate.xyz; \n" +
			"}                                                    \n",

			"particle_offset":
			"",

			"particle_position":
			"",

			"particle_scale":
			"attribute vec3 attribute_scale ;                                                          \n" +
			"void main(void){                                                                          \n" +
			"localScal.xyz += (attribute_scale.y - attribute_scale.x) * ratioTime + attribute_scale.x; \n" +
			"}                                                                                         \n",

			"particle_speed":
			"attribute vec3 attribute_speed ;                 \n" +
			"void main(void){                                 \n" +
			"localPos.xyz += realTime * attribute_speed.xyz ; \n" +
			"}                                                \n",

			"particle_time":
			"attribute vec4 attribute_time ;                                                \n" +
			"void main(void){                                                               \n" +
			"float startTime = attribute_time.x + attribute_time.y * attribute_position.w ; \n" +
			"realTime = startTime + attribute_time.z ;                                      \n" +
			"if ( mod(attribute_time.w, 10.0) == 1.0 ){                                     \n" +
			"realTime = mod( uniform_time , realTime );                                     \n" +
			"ratioTime = realTime / attribute_time.z;                                       \n" +
			"}                                                                              \n" +
			"else{                                                                          \n" +
			"realTime = uniform_time;                                                       \n" +
			"if( realTime > attribute_time.z ){                                             \n" +
			"ratioTime = 0.0 ;                                                              \n" +
			"localScal.xyz = localScal.xyz * ratioTime ;                                    \n" +
			"}else{                                                                         \n" +
			"ratioTime = realTime / attribute_time.z;                                       \n" +
			"}                                                                              \n" +
			"}                                                                              \n" +
			"realTime = realTime - startTime ;                                              \n" +
			"if( realTime < 0.0 ){                                                          \n" +
			"varying_color.w = 0.0 ;                                                        \n" +
			"realTime = 0.0 ;                                                               \n" +
			"localPos = vec3(0.0,0.0,0.0);                                                  \n" +
			"}                                                                              \n" +
			"}                                                                              \n",

			"particle_uv":
			"attribute vec2 attribute_uv0 ; \n" +
			"void main(void){               \n" +
			"}                              \n",

			"particle_vertex":
			"attribute vec4 attribute_position ;     \n" +
			"attribute vec3 attribute_offset ;       \n" +
			"attribute highp vec2 attribute_uv0 ;    \n" +
			"varying vec4 varying_pos        ;       \n" +
			"varying highp vec2 varying_uv0        ; \n" +
			"varying vec2 varying_uv1        ;       \n" +
			"varying vec3 varying_eyeNormal  ;       \n" +
			"varying vec4 varying_color  ;           \n" +
			"varying vec3 varying_eyedir  ;          \n" +
			"varying vec3 varying_tangent	;          \n" +
			"uniform mat4 uniform_ModelMatrix ;      \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"uniform mat4 uniform_normalMatrix ;     \n" +
			"uniform vec3 uniform_eyepos ;           \n" +
			"uniform float uniform_time ;            \n" +
			"uniform mat4 uniform_testMatrix ;       \n" +
			"vec3 localPos  ;                        \n" +
			"vec3 localRot  ;                        \n" +
			"vec3 localScal  ;                       \n" +
			"vec4 color ;                            \n" +
			"highp float realTime ;                  \n" +
			"highp float ratioTime ;                 \n" +
			"const float pi = 3.1415926 ;            \n" +
			"const float t = 16.666 ;                \n" +
			"mat4 buildRotMat4(vec3 rot)             \n" +
			"{                                       \n" +
			"mat4 ret = mat4(                        \n" +
			"vec4(1.0, 0.0, 0.0, 0.0),               \n" +
			"vec4(0.0, 1.0, 0.0, 0.0),               \n" +
			"vec4(0.0, 0.0, 1.0, 0.0),               \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)                \n" +
			");                                      \n" +
			"float s;                                \n" +
			"float c;                                \n" +
			"s = sin(rot.x);                         \n" +
			"c = cos(rot.x);                         \n" +
			"ret *= mat4(                            \n" +
			"vec4(1.0, 0.0, 0.0, 0.0),               \n" +
			"vec4(0.0, c, s, 0.0),                   \n" +
			"vec4(0.0, -s, c, 0.0),                  \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)                \n" +
			");                                      \n" +
			"s = sin(rot.y);                         \n" +
			"c = cos(rot.y);                         \n" +
			"ret *= mat4(                            \n" +
			"vec4(c, 0.0, -s, 0.0),                  \n" +
			"vec4(0.0, 1.0, 0.0, 0.0),               \n" +
			"vec4(s, 0.0, c, 0.0),                   \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)                \n" +
			");                                      \n" +
			"s = sin(rot.z);                         \n" +
			"c = cos(rot.z);                         \n" +
			"ret *= mat4(                            \n" +
			"vec4(c, s, 0.0, 0.0),                   \n" +
			"vec4(-s, c, 0.0, 0.0),                  \n" +
			"vec4(0.0, 0.0, 1.0, 0.0),               \n" +
			"vec4(0.0, 0.0, 0.0, 1.0)                \n" +
			");                                      \n" +
			"return ret;                             \n" +
			"}                                       \n" +
			"void main(void){                        \n" +
			"localScal = vec3(1.0,1.0,1.0) ;         \n" +
			"localPos = vec3(0.0,0.0,0.0) ;          \n" +
			"localRot = vec3(0.0,0.0,0.0) ;          \n" +
			"varying_color = vec4(1.0,1.0,1.0,1.0);  \n" +
			"varying_uv0 = attribute_uv0 ;           \n" +
			"}                                       \n",

			"particle_vertexEnd":
			"void main(void){                                                                                                                                                                                             \n" +
			"vec4 temp_p = uniform_ProjectionMatrix * uniform_ModelMatrix * ( (billboardMatrix * (buildRotMat4(localRot) * vec4(attribute_position.xyz * localScal,1.0))) + vec4(attribute_offset.xyz+localPos.xyz,1.0)); \n" +
			"}                                                                                                                                                                                                            \n",

			"pointLight_fragment":
			"const int max_pointLight = 0 ;                                                                                    \n" +
			"uniform float uniform_pointLightSource[7*max_pointLight] ;                                                        \n" +
			"struct PointLight{                                                                                                \n" +
			"vec3 lightPos ;                                                                                                   \n" +
			"vec3 color ;                                                                                                      \n" +
			"float intensity;                                                                                                  \n" +
			"};                                                                                                                \n" +
			"void calculatePointLight(MaterialSource materialSource){                                                          \n" +
			"vec3 ldir,halfV;                                                                                                  \n" +
			"float NdotL,dist,lambertTerm,specularfract;                                                                       \n" +
			"for(int i = 0 ; i < max_pointLight ; i++){                                                                        \n" +
			"PointLight L;                                                                                                     \n" +
			"L.lightPos = vec3(uniform_pointLightSource[i*7],uniform_pointLightSource[i*7+1],uniform_pointLightSource[i*7+2]); \n" +
			"L.color = vec3(uniform_pointLightSource[i*7+3],uniform_pointLightSource[i*7+4],uniform_pointLightSource[i*7+5]);  \n" +
			"L.intensity = uniform_pointLightSource[i*7+6];                                                                    \n" +
			"ldir = L.lightPos - varying_pos.xyz ;                                                                             \n" +
			"dist = length(ldir);                                                                                              \n" +
			"ldir = normalize(ldir );                                                                                          \n" +
			"NdotL = max(dot(normalize(normal),ldir),0.0);                                                                     \n" +
			"lambertTerm = ( L.intensity  ) / ( dist * dist )  ;                                                               \n" +
			"light.xyz += lambertTerm * (NdotL * L.color.xyz) * 1000.0 ;                                                       \n" +
			"halfV = normalize(ldir - eyedir);                                                                                 \n" +
			"specularfract = max( dot(halfV,normal) , 0.0 );                                                                   \n" +
			"specularfract = pow(specularfract, materialSource.shininess );                                                    \n" +
			"specular.xyz += materialSource.specular.xyz * specularfract * lambertTerm ;                                       \n" +
			"};                                                                                                                \n" +
			"}                                                                                                                 \n" +
			"void main() {                                                                                                     \n" +
			"calculatePointLight(materialSource);                                                                              \n" +
			"}                                                                                                                 \n",

			"postCanvas_fragment":
			"varying vec2 uv ;                             \n" +
			"uniform sampler2D texture2D_1 ;               \n" +
			"void main(void){                              \n" +
			"gl_FragColor = texture2D( texture2D_1 , uv ); \n" +
			"}                                             \n",

			"postCanvas_vertex":
			"attribute vec3 attribute_position ;                                     \n" +
			"attribute vec2 attribute_uv0 ;                                          \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                                 \n" +
			"varying vec2 uv ;                                                       \n" +
			"void main(void){                                                        \n" +
			"uv = attribute_uv0 ;                                                    \n" +
			"gl_Position = uniform_ProjectionMatrix * vec4(attribute_position,1.0) ; \n" +
			"}                                                                       \n",

			"shadowmapping_fragment":
			"varying vec4 shadowPosition ;                                                                              \n" +
			"uniform sampler2D shadowMapTex ;                                                                           \n" +
			"uniform vec4 shadowParameter  ;                                                                            \n" +
			"float unpack(sampler2D ShadowMapS, vec2 texcood)                                                           \n" +
			"{                                                                                                          \n" +
			"vec4 vec = texture2D(ShadowMapS, texcood);                                                                 \n" +
			"vec4 bitShifts = vec4(1.0/(256.0*256.0), 1.0/256.0, 1.0, 1.0/(256.0*256.0*256.0));                         \n" +
			"return dot(vec,bitShifts)  ;                                                                               \n" +
			"}                                                                                                          \n" +
			"void main(void){                                                                                           \n" +
			"vec3 shadowMapPosition = shadowPosition.xyz / shadowPosition.w;                                            \n" +
			"shadowMapPosition = shadowMapPosition.xyz * 0.5 + 0.5 ;                                                    \n" +
			"float depth = unpack(shadowMapTex,shadowMapPosition.xy);                                                   \n" +
			"if(shadowMapPosition.x>=1.0||shadowMapPosition.y>=1.0||shadowMapPosition.x<=0.0||shadowMapPosition.y<=0.0) \n" +
			"depth = 1.0 ;                                                                                              \n" +
			"if( depth < (shadowMapPosition.z - shadowParameter.w ) )                                                   \n" +
			"shadow.xyz = shadowParameter.xyz ;                                                                         \n" +
			"}                                                                                                          \n",

			"ShadowMapping_vertex":
			"uniform mat4 uniform_shadowMatrix ;                                                            \n" +
			"varying vec4 shadowPosition ;                                                                  \n" +
			"void main(void){                                                                               \n" +
			"shadowPosition = uniform_shadowMatrix * (uniform_ModelMatrix * vec4(attribute_position,1.0)) ; \n" +
			"}                                                                                              \n",

			"Shadow_fragment":
			"varying vec4 varying_globalpos ;                                               \n" +
			"varying vec2 varying_uv0        ;                                              \n" +
			"uniform sampler2D diffuseTex ;                                                 \n" +
			"vec4 pack(float fDist)                                                         \n" +
			"{                                                                              \n" +
			"vec4 bitSh = vec4( 256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);                \n" +
			"vec4 bitMsk = vec4( 0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);                     \n" +
			"vec4 comp;                                                                     \n" +
			"comp = fDist * bitSh;                                                          \n" +
			"comp = fract(comp);                                                            \n" +
			"comp -= comp.xxyz * bitMsk;                                                    \n" +
			"return vec4(comp.y, comp.z, comp.w, comp.x);                                   \n" +
			"}                                                                              \n" +
			"void main(void){                                                               \n" +
			"vec4 color = texture2D( diffuseTex , varying_uv0 );                            \n" +
			"if( 0.3 > color.w ){                                                           \n" +
			"discard ;                                                                      \n" +
			"}                                                                              \n" +
			"vec3 glFragCoord  = (varying_globalpos.xyz / varying_globalpos.w) * 0.5 + 0.5; \n" +
			"vec4 diffuse = pack( glFragCoord.z );                                          \n" +
			"}                                                                              \n" +
			"                                                                               \n",

			"Shadow_vertex_sksleton":
			"attribute vec3 attribute_position ;                                                       \n" +
			"attribute vec3 attribute_normal ;                                                         \n" +
			"attribute vec3 attribute_tangent ;                                                        \n" +
			"attribute vec4 attribute_color ;                                                          \n" +
			"attribute vec2 attribute_uv0 ;                                                            \n" +
			"attribute vec2 attribute_uv1 ;                                                            \n" +
			"attribute vec4 attribute_boneIndex ;                                                      \n" +
			"attribute vec4 attribute_boneWeight ;                                                     \n" +
			"const int bonesNumber = 0;                                                                \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber];                                             \n" +
			"uniform mat4 uniform_ModelMatrix ;                                                        \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                                                   \n" +
			"uniform mat4 uniform_normalMatrix ;                                                       \n" +
			"uniform vec3 uniform_eyepos ;                                                             \n" +
			"varying vec4 varying_pos        ;                                                         \n" +
			"varying vec2 varying_uv0        ;                                                         \n" +
			"varying vec3 varying_eyeNormal  ;                                                         \n" +
			"varying vec4 varying_color  ;                                                             \n" +
			"varying vec3 varying_eyedir  ;                                                            \n" +
			"varying vec3 varying_tangent	;                                                            \n" +
			"varying vec4 varying_pp	;                                                                 \n" +
			"mat4 buildMat4(int index){                                                                \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0];                                            \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1];                                     \n" +
			"float xx = quat.x * quat.x;                                                               \n" +
			"float xy = quat.x * quat.y;                                                               \n" +
			"float xz = quat.x * quat.z;                                                               \n" +
			"float xw = quat.x * quat.w;                                                               \n" +
			"float yy = quat.y * quat.y;                                                               \n" +
			"float yz = quat.y * quat.z;                                                               \n" +
			"float yw = quat.y * quat.w;                                                               \n" +
			"float zz = quat.z * quat.z;                                                               \n" +
			"float zw = quat.z * quat.w;                                                               \n" +
			"return mat4(                                                                              \n" +
			"1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0,                            \n" +
			"2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0,                           \n" +
			"2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0,                           \n" +
			"translation.x,				translation.y,			translation.z,			1                                     \n" +
			");                                                                                        \n" +
			"}                                                                                         \n" +
			"void main(void){                                                                          \n" +
			"vec4 temp_p = vec4(0.0, 0.0, 0.0, 0.0) ;                                                  \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ;                                      \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.x)) * temp_position * attribute_boneWeight.x; \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.y)) * temp_position * attribute_boneWeight.y; \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.z)) * temp_position * attribute_boneWeight.z; \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.w)) * temp_position * attribute_boneWeight.w; \n" +
			"temp_p =  uniform_ModelMatrix * temp_p;                                                   \n" +
			"varying_eyedir = normalize( uniform_eyepos - temp_p.xyz ) ;                               \n" +
			"varying_pos =  temp_p ;                                                                   \n" +
			"temp_p = uniform_ProjectionMatrix * temp_p ;                                              \n" +
			"gl_Position = temp_p ;                                                                    \n" +
			"varying_pp = temp_p ;                                                                     \n" +
			"varying_pos.w = -temp_p.z / 128.0 + 0.5 ;                                                 \n" +
			"varying_eyeNormal =  (uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ;             \n" +
			"varying_uv0 = attribute_uv0;                                                              \n" +
			"varying_color = vec4(attribute_tangent,1.0) ;                                             \n" +
			"varying_tangent = normalize((uniform_ModelMatrix * vec4( attribute_tangent,0.0 )).xyz) ;  \n" +
			"}                                                                                         \n",

			"Shadow_vertex_static":
			"void main(void){ \n" +
			"}                \n",

			"skeleton_vertex":
			"attribute vec3 attribute_position ;                                                       \n" +
			"attribute vec3 attribute_normal ;                                                         \n" +
			"attribute vec3 attribute_tangent ;                                                        \n" +
			"attribute vec4 attribute_color ;                                                          \n" +
			"attribute vec2 attribute_uv0 ;                                                            \n" +
			"attribute vec2 attribute_uv1 ;                                                            \n" +
			"attribute vec4 attribute_boneIndex ;                                                      \n" +
			"attribute vec4 attribute_boneWeight ;                                                     \n" +
			"const int bonesNumber = 0;                                                                \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber];                                             \n" +
			"uniform mat4 uniform_ModelMatrix ;                                                        \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                                                   \n" +
			"uniform mat4 uniform_normalMatrix ;                                                       \n" +
			"uniform vec3 uniform_eyepos ;                                                             \n" +
			"varying vec4 varying_pos        ;                                                         \n" +
			"varying vec2 varying_uv0        ;                                                         \n" +
			"varying vec3 varying_eyeNormal  ;                                                         \n" +
			"varying vec4 varying_color  ;                                                             \n" +
			"varying vec3 varying_eyedir  ;                                                            \n" +
			"varying vec3 varying_tangent	;                                                            \n" +
			"mat4 buildMat4(int index){                                                                \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0];                                            \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1];                                     \n" +
			"float xx = quat.x * quat.x;                                                               \n" +
			"float xy = quat.x * quat.y;                                                               \n" +
			"float xz = quat.x * quat.z;                                                               \n" +
			"float xw = quat.x * quat.w;                                                               \n" +
			"float yy = quat.y * quat.y;                                                               \n" +
			"float yz = quat.y * quat.z;                                                               \n" +
			"float yw = quat.y * quat.w;                                                               \n" +
			"float zz = quat.z * quat.z;                                                               \n" +
			"float zw = quat.z * quat.w;                                                               \n" +
			"return mat4(                                                                              \n" +
			"1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0,                            \n" +
			"2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0,                           \n" +
			"2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0,                           \n" +
			"translation.x,				translation.y,			translation.z,			1                                     \n" +
			");                                                                                        \n" +
			"}                                                                                         \n" +
			"void main(void){                                                                          \n" +
			"vec4 temp_p = vec4(0.0, 0.0, 0.0, 0.0) ;                                                  \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ;                                      \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.x)) * temp_position * attribute_boneWeight.x; \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.y)) * temp_position * attribute_boneWeight.y; \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.z)) * temp_position * attribute_boneWeight.z; \n" +
			"temp_p += buildMat4(int(attribute_boneIndex.w)) * temp_position * attribute_boneWeight.w; \n" +
			"temp_p =  uniform_ModelMatrix * temp_p;                                                   \n" +
			"varying_eyedir = uniform_eyepos.xyz ;                                                     \n" +
			"varying_pos =  temp_p ;                                                                   \n" +
			"temp_p = uniform_ProjectionMatrix * temp_p ;                                              \n" +
			"gl_Position = temp_p ;                                                                    \n" +
			"varying_pos.w = -temp_p.z / 128.0 + 0.5 ;                                                 \n" +
			"varying_eyeNormal =  (uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ;             \n" +
			"varying_uv0 = attribute_uv0;                                                              \n" +
			"varying_color = vec4(1.0,1.0,1.0,1.0) ;                                                   \n" +
			"varying_tangent = normalize((uniform_ModelMatrix * vec4( attribute_tangent,0.0 )).xyz) ;  \n" +
			"}                                                                                         \n",

			"SkyLightShader":
			"uniform vec4 uniform_skyLightSource ;                                                    \n" +
			"vec3 skyLight(){                                                                         \n" +
			"vec3 frontColor = vec3(1.0,1.0,1.0);                                                     \n" +
			"vec3 backColor = vec3(1.0,1.0,1.0);                                                      \n" +
			"vec3 dirlightDir = vec3( 0.0,1.0,0.0);                                                   \n" +
			"float s =  max(0.0 , dot( normalize(varying_normal) , dirlightDir) ) ;                   \n" +
			"frontColor = uniform_skyLightSource.xyz * (s * 0.5 + 0.5 )  * uniform_skyLightSource.w ; \n" +
			"return frontColor ;                                                                      \n" +
			"}                                                                                        \n" +
			"void main(){                                                                             \n" +
			"lightColor.xyz = skyLight() ;                                                            \n" +
			"}                                                                                        \n",

			"sky_fragment":
			"uniform samplerCube sky_texture ;                      \n" +
			"varying vec3 varying_pos   ;                           \n" +
			"void main(void){                                       \n" +
			"vec3 uvw = normalize(varying_pos.xyz);                 \n" +
			"vec4 ref = vec4(textureCube( sky_texture , uvw.xyz )); \n" +
			"gl_FragColor = ref ;                                   \n" +
			"}                                                      \n",

			"sky_vertex":
			"attribute vec3 attribute_position ;                                                    \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                                                \n" +
			"uniform mat4 uniform_ModelMatrix ;                                                     \n" +
			"varying vec3 varying_pos        ;                                                      \n" +
			"void main(void){                                                                       \n" +
			"varying_pos =  attribute_position ;                                                    \n" +
			"gl_Position = uniform_ProjectionMatrix * uniform_ModelMatrix * vec4(varying_pos,1.0) ; \n" +
			"}                                                                                      \n",

			"SpecularEnvironmentMappingMethod":
			"uniform samplerCube environmentMapTex ;                      \n" +
			"void main(){                                                 \n" +
			"vec3 r = reflect(-normalize(eyedir),  normal  );             \n" +
			"vec4 reflectiveColor = textureCube(environmentMapTex,r.xyz); \n" +
			"diffuse.xyz += mix( diffuse.xyz,reflectiveColor.xyz, 0.2  ); \n" +
			"}                                                            \n",

			"specularMap_fragment":
			"uniform sampler2D specularTex;                              \n" +
			"void main(void){                                            \n" +
			"specular.xyz = texture2D( specularTex , varying_uv0 ).xyz ; \n" +
			"ttt.w = specular.z ;                                        \n" +
			"}                                                           \n",

			"spheresky_fragment":
			"uniform sampler2D sky_texture ;                                  \n" +
			"varying vec2 uv        ;                                         \n" +
			"varying vec3 normal        ;                                     \n" +
			"void main(void){                                                 \n" +
			"vec4 color = texture2D( sky_texture , vec2( 1.0-uv.x , uv.y ) ); \n" +
			"gl_FragColor = color  ;                                          \n" +
			"}                                                                \n",

			"spheresky_vertex":
			"attribute vec3 attribute_position ;                                \n" +
			"attribute vec3 attribute_normal ;                                  \n" +
			"attribute vec2 attribute_uv0 ;                                     \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                            \n" +
			"uniform mat4 uniform_ModelMatrix ;                                 \n" +
			"uniform mat4 uniform_normalMatrix ;                                \n" +
			"varying vec3 normal        ;                                       \n" +
			"varying vec2 uv        ;                                           \n" +
			"void main(void){                                                   \n" +
			"vec4 vVert4 = uniform_ModelMatrix * vec4(attribute_position,1.0) ; \n" +
			"gl_Position = uniform_ProjectionMatrix * vVert4 ;                  \n" +
			"vec3 vEyeNormal =  normalize(attribute_position);                  \n" +
			"float pi = 3.1415926 ;                                             \n" +
			"uv.x = vEyeNormal.x / pi + 0.5 ;                                   \n" +
			"uv.y = vEyeNormal.y / pi + 0.5 ;                                   \n" +
			"uv = attribute_uv0 ;                                               \n" +
			"}                                                                  \n",

			"sportLight_fragment":
			"const int max_sportLight = 1 ;                                                                                                                                  \n" +
			"uniform float uniform_sportLightSource[14*max_sportLight] ;                                                                                                     \n" +
			"struct SpotLight{                                                                                                                                               \n" +
			"vec3 lightPos ;                                                                                                                                                 \n" +
			"vec3 spotDirection ;                                                                                                                                            \n" +
			"vec3 spotColor ;                                                                                                                                                \n" +
			"float spotExponent ;                                                                                                                                            \n" +
			"float spotCosCutoff ;                                                                                                                                           \n" +
			"float constantAttenuation ;                                                                                                                                     \n" +
			"float linearAttenuation ;                                                                                                                                       \n" +
			"float quadrAttenuation ;                                                                                                                                        \n" +
			"};                                                                                                                                                              \n" +
			"void calculateSpotLight( MaterialSource materialSource ){                                                                                                       \n" +
			"vec3 ldir,halfV;                                                                                                                                                \n" +
			"float NdotL,dist,att,spotEffect,specularfract;                                                                                                                  \n" +
			"for(int i = 0 ; i < max_sportLight ; i++){                                                                                                                      \n" +
			"SpotLight L;                                                                                                                                                    \n" +
			"L.lightPos = vec3(uniform_sportLightSource[i*max_sportLight],uniform_sportLightSource[i*max_sportLight+1],uniform_sportLightSource[i*max_sportLight+2]);        \n" +
			"L.spotDirection = vec3(uniform_sportLightSource[i*max_sportLight+3],uniform_sportLightSource[i*max_sportLight+4],uniform_sportLightSource[i*max_sportLight+5]); \n" +
			"L.spotColor = vec3(uniform_sportLightSource[i*max_sportLight+6],uniform_sportLightSource[i*max_sportLight+7],uniform_sportLightSource[i*max_sportLight+8]);     \n" +
			"L.spotExponent = uniform_sportLightSource[i*max_sportLight+9];                                                                                                  \n" +
			"L.spotCosCutoff = uniform_sportLightSource[i*max_sportLight+10];                                                                                                \n" +
			"L.constantAttenuation = uniform_sportLightSource[i*max_sportLight+11];                                                                                          \n" +
			"L.linearAttenuation = uniform_sportLightSource[i*max_sportLight+12];                                                                                            \n" +
			"L.quadrAttenuation = uniform_sportLightSource[i*max_sportLight+13];                                                                                             \n" +
			"ldir = normalize( L.lightPos.xyz - varying_pos.xyz );                                                                                                           \n" +
			"NdotL = max(dot(normal,ldir),0.0);                                                                                                                              \n" +
			"dist = length(ldir);                                                                                                                                            \n" +
			"spotEffect = dot(normalize(L.spotDirection), normalize(ldir));                                                                                                  \n" +
			"if (spotEffect > L.spotCosCutoff )                                                                                                                              \n" +
			"{                                                                                                                                                               \n" +
			"spotEffect = pow(spotEffect, L.spotExponent);                                                                                                                   \n" +
			"att = spotEffect / (L.constantAttenuation + L.linearAttenuation * dist + L.quadrAttenuation * dist * dist) ;                                                    \n" +
			"light.xyz += att * L.spotColor.xyz * NdotL ;                                                                                                                    \n" +
			"}                                                                                                                                                               \n" +
			"halfV = normalize(ldir - eyedir);                                                                                                                               \n" +
			"specularfract = max( dot(halfV,normal) , 0.0 );                                                                                                                 \n" +
			"specularfract = pow(specularfract, materialSource.shininess );                                                                                                  \n" +
			"specular.w += specularfract ;                                                                                                                                   \n" +
			"};                                                                                                                                                              \n" +
			"}                                                                                                                                                               \n" +
			"void main() {                                                                                                                                                   \n" +
			"calculateSpotLight( materialSource );                                                                                                                           \n" +
			"}                                                                                                                                                               \n",

			"spotLight_fragment":
			"const int max_sportLight = 1 ;                                                                                                                                  \n" +
			"uniform float uniform_sportLightSource[14*max_sportLight] ;                                                                                                     \n" +
			"struct SpotLight{                                                                                                                                               \n" +
			"vec3 lightPos ;                                                                                                                                                 \n" +
			"vec3 spotDirection ;                                                                                                                                            \n" +
			"vec3 spotColor ;                                                                                                                                                \n" +
			"float spotExponent ;                                                                                                                                            \n" +
			"float spotCosCutoff ;                                                                                                                                           \n" +
			"float constantAttenuation ;                                                                                                                                     \n" +
			"float linearAttenuation ;                                                                                                                                       \n" +
			"float quadrAttenuation ;                                                                                                                                        \n" +
			"};                                                                                                                                                              \n" +
			"void calculateSpotLight( MaterialSource materialSource ){                                                                                                       \n" +
			"vec3 ldir,halfV;                                                                                                                                                \n" +
			"float NdotL,dist,att,spotEffect,specularfract;                                                                                                                  \n" +
			"for(int i = 0 ; i < max_sportLight ; i++){                                                                                                                      \n" +
			"SpotLight L;                                                                                                                                                    \n" +
			"L.lightPos = vec3(uniform_sportLightSource[i*max_sportLight],uniform_sportLightSource[i*max_sportLight+1],uniform_sportLightSource[i*max_sportLight+2]);        \n" +
			"L.spotDirection = vec3(uniform_sportLightSource[i*max_sportLight+3],uniform_sportLightSource[i*max_sportLight+4],uniform_sportLightSource[i*max_sportLight+5]); \n" +
			"L.spotColor = vec3(uniform_sportLightSource[i*max_sportLight+6],uniform_sportLightSource[i*max_sportLight+7],uniform_sportLightSource[i*max_sportLight+8]);     \n" +
			"L.spotExponent = uniform_sportLightSource[i*max_sportLight+9];                                                                                                  \n" +
			"L.spotCosCutoff = uniform_sportLightSource[i*max_sportLight+10];                                                                                                \n" +
			"L.constantAttenuation = uniform_sportLightSource[i*max_sportLight+11];                                                                                          \n" +
			"L.linearAttenuation = uniform_sportLightSource[i*max_sportLight+12];                                                                                            \n" +
			"L.quadrAttenuation = uniform_sportLightSource[i*max_sportLight+13];                                                                                             \n" +
			"ldir = normalize( L.lightPos.xyz - varying_pos.xyz );                                                                                                           \n" +
			"NdotL = max(dot(normal,ldir),0.0);                                                                                                                              \n" +
			"dist = length(ldir);                                                                                                                                            \n" +
			"spotEffect = dot(normalize(L.spotDirection), normalize(ldir));                                                                                                  \n" +
			"if (spotEffect > L.spotCosCutoff )                                                                                                                              \n" +
			"{                                                                                                                                                               \n" +
			"spotEffect = pow(spotEffect, L.spotExponent);                                                                                                                   \n" +
			"att = spotEffect / (L.constantAttenuation + L.linearAttenuation * dist + L.quadrAttenuation * dist * dist) ;                                                    \n" +
			"light.xyz += att * L.spotColor.xyz * NdotL ;                                                                                                                    \n" +
			"}                                                                                                                                                               \n" +
			"halfV = normalize(ldir - eyedir);                                                                                                                               \n" +
			"specularfract = max( dot(halfV,normal) , 0.0 );                                                                                                                 \n" +
			"specularfract = pow(specularfract, materialSource.shininess );                                                                                                  \n" +
			"specular.w += specularfract ;                                                                                                                                   \n" +
			"};                                                                                                                                                              \n" +
			"}                                                                                                                                                               \n" +
			"void main() {                                                                                                                                                   \n" +
			"calculateSpotLight( materialSource );                                                                                                                           \n" +
			"}                                                                                                                                                               \n",

			"terrainRGBA_fragment":
			"uniform sampler2D maskTex ;                                                                            \n" +
			"uniform sampler2D splat_0Tex ;                                                                         \n" +
			"uniform sampler2D splat_1Tex ;                                                                         \n" +
			"uniform sampler2D splat_2Tex ;                                                                         \n" +
			"uniform sampler2D splat_3Tex ;                                                                         \n" +
			"uniform sampler2D lightMapTex ;                                                                        \n" +
			"uniform float uvs[8];                                                                                  \n" +
			"void main() {                                                                                          \n" +
			"vec4 splat_control = texture2D ( maskTex , varying_uv0 );                                              \n" +
			"vec4 cc = vec4(0.0,0.0,0.0,1.0);                                                                       \n" +
			"vec2 uv = varying_uv0 ;                                                                                \n" +
			"eyedir = varying_eyedir.xyz - varying_pos.xyz ;                                                        \n" +
			"cc.xyz = splat_control.x * texture2D (splat_0Tex, uv * vec2(uvs[0],uvs[1])).xyz ;                      \n" +
			"cc.xyz += splat_control.y * texture2D (splat_1Tex, varying_pos.xy /400.0 ).xyz;                        \n" +
			"cc.xyz += splat_control.z * vec4(texture2D (splat_2Tex, uv* vec2(uvs[4],uvs[5]))).xyz;                 \n" +
			"cc.xyz += (1.0-length(splat_control.xyz)) * vec4(texture2D (splat_3Tex, uv* vec2(uvs[6],uvs[7]))).xyz; \n" +
			"diffuse.xyz = cc.xyz * diffuse.xyz ;                                                                   \n" +
			"diffuse.xyz = diffuse.xyz * (texture2D( lightMapTex , varying_uv1 ).xyz ) ;                            \n" +
			"}                                                                                                      \n",

			"Tonemaping":
			"varying vec2 uv ;                                                     \n" +
			"uniform sampler2D texture2D_1;                                        \n" +
			"uniform sampler2D texture2D_2;                                        \n" +
			"void main(void){                                                      \n" +
			"vec4 lumfact = vec4(0.27,0.67,0.06,0.0);                              \n" +
			"float AveLum = 15.0;                                                  \n" +
			"float Key= 0.75 ;                                                     \n" +
			"vec4 color = texture2D(texture2D_1,uv);                               \n" +
			"float lum = dot(color , lumfact);                                     \n" +
			"color *= Key *lum/AveLum;                                             \n" +
			"color /= vec4(vec4(1.0,1.0,1.0,0.0)+color);                           \n" +
			"gl_FragColor = clamp(color + texture2D(texture2D_2,uv)*1.3, 0.0,1.0); \n" +
			"}                                                                     \n",

			"warpedImage_fragment":
			"varying vec2 uv;                                                                                  \n" +
			"uniform sampler2D texture2D_1;                                                                    \n" +
			"uniform	vec3 _K ;                                                                                 \n" +
			"void main()                                                                                       \n" +
			"{                                                                                                 \n" +
			"float _K1 = _K.x ;                                                                                \n" +
			"vec2 _texScale = vec2(_K.yz) ;                                                                    \n" +
			"vec2 screenCenter = vec2(0.5,0.5);                                                                \n" +
			"float norm = length(screenCenter);                                                                \n" +
			"vec2 radial_vector = (uv - screenCenter)/norm;                                                    \n" +
			"float radial_vector_len = length(radial_vector);                                                  \n" +
			"vec2 radial_vector_unit = radial_vector.xy / radial_vector_len;                                   \n" +
			"float new_dist = radial_vector_len + _K1 * pow(radial_vector_len,3.0);                            \n" +
			"vec2 warp_coord = radial_vector_unit * (new_dist * norm);                                         \n" +
			"warp_coord = warp_coord * _texScale;                                                              \n" +
			"warp_coord = warp_coord + screenCenter;                                                           \n" +
			"vec4 newColor = vec4(0.0,0.0,0.0,1.0);                                                            \n" +
			"if ( (warp_coord.x > 1.0  || warp_coord.x < 0.0) || (warp_coord.y > 1.0 || warp_coord.y < 0.0) ){ \n" +
			"newColor = vec4(0.0,0.0,0.0,1.0);                                                                 \n" +
			"}else{                                                                                            \n" +
			"newColor = texture2D (texture2D_1, vec2(warp_coord.x,warp_coord.y) );                             \n" +
			"}                                                                                                 \n" +
			"gl_FragColor = newColor;                                                                          \n" +
			"	}                                                                                                \n",

			"wireframe_fragment":
			"varying vec4 varying_color ;  \n" +
			"void main(void){              \n" +
			"gl_FragColor = varying_color; \n" +
			"}                             \n",

			"wireframe_vertex":
			"attribute vec3 attribute_position ;                                                           \n" +
			"varying vec4 varying_color ;                                                                  \n" +
			"uniform mat4 uniform_ModelMatrix ;                                                            \n" +
			"uniform mat4 uniform_ProjectionMatrix ;                                                       \n" +
			"uniform vec4 uniform_color ;                                                                  \n" +
			"uniform float uniform_pointSize = 1.0 ;                                                       \n" +
			"void main(void){                                                                              \n" +
			"varying_color = uniform_color;                                                                \n" +
			"gl_PointSize = uniform_pointSize;                                                             \n" +
			"gl_Position = uniform_ProjectionMatrix * uniform_ModelMatrix * vec4(attribute_position,1.0) ; \n" +
			"}                                                                                             \n",


		};
	}
}
