attribute vec3 attribute_position ;
attribute vec3 attribute_normal ;

uniform mat4 uniform_ModelMatrix ;
uniform mat4 uniform_ProjectionMatrix ;


vec4 endPosition ;
void main(void){
   endPosition =  uniform_ProjectionMatrix * uniform_ModelMatrix * vec4(attribute_position,1.0) ; 
}