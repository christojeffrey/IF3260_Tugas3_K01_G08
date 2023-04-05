import { setupUI } from "./utils/ui.js";
import { createProgram } from "./webgl/program.js";
import { renderScene } from "./webgl/render.js";

async function  main() {

  let canvas    = document.querySelector("#canvas");
  let gl        = canvas.getContext("webgl");
  if (!gl) {
    window.alert("No WebGL");
    return;
  }
  // setup GLSL program
  let program   = await createProgram(gl);
 
  // Setup a ui and return the state
  let state = setupUI(gl)

  renderScene(gl, program, state);
}

main();
