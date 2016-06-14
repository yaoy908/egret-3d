uniform float uniform_size_compressed[18];
void main() {
	vec2 sizeBezierPoints[16];
	for(int szi = 0; szi < 16; szi ++){
		sizeBezierPoints[szi] = decompressFloat(uniform_size_compressed[16], uniform_size_compressed[17], uniform_size_compressed[szi]);
	}
	float sizeBezier = calcBezier(sizeBezierPoints, currentTime/emit.life);
	localPosition.xyz *= sizeBezier;
}
