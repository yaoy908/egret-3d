﻿module egret3d {
    
    /**
     * @private
     * @language zh_CN
     * @class egret3d.GeometryType
     * @classdesc
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum GeometryType {
        normal_geometry,
        skin_geometry,
        particle_geometry,
    }

    /**
     * @language zh_CN
     * @class egret3d.VertexFormat
     * @classdesc
     * 顶点数据格式类型 是由2进制组成 一个顶点可以由多个类型组成
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum VertexFormat {
                
        /**
         * @private
         * @language zh_CN
         * 顶点坐标
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_POSITION = 0x00000001,

        /**
         * @private
         * @language zh_CN
         * 顶点法线
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_NORMAL = 0x00000002,
                        
        /**
         * @private
         * @language zh_CN
         * 顶点切线
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_TANGENT = 0x00000004,
        
        /**
         * @private
         * @language zh_CN
         * 顶点颜色
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_COLOR = 0x00000008,
        
        /**
         * @private
         * @language zh_CN
         * 顶点uv
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_UV0 = 0x00000010,
                
        /**
         * @private
         * @language zh_CN
         * 顶点第二uv
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_UV1 = 0x00000020,

        /**
         * @private
         * @language zh_CN
         * 顶点蒙皮信息
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_SKIN = 0x00000040,
    }

    /**
     * @language zh_CN
     * @class egret3d.Geometry
     * @classdesc
     * 表示几何形状 子集
     * @see egret3d.VertexBuffer3D
     * @see egret3d.IndexBuffer3D
     * @see egret3d.SubGeometry
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Geometry {

       /**
        * @language zh_CN
        * 模型的类别，是属于 静态模型，还是蒙皮动画模型，还是粒子模型，还是 特定模型
        *
        * @version Egret 3.0
        * @platform Web,Native
        */
        public geomtryType: number = -1;

        /**
        * @language zh_CN
        * 顶点格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _vertexFormat: number = 0 ;

        /**
        * @language zh_CN
        * 顶点属性长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexAttLength: number = 0;

        /**
        * @language zh_CN
        * 顶点数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public verticesData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 索引数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public indexData: Array<number> = new Array<number>();
                
        /**
        * @language zh_CN
        * shader buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sharedVertexBuffer: VertexBuffer3D;
        /**
        * @language zh_CN
        * shader index
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sharedIndexBuffer: IndexBuffer3D;

        /**
        * @private
        * @language zh_CN
        * 顶点坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public source_positionData: Array<number> = new Array<number>();
                        
        /**
        * @private
        * @language zh_CN
        * 顶点法线数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public source_normalData: Array<number> = new Array<number>();
                                
        /**
        * @private
        * @language zh_CN
        * 顶点切线数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public source_tangentData: Array<number> = new Array<number>();
                                
        /**
        * @private
        * @language zh_CN
        * 顶点颜色数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public source_colorData: Array<number> = new Array<number>();
                                
        /**
        * @private
        * @language zh_CN
        * 顶点uv数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public source_uvData: Array<number> = new Array<number>();
                                
        /**
        * @private
        * @language zh_CN
        * 顶点第二uv数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public source_uv2Data: Array<number> = new Array<number>();

        /**
        * @private
        * @language zh_CN
        * 顶点第二uv数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public source_SkinData: Array<number> = new Array<number>();

        /**
        * @private
        */
        public skeleton: Skeleton;

        /**
        * @language zh_CN
        * 顶点字节数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexSizeInBytes: number;

        /**
        * @language zh_CN
        * 面翻转，仅对系统 geometry 有效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public faceOrBack: boolean = false 

        /**
        * @language zh_CN
        * 顶点坐标大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static positionSize: number = 3;

        /**
        * @language zh_CN
        * 顶点法线大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static normalSize: number = 3;

        /**
        * @language zh_CN
        * 顶点切线大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static tangentSize: number = 3;

        /**
        * @language zh_CN
        * 顶点色大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static colorSize: number = 4;

        /**
        * @language zh_CN
        * 顶点uv大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static uvSize: number = 2;

        /**
        * @language zh_CN
        * 顶点uv2大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static uv2Size: number = 2;

        /**
        * @language zh_CN
        * 顶点uv2大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static skinSize: number = 8;

        /**
        * @language zh_CN
        * geometry子集
        * @version Egret 3.0
        * @platform Web,Native
        */
        public subGeometrys: Array<SubGeometry> = new Array<SubGeometry>();       

        /**
        * @language zh_CN
        * @private
        * buffer 需要重新提交的时候
        */
        private _bufferDiry: boolean = true;


        public _vertexCount: number = -1;
    
        /**
        * @language zh_CN
        * 得到顶点的数量
        * @returns number 顶点的数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get vertexCount(): number {
            if (this._vertexCount < 0) {
                this._vertexCount = this.verticesData.length / this.vertexAttLength;
            }

            return this._vertexCount;
        }
            
        /**
        * @language zh_CN
        * 设置顶点的数量
        * @param value 顶点的数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set vertexCount(value:number) {
            this._vertexCount = value;
        }

        /**
        * @language zh_CN
        * @private
        */
        public buildDefaultSubGeometry() {
            var subGeometry: SubGeometry = new SubGeometry();
            subGeometry.matID = 0;
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexData ? this.indexData.length : 0 ;
            this.subGeometrys.push(subGeometry);
        }

        /**
        * @language zh_CN
        * 使用和定义顶点的数据结构
        *<p>例如 vertexFormat( VertexFormat.VF_POSITION )
        *设置这样的定义后,就会增加这样的数据顶点数据结构，
        *如果源文件中没有这样的数据结构，
        *就会通过计算的方式计算补全，
        *不能计算的就默认为0
        *@param vertexFormat 需要定义的顶点格式类型 VertexFormat.VF_COLOR | VertexFormat.VF_UV1
        * this.useVertexFormat( VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR |  VertexFormat.VF_UV0 | VertexFormat.VF_UV1 );//定义了一个完整的数据结构
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set vertexFormat(vertexFormat: number) {
            this._vertexFormat = vertexFormat;

            if (this.vertexFormat & VertexFormat.VF_POSITION) {
                this.vertexAttLength += Geometry.positionSize;
            }

            if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                this.vertexAttLength += Geometry.normalSize;
            }

            if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                this.vertexAttLength += Geometry.tangentSize;
            }

            if (this.vertexFormat & VertexFormat.VF_COLOR) {
                this.vertexAttLength += Geometry.colorSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV0) {
                this.vertexAttLength += Geometry.uvSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV1) {
                this.vertexAttLength += Geometry.uv2Size;
            }

            if (this.vertexFormat & VertexFormat.VF_SKIN) {
                this.vertexAttLength += Geometry.skinSize;
            }

            this.vertexSizeInBytes = this.vertexAttLength * 4;
        }
                        
        /**
        * @language zh_CN
        * 获取顶点格式
        * @returns number 顶点格式
        * @version Egret 3.0
        * @platform Web,Native
        */

        public get vertexFormat(): number {
            return this._vertexFormat;
        }
                
        /**
        * @private
        * @language zh_CN
        * 根据顶点格式生成顶点buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calculateVertexFormat() {
            this.vertexCount = this.source_positionData.length / Geometry.positionSize;
            for (var i: number = 0; i < this.vertexCount; ++i) {
                if (this.vertexFormat & VertexFormat.VF_POSITION) {
                    this.verticesData.push(this.source_positionData[i * Geometry.positionSize]);
                    this.verticesData.push(this.source_positionData[i * Geometry.positionSize + 1]);
                    this.verticesData.push(this.source_positionData[i * Geometry.positionSize + 2]);
                }

                if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                    this.verticesData.push(this.source_normalData[i * Geometry.normalSize]);    
                    this.verticesData.push(this.source_normalData[i * Geometry.normalSize + 1]);
                    this.verticesData.push(this.source_normalData[i * Geometry.normalSize + 2]);
                }

                if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                    this.verticesData.push(this.source_tangentData[i * Geometry.tangentSize]);
                    this.verticesData.push(this.source_tangentData[i * Geometry.tangentSize + 1]);
                    this.verticesData.push(this.source_tangentData[i * Geometry.tangentSize + 2]);
                }

                if (this.vertexFormat & VertexFormat.VF_COLOR) {
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize]);
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize + 1]);
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize + 2]);
                    this.verticesData.push(this.source_colorData[i * Geometry.colorSize + 3]);
                }

                if (this.vertexFormat & VertexFormat.VF_UV0) {
                    this.verticesData.push(this.source_uvData[i * Geometry.uvSize]);
                    this.verticesData.push(this.source_uvData[i * Geometry.uvSize + 1]);
                }

                if (this.vertexFormat & VertexFormat.VF_UV1) {
                    this.verticesData.push(this.source_uv2Data[i * Geometry.uv2Size]);
                    this.verticesData.push(this.source_uv2Data[i * Geometry.uv2Size + 1]);
                }

                if (this.vertexFormat & VertexFormat.VF_SKIN) {
                    for (var j = 0; j < Geometry.skinSize; ++j) {
                        this.verticesData.push(this.source_SkinData[i * Geometry.skinSize + j]);
                    }
                }
            }
        }
                        
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeState(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            if (this._bufferDiry) {
                this._bufferDiry = false; 
                this.upload(context3DProxy);
            }
            context3DProxy.bindVertexBuffer(this.sharedVertexBuffer);
            context3DProxy.bindIndexBuffer(this.sharedIndexBuffer);
        }
                                
        /**
        * @language zh_CN
        * 提交顶点数据 如果顶点数据有变化的话,需要调用此函数重新提交
        * @param context3DProxy 上下文设备
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3DProxy: Context3DProxy, drawType: number = Context3DProxy.gl.STATIC_DRAW ) {
            if (!this.sharedIndexBuffer && !this.sharedVertexBuffer) {
                this.sharedIndexBuffer = context3DProxy.creatIndexBuffer(this.indexData);
                this.sharedVertexBuffer = context3DProxy.creatVertexBuffer(this.verticesData,drawType);
            } else {
                this.sharedVertexBuffer.arrayBuffer.set(this.verticesData);
                context3DProxy.uploadVertexBuffer(this.sharedVertexBuffer);
            }
        }

        /**
        * @language zh_CN
        * 由顶点索引根据格式拿到顶点数据
        * @param index 顶点索引
        * @param vf 得到顶点的需要的数据格式
        * @param target 得到数据返回目标可以为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getVertexForIndex(index: number, vf: VertexFormat, target: Array<number> = null): Array<number> {
            if (!target) {
                target = new Array<number>();
            }

            if (index < 0 || index >= this.verticesData.length) {
                return target;
            }
            var offset: number = 0;
            if (this.vertexFormat & VertexFormat.VF_POSITION) {
                if (vf & VertexFormat.VF_POSITION) {
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 0]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 1]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 2]);
                }
                offset += Geometry.positionSize;
            }

            if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                if (vf & VertexFormat.VF_NORMAL) {
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 0]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 1]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 2]);
                }
                offset += Geometry.normalSize;
            }

            if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                if (vf & VertexFormat.VF_TANGENT) {
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 0]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 1]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 2]);
                }
                offset += Geometry.tangentSize;
            }

            if (this.vertexFormat & VertexFormat.VF_COLOR) {
                if (vf & VertexFormat.VF_COLOR) {
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 0]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 1]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 2]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 3]);
                }
                offset += Geometry.colorSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV0) {
                if (vf & VertexFormat.VF_UV0) {
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 0]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 1]);
                }
                offset += Geometry.uvSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV1) {
                if (vf & VertexFormat.VF_UV1) {
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 0]);
                    target.push(this.verticesData[index * this.vertexAttLength + offset + 1]);
                }
                offset += Geometry.uv2Size;
            }

            if (this.vertexFormat & VertexFormat.VF_SKIN) {
                if (vf & VertexFormat.VF_SKIN) {
                    for (var j = 0; j < Geometry.skinSize; ++j) {
                        target.push(this.verticesData[index * this.vertexAttLength + offset + j]);
                    }
                }
                offset += Geometry.skinSize;
            }
        
            return target;
        }

        /**
        * @language zh_CN
        * 由顶点索引根据格式设置顶点数据
        * @param index 顶点索引
        * @param vf 设置顶点的需要的数据格式
        * @param src 设置的数据
        * @param vertexCount 设置的顶点数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setVerticesForIndex(index: number, vf: VertexFormat, src: Array<number>, vertexCount: number = 1) {
            var offset: number = 0;
            var srcOffset: number = 0;
            for (var i: number = 0; i < vertexCount; ++i) {
                offset = 0;
                if (this.vertexFormat & VertexFormat.VF_POSITION) {
                    if (vf & VertexFormat.VF_POSITION) {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.verticesData[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.verticesData[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                        srcOffset += Geometry.positionSize;
                    }
                    else {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 1] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 2] = 0;
                    }
                    offset += Geometry.positionSize;
                }

                if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                    if (vf & VertexFormat.VF_NORMAL) {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.verticesData[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.verticesData[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                        srcOffset += Geometry.normalSize;
                    }
                    else {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 1] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 2] = 0;
                    }
                    offset += Geometry.normalSize;
                }

                if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                    if (vf & VertexFormat.VF_TANGENT) {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.verticesData[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.verticesData[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                        srcOffset += Geometry.tangentSize;
                    }
                    else {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 1] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 2] = 0;
                    }
                    offset += Geometry.tangentSize;
                }

                if (this.vertexFormat & VertexFormat.VF_COLOR) {
                    if (vf & VertexFormat.VF_COLOR) {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.verticesData[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.verticesData[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                        this.verticesData[index * this.vertexAttLength + offset + 3] = src[srcOffset + 3];
                        srcOffset += Geometry.colorSize;
                    }
                    else {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = 1;
                        this.verticesData[index * this.vertexAttLength + offset + 1] = 1;
                        this.verticesData[index * this.vertexAttLength + offset + 2] = 1;
                        this.verticesData[index * this.vertexAttLength + offset + 3] = 1;
                    }
                    offset += Geometry.colorSize;
                }

                if (this.vertexFormat & VertexFormat.VF_UV0) {
                    if (vf & VertexFormat.VF_UV0) {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.verticesData[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        srcOffset += Geometry.uvSize;
                    }
                    else {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 1] = 0;
                    }
                    offset += Geometry.uvSize;
                }

                if (this.vertexFormat & VertexFormat.VF_UV1) {
                    if (vf & VertexFormat.VF_UV1) {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.verticesData[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        srcOffset += Geometry.uv2Size;
                    }
                    else {
                        this.verticesData[index * this.vertexAttLength + offset + 0] = 0;
                        this.verticesData[index * this.vertexAttLength + offset + 1] = 0;
                    }
                    offset += Geometry.uv2Size;
                }

                if (this.vertexFormat & VertexFormat.VF_SKIN) {
                    if (vf & VertexFormat.VF_SKIN) {
                        for (var j = 0; j < Geometry.skinSize; ++j) {
                            this.verticesData[index * this.vertexAttLength + offset + j] = src[srcOffset + j];
                        }
                        srcOffset += Geometry.skinSize;
                    }
                    else {
                        for (var j = 0; j < Geometry.skinSize; ++j) {
                            this.verticesData[index * this.vertexAttLength + offset + j] = 0;
                        }
                    }
                    offset += Geometry.skinSize;
                }

                index++;
            }
        }

        /**
        * @language zh_CN
        * 获取顶点索引数据
        * @param start 数据开始位置
        * @param count 需要的索引数据，默认参数为-1，如果为-1那么取从start后面的所有索引数据
        * @param target 取到之后的数据，默认参数为null，如果为null那么就会new Array<number>进行返回
        * @returns Array<number> 索引数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getVertexIndices(start: number, count: number = -1, target: Array<number> = null): Array<number> {
            if (!target) {
                target = new Array<number>();
            }
            count == -1 ? count = this.indexData.length : count;

            for (var i: number = 0; i < count - start; ++i) {
                target[i] = this.indexData[i + start];
            }
            return target;
        }

        /**
        * @language zh_CN
        * 设置顶点索引数据
        * @param start 数据开始位置
        * @param indices 数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setVertexIndices(start: number, indices: Array<number>) {
            for (var i: number = 0; i < indices.length; ++i) {
                this.indexData[start + i] = indices[i];
            }
        }
    }
} 