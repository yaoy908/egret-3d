uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
	diffuseColor = textureLinear(diffuseTexture , uv_0 );
}



