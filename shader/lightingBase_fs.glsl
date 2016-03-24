float phongSpecularA(vec3 lightDirection,vec3 viewDirection,vec3 surfaceNormal,float shininess) {
  vec3 R = -reflect(lightDirection, surfaceNormal);
  return pow(max(0.0, dot(viewDirection, R)), shininess);
}