module egret3d_dev {
                                            
    /**
    * @private
    * @private
    * @class egret3d.ShaderBase
    * @classdesc
    * shader 基类
    */
    export class ShaderBase {
        
        protected index: number = 0;
        protected source: string = "precision highp float;            \t\n";

        protected shadersName: Array<string> = new Array<string>();
        protected endShadername: string = "";
        protected stateChange: boolean = false;

        public materialData: MaterialData;

        /**
        * @language zh_CN
        * 
        */
        public maxBone: number = 0;
                        
        /**
        * @language zh_CN
        * constructor
        * @param materialData
        * @param usage
        */
        constructor( ) {
        }

        /**
        * @language zh_CN
        * 
        * @param shaderName xxx
        */
        public addShader(shaderName: string) {

            this.shadersName.push(shaderName);
        }

        /**
        * @language zh_CN
        * 
        * @param shaderName xxx
        */
        public addEnd(shaderName: string) {

            this.endShadername = shaderName ;
        }

        /**
        * @language zh_CN
        * 
        * @returns string
        */
        public getShaderSource(passUsage:PassUsage) {

            if (this.endShadername != "") {
                var index: number = this.shadersName.indexOf(this.endShadername);
                if (index == -1) {
                    this.shadersName.push(this.endShadername);
                }
            }

            this.source += ShaderUtil.instance.fillShaderContent(this, this.shadersName, passUsage);
        }
    }
} 