module egret3d {
  
    /**
    * @private
    */
    export enum TextureMethodType {
        diffuse,
        normal,
        specular,
        color,
        shadow
    }

    export enum ShaderPhaseType {
        start_vertex,
        local_vertex,
        global_vertex,
        end_vertex,

        start_fragment,
        materialsource_fragment,
        diffuse_fragment,
        normal_fragment,
        specular_fragment,
        shadow_fragment,
        lighting_fragment,
        end_fragment,
    }
}