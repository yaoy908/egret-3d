uniform float uniform_materialSource[16] ;
uniform sampler2D diffuseTexture;
struct MaterialSource{
    vec3 diffuse;
    vec3 ambient;
    vec3 specular;
    float alpha;
    float cutAlpha;
    float shininess;
	float diffusePower;
	float specularPower;
	float ambientPower;
	float normalPower;
};

varying vec4 varying_pos        ;
varying vec3 varying_eyeNormal  ;
varying vec4 varying_color  ;
varying vec3 varying_eyedir  ;
varying vec2 varying_uv0;

vec4 endColor ;
vec4 diffuse  ;
vec4 diffuseTex  ;
vec4 specular ;
vec3 normal  ;
vec3 eyedir  ;
vec4 light ;
vec4 ambient;
void main() {
	
	MaterialSource materialSource ; 
	materialSource.diffuse.x = uniform_materialSource[0];
	materialSource.diffuse.y = uniform_materialSource[1];
	materialSource.diffuse.z = uniform_materialSource[2];
	
	materialSource.ambient.x = uniform_materialSource[3];
	materialSource.ambient.y = uniform_materialSource[4];
	materialSource.ambient.z = uniform_materialSource[5];
	
	materialSource.specular.x = uniform_materialSource[6];
	materialSource.specular.y = uniform_materialSource[7];
	materialSource.specular.z = uniform_materialSource[8];
	
	materialSource.alpha = uniform_materialSource[9];
	materialSource.cutAlpha = uniform_materialSource[10];
	materialSource.shininess = uniform_materialSource[11];
	materialSource.diffusePower = uniform_materialSource[12];
	materialSource.specularPower = uniform_materialSource[13];
	materialSource.ambientPower = uniform_materialSource[14];
	materialSource.normalPower = uniform_materialSource[15];

	materialSource.diffuse.xyz = materialSource.diffuse * materialSource.diffusePower ;
	materialSource.specular.xyz = materialSource.specular * materialSource.specularPower ;
	materialSource.ambient.xyz = materialSource.ambient * materialSource.ambientPower ;

	ambient = vec4(1.0,1.0,1.0,1.0);
	specularTexColor = vec4(1.0,1.0,1.0,1.0);

	normal = varying_eyeNormal;
	diffuseTex = texture2D(diffuseTexture , varying_uv0 );
    eyedir = varying_eyedir.xyz - varying_pos.xyz ; 
}



