uniform vec2 uniform_size[32] ;

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

void main() {
	float w = currentTime/emit.life;
		
	vec2 startA ;
	vec2 startB ;
    vec2 nextA ;
    vec2 nextB ;
	
    for( int i = 0 ; i < 8 ; i++ ){
        if( w >= uniform_size[i*4].x && w <= uniform_size[i*4+3].x ){
            startA = uniform_size[i*4] ;
            startB = uniform_size[i*4+1] ;
            
            nextA = uniform_size[i*4+2] ;
            nextB = uniform_size[i*4+3] ;
            break;
        }
    } 
	
    float len = nextB.x - startA.x ;
    float ws = ( w - startA.x ) / len ;  
	
	vec2 p = cubic_bezier( startA , startB , nextA , nextB , ws);
	localPosition.xyz *= p.y ;
}