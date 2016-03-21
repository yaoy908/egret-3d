uniform sampler2D normalTexture;
mat3 TBN ;

varying vec4 varying_pos        ;
varying vec2 varying_uv0        ;
varying vec3 varying_eyeNormal  ;
varying vec3 varying_tangent	;
void main(void){

	TBN[0] = varying_tangent ;
	TBN[2] = normalize( varying_eyeNormal.xyz ) ;
    TBN[1] = normalize( cross(TBN[0],TBN[2]) ); 

	normal = 2.0 * texture2D( normalTexture , varying_uv0 ).xyz - 1.0; 
	normal = TBN * normalize(normal)  ; 
	 
	//diffuse *=  vec4( varying_pos.xyz , 1.0 ); 
}






