//±´Èû¶ûÇúÏß

float cubic_bezier(float p0, float p1, float p2, float p3, float t) {
    float progress = 1.0 - t;
    float progress2 = progress * progress;
    float progress3 = progress2 * progress;
    float t2 = t * t;
    float t3 = t2 * t;
           
	t = p0 * progress3 + 3.0 * p1 * t * progress2 + 3.0 * p2 * t2 * progress + p3 * t3;
	return t;
}


float calcBezier(vec2 points[16], float t){
	
	vec2 A0 ;
	vec2 B0 ;
    vec2 A1 ;
    vec2 B1 ;
	
    for( int i = 0 ; i < 4 ; i++ ){
        if( t >= points[i*4].x && t <= points[i*4+3].x ){
            A0 = points[i*4] ;
            B0 = points[i*4+1] ;
            
            A1 = points[i*4+2] ;
            B1 = points[i*4+3] ;
            break;
        }
    } 
	
    t = (t - A0.x) / (A1.x - A0.x);
    return cubic_bezier(A0.y, B0.y, B1.y, A1.y, t);
}



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

float calcDoubleBezier(float bezierData[18], float bezierData2[18], float particleProgress, float randomSeed){
	vec2 bezierPoints[16];
	vec2 bezierPoints2[16];
	for(int i = 0; i < 16; i ++){
		bezierPoints[i] = decompressFloat(bezierData[16], bezierData[17], bezierData[i]);
		bezierPoints2[i] = decompressFloat(bezierData2[16], bezierData2[17], bezierData2[i]);
	}
	float res1 = calcBezier(bezierPoints, particleProgress);
	float res2 = calcBezier(bezierPoints2, particleProgress);
	res1 = randomSeed * res1 + (1.0 - randomSeed) * res2;
	return res1;
}

float calcSingleBezier(float bezierData[18], float particleProgress){
	vec2 bezierPoints[16];
	for(int i = 0; i < 16; i ++){
		bezierPoints[i] = decompressFloat(bezierData[16], bezierData[17], bezierData[i]);
	}
	float res = calcBezier(bezierPoints, particleProgress);
	return res;
}

