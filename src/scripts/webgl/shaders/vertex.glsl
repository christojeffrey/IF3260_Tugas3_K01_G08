// Attribute
attribute vec4 a_position;
attribute vec4 a_color;

attribute vec3 a_tangent;
attribute vec3 a_bitangent;
attribute vec3 a_normal;

attribute vec2 a_texture;

// Uniform
uniform mat4 u_worldViewProjection;
uniform mat4 u_world;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_norm;

// This will be passed into the fragment shader.
varying vec4 v_color;

varying vec3 v_worldNormal;
varying vec3 v_worldPosition;
varying vec3 v_viewModelPosition;

varying vec2 v_texture;

varying mat3 v_tbn;

mat3 transpose(in mat3 inputMatrix) {
    vec3 v1 = inputMatrix[0];
    vec3 v2 = inputMatrix[1];
    vec3 v3 = inputMatrix[2];

    mat3 outputMatrix = mat3(
        vec3(v1.x, v2.x, v3.x),
        vec3(v1.y, v2.y, v3.y),
        vec3(v1.z, v2.z, v3.z)
    );

    return outputMatrix;
}

void main() {
    // Multiply the position by the matrix.
    gl_Position = u_worldViewProjection * a_position;

    // Pass the color to the fragment shader.
    v_color = a_color;

    v_worldPosition = (u_world * a_position).xyz;

    v_worldNormal = mat3(u_world) * a_normal;

    v_texture = a_texture;

    vec3 t = normalize(mat3(u_world) * a_tangent);
    vec3 b = normalize(mat3(u_world) * a_bitangent);
    vec3 n = normalize(mat3(u_world) * a_normal);
    v_tbn = transpose(mat3(t, b, n));
}