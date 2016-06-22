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

