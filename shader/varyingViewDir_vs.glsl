varying vec3 varying_ViewDir; 
varying mat3 varying_mat; 
uniform vec3 uniform_eyepos; 
void main(void){ 
    varying_mat = normalMatrix;
    varying_ViewDir = normalize(varying_mat*(uniform_eyepos.xyz - e_position)) ; 
}