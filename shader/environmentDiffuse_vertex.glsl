attribute vec3 attribute_normal;
attribute vec4 attribute_color;

varying vec3 varying_ViewDir ;
uniform mat4 uniform_NormalMatrix;
void main(){
    mat3 normalMatrix = mat3(uniform_NormalMatrix); 
    varying_eyeNormal = normalize(-attribute_normal); 
    varying_ViewPose = vec4(e_position, 1.0) ; 
    varying_ViewDir = normalize((uniform_eyepos.xyz - e_position)) ; 
    outPosition = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; 
    varying_color = attribute_color; 
}

