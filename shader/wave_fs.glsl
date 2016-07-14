uniform sampler2D diffuseTexture;
uniform vec3 uniform_eyepos; 
uniform vec4 waveFSData[2]; 
uniform mat4 uniform_NormalMatrix;

vec4 diffuseColor ;
void main(void){
    vec3 ViewDir = (mat3(uniform_NormalMatrix)*(uniform_eyepos.xyz - varying_ViewPose.xyz)) ; 
    diffuseColor.xyz = vec3(1.0,1.0,1.0) ; 
    vec3 shallowWaterColor = waveFSData[0].xyz * waveFSData[0].w ;
    vec3 deepWaterColor = waveFSData[1].xyz * waveFSData[1].w;

    float facing = clamp(dot( -normalize(ViewDir),normal),0.0,1.0);
    vec3 waterColor = mix(shallowWaterColor,deepWaterColor,facing);
    diffuseColor.xyz *= waterColor ;
} 