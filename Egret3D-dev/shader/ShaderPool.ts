module egret3d_dev {
    export class ShaderPool {
        //总shader的map容器
        static programlib: HashMap = new HashMap();
        static vsShaderHashMap: HashMap = new HashMap();
        static fsShaderHashMap: HashMap = new HashMap();

        private static context: Context3DProxy;
        constructor() {
            
        }

        public static register(context: Context3DProxy) {
            this.context = context;
        }

        private static getCombin(list: Array<string>): string {
            var name: string = "";
            for (var i: number = 0; i < list.length; i++){
                name += list[i];
            }
            return name;
        }

        public static getVertexShader(vertexShaderList: Array<string> ) {
            var name: string = this.getCombin(vertexShaderList);
            var shader: Shader;
            if (this.vsShaderHashMap.isHas(name))
                shader = this.vsShaderHashMap.getValue(name);
            else {
                shader = this.registerShader(Shader.vertex, vertexShaderList);
                shader.id = name;
                this.vsShaderHashMap.add(name,shader);
            }
                return shader;
        }

        public static getFragmentShader(fragmentShaderList: Array<string>) {
            var name: string = this.getCombin(fragmentShaderList);
            var shader: Shader;
            if (this.fsShaderHashMap.isHas(name))
                shader = this.fsShaderHashMap.getValue(name);
            else {
                shader = this.registerShader(Shader.vertex, fragmentShaderList);
                shader.id = name;
                this.fsShaderHashMap.add(name, shader);
            }
            return shader;
        }

        public static getProgram(vslist: Array<string>, fsList: Array<string>): Program3D {
            var vsShader: Shader = this.getVertexShader(vslist);
            var fsShader: Shader = this.getFragmentShader(fsList);
            var name: string = vsShader.id + fsShader.id;
            var program3D: Program3D;
            if (this.programlib.isHas(name)) {
                program3D = this.programlib.getValue(name);
            } else {
                program3D = this.registerProgram(vslist, fsList);
                this.programlib.add(name,program3D);
            }
            return this.programlib.getValue(name);
        }

        private static registerShader(shaderType: number, list: Array<string>): Shader {
            var shaderSourceList: string = "" ;
            var shader: Shader;
            for (var i: number = 0; i < list.length; i++){
                shaderSourceList += ShaderLib.lib[list[i]] ;
            }
            if (shaderType == Shader.vertex) {
                shader = this.context.creatVertexShader(shaderSourceList);
            } else if (shaderType == Shader.fragment) {
                shader = this.context.creatFragmentShader(shaderSourceList);
            }
            return shader ;
        }

        private static unRegisterShader(list: Array<string>) {
        }

        private static registerProgram(vslist: Array<string>, fsList: Array<string>):Program3D {
            var vsShader: Shader = this.getVertexShader(vslist);
            var fsShader: Shader = this.getFragmentShader(fsList);
            var program3D: Program3D = this.context.creatProgram(vsShader, fsShader);
            return program3D; 
        }

        private static unRegisterProgram(vsKey: string, fsKey: string) {
        }
    }
}


  






      