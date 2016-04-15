varying vec4 varying_pos;
void main() {
       varying_pos = uniform_ModelMatrix * vec4(attribute_position, 1.0) ; 
}

                      