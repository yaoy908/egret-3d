void main(void){
    
   mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; 
   mat3 normalMatrix = transpose( inverse(mat3( modeViewMatrix )) ); 
   varying_eyeNormal = normalize(normalMatrix * -e_normal); 
   
   outPosition = uniform_ViewMatrix * uniform_ModelMatrix * vec4(e_position, 1.0) ; 
   varying_ViewPose = outPosition.xyz / outPosition.w;
   
}

