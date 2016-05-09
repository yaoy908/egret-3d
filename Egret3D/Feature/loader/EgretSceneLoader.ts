module demo {
    export class EgretSceneLoader {

        private _sceneName: string;
        private _lights: egret3d.LightGroup;
        private _cameraAnims: Array<egret3d.CameraAnimationController>;
        private _xmlLoader: egret3d.URLLoader;

        private _handlerFunction: Function;
        private _handlerHolder: any;
        private _container: egret3d.Object3D;
        private _defaultMaterial: egret3d.TextureMaterial;
        private _materialMap: egret3d.HashTable;
        private _lightHashMap: egret3d.HashTable;

        private _sourceLib: EgretSceneSourceLib;
        private _parser: EgretSceneXmlParser;
        //0：未开始 1：正在加载 2：加载完毕
        private _loadStatus: number = 0;
        constructor() {

            this._container = new egret3d.Object3D();
            this._sourceLib = new EgretSceneSourceLib();
            this._materialMap = new egret3d.HashTable();
            this._lightHashMap = new egret3d.HashTable();
        }

        public get loadStatus(): number {
            return this._loadStatus;
        }

        public get container(): egret3d.Object3D{
            return this._container;
        }

        public get cameraAnims(): Array<egret3d.CameraAnimationController> {
            return this._cameraAnims;
        }

        public calcProgress(): number {
            if (this._loadStatus == 0)
                return 0;
            return this._sourceLib.progress;
        }

        public get lightHashMap(): egret3d.HashTable {
            return this._lightHashMap;
        }

        public loadScene(name: string, handler:Function, handlerHolder:any): void {
            this._sceneName = name;
            this._handlerFunction = handler;
            this._handlerHolder = handlerHolder;

            var fullUrl: string = EgretConfig.ScenePath + name + "/" + EgretConfig.MapFile + "?v=" + (new Date().getTime());

            this._xmlLoader = new egret3d.URLLoader(fullUrl, egret3d.URLLoader.DATAFORMAT_TEXT);
            this._xmlLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneXmlLoaded, this);
        }

        private onSceneXmlLoaded(e: egret3d.LoaderEvent3D): void {
            this._xmlLoader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneXmlLoaded, this);
            var text: string = this._xmlLoader.data;
            //解析xml
            this._parser = new EgretSceneXmlParser();
            this._parser.parseXml(this._sceneName, text);
            //
            this._loadStatus = 1;
            this._sourceLib.startLoad(this._parser);
            this._sourceLib.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSourceLibComplete, this);
        }

        //加载完毕后，开始创建拼装资源
        private onSourceLibComplete(e: egret3d.LoaderEvent3D): void {
            this._sourceLib.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSourceLibComplete, this);
            //
            this.createLight();
            this.createDefaultMaterial();
            this.createCameraAnims();
            this.createMaterial();
            this.createSkinAnimation();
            this.createMesh();
            //complete
            if (this._handlerFunction != null) {
                this._loadStatus = 2;
                this._handlerFunction.call(this._handlerHolder);
            }
        }


        //灯光
        private createLight(): void {
            this._lights = new egret3d.LightGroup();

             //平行光
            if (this._parser.enableDirectLight && this._parser.dirLightDatas) {
                var dData: ecore.DirectionLightData;
                for (dData of this._parser.dirLightDatas) {
                    var direction: egret3d.Vector3D = new egret3d.Vector3D(dData.dirX, dData.dirY, dData.dirZ);
                    var dirLight: egret3d.DirectLight = new egret3d.DirectLight(direction);
                    dirLight.lightId = dData.id;
                    dirLight.diffuse = dData.diffuseColor;

                    dirLight.ambient = dData.ambientColor;
                    dirLight.halfIntensity = dData.halfIntensity;
                    dirLight.intensity = dData.intensity;

                    this._lightHashMap.put(dData.id, dirLight);
                    this._lights.addLight(dirLight);
                   
                }
            }

            //点光源
            if (this._parser.enablePointLight && this._parser.pointLightDatas) {
                var pData: ecore.PointLightData;
                for (pData of this._parser.pointLightDatas) {
                    var pLight: egret3d.PointLight = new egret3d.PointLight(0);
                    pLight.lightId = pData.id;
                    pLight.x = pData.posX;
                    pLight.y = pData.posY;
                    pLight.z = pData.posZ;

                    pLight.ambient = pData.ambientColor;
                    pLight.diffuse = pData.diffuseColor;
                    pLight.radius = pData.radius;

                    pLight.falloff = pData.falloff;
                    pLight.intensity = pData.intensity;

                    this._lightHashMap.put(pData.id, pLight);
                    this._lights.addLight(pLight);

                    if (EgretConfig.EnableAxisMesh) {
                        var axis: egret3d.AxisMesh = new egret3d.AxisMesh(EgretConfig.PointLightAxisMeshSize);
                        axis.x = pData.posX;
                        axis.y = pData.posY;
                        axis.z = pData.posZ;
                        this._container.addChild(axis);
                    }
                }
            }
            
        }

        //默认材质球
        private createDefaultMaterial(): void {
            this._defaultMaterial = new egret3d.TextureMaterial(egret3d.CheckerboardTexture.texture);
            this._defaultMaterial.diffuseColor = 0xff808080;
            this._defaultMaterial.ambientColor = 0x808080;
            this._defaultMaterial.lightGroup = this._lights;
        }

        //根据xml中每个材质球，创建材质
        private createMaterial(): void {
            var materialData: ecore.MaterialData;
            var material: egret3d.MaterialBase;

            for (materialData of this._parser.materialList) {
                material = new egret3d.TextureMaterial();
                this._materialMap.put(materialData.id, material);

                material.lightGroup = this._lights;

                material.diffuseColor = materialData.diffuseColor;
                material.ambientColor = materialData.ambientColor;
                material.specularColor = materialData.specularColor;

                material.alpha = materialData.alpha;

                material.specularLevel = materialData.specularLevel;
                material.gloss = materialData.gloss;

                //material.ambientPower = materialData.ambientPower;
                //material.diffusePower = materialData.diffusePower;
                //material.normalPower = materialData.normalPower;

                material.castShadow = materialData.castShadow;
                material.acceptShadow = materialData.acceptShadow;
                material.smooth = true;//materialData.smooth;
                material.repeat = true;//materialData.repeat;
                material.bothside = false;//materialData.bothside;

                material.drawMode = 0x4;//materialData.drawMode;
                material.cullMode = 0x405;//materialData.cullMode;

                material.blendMode = materialData.blendMode;

               

                material.normalTexture = this._sourceLib.getImage(materialData.normalTextureName);
                material.diffuseTexture = this._sourceLib.getImage(materialData.diffuseTextureName);
                material.specularTexture = this._sourceLib.getImage(materialData.specularTextureName);
                if (materialData.method) {
                    if (materialData.method.type == ecore.MaterialMethodData.lightmapMethod) {
                        var lightmapMethod: egret3d.LightmapMethod = new egret3d.LightmapMethod(materialData.method.usePower);
                        var lightTexture: egret3d.ITexture = this._sourceLib.getImage(materialData.method.texture);
                        material.diffusePass.addMethod(lightmapMethod);
                        lightmapMethod.lightTexture = lightTexture ? lightTexture : egret3d.CheckerboardTexture.texture;
                    }
                    
                }
                
            }


           
        }

        //根据xml中的每个mesh，拼装完整的mesh并加到显示节点中
        private createMesh(): void {
            var realMat: egret3d.MaterialBase;
            var data: ecore.MeshData;
            var geometry: egret3d.Geometry;
            var mesh: egret3d.Mesh;
            var clip: egret3d.SkeletonAnimationClip;
            var clipName: string;
            var lightId: number;
            var light: egret3d.LightBase;
            var lightGroup: egret3d.LightGroup;

            for (data of this._parser.esmList) {
                realMat = this._materialMap.getValueByKey(data.materialID);
                realMat || (realMat = this._defaultMaterial);

                geometry = this._sourceLib.getEsm(data.name);

                mesh = new egret3d.Mesh(geometry, realMat);
                mesh.name = data.name;

                mesh.x = data.x;
                mesh.y = data.y;
                mesh.z = data.z;

                mesh.rotationX = data.rx;
                mesh.rotationY = data.ry;
                mesh.rotationZ = data.rz;

                mesh.scaleX = data.sx;
                mesh.scaleY = data.sy;
                mesh.scaleZ = data.sz;
                //追加骨骼动画，目前只有一个所以可以直接使用。
                for (clipName of data.skinClips) {
                    clip = this._sourceLib.getEam(clipName);
                    if (clip == null)
                        continue;
                    mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip);
                    mesh.animation.skeletonAnimationController.play(clipName);
                }

                //mesh的灯光
                lightGroup = new egret3d.LightGroup();
                for (lightId of data.lightIds) {
                    light = this._lightHashMap.getValueByKey(lightId);
                    if (light) {
                        lightGroup.addLight(light);
                    }
                }
                mesh.lightGroup = lightGroup;


                this._container.addChild(mesh);
            }
        }

        private createCameraAnims(): void {
            var name: string;
            this._cameraAnims = new Array<egret3d.CameraAnimationController>();
            var animation: egret3d.CameraAnimationController;
            for (name of this._parser.ecaList) {
                animation = this._sourceLib.getEca(name);
                if (animation) {
                    animation.name = name;
                    this._cameraAnims.push(animation);
                }
            }
        }

        private createSkinAnimation(): void {
            var name: string;
            var clip: egret3d.SkeletonAnimationClip;
            for (name of this._parser.eamList) {
                clip = this._sourceLib.getEam(name);
                if (clip) {
                    clip.animationName = name;
                }
            }
        }



        public dispose(): void {
            this._materialMap.clear();
            this._sourceLib.dispose();

            this._lightHashMap.clear();
            this._lightHashMap = null;

            this._parser.dispose();
            this._parser = null;

            this._handlerFunction = null;
            this._handlerHolder = null;
        }


       

    }
}
