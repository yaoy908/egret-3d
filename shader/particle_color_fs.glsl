uniform float uniform_colorTransform[16] ;
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
    float startColor ;
    float startSegment ;
    
    float nextColor ;
    float nextSegment ;
    
    float w = pt.w/pt.y;
    for( int i = 1 ; i < 8 ; i++ ){
       if( w >= uniform_colorTransform[i+8-1] ){
          startColor = uniform_colorTransform[i-1] ;
          startSegment = uniform_colorTransform[i+8-1] ;
          nextColor = uniform_colorTransform[i];
          nextSegment = uniform_colorTransform[i+8] ;
       }else{
          break;
       }
    } 
    
    float len = nextSegment - startSegment ;
    float ws = ( w - startSegment ) / len ;
    vec4 color = mix(pack_depth(startColor),pack_depth(nextColor),ws) ;
    diffuseColor.xyzw *= color.xyzw ;
}