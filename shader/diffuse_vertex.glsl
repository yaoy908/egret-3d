attribute vec3 attribute_position ;
attribute vec3 attribute_normal ;
attribute vec3 attribute_tangent ;
attribute vec4 attribute_color ;
attribute vec2 attribute_uv0 ;

uniform mat4 uniform_ModelMatrix ;
uniform mat4 uniform_ProjectionMatrix ;
uniform mat4 uniform_normalMatrix ;
uniform vec3 uniform_eyepos ;

varying vec4 varying_pos        ;
varying vec3 varying_eyeNormal  ;
varying vec4 varying_color  ;
varying vec3 varying_eyedir  ;
varying vec2 varying_uv0;

vec4 endPosition ;

void main(void){

   endPosition = vec4(0.0, 0.0, 0.0, 0.0) ;

   vec4 temp_position = vec4(attribute_position, 1.0) ;

   endPosition =  uniform_ModelMatrix * temp_position ;

   varying_eyedir = uniform_eyepos ;
   varying_pos =  endPosition ;

   endPosition = uniform_ProjectionMatrix * endPosition ;
   
   varying_eyeNormal =  (uniform_normalMatrix*vec4(attribute_normal,0.0) ).xyz ;

   varying_uv0 = attribute_uv0;
   varying_color = attribute_color ;
}