varying vec3 varying_ViewDir; 
uniform vec3 uniform_eyepos; 
uniform mat4 uniform_NormalMatrix;
void main(void){ 
    varying_ViewDir = (uniform_eyepos.xyz - e_position) ; 
}