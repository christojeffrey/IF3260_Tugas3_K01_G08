import { m4 } from "../math/m4.js";
import { v3 } from "../math/v3.js";
import { animate } from "./animation.js";
import { initBuffers } from "./buffers.js";

function renderScene(gl, program, state) {
  requestAnimationFrame(render);
  function render() {
    if (state.animate) {
      animate(state);
    }
    let { position, color, normal } = state.modelInFocus;
    let buffers = initBuffers(gl, position, color, normal);
    drawScene(gl, program, buffers, state);
    requestAnimationFrame(render);
  }
}

// Draw the scene.
function drawScene(gl, program, buffers, state) {
  // Clear the canvas.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const { scale, rotation, translation, camera, modelInFocus } = state;
  const { positionBuffer, colorBuffer, normalBuffer } = buffers;
  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");
  var normalLocation = gl.getAttribLocation(program, "a_normal");
  // lookup uniforms
  var worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection");
  var worldLocation = gl.getUniformLocation(program, "u_world");
  var reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection");
  var useLightingLocation = gl.getUniformLocation(program, "u_useLighting");

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Turn on culling. By default backfacing triangles
  // will be culled.
  gl.enable(gl.CULL_FACE);

  // Enable the depth buffer
  gl.enable(gl.DEPTH_TEST);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the position attribute
  gl.enableVertexAttribArray(positionLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 3; // 3 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

  // Turn on the color attribute
  gl.enableVertexAttribArray(colorLocation);

  // Bind the color buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
  var size = 3; // 3 components per iteration
  var type = gl.UNSIGNED_BYTE; // the data is 8bit unsigned values
  var normalize = true; // normalize the data (convert from 0-255 to 0-1)
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);

  // Turn on the normal attribute
  gl.enableVertexAttribArray(normalLocation);

  // Bind the normal buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  // Tell the attribute how to get data out of normalBuffer (ARRAY_BUFFER)
  var size = 3; // 3 components per iteration
  var type = gl.FLOAT; // the data is 32bit floating point values
  var normalize = false; // normalize the data (convert from 0-255 to 0-1)
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(normalLocation, size, type, normalize, stride, offset);

  // Compute the matrices
  let projectionMatrix = m4.projection(camera.radius, state.obliqueAngle, state.perspectiveFoV, state.projection);
  let transformMatrix = m4.transform(translation, rotation, scale, modelInFocus.anchor);

  let cameraView = m4.view(camera.angle, camera.radius);

  let target = [0, 0, 0];
  let cameraPosition = [cameraView[12], cameraView[13], cameraView[14]];
  let up = [0, 1, 0];

  let viewMatrix = m4.lookAt(cameraPosition, target, up);
  viewMatrix = m4.inverse(viewMatrix);

  let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

  let worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, transformMatrix);

  let worldMatrix = m4.inverse(transformMatrix);
  worldMatrix = m4.transpose(worldMatrix);

  // Set the matrix.
  gl.uniformMatrix4fv(worldViewProjectionLocation, false, worldViewProjectionMatrix);
  gl.uniformMatrix4fv(worldLocation, false, worldMatrix);

  // Set the light direction (in the world space)
  const lightDirection = [-10, -10, 50];
  gl.uniform3fv(reverseLightDirectionLocation, v3.normalize(lightDirection));

  // Set the lighting to true or false
  if (state.shading) gl.uniform1i(useLightingLocation, true);
  else gl.uniform1i(useLightingLocation, false);

  // Draw the geometry.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = state.totalVertices;
  gl.drawArrays(primitiveType, offset, count);
}

export { renderScene };
