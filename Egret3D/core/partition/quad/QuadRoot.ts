module egret3d {

    export class QuadRoot {
        private _maxTrianglesPerCell: number;												// 一个Cell中最多几个三角
        private _minCellSize: number;														//一个cell单元最小划分到多小
        private _quadTree: QuadTree;												        // 四叉树
        private _collisionNodesIdx: Array<number>;											// 碰撞到的三角
        private _segBox: QuadAABB;															// 碰撞检测用aabb
        private _collisionNodes: Array<IQuadNode>;									        //检测的nodes结果存放
        private _scene: Scene3D;

        constructor(scene: Scene3D, maxNodesPerCell: number = 10, minCellSize: number = 500) {
            this._scene = scene;
            this._maxTrianglesPerCell = maxNodesPerCell;
            this._minCellSize = minCellSize;
            this._segBox = new QuadAABB;
            this._collisionNodesIdx = new Array<number>();
            this._collisionNodes = new Array<IQuadNode>();
        }

        // 创建并构造四叉树
        public createQuadTree(): void {
            var nodes: Array<IQuadNode> = new Array<IQuadNode>();
            //遍历所有节点，将所有的IQuadNode放入到树中
            this.appendObject3D(nodes, this._scene.root);

            this._quadTree = new QuadTree();
            this._quadTree.initNodes(nodes);
            this._quadTree.buildQuadTree(this._maxTrianglesPerCell, this._minCellSize);
        }

        private appendObject3D(nodes: Array<IQuadNode>, obj: Object3D): void {
            var mesh: Mesh = <Mesh>obj;
            if (mesh && mesh.aabb) {
                nodes.push(mesh);
            }
            
            var child: Object3D;
            if (obj.childs && obj.childs.length > 0) {
                for (child of obj.childs) {
                    this.appendObject3D(nodes, child);
                }
            }
            
        }

        //框选出一批相交的nodes
        public getNodesByAABB(minX: number, minY: number, maxX: number, maxY: number): Array<IQuadNode> {
            // 创建一个射线的boundingbox
            this._segBox.clear();
            this._segBox.maxPosX = maxX;
            this._segBox.maxPosY = maxY;
            this._segBox.minPosX = minX;
            this._segBox.minPosY = minY;

            // 获取Boundingbox中的nodes
            this._collisionNodesIdx.length = 0;
            this._collisionNodes.length = 0;
            var numNodes: number = this._quadTree.getNodesIntersectingtAABox(this._collisionNodesIdx, this._segBox);
            var quadNode: IQuadNode;
            for (var i: number = 0; i < this._collisionNodesIdx.length; i++) {
                quadNode = this._quadTree.getQuadNode(this._collisionNodesIdx[i]);
                this._collisionNodes.push(quadNode);
            }
            return this._collisionNodes;

        }

        //		public getTriangleAtPoint(point : Vector3D):Navi3DTriangle
        //		{
        //			// 创建一个射线的boundingbox
        //			_segBox.clear();
        //			_segBox.setAABox(point.x, point.z, 1, 1);
        //			
        //			// 获取Boundingbox中的三角
        //			_collisionNodesIdx.length = 0;
        //			_collisionNodes.length = 0;
        //			var numTriangles : uint = _quadTree.getNodesIntersectingtAABox(_collisionNodesIdx, _segBox);
        //			
        //			// 检查那个三角与点(x,y)相交
        //			var minDistance:number = int.MAX_VALUE;
        //			var curDistance:number = 0;
        //			var minTriangle:Navi3DTriangle;
        //			var quadNode : IQuadNode;
        //			var triangle:Navi3DTriangle;
        //			var box:QuadAABB;
        //			for(var i:uint=0; i<_collisionNodesIdx.length; i++)
        //			{
        //				quadNode = _quadTree.getQuadNode(_collisionNodesIdx[i]);
        //				box = quadNode.aabb;
        //				if(!Navi3DTriangle.pointInsideTriangle(point, box.points[0], box.points[1], box.points[2]))
        //				{
        //					continue;
        //				}
        //				triangle = quadNode as Navi3DTriangle;
        //				curDistance = Math.abs(triangle.plane.distance(point));
        //				if(quadNode == null || curDistance <= minDistance)
        //				{
        //					minTriangle = triangle;
        //					minDistance = curDistance;
        //				}
        //			}
        //			
        //			return minTriangle;
        //		}

    }
}
