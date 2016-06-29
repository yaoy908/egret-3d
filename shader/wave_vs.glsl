attribute vec3 attribute_normal;
attribute vec4 attribute_color;

varying vec3 varying_ViewDir ;
uniform mat4 uniform_NormalMatrix;

uniform vec3 waveData[4];
uniform float time ;
uniform sampler2D normalTextureA;
struct wave{
    vec3 wave_xyz_intensity_0 ;
    vec3 wave_xyz_intensity_1 ;
    vec3 wave_xyz_speed_0 ;
    vec3 wave_xyz_speed_1 ;
};

void main(void){
    wave wa ;
    wa.wave_xyz_intensity_0 = vec3(waveData[0]) ;
    wa.wave_xyz_intensity_1 = vec3(waveData[1]) ;
    wa.wave_xyz_speed_0 = vec3(waveData[2]) ;
    wa.wave_xyz_speed_1 = vec3(waveData[3]) ;
    
     float tempTime = mod( time , 100000.0 ); 
    // 1.0 ~ 100.0 不能到1.0
    vec2 offestW ;  
    vec2 offestW2 ;
    
    float offset;
    vec3 a = attribute_position ;
    vec3 b = attribute_position + vec3( 1.0,0.0,0.0 );
    vec3 c = attribute_position + vec3( 0.0,0.0,1.0 );
    
    vec4 v1 = texture2D( normalTextureA, varying_uv0 );
    //--a 
    offestW = sin( tempTime*wa.wave_xyz_speed_0.xz + a.xz/ ( 3.14 * wa.wave_xyz_intensity_0.xz) ) * wa.wave_xyz_intensity_0.y ; 
    offestW2 = sin( tempTime*wa.wave_xyz_speed_1.xz + a.xz/ ( 3.14 * wa.wave_xyz_intensity_1.xz) ) * wa.wave_xyz_intensity_1.y ; 
    offset = offestW.x + offestW.y + offestW2.x + offestW2.y ; 
    a.y += offset ; 
    e_position.y = a.y + v1.y ;
    
    //--b
    offestW = sin( tempTime*wa.wave_xyz_speed_0.xz + b.xz/ ( 3.14 * wa.wave_xyz_intensity_0.xz) ) * wa.wave_xyz_intensity_0.y ; 
    offestW2 = sin( tempTime*wa.wave_xyz_speed_1.xz + b.xz/ ( 3.14 * wa.wave_xyz_intensity_1.xz) ) * wa.wave_xyz_intensity_1.y ; 
    offset = offestW.x + offestW.y + offestW2.x + offestW2.y ; 
    b.y += offset ; 
    
    //--c
    offestW = sin( tempTime*wa.wave_xyz_speed_0.xz + c.xz/ ( 3.14 * wa.wave_xyz_intensity_0.xz) ) * wa.wave_xyz_intensity_0.y ; 
    offestW2 = sin( tempTime*wa.wave_xyz_speed_1.xz + c.xz/ ( 3.14 * wa.wave_xyz_intensity_1.xz) ) * wa.wave_xyz_intensity_1.y ; 
    offset = offestW.x + offestW.y + offestW2.x + offestW2.y ; 
    c.y += offset ; 

    vec3 side1 = b - a;
    vec3 side2 = c - a;

    vec3 normal = normalize(cross(side1, side2));//attribute_normal * vec3(offset,1.0,offset) ;
    //--------------------
    
    mat3 normalMatrix = mat3(uniform_NormalMatrix);//transpose( inverse(mat3( modeViewMatrix )) ); 
    varying_eyeNormal = normalize(normalMatrix*normal); 
    varying_ViewPose = vec4(e_position, 1.0) ;
    varying_ViewDir = normalize(normalMatrix*(uniform_eyepos.xyz - e_position)) ; 
   
    outPosition = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; 
    varying_color = attribute_color;
} 