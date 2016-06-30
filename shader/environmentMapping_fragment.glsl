uniform samplerCube environmentMapTex ;
uniform float reflectValue;
void main(){
  	vec3 r = reflect(-normalize(varying_ViewDir),  normal  );
	vec4 reflectiveColor = textureCube(environmentMapTex,r.xyz);
	diffuseColor.xyz = mix( diffuseColor.xyz,reflectiveColor.xyz, normal.y );  
}
         