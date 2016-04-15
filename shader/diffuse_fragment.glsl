uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
	diffuseColor = texture2D(diffuseTexture , uv_0 );
}



