vec2 bezierSamples[40];

//decompress 1 float value to 2.
vec2 decompressFloat(float min, float range, float mergeFloat){
	
	float convert_1_4096 = 1.0 / 4096.0;
	float value2 = fract(mergeFloat);
	float value1 = mergeFloat - value2;
	value1 *= convert_1_4096;

	value1 *= range;
	value2 *= range;

	value1 += min;
	value2 += min;

	return vec2(value1, value2);
}


//计算贝塞尔曲线面积
float calcBezierArea(float tCurrent, float randomSeed){
	float res = 0.0;

	float v0;
	float v1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float a;


	for(int i = 0; i < 39; i ++){
		v0 = bezierSamples[i].y * randomSeed;
		v1 = bezierSamples[i + 1].y * randomSeed;
		t0 = bezierSamples[i].x;
		t1 = bezierSamples[i + 1].x;
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
			bezierSamples[i * 10 + j * 2].x = timeStart + fj * 2.0 * timeSegment;
			bezierSamples[i * 10 + j * 2 + 1].x = timeStart + (fj * 2.0 + 1.0) * timeSegment;

			bezierSamples[i * 10 + j * 2].y = compressedFloats.x;
			bezierSamples[i * 10 + j * 2 + 1].y = compressedFloats.y;
			fj ++;
		}
		timeStart += bezierData[23 + i] * tTotal;
	}

	float res = calcBezierArea(tCurrent, randomSeed);
	return res;
}



float calcDoubleBezierArea(float sampleData1[27], float sampleData2[27], float tCurrent, float tTotal, float randomSeed){
	float res1 = calcOneBezierArea(sampleData1, tCurrent, tTotal, randomSeed);
	float res2 = calcOneBezierArea(sampleData2, tCurrent, tTotal, 1.0 - randomSeed);
	return res1;
}



//计算贝塞尔曲线在某个位置的高度
float calcBezierSize(float tCurrent, float randomSeed){
	float res = 0.0;

	float y0;
	float y1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float v;

	for(int i = 0; i < 39; i ++){
		y0 = bezierSamples[i].y * randomSeed;
		y1 = bezierSamples[i + 1].y * randomSeed;
		t0 = bezierSamples[i].x;
		t1 = bezierSamples[i + 1].x;
		deltaTime = t1 - t0;
		if(deltaTime > 0.0)
		{
			v = (y1 - y0) / deltaTime;
			if(tCurrent >= t1){
				res = y0 + v * deltaTime;
			}else{
				deltaTime = tCurrent - t0;
				res = y0 + v * deltaTime;
				break;
			}
		}

	}

	return res;
}


float calcOneBezierSize(float bezierData[27], float tCurrent, float tTotal, float randomSeed){
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
			bezierSamples[i * 10 + j * 2].x = timeStart + fj * 2.0 * timeSegment;
			bezierSamples[i * 10 + j * 2 + 1].x = timeStart + (fj * 2.0 + 1.0) * timeSegment;

			bezierSamples[i * 10 + j * 2].y = compressedFloats.x;
			bezierSamples[i * 10 + j * 2 + 1].y = compressedFloats.y;
			fj ++;
		}
		timeStart += bezierData[23 + i] * tTotal;
	}

	float res = calcBezierSize(tCurrent, randomSeed);
	return res;
}




////计算贝塞尔曲线在t时间时候的y值
//float calcBezier(vec2 points[16], float t){
//	
//	vec2 P0 ;
//	vec2 P1 ;
//    vec2 P2 ;
//    vec2 P3 ;
//	
//    for( int i = 0 ; i < 4 ; i++ ){
//        if( t >= points[i*4].x && t <= points[i*4+2].x ){
//            P0 = points[i*4] ;
//            P1 = points[i*4+1] ;
//            
//            P3 = points[i*4+2] ;
//            P2 = points[i*4+3] ;
//            break;
//        }
//    } 
//	
//    t = (t - P0.x) / (P3.x - P0.x);
//
//	float p0y = mix(P0.y, P1.y, t);
//	float p1y = mix(P1.y, P2.y, t);
//	float p2y = mix(P2.y, P3.y, t);
//	
//	p0y = mix(p0y, p1y, t);
//	p1y = mix(p1y, p2y, t);
//
//	return mix(p0y, p1y, t);
//}
//
//
//
//
//float calcDoubleBezier(float bezierData[18], float bezierData2[18], float particleProgress, float randomSeed){
//	vec2 bezierPoints[16];
//	vec2 bezierPoints2[16];
//	for(int i = 0; i < 16; i ++){
//		bezierPoints[i] = decompressFloat(bezierData[16], bezierData[17], bezierData[i]);
//		bezierPoints2[i] = decompressFloat(bezierData2[16], bezierData2[17], bezierData2[i]);
//	}
//	float res1 = calcBezier(bezierPoints, particleProgress);
//	float res2 = calcBezier(bezierPoints2, particleProgress);
//	res1 = randomSeed * res1 + (1.0 - randomSeed) * res2;
//	return res1;
//}
//
//
//
//float calcSingleBezier(float bezierData[18], float particleProgress){
//	vec2 bezierPoints[16];
//	for(int i = 0; i < 16; i ++){
//		bezierPoints[i] = decompressFloat(bezierData[16], bezierData[17], bezierData[i]);
//	}
//	float res = calcBezier(bezierPoints, particleProgress);
//	return res;
//}

