uniform float uniform_colorTransform[16] ;
const vec4 bit_shift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);
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