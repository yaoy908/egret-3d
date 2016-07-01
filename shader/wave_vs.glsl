attribute vec3 attribute_normal;
attribute vec4 attribute_color;

varying vec3 varying_ViewDir ;
uniform mat4 uniform_NormalMatrix;

uniform vec3 waveVSData[4];
uniform float time ;
uniform sampler2D normalTextureA;
struct wave{
    vec3 wave_xyz_intensity_0 ;
    vec3 wave_xyz_intensity_1 ;
    vec3 wave_xyz_speed_0 ;
    vec3 wave_xyz_speed_1 ;
};

const float pi = 3.14 ;
vec3 calcWave2( float t , vec3 x, float amplitude, float waveLength ,float angularVelocity ,  vec3 waveDir ){
  
   angularVelocity = angularVelocity * 0.1;
   vec3 waveVector = waveDir ;
   float waveNumber = pi / waveLength;
   waveVector *= waveNumber ;
  
  vec3 temp ; 
   float kDotX0SubWt = dot(waveVector , x ) - angularVelocity * t  * 0.001;
   float A = amplitude * sin(kDotX0SubWt) ;
   temp.xz = waveDir.xz * A ;
   temp.y += amplitude * cos(kDotX0SubWt);
   temp = x - temp ;
   return temp ;
}

void main(void){
   wave wa ; 
    wa.wave_xyz_intensity_0 = vec3(waveVSData[0]) ; 
    wa.wave_xyz_intensity_1 = vec3(waveVSData[1]) ; 
    wa.wave_xyz_speed_0 = vec3(waveVSData[2]) ; 
    wa.wave_xyz_speed_1 = vec3(waveVSData[3]) ; 
    
    float tempTime = mod( time , 100000.0 ); 
    vec3 newPose1 = calcWave2(tempTime,e_position,10.0, 30.0, 20.0,vec3(3.0,0.0,2.0));
        newPose1 += calcWave2(tempTime,e_position,10.0, 30.0, 20.0,vec3(-1.5,0.0,2.0));
        newPose1 += calcWave2(tempTime,e_position,30.0,80.0,3.0,vec3(-2.0,0.0,1.0));

    vec3 p1 = e_position + vec3(1.0,0.0,0.0) ;
    vec3 newPose2 = calcWave2(tempTime,p1,10.0, 30.0, 20.0,vec3(3.0,0.0,2.0));
        newPose2 += calcWave2(tempTime,p1,10.0, 30.0, 20.0,vec3(-1.5,0.0,2.0));
        newPose2 += calcWave2(tempTime,p1,30.0,80.0,3.0,vec3(-2.0,0.0,1.0));

    
    vec3 p2 = e_position + vec3(0.0,0.0,1.0) ;
    vec3 newPose3 = calcWave2(tempTime,p2,10.0, 30.0, 20.0,vec3(3.0,0.0,2.0));
        newPose3 += calcWave2(tempTime,p2,10.0, 30.0, 20.0,vec3(-1.5,0.0,2.0));
        newPose3 += calcWave2(tempTime,p2,30.0,80.0,3.0,vec3(-2.0,0.0,1.0));

    e_position = newPose1 ;
    
    vec3 side1 = newPose2 - newPose1;
    vec3 side2 = newPose3 - newPose1;

    vec3 normal = normalize(cross(side1, side2));//attribute_normal * vec3(offset,1.0,offset) ;
    
    mat3 normalMatrix = mat3(uniform_NormalMatrix); 
    varying_eyeNormal = normalize(-attribute_normal); 

    varying_ViewPose = vec4(e_position, 1.0) ; 
    varying_ViewDir = ((uniform_eyepos.xyz - e_position)) ; 
    outPosition = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; 
    varying_color = attribute_color; 
} 