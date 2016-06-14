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