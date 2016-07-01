// struct SurfaceOutput{
//     vec3 Albedo; //表面反射率
//     vec3 Normal; //表面法线值
//     vec3 Emission; //表面散射颜色
// 　　float Specular; //表面镜面高光强度
// 　　float Gloss; //表面光泽度
// 　　float Alpha; //表面透明度
// };

vec4 LightingBlinnPhong(vec3 lightDir, vec3 lightColor , vec3 normal , vec3 viewDir, float atten){
	vec3 ambient = materialSource.ambient ; 
	float NdotL = clamp(dot (normal, lightDir),0.0,1.0); 
	vec3 diffuse = lightColor.xyz * NdotL ; 
	
	vec3 h = normalize (lightDir + normalize(viewDir)); 
	float nh = clamp(dot (normal, h),0.0,1.0); 
	float specPower = pow (nh, materialSource.shininess ) * materialSource.specularScale ; 
	vec3 specular = lightColor.xyz * specPower * materialSource.specular ; 
	vec4 c; 
	c.rgb = (diffuse+specular+ambient) * (atten * 2.0 ); 
	c.a = materialSource.alpha + (specPower * atten); 
	return c;  
}