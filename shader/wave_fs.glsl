uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main(void){
    diffuseColor = vec4(50.0/255.0,49.0/255.0,30.0/255.0,1.0);//texture2D(diffuseTexture , uv_0 + normal.xz * 0.2 ); 
    vec3 deepWaterColor = vec3(0.0/255.0,63.0/255.0,77.0/255.0) * 0.0;
    vec3 shallowWaterColor = vec3(71.0/255.0,118.0/255.0,138.0/255.0) * 0.5;

    float facing = clamp(dot( -normalize(varying_ViewDir),normal),0.0,1.0);
    vec3 waterColor = mix(shallowWaterColor,deepWaterColor,facing);
    diffuseColor.xyz += waterColor ;
} 