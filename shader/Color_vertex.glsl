attribute vec3 attribute_position ;
attribute vec3 attribute_normal ;
attribute vec2 attribute_uv0 ;

uniform mat4 uniform_ModelMatrix ;
uniform mat4 uniform_ProjectionMatrix ;
uniform mat4 uniform_normalMatrix ;

varying vec2 varying_uv0  ;

void main(void){
   highp vec4 temp_p ;
   temp_p =  uniform_ProjectionMatrix * uniform_ModelMatrix * vec4(attribute_position,1.0) ; 
}