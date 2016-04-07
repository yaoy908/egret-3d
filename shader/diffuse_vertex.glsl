void main(void){
    
   mat3 normalMatrix = transpose( inverse(mat3( uniform_ProjectionMatrix * uniform_ViewMatrix )) ); 
   varying_eyeNormal = normalize(normalMatrix * -attribute_normal);
   
   outPosition = uniform_ViewMatrix * uniform_ModelMatrix * vec4(attribute_position, 1.0) ; 
   varying_ViewPose = outPosition.xyz / outPosition.w;
   
}