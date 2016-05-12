module egret3d {

    /**
     * @private
     */
    export class Egret3DState {

        private static use: boolean = false; 


        private static _info: HTMLDivElement;
        private static _time: HTMLDivElement;
        private static _dataInfo: HTMLDivElement;
        private static _objectInfo: HTMLDivElement;//vertex length | vertex face length | draw call | draw program number | number mouse objects
        static initState() {
            Egret3DState.use = true; 
            Egret3DState._info = <HTMLDivElement>document.createElement("div");
            Egret3DState._time = <HTMLDivElement>document.createElement("div");
            Egret3DState._dataInfo = <HTMLDivElement>document.createElement("div");
            Egret3DState._objectInfo = <HTMLDivElement>document.createElement("div");

            document.body.appendChild(Egret3DState._info);
            document.body.appendChild(Egret3DState._time);
            document.body.appendChild(Egret3DState._dataInfo);
            document.body.appendChild(Egret3DState._objectInfo);

            Egret3DState._info.style.color = "lightblue";
            Egret3DState._time.style.color = "lightblue";
            Egret3DState._dataInfo.style.color = "lightblue";
            Egret3DState._objectInfo.style.color = "lightblue";

            Egret3DState._info.innerText = "Egret3D Debug State" ; 
        }

        public static showTime( time:number , delay:number ) {
            if (!Egret3DState.use) Egret3DState.initState();

            Egret3DState._time.innerText = time.toString() + "/" + delay.toString(); 
        }

        public static showDataInfo(...data) {
            if (!Egret3DState.use) Egret3DState.initState();
            Egret3DState._dataInfo.innerText = "";
            var d: any;
            for (d in data) {
                Egret3DState._dataInfo.innerText += data[d].toString() + "/r/t"  ;
            }
        }
    }
}