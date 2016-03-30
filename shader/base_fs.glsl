#extension GL_OES_standard_derivatives : enable

varying vec3 varying_eyeNormal  ;
varying vec2 varying_uv0;
varying vec3 varying_ViewPose;

uniform vec3 uniform_eyepos ;
uniform mat4 uniform_ModelViewMatrix ;
vec4 outColor;
vec4 diffuseColor ;
vec4 specularColor ;
vec4 ambientColor;

vec4 light ;
vec3 normal;
vec2 uv_0;

vec3 flatNormals(vec3 pos) {
  vec3 fdx = dFdx(pos);
  vec3 fdy = dFdy(pos);
  return normalize(cross(fdx, fdy));
}


void main() {
    
	diffuseColor  = vec4(1.0,1.0,1.0,1.0);
	specularColor = vec4(0.0,0.0,0.0,0.0);
	ambientColor  = vec4(1.0,1.0,1.0,1.0);
	light         = vec4(0.0,0.0,0.0,0.0);
    
    normal = normalize(varying_eyeNormal) ;
	uv_0 = varying_uv0;
}