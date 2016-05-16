uniform float uniform_size[16] ;

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

vec4 pack_depth(float depth)
{
    vec4 res ;
    float res1 = depth/256.0;
    res.z = fract( res1 );
    res1 -= res.z;
    
    res1 = res1/256.0;
    res.y = fract( res1 );
    res1 -= res.y;
    
    res1 = res1/256.0;
    res.x = fract( res1 );
    res1 -= res.x;
    
    res1 = res1/256.0;
    res.w = res1;
    return res;
}

void main() {
	float w = currentTime/emit.life;
		
	vec2 startA ;
	vec2 startB ;
    vec2 nextA ;
    vec2 nextB ;
    vec4 startSize = pack_depth(uniform_size[0]) ;
	vec4 nextSize = pack_depth(uniform_size[1]) ;
	
	startA = startSize.xy ; 
	startB = startSize.zw ;
	nextA = nextSize.xy;
	nextB = nextSize.zw;
	 
     for( int i = 0 ; i < 8 ; i++ ){
	    // startSize = pack_depth(uniform_size[i*2]) ;
	    // if( w <= startSize.x ){
        //    nextSize = pack_depth(uniform_size[i*2+1]) ;
        //    startA = startSize.xy ; 
	 	//    startB = startSize.zw ;
	 	//    nextA = nextSize.xy;
	 	//    nextB = nextSize.zw;
        // }else{
        //    break;
        // }
    } 
	
    float len = nextB.x - startA.x ;
    float ws = ( w - startA.x ) / len ;  
	
	// vec2 p = cubic_bezier( startA , startB , nextA , nextB , ws);
	//localPosition.xyz *= pack_depth(uniform_size[1]).z ;
}