 
struct Fog{
   vec3 fogColor  ;
   float globalDensity ;
   vec3 distance ;
};
varying vec4 varying_pos;
uniform float uniform_globalFog[7];
void main(void){
    Fog fog; 
    fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); 
    fog.globalDensity = uniform_globalFog[3]; 
    fog.distance = vec2(uniform_globalFog[4], uniform_globalFog[5]); 
    
    float dist = abs( varying_ViewPose.z );
    float fogFactor = ( fog.distance.y - dist) / (fog.distance.y - fog.distance.x);
    fogFactor = clamp( fogFactor, 0.0, 1.0 );
    diffuseColor.xyz = mix( fog.fogColor, diffuseColor.xyz, fogFactor );
}
