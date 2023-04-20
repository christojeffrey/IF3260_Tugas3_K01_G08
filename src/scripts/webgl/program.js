import { error } from "../utils/error.js";

async function loadShader(gl, source, shaderType, opt_errorCallback) {
  const errFn = opt_errorCallback || error;
  // Create the shader object
  const shaderSource  = await fetchShader(source);
  const shader        = gl.createShader(shaderType);

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    const lastError = gl.getShaderInfoLog(shader);
    errFn(
      "*** Error compiling shader '" +
        shader +
        "':" +
        lastError +
        `\n` +
        shaderSource
          .split("\n")
          .map((l, i) => `${i + 1}: ${l}`)
          .join("\n")
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
async function fetchShader(source) {
  const response = await fetch("./scripts/webgl/shaders/" + source);
  console.log("response", response);
  return await response.text();
}

async function createProgram(gl, opt_attribs, opt_locations, opt_errorCallback) {
  const vShader = await loadShader(gl, "vertex.glsl", gl.VERTEX_SHADER, opt_errorCallback);
  const fShader = await loadShader(gl, "fragment.glsl", gl.FRAGMENT_SHADER, opt_errorCallback);

  const shaders = [vShader, fShader];
  const errFn = opt_errorCallback || error;
  const program = gl.createProgram();

  shaders.forEach(function (shader) {
    gl.attachShader(program, shader);
  });

  if (opt_attribs) {
    opt_attribs.forEach(function (attrib, ndx) {
      gl.bindAttribLocation(program, opt_locations ? opt_locations[ndx] : ndx, attrib);
    });
  }
  gl.linkProgram(program);

  // Check the link status
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    errFn("Error in program linking:" + lastError);

    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export { createProgram };
