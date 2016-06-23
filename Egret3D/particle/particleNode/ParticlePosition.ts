module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticlePosition
    * @classdesc
    * 粒子位置效果节点，刚出生相对于(0,0,0)位置的偏移量
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticlePosition extends AnimationNode {

        /**
        * @private
        */
        private _positions: ValueShape;
        private _node: ParticleDataShape;

        private _animationState: ParticleAnimationState;
        private attribute_offsetPosition: GLSL.VarRegister;
        constructor() {
            super();
            this.name = "ParticlePosition";

            this.attribute_offsetPosition = new GLSL.VarRegister();
            this.attribute_offsetPosition.name = "attribute_offsetPosition";
            this.attribute_offsetPosition.size = 3;
            this.attributes.push(this.attribute_offsetPosition);
        }


        /**
        * @language zh_CN
        * 填充粒子发射器形状数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            var node: ParticleDataShape = this._node = <ParticleDataShape>data;
            if (node.type == ParticleDataShape.Point) {
                var pointShape: Vec3ConstValueShape = new Vec3ConstValueShape();
                pointShape.minX = 0;
                pointShape.minY = 0;
                pointShape.minZ = 0;
                this._positions = pointShape;
            }
            else if (node.type == ParticleDataShape.Cube) {
                var cubeShape: CubeVector3DValueShape = new CubeVector3DValueShape();
                cubeShape.width = node.cubeW;
                cubeShape.height = node.cubeH;
                cubeShape.depth = node.cubeD;
                this._positions = cubeShape;
            }
            else if (node.type == ParticleDataShape.Sphere) {
                var sphereShape: BallValueShape = new BallValueShape();
                sphereShape.r = node.sphereRadius;
                this._positions = sphereShape;
            } else if (node.type == ParticleDataShape.HemiSphere) {
                var hemiShape: HemiBallValueShape = new HemiBallValueShape();
                hemiShape.r = node.hemiSphereRaiuds;
                this._positions = hemiShape;
            } else if (node.type == ParticleDataShape.Cone) {
                var coneShape: CylinderValueShape = new CylinderValueShape();
                coneShape.radiusTop = node.coneRadiusTop;
                coneShape.radiusBottom = node.coneRadiusBottom;
                coneShape.height = node.coneHeight;
                this._positions = coneShape;
            }

        }

        /**
        * @private
        * 计算用的矩阵
        */
        private rotationMat: Matrix4_4 = new Matrix4_4();


        
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {
            this._animationState = <ParticleAnimationState>this.state;
            var posArray: Vector3D[] = this._positions.calculate(count);
            var directionArray: Vector3D[] = this._animationState.directionArray = [];

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var data: ParticleData = this._animationState.emitter.data;

            var recordPos: Vector3D = new Vector3D();//用于计算方向，缩放后的位置不能用于计算方向
            var coneShape: CylinderValueShape = <CylinderValueShape>this._positions;
            for (var i: number = 0; i < count; ++i) {
                var pos: Vector3D = posArray[i];
                recordPos.copyFrom(pos);
                //缩放______________________________________________________
                pos.multiply(data.property.scale, pos);
                //旋转______________________________________________________
                if (data.property.rotation.x != 0 || data.property.rotation.y != 0 || data.property.rotation.z != 0) {
                    this.rotationMat.identity();
                    this.rotationMat.rotation(data.property.rotation.x, data.property.rotation.y, data.property.rotation.z);
                    this.rotationMat.transformVector4(pos, pos);
                }

                //粒子发射方向
                var dir: Vector3D = new Vector3D();
                if (data.shape.randomDirection) {
                    dir.setTo(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                } else {
                    if (this._node.type == ParticleDataShape.Point) {
                        dir.setTo(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                    } else if (this._node.type == ParticleDataShape.Cube) {
                        dir.setTo(0, 1, 0, 1);
                        this.rotationMat.identity();
                        this.rotationMat.rotation(data.property.rotation.x, data.property.rotation.y, data.property.rotation.z);
                        this.rotationMat.transformVector4(dir, dir);
                    } else if (this._node.type == ParticleDataShape.Sphere) {
                        dir.copyFrom(recordPos);
                    } else if (this._node.type == ParticleDataShape.HemiSphere) {
                        dir.copyFrom(recordPos);
                    } else if (this._node.type == ParticleDataShape.Cone) {
                        dir = coneShape.getDirection(recordPos, dir);
                    }

                    //旋转______________________________________________________
                    if (data.property.rotation.x != 0 || data.property.rotation.y != 0 || data.property.rotation.z != 0) {
                        this.rotationMat.identity();
                        this.rotationMat.rotation(data.property.rotation.x, data.property.rotation.y, data.property.rotation.z);
                        this.rotationMat.transformVector4(dir, dir);
                    }
                }

                dir.normalize();
                directionArray.push(dir);

                //平移______________________________________________________
                pos.x += data.property.position.x;
                pos.y += data.property.position.y;
                pos.z += data.property.position.z;
                
                //创建位置
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_offsetPosition.offsetIndex;

                    geometry.verticesData[index + 0] = pos.x;
                    geometry.verticesData[index + 1] = pos.y;
                    geometry.verticesData[index + 2] = pos.z;
                }
            }

        }
    }
} 