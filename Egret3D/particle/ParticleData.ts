module egret3d {

    /**
     * @private
     * @class egret3d.ParticleData
     */
    export class ParticleData {
        public lifeMax: number = 2;
        public lifeMin: number = 2;
        public delayMax: number = 0;
        public delayMin: number = 0;
        public particleCount: number = -1;
        public rate: number = 10;
        public loop: boolean = true;
        public duration: number = 5;
        public bounds: Vector3D = new Vector3D(10, 10, 10);

        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {

        }

        public validate(): void {
            //life
            if (this.lifeMin < 0) {
                this.lifeMin = 0;
            }
            if (this.lifeMax < this.lifeMin) {
                this.lifeMax = this.lifeMin;
            }
            if (this.lifeMax < 0) {
                this.lifeMin = this.lifeMax = 1;
            }
            //delay
            if (this.delayMin < 0) {
                this.delayMin = 0;
            }
            if (this.delayMax < this.delayMin) {
                this.delayMax = this.delayMin;
            }
            if (this.delayMax < 0) {
                this.delayMin = this.delayMax = 1;
            }
            //rate
            if (this.rate < 0) {
                this.rate = 10;
            }
            //duration
            if (this.duration < 0) {
                this.duration = 5;
            }

            //bounds
            if (this.bounds == null) {
                this.bounds = new Vector3D(10, 10, 10);
            }
            if (this.bounds.x < 0) {
                this.bounds.x = 1;
            }
            if (this.bounds.y < 0) {
                this.bounds.y = 1;
            }
            if (this.bounds.z < 0) {
                this.bounds.z = 1;
            }

        }
    }

}