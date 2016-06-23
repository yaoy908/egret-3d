vec2 bzData[20];
float f2Key = 1.0 / 4096.0;

vec2 dcp2f(float min, float range, float mf){

	float value2 = fract(mf);
	float value1 = mf - value2;
	value1 *= f2Key;
	
	value1 *= range;
	value2 *= range;
	
	value1 += min;
	value2 += min;
	
	return vec2(value1, value2);
}


void dcpBezier(float bezierData[15], float tTotal)
{
	vec2 f2;
	float min = bezierData[10];
	float range = bezierData[11];
	float sameValue = bezierData[12];

	float timeStart = 0.0;
	float timeSegment = 0.0;
	float fj = 0.0;

	for(int i = 0; i < 2; i ++){
		timeSegment = bezierData[13 + i] * tTotal / 9.0;
		fj = 0.0;
		for(int j = 0; j < 5; j ++){
			if(sameValue > TrueOrFalse){
				f2 = vec2(bezierData[0]);
			}else{
				f2 = dcp2f(min, range, bezierData[i * 5 + j]);
			}
			bzData[i * 10 + j * 2].x = timeStart + fj * 2.0 * timeSegment;
			bzData[i * 10 + j * 2 + 1].x = timeStart + (fj * 2.0 + 1.0) * timeSegment;

			bzData[i * 10 + j * 2].y = f2.x;
			bzData[i * 10 + j * 2 + 1].y = f2.y;
			fj ++;
		}
		timeStart += bezierData[13 + i] * tTotal;
	}
}





float calcBezierArea(float tCurrent, float randomSeed){
	float res = 0.0;

	float v0;
	float v1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float a;


	for(int i = 0; i < 19; i ++){
		v0 = bzData[i].y * randomSeed;
		v1 = bzData[i + 1].y * randomSeed;
		t0 = bzData[i].x;
		t1 = bzData[i + 1].x;
		deltaTime = t1 - t0;
		if(deltaTime > 0.0)
		{
			a = 0.5 * (v1 - v0) / deltaTime;
			if(tCurrent >= t1){
				res += deltaTime * (v0 + a * deltaTime);
			}else{
				deltaTime = tCurrent - t0;
				res += deltaTime * (v0 + a * deltaTime);
				break;
			}
		}

	}

	return res;
}




float calcOneBezierArea(float bezierData[15], float tCurrent, float tTotal, float randomSeed){
	dcpBezier(bezierData, tTotal);
	return calcBezierArea(tCurrent, randomSeed);
}
float calcDoubleBezierArea(float sampleData1[15], float sampleData2[15], float tCurrent, float tTotal, float randomSeed){
	float res = calcOneBezierArea(sampleData1, tCurrent, tTotal, randomSeed);
	res += calcOneBezierArea(sampleData2, tCurrent, tTotal, 1.0 - randomSeed);
	return res;
}




float calcBezierSize(float tCurrent, float randomSeed){
	float res = 0.0;

	float y0;
	float y1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float v;

	for(int i = 0; i < 19; i ++){
		y0 = bzData[i].y * randomSeed;
		y1 = bzData[i + 1].y * randomSeed;
		t0 = bzData[i].x;
		t1 = bzData[i + 1].x;
		deltaTime = t1 - t0;
		if(deltaTime > 0.0)
		{
			if(tCurrent >= t1){
				res = y1;
			}else{
				v = (y1 - y0) / deltaTime;
				deltaTime = tCurrent - t0;
				res = y0 + v * deltaTime;
				break;
			}
		}

	}

	return res;
}


float calcOneBezierSize(float bezierData[15], float tCurrent, float tTotal, float randomSeed){
	dcpBezier(bezierData, tTotal);
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
//		bezierPoints[i] = dcp2f(bezierData[16], bezierData[17], bezierData[i]);
//		bezierPoints2[i] = dcp2f(bezierData2[16], bezierData2[17], bezierData2[i]);
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
//		bezierPoints[i] = dcp2f(bezierData[16], bezierData[17], bezierData[i]);
//	}
//	float res = calcBezier(bezierPoints, particleProgress);
//	return res;
//}

