module demo {
    export class EgretSceneSourceLib extends egret3d.EventDispatcher {

        private _imageLoaders: egret3d.HashTable;
        private _esmLoaders: egret3d.HashTable;
        private _ecaLoaders: egret3d.HashTable;
        private _eamLoaders: egret3d.HashTable;

        private _loaderMapList: Array<egret3d.HashTable>;

       
        private _parser: EgretSceneXmlParser;
        private _totalCount: number = 0;
        private _loadedCount: number = 0;
        
        

        public constructor() {
            super();

            this._imageLoaders = new egret3d.HashTable();
            this._esmLoaders = new egret3d.HashTable();
            this._ecaLoaders = new egret3d.HashTable();
            this._eamLoaders = new egret3d.HashTable();

            this._loaderMapList = [this._imageLoaders, this._esmLoaders, this._ecaLoaders, this._eamLoaders];
        }

        public startLoad(parser: EgretSceneXmlParser): void {
            this._parser = parser;

            //去重操作
            var imgs: Array<string> = [];
            var esms: Array<string> = [];
            var ecas: Array<string> = [];
            var eams: Array<string> = [];

            var source: string;

            var meshData: ecore.MeshData;
            var clipName: string;
            for (meshData of this._parser.esmList) {
                this.pushSource(esms, meshData.name);
                for (clipName of meshData.skinClips) {
                    this.pushSource(eams, clipName);
                }
                
            }

            var materialData: ecore.MaterialData;
            for (materialData of this._parser.materialList) {
                this.pushSource(imgs, materialData.diffuseTextureName);
                if (materialData.method) {
                    this.pushSource(imgs, materialData.method.texture);
                }
                this.pushSource(imgs, materialData.normalTextureName);
                this.pushSource(imgs, materialData.specularTextureName);
            }

            ecas = this._parser.ecaList.slice();

           //加载
            var url: string;

            for (source of imgs) {
                url = EgretConfig.ScenePath + this._parser.sceneName + "/" + this._parser.texturePath + "/" + source;
                this.loadOne(this._imageLoaders, url, source);
            }
            for (source of esms) {
                url = EgretConfig.ScenePath + this._parser.sceneName + "/" + this._parser.esmPath + "/" + source + EgretConfig.EsmSuffix;
                this.loadOne(this._esmLoaders, url, source);
            }
            for (source of ecas) {
                url = EgretConfig.ScenePath + this._parser.sceneName + "/" + this._parser.ecaPath + "/" + source + EgretConfig.EcaSuffix;
                this.loadOne(this._ecaLoaders, url, source);
            }
            for (source of eams) {
                url = EgretConfig.ScenePath + this._parser.sceneName + "/" + this._parser.eamPath + "/" + source + EgretConfig.EamSuffix;
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

        private loadOne(loaderMap: egret3d.HashTable, url: string, source: string): void {
            var loader: egret3d.URLLoader = new egret3d.URLLoader(url);
            loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            loaderMap.put(source, loader);
        }


        private onLoaded(e: egret3d.LoaderEvent3D): void {
            e.loader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
            this._loadedCount++;
            if (this._loadedCount == this._totalCount) {
                var event: egret3d.LoaderEvent3D = new egret3d.LoaderEvent3D(egret3d.LoaderEvent3D.LOADER_COMPLETE);
                this.dispatchEvent(event);
            }
        }


        public getImage(name: string): egret3d.ITexture {

            var loader: egret3d.URLLoader = this._imageLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }

        public getEsm(name: string): egret3d.Geometry {

            var loader: egret3d.URLLoader = this._esmLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }

        public getEca(name: string): egret3d.CameraAnimationController {

            var loader: egret3d.URLLoader = this._ecaLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }

        public getEam(name: string): egret3d.SkeletonAnimationClip {

            var loader: egret3d.URLLoader = this._eamLoaders.getValueByKey(name);
            if (loader)
                return loader.data;
            return null;
        }



        public get progress(): number {
            var value: number = 0;
            var loader: egret3d.URLLoader;
            var percent: number = 1 / this._totalCount;

           var loader: egret3d.URLLoader;
            var loaderList: Array<egret3d.URLLoader>;

            var hashTable: egret3d.HashTable;
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

        public dispose(): void {
            this._imageLoaders.clear();
            this._esmLoaders.clear();
            this._ecaLoaders.clear();
            this._eamLoaders.clear();

            this._imageLoaders = this._esmLoaders = this._ecaLoaders = this._eamLoaders = null;
            this._totalCount = this._loadedCount = 0;
            this._parser = null;
        }

       


    }
}

