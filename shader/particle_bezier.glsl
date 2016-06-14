//±´Èû¶ûÇúÏß

vec2 quadratic_bezier(vec2 A, vec2 B, vec2 C, float t)
{
    vec2 D = mix(A, B, t);
    vec2 E = mix(B, C, t); 

    return mix(D, E, t);
}

vec2 cubic_bezier(vec2 A, vec2 B, vec2 C, vec2 D, float t)
{
    vec2 E = mix(A, B, t);
    vec2 F = mix(B, C, t);
    vec2 G = mix(C, D, t);

    return quadratic_bezier(E, F, G, t);
}

float calcBezier(vec2 points[16], float t){
	
	vec2 startA ;
	vec2 startB ;
    vec2 nextA ;
    vec2 nextB ;
	
    for( int i = 0 ; i < 4 ; i++ ){
        if( t >= points[i*4].x && t <= points[i*4+3].x ){
            startA = points[i*4] ;
            startB = points[i*4+1] ;
            
            nextA = points[i*4+2] ;
            nextB = points[i*4+3] ;
            break;
        }
    } 
	
    float len = nextB.x - startA.x ;
    float ws = ( t - startA.x ) / len ;
	
	vec2 res = cubic_bezier( startA , startB , nextA , nextB , ws);
	return res.y;
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

