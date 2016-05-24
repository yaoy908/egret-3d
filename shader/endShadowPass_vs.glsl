void main() {
	 outPosition = uniform_ProjectionMatrix * outPosition ;
     varying_ViewPose = outPosition ;
     gl_Position = outPosition ;
}

                      