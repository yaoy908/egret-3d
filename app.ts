function jsOnload() {
    var sample = new egret3d.Class_ParticleOverTwoBezier();
}

function onTsconfig() {
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_View3D.js");
    egret3d.Egret3DEngine.addImportScript("./js/ClassSample/Class_ParticleOverTwoBezier.js");
}

window.onload = () => {
    egret3d.Egret3DEngine.onTsconfig = () => onTsconfig();

    egret3d.Egret3DEngine.preload(() => jsOnload());

    function rand(next: number): number {
        var xx:number = Math.floor( Number.MAX_VALUE / 1103515245);
        next = next * 1103515245 + 12345;
        return Math.floor(next / 65536) % 32768;
    }

    for (var i: number = 0; i < 100; i++) {
        console.log(rand(i));
    }
}

 