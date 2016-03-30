vec4 endPosition ;
void main() {
	 gl_PointSize = 50.0;
     gl_Position = uniform_ProjectionMatrix * outPosition ;
}

                      