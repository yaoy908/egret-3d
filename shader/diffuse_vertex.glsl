void main(void){
   outPosition = uniform_ModelViewMatrix * vec4(attribute_position, 1.0) ; 
   varying_ViewPose = outPosition.xyz / outPosition.w;
   
}