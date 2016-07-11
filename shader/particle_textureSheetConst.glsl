varying vec3 varying_textureSheetData;
//start const

uniform float uniform_textureSheet[5];
//tileX tileY circles frameFrom frameTo


vec2 getSheetOffset(float frame, float tileX, float tileY)
{
	frame = floor(frame);
	vec2 ret = vec2(0.0); 
	ret.x = (1.0 / tileX) * mod(frame, tileX); 
	ret.y = frame / tileY;

	ret.y = floor(ret.y);
	ret.y = (1.0 / tileY) * ret.y; 
	return ret;
}

void calcUVCoord() {
	vec2 rectUV = vec2(1.0 / uniform_textureSheet[0], 1.0 / uniform_textureSheet[1]);
	uv_0.xy *= rectUV;
	
	float frame = varying_textureSheetData.x + varying_textureSheetData.y;
	frame = clamp(frame, uniform_textureSheet[3], uniform_textureSheet[4]);
	uv_0.xy += getSheetOffset(frame, uniform_textureSheet[0], uniform_textureSheet[1]);

}


