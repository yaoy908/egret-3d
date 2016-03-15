module egret3d {
                
    /**
    * @class egret3d.Mesh
    * @classdesc
    * 3d模型网格 生成渲染模型
    * 创建一个Mesh网格数据和材质数据是必需的，如果是动态模型就加上动画数据
    * 继承Object3D对象，场景中实体渲染对象
    *
    * @see egret3d.Object3D
    * @see egret3d.GeometryBase
    * @see egret3d.MaterialBase
    * @see egret3d.IAnimation
    *
    * 示例:
    * @includeExample core/node/Mesh.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Mesh extends Object3D implements IRender{

        /**
        * @language zh_CN
        * 网格信息。</p>
         * geometry 为渲染对象的网格信息 ，渲染对象需要 vertexBuffer  和 indexBuffer 信息 及顶点着色器shade。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public geometry: Geometry;
                        
        /**
        * @language zh_CN
        * 材质信息。</p>
        * 赋予对象节点可供渲染的材质球属性，让对象加入可渲染实体列表，及渲染对象与对象之间的混合，排序。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public material: MaterialBase;

        /**
        * @language zh_CN
        * 动作对象，控制骨骼动画。</p>
        * 可拓展的动画功能属性，动画功能的驱动类总接口。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animation: IAnimation = null;

        /**
        * @language zh_CN
        * 鼠标拣选类型。</p>
        * 设置鼠标的拣选类型，可通过 PickType来进行设置。</p>
        * 快速拣选默认使用 正方形包围盒子。</p>
        * 高精度型需要 PositionPick ， uv pick 等。</p>
        * @see egret3d.PickType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pickType: PickType = PickType.BoundPick;

        /**
        * @language zh_CN
        * 对象模型包围盒。</p>
        * 每个场景物件都需要有的 包围盒子，可以自定义包围盒形状大小，也可以根据模型本身生成。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bound: Bound;

        /**
        * @language zh_CN
        * 鼠标检测数据
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pickResult: PickResult = new PickResult();


        /**
        * @language zh_CN
        * 构建一个Mesh对象
        * @param geometry 模型数据
        * @param material 模型材质
        * @param animation 模型动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(geometry: Geometry, material: MaterialBase) {
            super();

            this.geometry = geometry;
            this.material = material;

            this.bound = this.buildBoundBox();
        }

        public setMaterialByID() {
        }
                        
        /**
        * @private
        */
        public init() {
            if (this.geometry)
                this.geometry.init();
        }

        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的模型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Mesh {
            return new Mesh(this.geometry, this.material );
        }
                                
        /**
        * @language zh_CN
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            if (this.isDisable)
                return;

            if (this.animation) {
                this.animation.update(time, delay);
            }
        }

        /**
        * @language zh_CN
        * @private
        * 生成包围盒
        */
        protected buildBoundBox(): Bound {
            var bound: BoundBox = new BoundBox();
            bound.min.copyFrom(new Vector3D(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE));
            bound.max.copyFrom(new Vector3D(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE));
            for (var i: number = 0; i < this.geometry.verticesData.length; i += this.geometry.vertexAttLength) {
                if (bound.max.x < this.geometry.verticesData[i]) {
                    bound.max.x = this.geometry.verticesData[i];
                }
                if (bound.max.y < this.geometry.verticesData[i + 1]) {
                    bound.max.y = this.geometry.verticesData[i + 1];
                }
                if (bound.max.z < this.geometry.verticesData[i + 2]) {
                    bound.max.z = this.geometry.verticesData[i + 2];
                }

                if (bound.min.x > this.geometry.verticesData[i]) {
                    bound.min.x = this.geometry.verticesData[i];
                }
                if (bound.min.y > this.geometry.verticesData[i + 1]) {
                    bound.min.y = this.geometry.verticesData[i + 1];
                }
                if (bound.min.z > this.geometry.verticesData[i + 2]) {
                    bound.min.z = this.geometry.verticesData[i + 2];
                }
            }

            bound.fillBox(bound.min, bound.max);
            return bound;
        }

        private _i: number; 
        private _subGeometry: SubGeometry;
        private _matID: number; 
        
        /**
        * @private
        */
        public renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            this._i = 0;
            this.geometry.update(time, delay,context3DProxy, camera3D);
            for (this._i = 0; this._i < this.geometry.subGeometrys.length; this._i++) {
                this._subGeometry = this.geometry.subGeometrys[this._i];
                this._matID = this._subGeometry.matID;
                this.material.renderDiffusePass(time, delay, this._matID , context3DProxy, this.modelMatrix, camera3D, this._subGeometry, this.animation);
            }
        }
    }
} 