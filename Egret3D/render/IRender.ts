module egret3d {
                                    
    /**
    * @private
    * @class egret3d.IRender
    * @classdesc
    * 场景中的可见物体，可渲染的对象。
    * 在渲染之前会将渲染树中对象进行筛选.
    * 只有IRender对象才会进入渲染管线
    * @see egret3d.Object3D
    * @see egret3d.Geometry
    * @version Egret 3.0
    * @platform Web,Native
    */
    export interface IRender extends IDispatchEvent{

        /**
        * @language zh_CN
        * 子对象列表。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        childs: Array<Object3D>;
        
        /**
        * @language zh_CN
        * 网格信息。</p>
         * geometry 为渲染对象的网格信息 ，渲染对象需要 vertexBuffer  和 indexBuffer 信息 及顶点着色器shade。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        geometry: Geometry;

        /**
        * @language zh_CN
        * 材质信息。</p>
        * 赋予对象节点可供渲染的材质球属性，让对象加入可渲染实体列表，及渲染对象与对象之间的混合，排序。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        material: MaterialBase;
        
        /**
        * @language zh_CN
        * 动作对象，控制骨骼动画。</p>
        * 可拓展的动画功能属性，动画功能的驱动类总接口。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        animation: IAnimation;

        /**
        * @language zh_CN
        * 返回 object 世界渲染矩阵
        * 如果有父亲节点对象的话，要乘以父对象的变换.
        * @returns IRender 世界渲染矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        modelMatrix: Matrix4_4;

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
        pickType: PickType;

        /**
        * @language zh_CN
        * 对象模型包围盒。</p>
        * 每个场景物件都需要有的 包围盒子，可以自定义包围盒形状大小，也可以根据模型本身生成。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        bound: Bound;

        /**
        * @language zh_CN
        * 对象模型当前使用包围盒。
        * @see mouseChilder 根据这个值取不同的包围盒为true取大包围盒 false取子包围盒
        * 
        * @version Egret 3.0
        * @platform Web,Native
        */
        currentBound: Bound;

        /**
        * @language zh_CN
        * 鼠标检测数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        pickResult: PickResult;

        /**
        * @language zh_CN
        * 是否开启拣选检测
        * @version Egret 3.0
        * @platform Web,Native
        */
        enablePick: boolean;

        /**
        * @language zh_CN
        * 是否开启检测LOD盒子，每个物体的碰撞盒子中有一个小的盒子，当开启这个盒子后，
        * 鼠标检测就是用的这个小盒子来进行检测
        * @version Egret 3.0
        * @platform Web,Native
        */
        mouseChilder: boolean;
                
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        enableCulling: boolean;
                
        /**
        * @language zh_CN
        * 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        visible: boolean;

        /**
        * @language zh_CN
        * 多维材质球支持
        * @version Egret 3.0
        * @platform Web,Native
        */
        multiMaterial: { [matID: number]: MaterialBase };

        /**
        * @language zh_CN
        * 材质球收到光照影响的灯光组，如果需要动态添加删除灯光的，一定要注意时实性
        * @version Egret 3.0
        * @platform Web,Native
        */
        lightGroup: LightGroup;

        //upload(context3DProxy: Context3DProxy);
        update(time: number, delay: number, camera: Camera3D);
        //renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) 
    }
}