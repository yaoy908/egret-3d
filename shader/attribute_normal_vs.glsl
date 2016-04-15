attribute vec3 attribute_normal;


void main(void){
   varying_color = vec4(1.0, 1.0, 1.0, 1.0);
   varying_uv0 = vec2(0.0, 0.0);
   outNormal = attribute_normal;
}