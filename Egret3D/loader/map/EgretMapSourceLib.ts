module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.EgretMapSourceLib
     * @classdesc
     * 地图数据的资源库，并管理最基础的加载
     * 通过地图的parser结果，管理esm/eca/png/eam的加载
     * 加载完毕基础文件后，会派发事件LoaderEvent3D.LOADER_COMPLETE
     * @see egret3d.EventDispatcher
     *
     * @version Egret 3.0
     * @platform Web,Native
     */

    export class EgretMapSourceLib extends EventDispatcher {

        private _imageLoaders: DoubleArray;
        private _esmLoaders: DoubleArray;
        private _ecaLoaders: DoubleArray;
        private _eamLoaders: DoubleArray;

        private _loaderMapList: Array<DoubleArray>;

       
        private _parser: EgretMapXmlParser;
        private _totalCount: number = 0;
        private _loadedCount: number = 0;
        
        
         /**
         * @language zh_CN
         * 构造函数
         * 先创建lib，然后执行startLoad函数，监听complete事件以获得加载完毕的回调
         * @version Egret 3.0
         * @platform Web,Native
         */
        public constructor() {
            super();

            this._imageLoaders = new DoubleArray();
            this._esmLoaders = new DoubleArray();
            this._ecaLoaders = new DoubleArray();
            this._eamLoaders = new DoubleArray();

            this._loaderMapList = [this._imageLoaders, this._esmLoaders, this._ecaLoaders, this._eamLoaders];
        }

         /**
         * @language zh_CN
         * 根据xml parser信息，开始加载最基础的信息
         * @param parser EgretMapXmlParser
         * @version Egret 3.0
         * @platform Web,Native
         */
        public startLoad(parser: EgretMapXmlParser): void {
            this._parser = parser;

            //去重操作
            var imgs: Array<string> = [];
            var esms: Array<string> = [];
            var ecas: Array<string> = [];
            var eams: Array<string> = [];

            var source: string;

            var meshData: MeshData;
            var clipName: string;
            for (meshData of this._parser.esmList) {
                this.pushSource(esms, meshData.name);
                for (clipName of meshData.skinClips) {
                    this.pushSource(eams, clipName);
                }
                
            }

            var materialData: MaterialSphereData;
            var materialMethod: MaterialMethodData;

            for (materialData of this._parser.materialList) {
                this.pushSource(imgs, materialData.diffuseTextureName);
                if (materialData.methods) {
                    for (materialMethod of materialData.methods) {
                        if (materialMethod.type == MaterialMethodData.lightmapMethod) {
                            this.pushSource(imgs, materialMethod.texture);
                        }
                    }
                }
                this.pushSource(imgs, materialData.normalTextureName);
                this.pushSource(imgs, materialData.specularTextureName);
            }

            ecas = this._parser.ecaList.slice();

            //加载
            var url: string;

            for (source of imgs) {
                url = EgretMapConfig.ScenePath + this._parser.sceneName + "/" + this._parser.texturePath + "/" + source;
                this.loadOne(this._imageLoaders, url, source);
            }
            for (source of esms) {
                url = EgretMapConfig.ScenePath + this._parser.sceneName + "/" + this._parser.esmPath + "/" + source + EgretMapConfig.EsmSuffix;
                this.loadOne(this._esmLoaders, url, source);
            }
            for (source of ecas) {
                url = EgretMapConfig.ScenePath + this._parser.sceneName + "/" + this._parser.ecaPath + "/" + source + EgretMapConfig.EcaSuffix;
                this.loadOne(this._ecaLoaders, url, source);
            }
            for (source of eams) {
                url = EgretMapConfig.ScenePath + this._parser.sceneName + "/" + this._parser.eamPath + "/" + source + EgretMapConfig.EamSuffix;
                this.loadOne(this._eamLoaders, url, source);
            }

            this._totalCount =
                this._imageLoaders.getKeys().length
                + this._esmLoaders.getKeys().length
                + this._ecaLoaders.getKeys().length
                + this._eamLoaders.getKeys().length;
        }


        private pushSource(list:Array<string>, source:string): void {
            if (source && source != "" && list.indexOf(source) == -1) {
                list.push(source);
            }
        }

        private loadOne(loaderMap: DoubleArray, url: string, source: string): void {
            var loader: URLLoader = new URLLoader(url);
            loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            loaderMap.put(source, loader);
        }


        private onLoaded(e: LoaderEvent3D): void {
            e.loader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            this._loadedCount++;
            if (this._loadedCount == this._totalCount) {
                var event: LoaderEvent3D = new LoaderEvent3D(LoaderEvent3D.LOADER_COMPLETE);
                this.dispatchEvent(event);
            }
        }

        /**
         * @language zh_CN
         * 获取加载过的贴图信息.
         * @param name 贴图名
         * @returns ITexture
         * @version Egret 3.0
         * @platform Web,Native
         */
        public getImage(name: string): ITexture {

            var loader: URLLoader = this._imageLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }

        /**
         * @language zh_CN
         * 获取加载过的模型信息
         * @param name 模型名
         * @returns Geometry
         * @version Egret 3.0
         * @platform Web,Native
         */
        public getEsm(name: string): Geometry {

            var loader: URLLoader = this._esmLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }

        /**
         * @language zh_CN
         * 获取加载过的镜头动画
         * @param name 镜头动画名
         * @returns CameraAnimationController
         * @version Egret 3.0
         * @platform Web,Native
         */
        public getEca(name: string): CameraAnimationController {

            var loader: URLLoader = this._ecaLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }

        /**
         * @language zh_CN
         * 获取加载过的蒙皮动画
         * @param name 蒙皮动画名
         * @returns SkeletonAnimationClip
         * @version Egret 3.0
         * @platform Web,Native
         */
        public getEam(name: string): SkeletonAnimationClip {

            var loader: URLLoader = this._eamLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }


        /**
         * @language zh_CN
         * 获取加载进度信息
         * @returns number
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get progress(): number {
            var value: number = 0;
            var loader: URLLoader;
            var percent: number = 1 / this._totalCount;

           var loader: URLLoader;
            var loaderList: Array<URLLoader>;

            var hashTable: DoubleArray;
            for (hashTable of this._loaderMapList) {
                loaderList = this._imageLoaders.getValues();
                for (loader of loaderList) {
                    if (loader.bytesTotal <= 0)
                        continue;
                    value += percent * loader.bytesLoaded / loader.bytesTotal;
                }
            }

            return value;

        }

        //public dispose(): void {
        //    this._imageLoaders.clear();
        //    this._esmLoaders.clear();
        //    this._ecaLoaders.clear();
        //    this._eamLoaders.clear();

        //    this._imageLoaders = this._esmLoaders = this._ecaLoaders = this._eamLoaders = null;
        //    this._totalCount = this._loadedCount = 0;
        //    this._parser = null;
        //}

       


    }
}

