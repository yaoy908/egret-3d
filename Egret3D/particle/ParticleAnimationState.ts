module egret3d {
    export class ParticleAnimationState implements IAnimationState {

        public name: string;

        public animNodes: AnimationNode[];
        public keyFrames: AnimationCurve[];

        public numberOfVertices: number = 0 ;
        public vertexSizeInBytes: number = 0 ;

        public vertex_shaders: string[];
        public fragment_shaders: string[];

        public totalTime: number = 0;
        public maxSpace: number = 0;

        public maxParticles: number = 0;

        /**
        * @language zh_CN
        * 动画节点容器
        */
        public rate: number = 0;

        /**
        * @language zh_CN
        * 动画节点容器
        */
        public loop: number = 1.0;  //0.0/1.0

        /**
        * @language zh_CN
        * 动画节点容器
        */
        public duration: number = 5.0;

        /**
        * @language zh_CN
        * 动画节点容器
        */
        public reverse: number = 1.0;//0.0/1.0

        public followTarget: Object3D = null;

        constructor(name: string) {
            this.name = name;

            this.animNodes = [];
            this.keyFrames = [];
            this.vertex_shaders = [];
            this.fragment_shaders = [];
        }

        /**
         * @language zh_CN
         * 添加动画功能节点
         * 添加继承 animNodeBase 功能节点 例如粒子的 加速度功能节点，匀速功能节点
         * @param node 节点对象
         */
        public addNode(node: AnimationNode) {
            node.state = this ;
            this.animNodes.push(node);
        }

        /**
        * @language zh_CN
        * 移除动画功能节点
        * 删除指定的动画功能节点，但是不能动态删除，需要进行 功能重置
        * @param node 节点对象
        */
        public removeNode(node: AnimationNode) {
            var index: number = this.animNodes.indexOf(node);
            if (index != -1)
                this.animNodes.splice(index, 1);
        }

         /**
        * @language zh_CN
        * 清空分配好的动画节点
        * @param node 节点对象
        */
        public clean() {
            this.animNodes.length = 0; 
        }

        /**
        * @language zh_CN
        * 计算节点
        * @private 
        */
        public calculate(geometry: Geometry) {
            this.vertex_shaders.length = 0;
            this.fragment_shaders.length = 0;

            for (var i: number = 0; i < this.animNodes.length; i++) {

                if (this.animNodes[i].vertex_ShaderName != "")
                    this.vertex_shaders.push(this.animNodes[i].vertex_ShaderName);
                if (this.animNodes[i].frament_ShaderName!="")
                    this.fragment_shaders.push(this.animNodes[i].frament_ShaderName);

                var offsetIndex: number = geometry.vertexAttLength ; 
                for (var j: number = 0; j < this.animNodes[i].attributes.length; ++j) {
                    if (this.animNodes[i].attributes[j].size > 0) {
                        this.animNodes[i].attributes[j].offsetIndex = offsetIndex ; 
                        geometry.vertexAttLength += this.animNodes[i].attributes[j].size;
                        geometry.vertexSizeInBytes += this.animNodes[i].attributes[j].size * 4;
                        geometry.subGeometrys[0].preAttList.push(this.animNodes[i].attributes[j]);
                    }
                    offsetIndex = geometry.vertexAttLength;
                }
            }
        }

        public fill(geometry: Geometry, maxParticle: number) {
            for (var i: number = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].build(geometry, maxParticle);
            }
        }

        public update(time: number, delay: number, geometry: Geometry,  context: Context3DProxy ) {
            for (var i: number = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].update(time, delay,geometry,context);
            }
        }
    }
}