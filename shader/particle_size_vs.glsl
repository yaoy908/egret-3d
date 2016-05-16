uniform float uniform_size[16] ;
const vec4 bit_mask  = vec4(0.0001, 0.01, 1.0, 0.000001 );
vec4 pack_depth(float depth)
{
    vec4 res ;
    res.w =  floor(depth * bit_mask.w );
    res.x =  floor((depth-res.w*1000000.0) * bit_mask.x ) ;
    res.y =  floor((depth-res.w*1000000.0-res.x*10000.0) * bit_mask.y );
    res.z =  floor(depth-res.w*1000000.0-res.x*10000.0-res.y*100.0) ;
    return res;
}

float particle(  ParticleData emit ){
	float w = pt.w/pt.y;
		
	vec4 startSize ;
    vec4 nextSize ;
    
    for( int i = 1 ; i < 8 ; i++ ){
		 startSize = pack_depth(uniform_scale[i-1]) ;
		 nextSize = pack_depth(uniform_scale[i]) ;
    } 
    
	//s.x = a.y 
	//s.y = b.y 
	//s.z = c.y
	//s.w = d.y 
	
	//w.x = a.x 
	//w.y = a.y
	//w.z = a.z 
	//w.w = a.w 
    float len = nextSegment - startSegment ;
    float ws = ( w - startSegment ) / len ;
	
	vec4 start = pack_depth(startSize) ;
	vec4 end = pack_depth(nextSize) ;
	
	vec2 p = cubic_bezier( vec2(start.x,end.x) , vec2(start.y,end.y) , vec2(start.z,end.z) , vec2(start.w,end.w) , ws);
    //vec4 size = mix(pack_depth(star()tSize),pack_depth(nextSize),ws) ;
	localPosition.xyz *= p.y ;
}