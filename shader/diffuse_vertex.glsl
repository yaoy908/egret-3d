void main(void){
    
   mat3 normalMatrix = transpose( inverse(mat3(uniform_ModelViewMatrix )) ); 
   varying_eyeNormal = normalize(normalMatrix * -attribute_normal);
   
   outPosition = uniform_ModelViewMatrix * vec4(attribute_position, 1.0) ; 
   varying_ViewPose = outPosition.xyz / outPosition.w;
   
}