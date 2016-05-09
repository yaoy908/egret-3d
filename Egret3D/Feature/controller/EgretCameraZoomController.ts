module demo {
    export class EgretCameraZoomController {
        private _view: egret3d.View3D;
        private _camera: egret3d.Camera3D;
        private _animations: Array<egret3d.CameraAnimationController>;
        private _currentIndex: number = -1;
        constructor(view: egret3d.View3D) {
            this._view = view;
            view.camera3D.addEventListener(egret3d.CameraAnimationController.EVENT_CAMERA_COMPLETE, this.onCameraAnimComplete, this);
        }

        public addCameraAnims(animations: Array<egret3d.CameraAnimationController>): void {
            this._animations = animations;
            this._camera = this._view.camera3D;
            var anim: egret3d.CameraAnimationController;
            for (anim of this._animations) {
                this._camera.addAnimation(anim.name, anim);
            }
            this.nextAnimation();
        }

        private onCameraAnimComplete(e: egret3d.Event3D): void {
            this.nextAnimation();
        }

        private nextAnimation(): void {
           this._currentIndex++;
            if (this._currentIndex >= this._animations.length) {
                this._currentIndex = 0;
           }
            var anim: egret3d.CameraAnimationController = this._animations[this._currentIndex];
            if (anim)
                this._camera.play(anim.name, false);
            
        }


    }
}