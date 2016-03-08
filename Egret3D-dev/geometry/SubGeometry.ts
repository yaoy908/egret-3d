module egret3d_dev {

    /**
     * @language zh_CN
     * @class egret3d_dev.SubGeometry
     * @classdesc
     * 表示几何形状 子集
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class SubGeometry {
        /**
         * @language zh_CN
         * 顶点索引
         * @version Egret 3.0
         * @platform Web,Native
         */
        public start: number = 0;
                
        /**
         * @language zh_CN
         * 顶点数量
         * @version Egret 3.0
         * @platform Web,Native
         */
        public count: number = 0;

        /**
         * @language zh_CN
         * 材质ID
         * @version Egret 3.0
         * @platform Web,Native
         */
        public matID: number = 0;
        
        /**
         * @language zh_CN
         * @private
         * @version Egret 3.0
         * @platform Web,Native
         */
        public geometry: Geometry;

        private attList: Array<GLSL.Attribute> = new Array<GLSL.Attribute>();
        private _attributeDiry: boolean = true; 
        /**
        * @language zh_CN
        * 创建一个SubGeometry
        */
        constructor() {
        }

        public upload(passUsage: PassUsage, contextPorxy: Context3DProxy) {

            this._attributeDiry = false ;
            var offset: number = 0;
            this.attList.length = 0;
            if (this.geometry.vertexFormat & VertexFormat.VF_POSITION) {
                if (!passUsage.attribute_position.uniformIndex) {
                    passUsage.attribute_position.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_position.varName);
                }

                passUsage.attribute_position.size = Geometry.positionSize;
                passUsage.attribute_position.dataType = ContextConfig.FLOAT;
                passUsage.attribute_position.normalized = false;
                passUsage.attribute_position.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_position.offset = offset;

                this.attList.push(passUsage.attribute_position);

                offset += Geometry.positionSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_NORMAL) {
                if (!passUsage.attribute_normal.uniformIndex) {
                    passUsage.attribute_normal.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_normal.varName);
                }

                passUsage.attribute_normal.size = Geometry.normalSize;
                passUsage.attribute_normal.dataType = ContextConfig.FLOAT;
                passUsage.attribute_normal.normalized = false;
                passUsage.attribute_normal.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_normal.offset = offset;

                this.attList.push(passUsage.attribute_normal);

                offset += Geometry.normalSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_TANGENT) {
                if (!passUsage.attribute_tangent.uniformIndex) {
                    passUsage.attribute_tangent.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_tangent.varName);
                }

                passUsage.attribute_tangent.size = Geometry.tangentSize;
                passUsage.attribute_tangent.dataType = ContextConfig.FLOAT;
                passUsage.attribute_tangent.normalized = false;
                passUsage.attribute_tangent.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_tangent.offset = offset;

                this.attList.push(passUsage.attribute_tangent);

                offset += Geometry.tangentSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_COLOR) {
                if (!passUsage.attribute_color.uniformIndex) {
                    passUsage.attribute_color.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_color.varName);
                }

                passUsage.attribute_color.size = Geometry.colorSize;
                passUsage.attribute_color.dataType = ContextConfig.FLOAT;
                passUsage.attribute_color.normalized = false;
                passUsage.attribute_color.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_color.offset = offset;

                this.attList.push(passUsage.attribute_color);

                offset += Geometry.colorSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_UV) {
                if (!passUsage.attribute_uv0.uniformIndex) {
                    passUsage.attribute_uv0.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_uv0.varName);
                }

                passUsage.attribute_uv0.size = Geometry.uvSize;
                passUsage.attribute_uv0.dataType = ContextConfig.FLOAT;
                passUsage.attribute_uv0.normalized = false;
                passUsage.attribute_uv0.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_uv0.offset = offset;

                this.attList.push(passUsage.attribute_uv0);

                offset += Geometry.uvSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_UV2) {
                if (!passUsage.attribute_uv1.uniformIndex) {
                    passUsage.attribute_uv1.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_uv1.varName);
                }

                passUsage.attribute_uv1.size = Geometry.uv2Size;
                passUsage.attribute_uv1.dataType = ContextConfig.FLOAT;
                passUsage.attribute_uv1.normalized = false;
                passUsage.attribute_uv1.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_uv1.offset = offset;

                this.attList.push(passUsage.attribute_uv1);

                offset += Geometry.uv2Size * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_SKIN) {
                if (!passUsage.attribute_boneIndex.uniformIndex) {
                    passUsage.attribute_boneIndex.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_boneIndex.varName);
                }

                passUsage.attribute_boneIndex.size = Geometry.skinSize / 2;
                passUsage.attribute_boneIndex.dataType = ContextConfig.FLOAT;
                passUsage.attribute_boneIndex.normalized = false;
                passUsage.attribute_boneIndex.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_boneIndex.offset = offset;

                this.attList.push(passUsage.attribute_boneIndex);

                offset += Geometry.skinSize / 2 * 4;

                if (!passUsage.attribute_boneWeight.uniformIndex) {
                    passUsage.attribute_boneWeight.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_boneWeight.varName);
                }
                passUsage.attribute_boneWeight.size = Geometry.skinSize / 2;
                passUsage.attribute_boneWeight.dataType = ContextConfig.FLOAT;
                passUsage.attribute_boneWeight.normalized = false;
                passUsage.attribute_boneWeight.stride = this.geometry.vertexSizeInBytes;
                passUsage.attribute_boneWeight.offset = offset;
                this.attList.push(passUsage.attribute_boneWeight);

                offset += Geometry.skinSize / 2 * 4;
            }
        }

        public update(time: number, delay: number, passUsage: PassUsage, contextPorxy: Context3DProxy) {
            if (this._attributeDiry)
                this.upload(passUsage, contextPorxy);

            for (var i: number = 0; i < this.attList.length; i++){
                contextPorxy.vertexAttribPointer(passUsage.program3D, this.attList[i].uniformIndex, this.attList[i].size, this.attList[i].dataType, this.attList[i].normalized, this.attList[i].stride, this.attList[i].offset);
            }
        }
    }
} 