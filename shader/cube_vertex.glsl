attribute vec3 attribute_position;

uniform mat4 uniform_ModelMatrix;
uniform mat4 uniform_ModelViewMatrix;
uniform mat4 uniform_ProjectionMatrix;

varying vec3 varying_pos;
void main(void){
   varying_pos =  attribute_position;
   gl_Position = uniform_ProjectionMatrix * uniform_ModelViewMatrix * vec4(attribute_position, 1.0) ; 
}