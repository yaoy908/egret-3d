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

        /**
        * @language zh_CN
        * 创建一个SubGeometry
        */
        constructor() {
        }

        public update(time: number, delay: number, passUsage: PassUsage, contextPorxy: Context3DProxy) {

            var index: number = 0;
            if (this.geometry.vertexFormat & VertexFormat.VF_POSITION) {
                if (!passUsage.attribute_position.uniformIndex) {
                    passUsage.attribute_position.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_position.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_position.uniformIndex, Geometry.positionSize, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);
               
                index += Geometry.positionSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_NORMAL) {
                if (!passUsage.attribute_normal.uniformIndex) {
                    passUsage.attribute_normal.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_normal.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_normal.uniformIndex, Geometry.normalSize, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);
               
                index += Geometry.normalSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_TANGENT) {
                if (!passUsage.attribute_tangent.uniformIndex) {
                    passUsage.attribute_tangent.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_tangent.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_tangent.uniformIndex, Geometry.tangentSize, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);
               
                index += Geometry.tangentSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_COLOR) {
                if (!passUsage.attribute_color.uniformIndex) {
                    passUsage.attribute_color.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_color.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_color.uniformIndex, Geometry.colorSize, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);

                index += Geometry.colorSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_UV) {
                if (!passUsage.attribute_uv0.uniformIndex) {
                    passUsage.attribute_uv0.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_uv0.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_uv0.uniformIndex, Geometry.uvSize, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);

                index += Geometry.uvSize * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_UV2) {
                if (!passUsage.attribute_uv1.uniformIndex) {
                    passUsage.attribute_uv1.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_uv1.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_uv1.uniformIndex, Geometry.uv2Size, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);

                index += Geometry.uv2Size * 4;
            }

            if (this.geometry.vertexFormat & VertexFormat.VF_SKIN) {
                if (!passUsage.attribute_boneIndex.uniformIndex) {
                    passUsage.attribute_boneIndex.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_boneIndex.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_boneIndex.uniformIndex, Geometry.skinSize / 2, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);

                index += Geometry.skinSize / 2 * 4;

                if (!passUsage.attribute_boneWeight.uniformIndex) {
                    passUsage.attribute_boneWeight.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_boneWeight.varName);
                }
                contextPorxy.vertexAttribPointer(passUsage.program3D, passUsage.attribute_boneWeight.uniformIndex, Geometry.skinSize / 2, ContextConfig.FLOAT, false, this.geometry.vertexSizeInBytes, index);

                index += Geometry.skinSize / 2 * 4;
            }

        }
    }
} 