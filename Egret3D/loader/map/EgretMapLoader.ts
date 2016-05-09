module egret3d {
    export class EgretMapLoader extends EventDispatcher{

        private _sceneName: string;
        private _lights: LightGroup;
        private _cameraAnims: Array<CameraAnimationController>;
        private _xmlLoader: URLLoader;

        private _container: Object3D;
        private _defaultMaterial: TextureMaterial;
        private _materialMap: HashTable;
        private _lightHashMap: HashTable;

        private _sourceLib: EgretMapSourceLib;
        private _parser: EgretMapXmlParser;
        //0：未开始 1：正在加载 2：加载完毕
        private _loadStatus: number = 0;
        constructor() {
            super();
            this._container = new Object3D();
            this._sourceLib = new EgretMapSourceLib();
            this._materialMap = new HashTable();
            this._lightHashMap = new HashTable();
        }

        public get container(): Object3D{
            return this._container;
        }

        public get cameraAnims(): Array<CameraAnimationController> {
            return this._cameraAnims;
        }

        public calcProgress(): number {
            if (this._loadStatus == 0)
                return 0;
            return this._sourceLib.progress;
        }

        public get lightHashMap(): HashTable {
            return this._lightHashMap;
        }

        public get sourceLib(): EgretMapSourceLib {
            return this._sourceLib;
        }

        public get parser(): EgretMapXmlParser {
            return this._parser;
        }

        public loadScene(name: string): void {
            this._sceneName = name;

            var fullUrl: string = EgretMapConfig.ScenePath + name + "/" + EgretMapConfig.MapFile + "?v=" + (new Date().getTime());

            this._xmlLoader = new URLLoader(fullUrl, URLLoader.DATAFORMAT_TEXT);
            this._xmlLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onSceneXmlLoaded, this);
        }

        private onSceneXmlLoaded(e: LoaderEvent3D): void {
            this._xmlLoader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onSceneXmlLoaded, this);
            var text: string = this._xmlLoader.data;
            //解析xml
            this._parser = new EgretMapXmlParser();
            this._parser.parseXml(this._sceneName, text);
            //
            this._loadStatus = 1;
            this._sourceLib.startLoad(this._parser);
            this._sourceLib.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onSourceLibComplete, this);
        }

        //加载完毕后，开始创建拼装资源
        private onSourceLibComplete(e: LoaderEvent3D): void {
            this._sourceLib.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onSourceLibComplete, this);
            //
            this.createLight();
            this.createDefaultMaterial();
            this.createCameraAnims();
            this.createMaterial();
            this.createSkinAnimation();
            this.createMesh();
            //complete
            this._loadStatus = 2;

            var event: LoaderEvent3D = new LoaderEvent3D(LoaderEvent3D.LOADER_COMPLETE);
            this.dispatchEvent(event);
        }


        //灯光
        private createLight(): void {
            this._lights = new LightGroup();

             //平行光
            if (this._parser.enableDirectLight && this._parser.dirLightDatas) {
                var dData: DirectionLightData;
                for (dData of this._parser.dirLightDatas) {
                    var direction: Vector3D = new Vector3D(dData.dirX, dData.dirY, dData.dirZ);
                    var dirLight: DirectLight = new DirectLight(direction);
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
                var pData: PointLightData;
                for (pData of this._parser.pointLightDatas) {
                    var pLight: PointLight = new PointLight(0);
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

                }
            }
            
        }

        //默认材质球
        private createDefaultMaterial(): void {
            this._defaultMaterial = new TextureMaterial(CheckerboardTexture.texture);
            this._defaultMaterial.diffuseColor = 0xff808080;
            this._defaultMaterial.ambientColor = 0x808080;
            this._defaultMaterial.lightGroup = this._lights;
        }

        //根据xml中每个材质球，创建材质
        private createMaterial(): void {
            var materialData: MaterialSphereData;
            var material: MaterialBase;

            for (materialData of this._parser.materialList) {
                material = new TextureMaterial();
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
                    if (materialData.method.type == MaterialMethodData.lightmapMethod) {
                        var lightmapMethod: LightmapMethod = new LightmapMethod(materialData.method.usePower);
                        var lightTexture: ITexture = this._sourceLib.getImage(materialData.method.texture);
                        material.diffusePass.addMethod(lightmapMethod);
                        lightmapMethod.lightTexture = lightTexture ? lightTexture : CheckerboardTexture.texture;
                    }
                    
                }
                
            }


           
        }

        //根据xml中的每个mesh，拼装完整的mesh并加到显示节点中
        private createMesh(): void {
            var realMat: MaterialBase;
            var data: MeshData;
            var geometry: Geometry;
            var mesh: Mesh;
            var clip: SkeletonAnimationClip;
            var clipName: string;
            var lightId: number;
            var light: LightBase;
            var lightGroup: LightGroup;

            for (data of this._parser.esmList) {
                realMat = this._materialMap.getValueByKey(data.materialID);
                realMat || (realMat = this._defaultMaterial);

                geometry = this._sourceLib.getEsm(data.name);

                mesh = new Mesh(geometry, realMat);
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
                lightGroup = new LightGroup();
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
            this._cameraAnims = new Array<CameraAnimationController>();
            var animation: CameraAnimationController;
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
            var clip: SkeletonAnimationClip;
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
        }


       

    }
}
