precision mediump float;

// Passed in from the vertex shader.
varying vec4 v_color;

// Passed in from the vertex shader.
varying vec3 v_normal;

uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

uniform bool u_useLighting;

void main() {
    // because v_normal is a varying it's interpolated
    // so it will not be a unit vector. Normalizing it
    // will make it a unit vector again
    vec3 normal = normalize(v_normal);

    float light = dot(normal, u_reverseLightDirection);

    if (light < 0.3)
        light = 0.3;
    else if (light > 1.0) 
        light = 1.0;

    gl_FragColor = v_color;

    // Lets multiply just the color portion (not the alpha)
    // by the light
    if (u_useLighting)
        gl_FragColor.rgb *= light;
}