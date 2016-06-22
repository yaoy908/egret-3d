module egret3d {
    export class MapLoader extends EventDispatcher {
        private _pathRoot: string = "";
        private _path: string = "";
        private _xmlLoader: URLLoader = null;
        private _mapXmlParser: MapXmlParser = null;

        private _esmLoader: any = {};
        private _eamLoader: any = {};
        private _epaLoader: any = {};
        private _texutreLoader: any = {};
        private _methodTexutreLoader: any = {};

        public propertyAnims: Array<PropertyAnim> = new Array<PropertyAnim>();

        public container: Object3D = null;

        private _taskCount: number = 0;

        private _event: LoaderEvent3D = new LoaderEvent3D();

        constructor(name: string, path: string = "resource/scene/") {
            super();
            this.container = new Object3D();
            this._pathRoot = path + name + "/";
            this._path = this._pathRoot + "MapConfig.xml";
            this._xmlLoader = new URLLoader(this._path);
            this._xmlLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onXmlLoad, this);
        }

        private onXmlLoad(e: LoaderEvent3D) {
            var xmlDoc = XMLParser.parse(e.loader.data);
            this._mapXmlParser = new MapXmlParser(xmlDoc);

            for (var i: number = 0; i < this._mapXmlParser.nodeList.length; i++) {
                var mapNodeData: MapNodeData = this._mapXmlParser.nodeList[i];
                if (!mapNodeData.object3d.parent) {
                    this.container.addChild(mapNodeData.object3d);
                }

                if (mapNodeData.propertyAnims) {
                    for (var j: number = 0; j < mapNodeData.propertyAnims.length; ++j) {
                        var propertyAnimsData: any = mapNodeData.propertyAnims[j];
                        if (!this._epaLoader[propertyAnimsData["path"]]) {
                            var epaload: URLLoader = new URLLoader(this._pathRoot + propertyAnimsData["path"]);
                            this._epaLoader[propertyAnimsData["path"]] = epaload;

                            var nodeDatas: Array<MapNodeData> = [];
                            nodeDatas.push(mapNodeData);
                            epaload["epanodeData"] = nodeDatas;
                            epaload.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEpaLoad, this);
                            this._taskCount++;
                        }
                        else {
                            var epaload: URLLoader = this._epaLoader[propertyAnimsData["path"]];
                            var nodeDatas: Array<MapNodeData> = epaload["epanodeData"];
                            nodeDatas.push(mapNodeData);
                        }
                    }
                }

                if (mapNodeData.path) {
                    if (!this._esmLoader[mapNodeData.path]) {
                        var esmload: URLLoader = new URLLoader(this._pathRoot + mapNodeData.path);
                        this._esmLoader[mapNodeData.path] = esmload;

                        var nodeDatas: Array<MapNodeData> = [];
                        nodeDatas.push(mapNodeData);
                        esmload["esmnodeData"] = nodeDatas;
                        esmload.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEsmLoad, this);
                        this._taskCount++;
                    }
                    else {

                        var esmload: URLLoader = this._esmLoader[mapNodeData.path];
                        var nodeDatas: Array<MapNodeData> = esmload["esmnodeData"];
                        nodeDatas.push(mapNodeData);
                    }
                }
            }
        }

        private onEsmLoad(e: LoaderEvent3D) {
            var nodeDatas: Array<MapNodeData> = e.loader["esmnodeData"];
            var mesh: Mesh = new Mesh(e.loader.data, new TextureMaterial());

            var cloneMesh: Mesh = mesh;
            for (var i: number = 0; i < nodeDatas.length; ++i) {
                var mapNodeData: MapNodeData = nodeDatas[i];
                if (cloneMesh) {
                    cloneMesh.name = mapNodeData.object3d.name;
                    cloneMesh.position = mapNodeData.object3d.position;
                    cloneMesh.orientation = mapNodeData.object3d.orientation;
                    cloneMesh.scale = mapNodeData.object3d.scale;
                    mapNodeData.object3d.swapObject(cloneMesh);
                    mapNodeData.object3d = cloneMesh;

                    this.processMat(mapNodeData);

                    for (var j: number = 0; j < mapNodeData.skinClips.length; j++) {

                        var eamData: any = mapNodeData.skinClips[j];

                        if (!this._eamLoader[eamData["path"]]) {
                            var load: URLLoader = new URLLoader(this._pathRoot + eamData["path"]);
                            this._eamLoader[eamData["path"]] = load;
                            load["name"] = eamData["name"];

                            var eamnodeDatas: Array<MapNodeData> = [];
                            eamnodeDatas.push(mapNodeData);
                            load["eamnodeData"] = eamnodeDatas;

                            load["mesh"] = mesh;
                            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEamLoad, this);
                            this._taskCount++;
                        }
                        else {
                            var eamload: URLLoader = this._eamLoader[eamData["path"]];
                            var eamnodeDatas: Array<MapNodeData> = eamload["eamnodeData"];
                            eamnodeDatas.push(mapNodeData);
                        }
                    }

                    if (i == nodeDatas.length - 1) {
                        break;
                    }
                    cloneMesh = mesh.clone();
                }
            }

            this.processTask();
        }

        private onEamLoad(e: LoaderEvent3D) {

            var nodeDatas: Array<MapNodeData> = e.loader["eamnodeData"];
            var clip: SkeletonAnimationClip = e.loader.data;
            clip.animationName = e.loader["name"];

            var cloneClip: SkeletonAnimationClip = clip;

            for (var i: number = 0; i < nodeDatas.length; ++i) {
                var mapNodeData: MapNodeData = nodeDatas[i];
                var mesh: Mesh = <Mesh>mapNodeData.object3d;
                if (cloneClip) {
                    mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(cloneClip);
                    if (i == nodeDatas.length - 1) {
                        break;
                    }
                    cloneClip = clip.clone();
                }
            }

          
            //mesh.animation.play(clip.animationName);
            //mesh.animation.skeletonAnimationController.play(clip.animationName, 0);

            this.processTask();
        }

        private onEpaLoad(e: LoaderEvent3D) {

            var nodeDatas: Array<MapNodeData> = e.loader["epanodeData"];
            var pa: PropertyAnim = e.loader.data;
            var clonePa: PropertyAnim = pa;

            for (var i: number = 0; i < nodeDatas.length; ++i) {
                var mapNodeData: MapNodeData = nodeDatas[i];
                if (clonePa) {
                    clonePa.bindObject3D(mapNodeData.object3d);
                    this.propertyAnims.push(pa);
                }
            }
            
            this.processTask();
        }

        private onImgLoad(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;

            var textureDatas: any = load["textureDatas"];
            var textureData: any = {};
            var mesh: Mesh = null;
            var mat: MaterialBase = null;
            for (var i: number = 0; i < textureDatas.length; ++i) {

                textureData = textureDatas[i];
                var mapNodeData: MapNodeData = textureData.mapNodeData;
                mesh = <Mesh>mapNodeData.object3d;
                mat = mesh.getMaterial(textureData.matID);

                mat[textureData.type] = load.data;
            }

            this.processTask();
        }

        private onImgMethodLoad(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;

            var methodDatas: any = load["methodDatas"];
            var methodData: any = {};

            for (var i: number = 0; i < methodDatas.length; ++i) {
                methodData = methodDatas[i];

                var method: StreamerMethod = <StreamerMethod>methodData.method;
                method.steamerTexture = load.data;
                //methodData.method[methodData.textureName] = load.data;
            }

            this.processTask();
        }

        private processTask() {
            this._taskCount--;
            if (this._taskCount <= 0) {
                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this.dispatchEvent(this._event);
            }
        }

        private addImaTask(name:string, type:string, matID:number, mapNodeData:MapNodeData):URLLoader {
            var load: URLLoader = null;
            if (!this._texutreLoader[name]) {
                load = new URLLoader(this._pathRoot + name);
                this._texutreLoader[name] = load;

                var textureDatas: any = [];
                var textureData: any = {};

                textureData.type = type;
                textureData.matID = matID;
                textureData.mapNodeData = mapNodeData;
                textureDatas.push(textureData);
                load["textureDatas"] = textureDatas;

                load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onImgLoad, this);
                this._taskCount++;
            }
            else {
                load = this._texutreLoader[name];

                var textureDatas: any = load["textureDatas"];

                var textureData: any = {};
                textureData.type = type;
                textureData.matID = matID;
                textureData.mapNodeData = mapNodeData;

                textureDatas.push(textureData);
            }

            return load;
        }


        private addMethodImgTask(name:string, method:MethodBase, textureName:string): URLLoader {
            var load: URLLoader = null;
            if (!this._methodTexutreLoader[name]) {
                load = new URLLoader(this._pathRoot + name);
                this._methodTexutreLoader[name] = load;

                var methodDatas: any = [];
                var methodData: any = {};
                methodData.method = method;
                methodData.textureName = textureName;
                methodDatas.push(methodData);

                load["methodDatas"] = methodDatas;
                load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onImgMethodLoad, this);
                this._taskCount++;
            }
            else {
                load = this._methodTexutreLoader[name];

                var methodDatas: any = load["methodDatas"];
                var methodData: any = {};
                methodData.method = method;
                methodData.textureName = textureName;
                methodDatas.push(methodData);
            }

            return load;
        }


        private processMat(mapNodeData: MapNodeData) {
            var mesh: Mesh = <Mesh>mapNodeData.object3d;
            for (var i: number = 0; i < mapNodeData.materialIDs.length; ++i) {
                var matData: MatSphereData = this._mapXmlParser.matDict[mapNodeData.materialIDs[i]];
                if (!matData) {
                    continue;
                }

                var material: TextureMaterial = <TextureMaterial>mesh.getMaterial(i);
                if (!material) {
                    material = new TextureMaterial();
                    mesh.addSubMaterial(i, material);
                }
                var load: URLLoader = null;

                if (matData.diffuseTextureName != "") {
                    load = this.addImaTask(matData.diffuseTextureName, "diffuseTexture", i, mapNodeData);
                    if (load.data) {
                        material.diffuseTexture = load.data;
                    }
                }

                if (matData.normalTextureName != "") {
                    load = this.addImaTask(matData.normalTextureName, "normalTexture", i, mapNodeData);
                    if (load.data) {
                        material.normalTexture = load.data;
                    }
                }

                if (matData.specularTextureName != "") {
                    load = this.addImaTask(matData.specularTextureName, "specularTexture", i, mapNodeData);
                    if (load.data) {
                        material.specularTexture = load.data;
                    }
                }

                material.diffuseColor = matData.diffuseColor;
                material.ambientColor = matData.ambientColor;
                material.specularColor = matData.specularColor;
                material.alpha = matData.alpha;
                material.specularLevel = matData.specularLevel;
                material.gloss = matData.gloss;


                material.castShadow = matData.castShadow;
                material.acceptShadow = matData.acceptShadow;
                material.smooth = matData.smooth;
                material.repeat = matData.repeat;
                material.bothside = matData.bothside;

                material.drawMode = matData.drawMode;
                material.cullMode = matData.cullMode;
                material.blendMode = matData.blendMode;

                material.cutAlpha = matData.cutAlpha;

                material.uvRectangle.copy(matData.uvRectangle);
                var method: MatMethodData = null;

                for (method of matData.methods) {
                    if (method.type == MaterialMethodData.lightmapMethod) {
                        var lightmapMethod: LightmapMethod = new LightmapMethod(method.usePower);
                        var lightTexture: ITexture = CheckerboardTexture.texture;
                        load = this.addMethodImgTask(method.texture, lightmapMethod, "lightTexture");
                        if (load.data) {
                            lightTexture = load.data;
                        }

                        material.diffusePass.addMethod(lightmapMethod);
                        lightmapMethod.lightTexture = lightTexture;
                    } else if (method.type == MaterialMethodData.uvRollMethod) {
                        var uvScrollMethod: UVRollMethod = new UVRollMethod();
                        uvScrollMethod.speedU = method.uSpeed;
                        uvScrollMethod.speedV = method.vSpeed;
                        uvScrollMethod.start(true);
                        material.diffusePass.addMethod(uvScrollMethod);
                    }
                    else if (method.type == MaterialMethodData.alphaMaskMethod) {
                        var maskmapMethod: AlphaMaskMethod = new AlphaMaskMethod();
                        var maskTexture: ITexture = CheckerboardTexture.texture;
                        load = this.addMethodImgTask(method.texture, maskmapMethod, "maskTexture");
                        if (load.data) {
                            maskTexture = load.data;
                        }
                        material.diffusePass.addMethod(maskmapMethod);
                        maskmapMethod.maskTexture = maskTexture;
                    }
                    else if (method.type == MaterialMethodData.streamerMethod) {
                        var streamerMethod: StreamerMethod = new StreamerMethod();
                        var steamerTexture: ITexture = CheckerboardTexture.texture;
                        load = this.addMethodImgTask(method.texture, streamerMethod, "steamerTexture");
                        if (load.data) {
                            steamerTexture = load.data;
                        }
                        streamerMethod.speedU = method.uSpeed;
                        streamerMethod.speedV = method.vSpeed;
                        streamerMethod.start(true);
                        material.diffusePass.addMethod(streamerMethod);
                        streamerMethod.steamerTexture = steamerTexture;
                    }
                }
            }
        }
    }
}