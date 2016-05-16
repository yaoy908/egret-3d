vec4 endPosition ;
void main() {
	 gl_PointSize = 4.0;
     gl_Position = uniform_ProjectionMatrix * outPosition ;
}

                      