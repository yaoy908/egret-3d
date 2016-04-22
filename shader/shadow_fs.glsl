
uniform sampler2D shadowMapTexture;
varying vec4 varying_ShadowCoord;


void main() {
	vec4 shadowCoordinateWdivide = varying_ShadowCoord / varying_ShadowCoord.w ;
	shadowCoordinateWdivide.z += 0.0005;
	float distanceFromLight = texture2D(shadowMapTexture, shadowCoordinateWdivide.st).z;
		
	float shadow = 1.0;
	if (varying_ShadowCoord.w > 0.0)
	 	shadow = distanceFromLight < shadowCoordinateWdivide.z ? 0.5 : 1.0 ;
}
