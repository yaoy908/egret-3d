varying vec4 varying_pos;
void main() {
       varying_pos = uniform_ModelViewMatrix * vec4(e_position, 1.0) ; 
}

                      