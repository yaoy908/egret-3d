declare module egret3d {
    class FeatureConfig {
        static EnableCameraAnim: boolean;
        static EnableAxisMesh: boolean;
        static AxisMeshSize: number;
        constructor();
    }
}
declare module egret3d {
    class LoadingUI {
        private progressDiv;
        private textDiv;
        private bgImage;
        private lastProgress;
        private lastFps;
        constructor();
        updatePanel(visible: boolean, progress: number): void;
        updateText(value: number): void;
    }
}
declare module egret3d {
    class AxisMesh extends Object3D {
        private _lineX;
        private _lineY;
        private _lineZ;
        private _boxX;
        private _boxY;
        private _boxZ;
        private _xMat;
        private _yMat;
        private _zMat;
        constructor(axisSize?: number);
    }
}
declare module egret3d {
    class FPSCounter {
        fps: number;
        private _recordDateList;
        private _tempCount;
        private _tempNow;
        private _tempStart;
        private _calcCounter;
        private static MAX_COUNT;
        constructor();
        update(): void;
    }
}
declare module egret3d {
    class EgretCameraZoomController {
        private _view;
        private _camera;
        private _animations;
        private _currentIndex;
        constructor(view: View3D);
        addCameraAnims(animations: Array<CameraAnimationController>): void;
        private onCameraAnimComplete(e);
        private nextAnimation();
    }
}
declare module egret3d {
    class EgretWorld {
        private _view;
        private _cameraCtl;
        private _cameraZoomer;
        private _sceneLoader;
        private _egret3DCanvas;
        private _loadingUI;
        private _sceneLoaded;
        private _lastProgress;
        private _fps;
        private _lookFromTarget;
        private _lookAtTarget;
        private _startTime;
        private _lastTime;
        private static _instance;
        static getInstance(): EgretWorld;
        constructor();
        loadScene(name: string): void;
        private initCanvas();
        private initView();
        private onWindowsResize(e);
        private initCamera();
        private onSceneLoaded(e);
        private updateFrameData();
        private update(e);
    }
}
