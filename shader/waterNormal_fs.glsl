uniform vec2 uvData[3];
uniform float time ;
uniform sampler2D normalTextureA;
uniform sampler2D normalTextureB;

varying vec2 varying_uv0        ;

mat3 TBN ;
mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) {
    vec3 dp1 = dFdx(p);
    vec3 dp2 = dFdy(p);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);

    vec3 dp2perp = cross(dp2, N);
    vec3 dp1perp = cross(N, dp1);
    vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;

    float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B)));
    return mat3(T * invmax, B * invmax, N);
}

vec3 tbn(vec3 map, vec3 N, vec3 V, vec2 texcoord) {
    mat3 TBN = cotangentFrame(N, -V, texcoord);
    return normalize(TBN * map);
}

void main(void){
    
    float tempTime = mod(time,100000.0);
    
    vec2 uvA = uv_0 + uvData[0] * tempTime ; 
    vec2 uvB = uv_0 + uvData[1] * tempTime ; 
    
    vec3 normalTex_0 = texture2D(normalTextureA,uvA * 2.0 + normal.x*uvData[2].x ).xyz *2.0 - 1.0; 
    vec3 normalTex_1 = texture2D(normalTextureB,uvB * 2.0 + normal.z*uvData[2].y ).xyz *2.0 - 1.0; 
    
    normalTex_0.y *= -1.0; 
    normalTex_1.y *= -1.0; 
    
    normal.xyz = cross(normal, normalTex_0) * 2.0 ; 
    normal.xyz = cross(normal , normalTex_1) * 2.0 ; 
} 