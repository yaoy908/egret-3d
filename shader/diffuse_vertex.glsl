attribute vec3 attribute_position ;
attribute vec3 attribute_normal ;
attribute vec3 attribute_tangent ;
attribute vec4 attribute_color ;
attribute vec2 attribute_uv0 ;

uniform mat4 uniform_ModelMatrix ;
uniform mat4 uniform_ProjectionMatrix ;
uniform mat4 uniform_normalMatrix ;
uniform vec3 uniform_eyepos ;

varying vec4 varying_pos        ;
varying vec3 varying_eyeNormal  ;
varying vec4 varying_color  ;
varying vec3 varying_eyedir  ;
varying vec2 varying_uv0;
varying vec3 varying_tangent	;
vec4 endPosition ;

mat3 transpose(mat3 m) {
  return mat3(m[0][0], m[1][0], m[2][0],
              m[0][1], m[1][1], m[2][1],
              m[0][2], m[1][2], m[2][2]);
}

mat3 inverse(mat3 m) {
  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];
  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];
  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

void main(void){

   endPosition = vec4(0.0, 0.0, 0.0, 0.0) ;

   vec4 temp_position = vec4(attribute_position, 1.0) ;

   endPosition =  uniform_ModelMatrix * temp_position ;

   varying_eyedir = uniform_eyepos ;

   varying_pos =  endPosition ;

   endPosition = uniform_ProjectionMatrix * endPosition ;
   
   mat3 normalMatrix = transpose(inverse(mat3(uniform_ModelMatrix)));

   varying_eyeNormal = normalize(normalMatrix * attribute_normal);

   varying_tangent = attribute_tangent ;

   varying_uv0 = attribute_uv0;

   varying_color = attribute_color ;
}