module demo {
    export class LoadingUI {

        private progressDiv: HTMLDivElement;
        private textDiv: HTMLDivElement;
        private bgImage: HTMLDivElement;

        private lastProgress: number = 0;
        private lastFps: number = 0;
        constructor() {
            this.progressDiv = <HTMLDivElement>document.getElementById("progress");
            this.textDiv = <HTMLDivElement>document.getElementById("canvas");
            this.bgImage = <HTMLDivElement>document.getElementById("bgImage");
        }
        
        
        public updatePanel(visible: boolean, progress: number): void {

            if (progress < this.lastProgress)
                return;
            
            if (progress < 0) progress = 0;
            else if (progress > 1) progress = 1;

            this.lastProgress = progress;

            if (visible) {
                this.progressDiv.style.width = (progress * 100) + "%";
                this.textDiv.innerHTML = "Egret3D..." + Math.floor(progress * 100) + "%";
            }
            else {
                //隐藏进度条
                this.progressDiv.style.width = "0";
                this.progressDiv.style.height = "0";
                this.progressDiv.hidden = true;
                //变更文本
                this.textDiv.innerHTML = "Complete";
                //隐藏背景
                this.bgImage.style.width = "0";
                this.bgImage.style.height = "0";
                this.bgImage.hidden = true;
            }


        }


        public updateText(value: number): void {
            if (this.lastFps == value)
                return;
            this.lastFps = value;
            this.textDiv.innerHTML = "Egret3D " + value + "fps";
        }

    }
}