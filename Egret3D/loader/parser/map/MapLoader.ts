﻿module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.MapLoader
    * @classdesc
    * 加载egret地图类
    * 用于加载和解析egret地图文件的类，加载完毕后，mesh内容已经添加到了container中.
    * 主要封装了esm/eca/png/eam的加载和组装，以及mesh的render method相关信息，和灯光数据的生效.
    * 加载完毕后，会派发事件LoaderEvent3D.LOADER_COMPLETE
    * @see egret3d.EventDispatcher
    *
    * @includeExample loader/parser/map/MapLoader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */

    export class MapLoader extends EventDispatcher {

        ///**
        //* @language zh_CN
        //* 属性动画对象，加载完成后 需要更新
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public propertyAnims: Array<PropertyAnim> = new Array<PropertyAnim>();

        /**
        * @language zh_CN
        * 场景对象的所有根节点.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public container: Object3D = null;

        /**
        * @language zh_CN
        * 是否自动播放动画  默认不自动播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public autoPlayAnimation: boolean = false;

        private _pathRoot: string = "";
        private _path: string = "";
        private _mapXmlParser: MapXmlParser = null;

        private static _assetMgr: AssetManager = new AssetManager();
        private _textures: any = {};

        private _taskCount: number = 0;
        private _event: LoaderEvent3D = new LoaderEvent3D();

        public huds: Array<HUD> = new Array<HUD>();

        public taskTotal: number = 0;
        public taskCurrent: number = 0;

        public view3d: View3D;

        public lightDict: any = {};

         /**
         * @language zh_CN
         * 构建一个场景加载对象 构建后直接加载
         * @param name 场景名字 默认为null 不加载 有值时 直接加载 
         * @param mapConfig 场景配置文件 默认为"MapConfig.xml"
         * @param path 场景文件路径 默认"resource/scene/"
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(name: string = null, mapConfig: string = "MapConfig.xml", path: string = "resource/scene/") {
            super();
            this.container = new Object3D();
            if (name) {
                this.load(name, mapConfig, path);
            }
        }

        /**
        * @language zh_CN
        * 查找贴图
        * @param name 贴图名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findTexture(name: string): ITexture {
            return this._textures[name];
        }

        /**
        * @language zh_CN
        * 加载场景
        * @param name 场景名字
        * @param mapConfig 场景配置文件 默认为"MapConfig.xml"
        * @param path 场景文件路径 默认"resource/scene/"
        * @version Egret 3.0
        * @platform Web,Native
        */
        public load(name: string, mapConfig: string = "MapConfig.xml", path: string = "resource/scene/") {
            this._pathRoot = path + name + "/";
            this._path = this._pathRoot + mapConfig;
            this.taskTotal++;
            var load: URLLoader = MapLoader._assetMgr.dispatchTask(this._path);
            if (load.data) {
                this.parseXML(load.data);
            }
            else {
                this.addTask(load);
                MapLoader._assetMgr.dispatchEvent(load, this.onXmlLoad, this, null);
            }
        }

        //private static addLoader(loader: URLLoader) {
        //    MapLoader._loaderDict[loader.url] = loader;
        //}

        //private static findLoader(path: string): URLLoader {
        //    return MapLoader._loaderDict[path];
        //}

        private parseXML(xml: string) {
            var xmlDoc = XMLParser.parse(xml);
            this._mapXmlParser = new MapXmlParser(xmlDoc);

            for (var v in this._mapXmlParser.taskDict) {
                this.taskTotal++;
            }

            this.createLight();

            for (var i: number = 0; i < this._mapXmlParser.nodeList.length; i++) {
                var mapNodeData: MapNodeData = this._mapXmlParser.nodeList[i];
                if (!mapNodeData.object3d.parent) {
                    this.container.addChild(mapNodeData.object3d);
                }

                if (mapNodeData.type == "Object3D" || mapNodeData.type == "Camera3D") {
                    this.doLoadEpa(mapNodeData);
                }

                switch (mapNodeData.type) {
                    case "Mesh":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;
                            var esmload: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                            if (esmload.data) {
                                this.processMesh(mapNodeData, new Mesh(esmload.data, new TextureMaterial()));
                            }
                            else {
                                this.addTask(esmload);
                                MapLoader._assetMgr.dispatchEvent(esmload, this.onEsmLoad, this, mapNodeData);
                            }

                        }
                        else if (mapNodeData.geometry) {
                           this.processMesh(mapNodeData, new Mesh(GeometryUtil.createGemetryForType(mapNodeData.geometry.type, mapNodeData.geometry), new TextureMaterial()));
                        }
                        break;
                    case "Terrain":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;
                            var heightImgload: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                            if (heightImgload.data) {
                                var geo: any = mapNodeData.geometry;
                                var envHeightGeometry: ElevationGeometry = new ElevationGeometry(heightImgload.data, geo.width, geo.height, geo.depth, geo.segmentsW, geo.segmentsH);
                                var mesh: Mesh = new Mesh(envHeightGeometry, new TextureMaterial(heightImgload.data));
                                this.processHeightMesh(mapNodeData, mesh);
                            }
                            else {
                                this.addTask(heightImgload);
                                MapLoader._assetMgr.dispatchEvent(heightImgload, this.onHeightImg, this, mapNodeData);
                            }
                        }
                        break;
                    case "ParticleEmitter":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;
                            var load: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                            if (load.data) {
                                var particleData: ParticleData = load["ParticleData"];
                                if (particleData) {
                                    this.processParticle(particleData, mapNodeData);
                                }
                            }
                            else {
                                this.addTask(heightImgload);
                                MapLoader._assetMgr.dispatchEvent(load, this.onParticleXML, this, mapNodeData);
                            }
                        }
                        break;
                }
            }

            for (var i: number = 0; i < this._mapXmlParser.textures.length; ++i) {
                var data: any = this._mapXmlParser.textures[i];
                var path: string = this._pathRoot + data.path;
                var textureLoad: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                if (textureLoad.data) {
                    this._textures[data.name] = textureLoad.data;
                }
                else {
                    this.addTask(textureLoad);
                    MapLoader._assetMgr.dispatchEvent(textureLoad, this.onTexture, this, data.name);
                }
            }

            for (var i: number = 0; i < this._mapXmlParser.hudList.length; ++i) {
                var hudData: HUDData = this._mapXmlParser.hudList[i];
                var hud: HUD = new HUD();

                hud.name = hudData.name;
                hud.bothside = hudData.bothside;
                hud.x = hudData.x;
                hud.y = hudData.y;
                hud.rotationX = hudData.rx;
                hud.rotationY = hudData.ry;
                hud.rotationZ = hudData.rz;
                hud.width = hudData.width;
                hud.height = hudData.height;

                if (hudData.vs) {
                    hud.vsShader = hudData.vs;
                }

                if (hudData.fs) {
                    hud.fsShader = hudData.fs;
                }

                this.huds.push(hud);
                hudData.hud = hud;

                if (!hudData.texture) {
                    continue;
                }
                var path: string = this._pathRoot + hudData.texture;
                var hudLoad: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                if (hudLoad.data) {
                    hud.diffuseTexture = hudLoad.data;
                }
                else {
                    this.addTask(hudLoad);
                    MapLoader._assetMgr.dispatchEvent(hudLoad, this.onHudTexture, this, hudData);
                }
            }
        }

        private onParticleXML(load: URLLoader, mapNodeData: MapNodeData) {
            var particleData: ParticleData = load["ParticleData"];
            if (!particleData) {
                particleData = new ParticleXmlParser().parse(load.data);
                load["ParticleData"] = particleData;
                particleData.fileUrl = load.url;
                particleData.fileName = load.fileName;
            }

            this.processParticle(particleData, mapNodeData);

            this.processTask(load);
        }

        private processParticle(particleData: ParticleData, nodeData: MapNodeData): ParticleEmitter {
            if (!particleData.shape.meshFile) {
                if (nodeData.geometry) {
                    particleData.shape.geometry = GeometryUtil.createGemetryForType(nodeData.geometry.type, nodeData.geometry);
                }
                this.processParticleGeometry(particleData, nodeData);
            }
            else {

                var path: string = this._pathRoot + particleData.shape.meshFile;
                var load: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                if (load.data) {
                    particleData.shape.geometry = load.data;
                    this.processParticleGeometry(particleData, nodeData);
                }
                else {
                    var parData: any = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;

                    this.addTask(load);
                    MapLoader._assetMgr.dispatchEvent(load, this.onParticleEsmLoad, this, parData);
                }
            }

            return null;
        }

        private processParticleGeometry(particleData: ParticleData, nodeData: MapNodeData) {
            particleData.materialData = this._mapXmlParser.matDict[nodeData.materialIDs[0]];
            var particleNode: ParticleEmitter = new ParticleEmitter(particleData, new TextureMaterial());

            nodeData.x *= ParticleData.SCALE_VALUE;
            nodeData.y *= ParticleData.SCALE_VALUE;
            nodeData.z *= ParticleData.SCALE_VALUE;
            nodeData.object3d.position.scaleBy(ParticleData.SCALE_VALUE);

            this.processObject3d(nodeData, particleNode);

            particleNode.play();
            this.processMat(nodeData);
        }

        private processObject3d(nodeData: MapNodeData, object3d: Object3D) {
            object3d.name = nodeData.object3d.name;
            object3d.visible = nodeData.object3d.visible;
            object3d.position = nodeData.object3d.position;
            object3d.orientation = nodeData.object3d.orientation;
            object3d.scale = nodeData.object3d.scale;
            nodeData.object3d.swapObject(object3d);
            nodeData.object3d = object3d;
        }

        private onXmlLoad(loader: URLLoader) {
            this.parseXML(loader.data);
            this.processTask(loader);
        }

        private onHeightImg(load: URLLoader, mapNodeData: MapNodeData) {
            var geometry: any = mapNodeData.geometry;
            var envHeightGeometry: ElevationGeometry = new ElevationGeometry(load.data, geometry.width, geometry.height, geometry.depth, geometry.segmentsW, geometry.segmentsH);
            var mesh: Mesh = new Mesh(envHeightGeometry, new TextureMaterial(load.data));
            this.processHeightMesh(mapNodeData, mesh);
            this.doLoadEpa(mapNodeData);
            this.processTask(load);
        }

        private onTexture(load: URLLoader, name: string) {
            this._textures[name] = load.data;
            this.processTask(load);
        }

        private onHudTexture(load: URLLoader, hudData: HUDData) {
            hudData.hud.diffuseTexture = load.data;
            this.processTask(load);
        }

        private onMaterialTexture(load: URLLoader, textureData: any) {
            var mesh: Mesh = null;
            var mat: MaterialBase = null;
            var mapNodeData: MapNodeData = textureData.mapNodeData;
            mesh = <Mesh>mapNodeData.object3d;
            mat = mesh.getMaterial(textureData.matID);
            mat[textureData.type] = load.data;

            this.processTask(load);
        }

        private onMethodTexture(load: URLLoader, methodData: any) {

            methodData.method[methodData.textureName] = load.data;

            this.processTask(load);
        }

        private doLoadEpa(mapNodeData: MapNodeData) {

            if (mapNodeData.propertyAnims) {
                for (var j: number = 0; j < mapNodeData.propertyAnims.length; ++j) {
                    var propertyAnimsData: any = mapNodeData.propertyAnims[j];

                    var path: string = this._pathRoot + propertyAnimsData["path"];
                    var epaload: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                    if (epaload.data) {
                        this.processEpa(mapNodeData, epaload.data);
                    }
                    else {
                        this.addTask(epaload);
                        MapLoader._assetMgr.dispatchEvent(epaload, this.onEpaLoad, this, mapNodeData);
                    }
                }
            }
        }

        private processEpa(mapNodeData: MapNodeData, pro: PropertyAnim) {
            mapNodeData.object3d.bindAnimation(pro);
            if (this.autoPlayAnimation) {
                if (mapNodeData.object3d.proAnimation) {
                    mapNodeData.object3d.proAnimation.play();
                }
            }
        }

        private processHeightMesh(mapNodeData: MapNodeData, mesh: Mesh) {

            this.processObject3d(mapNodeData, mesh);

            this.processMat(mapNodeData);
        }

        private processMesh(mapNodeData: MapNodeData, mesh: Mesh) {

            this.processObject3d(mapNodeData, mesh);

            this.processMat(mapNodeData);

            for (var j: number = 0; j < mapNodeData.skinClips.length; j++) {

                var eamData: any = mapNodeData.skinClips[j];


                var path: string = this._pathRoot + eamData["path"];
                var load: URLLoader = MapLoader._assetMgr.dispatchTask(path);
                if (load.data) {
                    var clip: SkeletonAnimationClip = load.data;
                    mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip.clone());
                }
                else {
                    var loadData: any = {};
                    loadData.eamData = eamData;
                    loadData.mapNodeData = mapNodeData;

                    this.addTask(load);
                    MapLoader._assetMgr.dispatchEvent(load, this.onEamLoad, this, loadData);
                }
            }
        }

        private onEsmLoad(load: URLLoader, mapNodeData: MapNodeData) {
            if (mapNodeData) {
                var mesh: Mesh = new Mesh(load.data, new TextureMaterial());
                this.processMesh(mapNodeData, mesh);
                this.doLoadEpa(mapNodeData);
            }

            this.processTask(load);
        }

        private onParticleEsmLoad(load: URLLoader, parData: any) {
            var particle: ParticleData = parData.particle;
            var nodeData: MapNodeData = parData.nodeData;
            particle.shape.geometry = load.data;
            this.processParticleGeometry(particle, nodeData);
            this.processTask(load);
        }

        private onEamLoad(load: URLLoader, loadData: any) {
            var clip: SkeletonAnimationClip = load.data;
            clip.animationName = loadData.eamData.name;

            var mesh: Mesh = <Mesh>loadData.mapNodeData.object3d;
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip.clone());
            if (this.autoPlayAnimation) {
                mesh.animation.play(clip.animationName, 1.0, false, false);
            }
            this.processTask(load);
        }

        private onEpaLoad(load: URLLoader, mapNodeData: MapNodeData) {
            var pa: PropertyAnim = load.data;
            var clonePa: PropertyAnim = pa.clone();
            this.processEpa(mapNodeData, clonePa);
       
            this.processTask(load);
        }
        
        //private createLoader(path: string): URLLoader {
        //    var load: URLLoader = new URLLoader(path);
        //    MapLoader.addLoader(load);
        //    this._taskCount++;
        //    //console.log("+++" + load.url + "+++" + this._taskCount);
        //    return load;
        //}

        private addTask(load: URLLoader) {
            this._taskCount++;
        }

        private processTask(load:URLLoader) {
            this._taskCount--;
            this.taskCurrent++;

            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this._event.target = this;
            this._event.loader = load;
            this._event.data = load;
            this.dispatchEvent(this._event);

            //console.log("---" + load.url + "---" + this._taskCount);
            if (this._taskCount <= 0) {

                var subEmitters: ParticleEmitter[] = [];
                for (var i: number = 0; i < this._mapXmlParser.nodeList.length; i++) {
                    var mapNodeData: MapNodeData = this._mapXmlParser.nodeList[i];
                    
                    if (mapNodeData.object3d instanceof ParticleEmitter) {
                        var patEmitter: ParticleEmitter = <ParticleEmitter>mapNodeData.object3d;
                        for (var j: number = 0; j < mapNodeData.childs.length; ++j) {
                            var childData: any = mapNodeData.childs[j];
                            var childPatEmitter: Object3D = this.container.findObject3D(childData.name);
                            subEmitters.push(<ParticleEmitter>childPatEmitter);
                            if (childPatEmitter instanceof ParticleEmitter) {
                                patEmitter.addSubEmitter(Number(ParticleDataSubEmitterPhase[childData.phase]), <ParticleEmitter>childPatEmitter);
                            }
                        }
                    }

                }

                var tempEmitter: ParticleEmitter;
                for (var i: number = 0; i < subEmitters.length; i++) {
                    tempEmitter = subEmitters[i];
                    if (tempEmitter && tempEmitter.parent) {
                        tempEmitter.parent.removeChild(tempEmitter);
                    }
                }



                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this._event.target = this;

                if (this.view3d) {
                    for (var i: number = 0; i < this.huds.length; ++i) {
                        this.view3d.addHUD(this.huds[i]);
                    }
                }

                this.dispatchEvent(this._event);
            }

        }

        private addImaTask(name: string, type: string, matID: number, mapNodeData: MapNodeData, material:MaterialBase):URLLoader {
            var load: URLLoader = null;

            var path: string = this._pathRoot + name;
            var load: URLLoader = MapLoader._assetMgr.dispatchTask(path);
            if (load.data) {
                material[type] = load.data;
            }
            else {

                var textureData: any = {};
                textureData.type = type;
                textureData.matID = matID;
                textureData.mapNodeData = mapNodeData;
                this.addTask(load);
                MapLoader._assetMgr.dispatchEvent(load, this.onMaterialTexture, this, textureData);
            }

            return load;
        }

        private addMethodImgTask(name:string, method:MethodBase, textureName:string): URLLoader {
            var path: string = this._pathRoot + name;
            var load: URLLoader = MapLoader._assetMgr.dispatchTask(path);
            if (load.data) {
                method[textureName] = load.data;
            }
            else {
                var methodData: any = {};
                methodData.method = method;
                methodData.textureName = textureName;

                this.addTask(load);
                MapLoader._assetMgr.dispatchEvent(load, this.onMethodTexture, this, methodData);
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
                    load = this.addImaTask(matData.diffuseTextureName, "diffuseTexture", i, mapNodeData, material);
                }

                if (matData.normalTextureName != "") {
                    load = this.addImaTask(matData.normalTextureName, "normalTexture", i, mapNodeData, material);
                }

                if (matData.specularTextureName != "") {
                    load = this.addImaTask(matData.specularTextureName, "specularTexture", i, mapNodeData, material);
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

                var lightGroup: LightGroup = new LightGroup();

                for (var j: number = 0; j < matData.lightIds.length; ++j) {
                    var light: LightBase = this.lightDict[matData.lightIds[j]];
                    if (light) {
                        lightGroup.addLight(light);
                    }
                }

                if (lightGroup.lightNum > 0) {
                    material.lightGroup = lightGroup;
                }

                this.processMethod(material, matData);
            }

            //if (typeof mesh != "ParticleEmitter") {
            //    if (this.lightGroup.lightNum > 0) {
            //        mesh.lightGroup = this.lightGroup;
            //    }
            //}
        }

        private processMethod(material: MaterialBase, matData: MatSphereData) {
            var load: URLLoader = null;
            var method: MatMethodData = null;

            for (method of matData.methods) {
                var defaultTexture: ITexture = CheckerboardTexture.texture;

                if (method.type == MatMethodData.methodType.lightmapMethod) {
                    var lightmapMethod: LightmapMethod = new LightmapMethod(method.usePower);
                    material.diffusePass.addMethod(lightmapMethod);
                    lightmapMethod.lightTexture = defaultTexture;
                    

                    var textureData: any = method.texturesData[0];
                    load = this.addMethodImgTask(textureData.path, lightmapMethod, textureData.attributeName);
                }
                else if (method.type == MatMethodData.methodType.uvRollMethod) {
                    var uvScrollMethod: UVRollMethod = new UVRollMethod();
                    material.diffusePass.addMethod(uvScrollMethod);

                    uvScrollMethod.speedU = method.uSpeed;
                    uvScrollMethod.speedV = method.vSpeed;
                    material.repeat = true;

                    uvScrollMethod.start(true);
                }
                else if (method.type == MatMethodData.methodType.mulUvRollMethod) {

                    var uvMethod: MulUVRollMethod = new MulUVRollMethod();
                    material.diffusePass.addMethod(uvMethod);

                    uvMethod.diffuseTexture1 = defaultTexture;

                    uvMethod.setSpeedU(0, method.uSpeed);
                    uvMethod.setSpeedV(0, method.vSpeed);

                    var textureData: any = method.texturesData[0];

                    uvMethod.setSpeedU(1, textureData.uSpeed);
                    uvMethod.setSpeedV(1, textureData.vSpeed);

                    load = this.addMethodImgTask(textureData.path, uvMethod, textureData.attributeName);

                    material.repeat = true;
                    uvMethod.start(true);
                }
                else if (method.type == MatMethodData.methodType.alphaMaskMethod) {
                    var maskmapMethod: AlphaMaskMethod = new AlphaMaskMethod();
                    material.diffusePass.addMethod(maskmapMethod);

                    maskmapMethod.maskTexture = defaultTexture;

                    var textureData: any = method.texturesData[0];

                    load = this.addMethodImgTask(textureData.path, maskmapMethod, textureData.attributeName);
                }
                else if (method.type == MatMethodData.methodType.streamerMethod) {
                    var streamerMethod: StreamerMethod = new StreamerMethod();
                    material.diffusePass.addMethod(streamerMethod);
                    streamerMethod.steamerTexture = defaultTexture;
                    var textureData: any = method.texturesData[0];

                    load = this.addMethodImgTask(textureData.path, streamerMethod, textureData.attributeName);

                    streamerMethod.speedU = method.uSpeed;
                    streamerMethod.speedV = method.vSpeed;
                    streamerMethod.start(true);
                }
                else if (method.type == MatMethodData.methodType.terrainARGBMethod) {
                    var terrainARGBMethod: TerrainARGBMethod = new TerrainARGBMethod(defaultTexture, defaultTexture, defaultTexture, defaultTexture, defaultTexture);
                    material.diffusePass.addMethod(terrainARGBMethod);
                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];

                        load = this.addMethodImgTask(textureData.path, terrainARGBMethod, textureData.attributeName);

                        if (i != 0) {
                            terrainARGBMethod.setUVTitling(i - 1, textureData.uvTitlingX, textureData.uvTitlingY);
                        }
                    }

                }
                else if (method.type == MatMethodData.methodType.waterWaveMethod) {
                    var waterWaveMethod: WaterWaveMethod = new WaterWaveMethod();
                    material.diffusePass.addMethod(waterWaveMethod);
                    if (method["deepWaterColor"]) {
                        waterWaveMethod.deepWaterColor = Number( method["deepWaterColor"]);
                    }

                    if (method["shallowWaterColor"]) {
                        waterWaveMethod.shallowWaterColor = Number( method["shallowWaterColor"]);
                    }

                    material.repeat = true;
                }
                else if (method.type == MatMethodData.methodType.waterNormalMethod) {

                    var waterNormalMethod: WaterNormalMethod = new WaterNormalMethod();
                    material.diffusePass.addMethod(waterNormalMethod);
                    waterNormalMethod.normalTextureA = defaultTexture;
                    waterNormalMethod.normalTextureB = defaultTexture;

                    if (method["uScale"] && method["vScale"]) {
                        waterNormalMethod.setUvScale(Number(method["uScale"]), Number( method["vScale"]));
                    }


                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];

                        waterNormalMethod.setUvSpeed(i, Number(textureData.uSpeed), Number(textureData.vSpeed));
                        load = this.addMethodImgTask(textureData.path, waterNormalMethod, textureData.attributeName);
                    }

                }
            }
        }
        //灯光
        private createLight(): void {
            var mapLightData: MapLightData = null;
            for (var key in this._mapXmlParser.lightDict) {

                mapLightData = this._mapXmlParser.lightDict[key];

                if (mapLightData.type == LightType.directlight && this._mapXmlParser.directLight) {
                    var dirLight: DirectLight = new DirectLight(mapLightData.direction);
                    dirLight.lightId = mapLightData.id;
                    dirLight.diffuse = mapLightData.diffuseColor;

                    dirLight.ambient = mapLightData.ambientColor;
                    dirLight.halfIntensity = mapLightData.halfIntensity;
                    dirLight.intensity = mapLightData.intensity;

                    this.lightDict[mapLightData.id] = dirLight;

                } else if (mapLightData.type == LightType.pointlight && this._mapXmlParser.pointLight) {
                    var pLight: PointLight = new PointLight(0);
                    pLight.lightId = mapLightData.id;
                    pLight.position = mapLightData.position;

                    pLight.ambient = mapLightData.ambientColor;
                    pLight.diffuse = mapLightData.diffuseColor;
                    pLight.radius = mapLightData.radius;

                    pLight.falloff = mapLightData.falloff;
                    pLight.intensity = mapLightData.intensity;

                    this.lightDict[mapLightData.id] = pLight;
                }
            }

        }
    }
}