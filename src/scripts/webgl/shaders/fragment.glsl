precision mediump float;

// Passed in from the vertex shader.
varying vec4 v_color;

varying vec3 v_worldNormal;
varying vec3 v_worldPosition;

varying vec2 v_texture;

// Uniform
uniform vec3 u_reverseLightDirection;
uniform vec3 u_worldCameraPosition;

uniform vec4 u_color;

uniform bool u_useLighting;

uniform int u_textureMode;

varying mat3 v_tbn;

// Texture
uniform sampler2D u_textureImage;
uniform sampler2D u_textureBumpMap;
uniform sampler2D u_textureCustomImage;
uniform samplerCube u_textureEnvironment;

void main() {
    // because v_worldNormal is a varying it's interpolated
    // so it will not be a unit vector. Normalizing it
    // will make it a unit vector again
    gl_FragColor = v_color;
    vec3 normal = normalize(v_worldNormal);

    if (u_textureMode == 0) {
        gl_FragColor = texture2D(u_textureImage, v_texture);
    } else if (u_textureMode == 1) {
        vec3 norm = normalize(texture2D(u_textureBumpMap, v_texture).rgb * 2.0 - 1.0);
        vec3 normalBump = normalize(v_tbn * norm);
       
        normal = normalBump;

        gl_FragColor = texture2D(u_textureBumpMap, v_texture);
    } else if (u_textureMode == 2) {
        vec3 worldNormal = normalize(v_worldNormal);
        vec3 eyeToSurface = normalize(v_worldPosition - u_worldCameraPosition);
        vec3 direction = reflect(eyeToSurface, worldNormal);

        gl_FragColor = textureCube(u_textureEnvironment, direction);
    } else if (u_textureMode == 3) {
        gl_FragColor = texture2D(u_textureCustomImage, v_texture);
    } 
    
    float light = dot(normal, u_reverseLightDirection);

    if (light < 0.3)
        light = 0.3;
    else if (light > 1.0) 
        light = 1.0;

    // Lets multiply just the color portion (not the alpha)
    // by the light
    if (u_useLighting)
        gl_FragColor.rgb *= (light + vec3(0.3, 0.3, 0.3) );
}