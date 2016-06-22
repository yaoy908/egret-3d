//计算贝塞尔曲线面积
float calcBezierArea(vec2 sampleData[40], float tCurrent, float randomSeed){
	float res = 0.0;

	float v0;
	float v1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float a;


	for(int i = 0; i < 39; i ++){
		v0 = sampleData[i].y * randomSeed;
		v1 = sampleData[i + 1].y * randomSeed;
		t0 = sampleData[i].x;
		t1 = sampleData[i + 1].x;
		deltaTime = t1 - t0;
		if(deltaTime > 0.0)
		{
			a = (v1 - v0) / deltaTime;
			if(tCurrent >= t1){
				res += v0 * deltaTime + a * deltaTime * deltaTime * 0.5;
			}else{
				deltaTime = tCurrent - t0;
				res += v0 * deltaTime + a * deltaTime * deltaTime * 0.5;
				break;
			}
		}

	}

	return res;
}




float calcOneBezierArea(float bezierData[27], float tCurrent, float tTotal, float randomSeed){
	vec2 sampleData[40];
	vec2 compressedFloats;
	float min = bezierData[20];
	float range = bezierData[21];
	float sameValue = bezierData[22];

	float timeStart = 0.0;
	float timeSegment = 0.0;
	float fj = 0.0;
	for(int i = 0; i < 4; i ++){
		timeSegment = bezierData[23 + i] * tTotal / 9.0;
		fj = 0.0;
		for(int j = 0; j < 5; j ++){
			if(sameValue == 1.0){
				compressedFloats = vec2(bezierData[0],bezierData[0]);
			}else{
				compressedFloats = decompressFloat(min, range, bezierData[i * 5 + j]);
			}
			sampleData[i * 10 + j * 2].x = timeStart + fj * 2.0 * timeSegment;
			sampleData[i * 10 + j * 2 + 1].x = timeStart + (fj * 2.0 + 1.0) * timeSegment;

			sampleData[i * 10 + j * 2].y = compressedFloats.x;
			sampleData[i * 10 + j * 2 + 1].y = compressedFloats.y;
			fj ++;
		}
		timeStart += bezierData[23 + i] * tTotal;
	}

	float res = calcBezierArea(sampleData, tCurrent, randomSeed);
	return res;
}



float calcDoubleBezierArea(float sampleData1[27], float sampleData2[27], float tCurrent, float tTotal, float randomSeed){
	float res1 = calcOneBezierArea(sampleData1, tCurrent, tTotal, randomSeed);
	float res2 = calcOneBezierArea(sampleData2, tCurrent, tTotal, 1.0 - randomSeed);
	return res1;
}