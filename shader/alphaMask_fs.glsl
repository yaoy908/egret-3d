uniform sampler2D maskTexture ;
void main(void){
    materialSource.alpha *= texture2D( maskTexture , uv_0 ).x;
}

