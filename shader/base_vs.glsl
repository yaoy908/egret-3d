attribute vec3 attribute_position;
attribute vec3 attribute_normal;
attribute vec4 attribute_color;
attribute vec2 attribute_uv0;


vec3 e_position = vec3(0.0, 0.0, 0.0);

uniform mat4 uniform_ModelViewMatrix ;
uniform mat4 uniform_ProjectionMatrix ;
uniform vec3 uniform_eyepos ;

varying vec4 varying_ViewPose;
varying vec3 varying_eyeNormal  ;
varying vec2 varying_uv0;
varying vec4 varying_color;
varying vec3 varying_ViewDir ;

vec4 outPosition ;

void main(void){
	e_position = attribute_position;
	varying_color = attribute_color;
	varying_uv0 = attribute_uv0;
  
  
}