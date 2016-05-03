module egret3d {

    /**
    * @private
    */

    export class AnimationNode {

        public name: string; 

        public vertex_ShaderName: string = "" ;
        public frament_ShaderName: string = "" ;

        public vertex_data: Float32Array;
        public frament_data: Float32Array;


        public attributes: Array<GLSL.VarRegister> = new Array<GLSL.VarRegister>();

        public state: IAnimationState; 

        public build(geometry: Geometry, count: number) {
        
        }

        public update(time: number, delay: number, geometry:Geometry , context: Context3DProxy) {
        }
    }
} 