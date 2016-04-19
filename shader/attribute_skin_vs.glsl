attribute vec4 attribute_boneIndex;
attribute vec4 attribute_boneWeight;

void main(void){
	e_boneIndex = attribute_boneIndex;
	e_boneWeight = attribute_boneWeight;
}