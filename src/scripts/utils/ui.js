import { degToRad, radToDeg } from "../math/math.js";
import { cs } from "../constant/cs.js";
import { v3 } from "../math/v3.js";
import { m4 } from "../math/m4.js";

import { minecraft, elbow, wolf, horse, hand } from "../models/index.js";
import { KEYFRAME_DURATION } from "../constant/keyframeduration.js";
import { createTexture } from "../webgl/texture.js";

//  update model list from here
let modelListAsObject = {
  minecraft,
  elbow,
  horse,
  wolf,
  hand,
};
let state;
let defaultState;

function setupUI(gl) {
  // this is the default object. take the first object in the list
  let firstObjectKey = Object.keys(modelListAsObject)[0];
  let modelBeingDrawn = modelListAsObject[firstObjectKey];
  let modelInFocus = modelBeingDrawn;
  let modelInFocusParent = modelBeingDrawn

  let projection = "perspective";
  let obliqueAngle = 45;
  let perspectiveFoV = 90;
  let rotation = [degToRad(0), degToRad(0), degToRad(0)];
  let translation = [0, 0, 0];
  let scale = [1, 1, 1];
  let camera = { radius: 10, angle: degToRad(0) };
  let shading = true;
  let animate = false;
  let isKeyframePlaying = false;
  let customImage = null;

  defaultState = {
    modelBeingDrawn,
    modelInFocus,
    projection,
    obliqueAngle,
    perspectiveFoV,
    rotation,
    translation,
    scale,
    camera,
    shading,
    animate,
    isKeyframePlaying,
    customImage,
    modelInFocusParent
  };

  // set state as the default state
  state = defaultState;

  console.log("defaultState", defaultState.modelBeingDrawn);

  // Set canvas size
  resizeCanvasToDisplaySize(gl.canvas);
  // setup ui
  setupModelList();
  // Left bar listeners
  setupModelListener(gl);
  setupAnimationListener();
  setupFileListener();
  setupCanvasListener();
  setupShadingListener();
  setupHelpListener();

  // Right bar listeners
  setupProjectionListener();
  setupProjectionMenuListener();
  setupTranslateListener();
  setupRotationListener();
  setupScaleListener();
  setupCameraListener();

  setupTextureListener(gl);
  setModelsChildrenList();
  inFocusManipulationListener();

  // animation
  setupKeyframeListener();

  window.addEventListener("resize", resizeCanvasToDisplaySize(gl.canvas));

  return state;
}
function setupKeyframeListener() {
  // #current-frame-count
  let currentFrameCountElmt = document.querySelector("#current-frame-count");
  // set to 0
  currentFrameCountElmt.value = 0;
  // change event
  currentFrameCountElmt.addEventListener("change", () => {
    // update model
    state.modelBeingDrawn.updateModelBeingDrawnAtFrame(parseInt(currentFrameCountElmt.value));
    state.modelBeingDrawn.updateModelBeingDrawnFully();
    // update slider
    inFocusManipulationListener();
  });

  // #max-frame-count text
  // set based on the current model being drawn
  let maxFrameCountElmt = document.querySelector("#max-frame-count");
  let maxModelFrame = state.modelBeingDrawn.getMaxFrameCount();
  // add slash infront
  maxFrameCountElmt.textContent = `/${maxModelFrame}`;
  // set input max
  currentFrameCountElmt.max = maxModelFrame;

  // #play-animation button
  let playAnimationButton = document.querySelector("#play-animation");
  playAnimationButton.addEventListener("click", () => {
    console.log("play animation");
    // change text
    if (state.isKeyframePlaying) {
      playAnimationButton.textContent = "Play";
      state.isKeyframePlaying = false;
    } else {
      playAnimationButton.textContent = "Pause";
      state.isKeyframePlaying = true;
      // call model updateModelBeingDrawnAtFrame every second until the frame count is equal to the max frame count. then change text
      let currentFrameCountElmt = document.querySelector("#current-frame-count");

      let interval = setInterval(() => {
        console.log("interval");
        if (state.isKeyframePlaying) {
          if (parseInt(currentFrameCountElmt.value) < maxModelFrame) {
            currentFrameCountElmt.value = parseInt(currentFrameCountElmt.value) + 1;
          } else {
            // animation is done
            // stop interval
            currentFrameCountElmt.value = 0;
            state.isKeyframePlaying = false;
          }
        } else {
          playAnimationButton.textContent = "Play";
          state.isKeyframePlaying = false;
          // stop interval
          clearInterval(interval);
          // update model
        }
        state.modelBeingDrawn.updateModelBeingDrawnAtFrame(parseInt(currentFrameCountElmt.value));
        state.modelBeingDrawn.updateModelBeingDrawnFully();
        // update slider
        inFocusManipulationListener();
      }, KEYFRAME_DURATION);
    }
  });
  // #reset-animation button
  let resetAnimationButton = document.querySelector("#reset-animation");
  resetAnimationButton.addEventListener("click", () => {
    let currentFrameCountElmt = document.querySelector("#current-frame-count");
    currentFrameCountElmt.value = 0;
    // change text
    playAnimationButton.textContent = "Play";
    state.isKeyframePlaying = false;
    // update model being drawn
    state.modelBeingDrawn.updateModelBeingDrawnAtFrame(0);
    state.modelBeingDrawn.updateModelBeingDrawnFully();
  });
}
function setupModelList() {
  // id:model-list
  let modelListElmt = document.querySelector("#model-list");
  let modelList = Object.keys(modelListAsObject);
  modelList.forEach((model) => {
    let divElmt = document.createElement("div");
    divElmt.style = "padding-left: 1.7rem";
    let inputElmt = document.createElement("input");
    inputElmt.type = "radio";
    inputElmt.id = model;
    inputElmt.name = "model";
    inputElmt.value = model;
    console.log("model", model);
    inputElmt.checked = model === defaultState.modelBeingDrawn.name;
    let labelElmt = document.createElement("label");
    labelElmt.htmlFor = model;
    labelElmt.innerText = model;
    divElmt.appendChild(inputElmt);
    divElmt.appendChild(labelElmt);
    modelListElmt.appendChild(divElmt);
  });
}

function setModelsChildrenList() {
  // #models-children
  let modelsChildrenElmt = document.querySelector("#models-children");
  // add model's name
  let modelElmt = document.createElement("div");
  modelElmt.id = "model-in-focus";
  modelElmt.innerText = state.modelBeingDrawn.name;
  // clear it first
  modelsChildrenElmt.innerHTML = "";
  modelsChildrenElmt.appendChild(modelElmt);

  //call addChildrenButtonRecursively
  let childrenObject = state.modelBeingDrawn.children;
  let childrenList = Object.keys(childrenObject);
  childrenList.forEach((child) => {
    addChildrenButtonRecursively(0, childrenObject[child], modelsChildrenElmt);
  });
}
// add children's name recursively as a button that can be clicked. on click, change modelInFocus
function addChildrenButtonRecursively(leftMargin, child, modelsChildrenElmt) {
  // wrap button in a div
  let childElmt = document.createElement("div");
  childElmt.style = `padding-left: ${leftMargin}rem`;
  // button
  let buttonElmt = document.createElement("button");
  buttonElmt.innerText = child.name;
  buttonElmt.addEventListener("click", (e) => {
    // change id model-in-focus
    let modelElmt = document.querySelector("#model-in-focus");
    modelElmt.innerText = child.name;
    state.modelInFocus = child;
    // update model being drawn slider
    inFocusManipulationListener();
  });
  childElmt.appendChild(buttonElmt);
  modelsChildrenElmt.appendChild(childElmt);

  let childrenObject = child.children;
  let childrenList = Object.keys(childrenObject);
  childrenList.forEach((child) => {
    addChildrenButtonRecursively(leftMargin + 1.7, childrenObject[child], modelsChildrenElmt);
  });
}

function setupModelListener(gl) {
  let modelElmt = document.querySelectorAll("input[name=model]");
  modelElmt.forEach((elmt) => {
    elmt.addEventListener("change", (e) => {
      updateModel(e);
    });
  });

  function updateModel(e) {
    let model = e.target.value;
    state.modelBeingDrawn = modelListAsObject[model];

    state.modelInFocus = state.modelBeingDrawn;

    state.modelInFocusParent = state.modelBeingDrawn;
    console.log("state.parent", state.modelInFocusParent);
    setModelsChildrenList();
    setupKeyframeListener();
    inFocusManipulationListener();
    setupTextureListener(gl);
  }
}

function setupFileListener() {
  let importElmt = document.querySelector("#import");
  importElmt.addEventListener("input", importData);

  let exportElmt = document.querySelector("#export");
  exportElmt.addEventListener("click", exportData);

  function importData() {
    // based on spec, seems like we should turn this off. canvas won't be reseted on import

    function importChildData(model, state){
      console.log("drawn",state.modelBeingDrawn);
      console.log(model)
      let child = {
        name: model.name,
        position: model.position,
        color: model.color,
        normal: [],
        anchor: [],
        children: [],
        translation: model.translation,
        rotation: model.rotation,
        scale: model.scale,
      };
      for (let i = 0; i < model.position.length; i += 9) {
        let vec1 = v3.create(model.position[i + 3] - model.position[i], model.position[i + 4] - model.position[i + 1], model.position[i + 5] - model.position[i + 2]);
        let vec2 = v3.create(model.position[i + 6] - model.position[i], model.position[i + 7] - model.position[i + 1], model.position[i + 8] - model.position[i + 2]);
        let normal = v3.cross(vec2, vec1);
        v3.normalize(normal, normal);
        child.normal = [...child.normal, ...normal, ...normal, ...normal];
      }

      let maxX = Math.max(...model.position.filter((_, i) => i % 3 === 0));
      let minX = Math.min(...model.position.filter((_, i) => i % 3 === 0));
      let maxY = Math.max(...model.position.filter((_, i) => i % 3 === 1));
      let minY = Math.min(...model.position.filter((_, i) => i % 3 === 1));
      let maxZ = Math.max(...model.position.filter((_, i) => i % 3 === 2));
      let minZ = Math.min(...model.position.filter((_, i) => i % 3 === 2));
      child.anchor = [(maxX + minX) / 2, (maxY + minY) / 2, (maxZ + minZ) / 2];
      
      console.log("ABSHDBJJS",state)
      if (state){
        console.log("BAR")
        let childcount = 0;
        for (let [key, value] of Object.entries(state)){
          let childData = importChildData(model.children[childcount], value.children);
          value.name = childData.name;
          value.position = childData.position;
          value.color = childData.color;
          value.normal = childData.normal;
          value.anchor = childData.anchor;
          value.translation = childData.translation;
          value.rotation = childData.rotation;
          value.scale = childData.scale;
          childcount++;
        }
      }
      return child;
    }
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = JSON.parse(e.target.result);
      let modelElmt = document.querySelectorAll(`input[name=${data.name}]`);
      modelElmt.checked = true;
      // Pass data to defaultState
      console.log("data", data)
      defaultState.modelInFocus.name = data.name;
      defaultState.modelInFocus.position = data.position;
      defaultState.modelInFocus.color = data.color;

      defaultState.modelInFocus.normal = [];

      for (let i = 0; i < data.position.length; i += 9) {
        let vec1 = v3.create(data.position[i + 3] - data.position[i], data.position[i + 4] - data.position[i + 1], data.position[i + 5] - data.position[i + 2]);
        let vec2 = v3.create(data.position[i + 6] - data.position[i], data.position[i + 7] - data.position[i + 1], data.position[i + 8] - data.position[i + 2]);
        let normal = v3.cross(vec2, vec1);
        v3.normalize(normal, normal);
        defaultState.modelInFocus.normal = [...defaultState.modelInFocus.normal, ...normal, ...normal, ...normal];
      }

      let maxX = Math.max(...data.position.filter((_, i) => i % 3 === 0));
      let minX = Math.min(...data.position.filter((_, i) => i % 3 === 0));
      let maxY = Math.max(...data.position.filter((_, i) => i % 3 === 1));
      let minY = Math.min(...data.position.filter((_, i) => i % 3 === 1));
      let maxZ = Math.max(...data.position.filter((_, i) => i % 3 === 2));
      let minZ = Math.min(...data.position.filter((_, i) => i % 3 === 2));
      defaultState.modelInFocus.anchor = [(maxX + minX) / 2, data.name === "pyramid" ? (maxY + minY) / 2 : (maxY + minY) / 2, (maxZ + minZ) / 2];

      defaultState.totalVertices = defaultState.modelInFocus.position.length / 3;

      console.log(defaultState.modelInFocus.children)
      let childcount = 0;
      for (let [key, value] of Object.entries(defaultState.modelInFocus.children)){
        console.log(key,data.children)
        let childData = importChildData(data.children[childcount], value.children);
        value.name = childData.name;
        value.position = childData.position;
        value.color = childData.color;
        value.normal = childData.normal;
        value.anchor = childData.anchor;
        value.translation = childData.translation;
        value.rotation = childData.rotation;
        value.scale = childData.scale;
        childcount++;
      }

      defaultState.modelBeingDrawn = defaultState.modelInFocus;
      state.modelInFocus.name = defaultState.modelInFocus.name;
      state.modelInFocus.position = defaultState.modelInFocus.position;
      console.log("modelinfocus", defaultState.modelInFocus)
      state.modelInFocus.color = defaultState.modelInFocus.color;
      state.modelInFocus.normal = defaultState.modelInFocus.normal;
      state.modelInFocus.anchor = defaultState.modelInFocus.anchor;
      state.totalVertices = defaultState.totalVertices;
      state.modelBeingDrawn = state.modelInFocus;
      console.log("modelbeingdrawn", state.modelBeingDrawn);
    };
    reader.readAsText(file);

    let customFileUploadElmt = document.querySelector(".custom-file-upload");
    customFileUploadElmt.innerHTML = file.name;
    inFocusManipulationListener();
  }

  function exportData() {
    // Define recursive function
    function exportChildData(child) {
      let transformChildPosition = [];
      for (let i = 0; i < child.position.length; i += 3) {
        let vec = v3.create(child.position[i], child.position[i + 1], child.position[i + 2]);
        let transformedVec = m4.multiplyWithV3(m4.transform(state.translation, state.rotation, state.scale, child.anchor), vec);
        transformedVec = transformedVec.slice(0, 3);
        transformChildPosition = [...transformChildPosition, Math.round(transformedVec[0]), Math.round(transformedVec[1]), Math.round(transformedVec[2])];
      }
  
      let childData = {
        name: child.name,
        position: transformChildPosition,
        color: child.color,
        translation : child.translation,
        rotation : child.rotation,
        scale : child.scale,
      };
  
      if (child.children) {
        let children = [];
        for (var [key, value] of Object.entries(child.children)) {
          console.log(value)
          children.push(exportChildData(value));
        }
        childData.children = children;
      }
  
      return childData;
    }
  
    // Transform position of parent
    let transformedPosition = [];
    for (let i = 0; i < state.modelInFocusParent.position.length; i += 3) {
      let vec = v3.create(state.modelInFocusParent.position[i], state.modelInFocusParent.position[i + 1], state.modelInFocusParent.position[i + 2]);
      let transformedVec = m4.multiplyWithV3(m4.transform(state.translation, state.rotation, state.scale, state.modelInFocusParent.anchor), vec);
      transformedVec = transformedVec.slice(0, 3);
      transformedPosition = [...transformedPosition, Math.round(transformedVec[0]), Math.round(transformedVec[1]), Math.round(transformedVec[2])];
    }
  
    // Build child array of parent
    let child = [];
    for (var [key, value] of Object.entries(state.modelInFocusParent.children)) {
      console.log(key, value)
      child.push(exportChildData(value));
    }
  
    // Build data object
    let data = {
      name: state.modelInFocusParent.name,
      position: transformedPosition,
      color: state.modelInFocusParent.color,
      translation : state.modelInFocusParent.translation,
      rotation : state.modelInFocusParent.rotation,
      scale : state.modelInFocusParent.scale,
      children: child,
    };
  
    // Save data to file
    let json = JSON.stringify(data);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "data.json";
    a.href = url;
    a.click();
  }
  
}

function setupCanvasListener() {
  let clearElmt = document.querySelector("#clear");
  clearElmt.addEventListener("click", clearCanvas);

  let resetElmt = document.querySelector("#reset");
  resetElmt.addEventListener("click", resetCanvas);

  let holding = false;
  let mouse = [0, 0];
  let canvasElmt = document.querySelector("#canvas");
  canvasElmt.addEventListener("mousedown", (e) => {
    if (holding) return;

    holding = true;
    mouse = [e.clientX, e.clientY];
  });
  canvasElmt.addEventListener("mousemove", (e) => {
    if (!holding) return;

    let dx = e.clientX - mouse[0];
    let dy = e.clientY - mouse[1];
    mouse = [e.clientX, e.clientY];

    state.rotation[0] += dy * 0.005;
    state.rotation[1] -= dx * 0.005;

    let degreeX = radToDeg(state.rotation[0]);
    let degreeY = radToDeg(state.rotation[1]);

    if (degreeX < 0) degreeX += 360;
    else if (degreeX > 360) degreeX -= 360;

    if (degreeY < 0) degreeY += 360;
    else if (degreeY > 360) degreeY -= 360;

    state.rotation[0] = degToRad(degreeX);
    state.rotation[1] = degToRad(degreeY);

    document.querySelector("#rotateX").value = parseFloat(degreeX);
    document.querySelector("#rotateY").value = parseFloat(degreeY);

    document.querySelector("#rotateXValue").textContent = Math.round(degreeX);
    document.querySelector("#rotateYValue").textContent = Math.round(degreeY);
  });
  canvasElmt.addEventListener("mouseup", (e) => {
    holding = false;
  });

  function clearCanvas() {
    state.modelInFocus.name = "none";
    state.modelInFocus.position = [];
    state.modelInFocus.color = [];
    state.modelInFocus.normal = [];
    state.modelInFocus.anchor = [];
    state.totalVertices = 0;
  }
}

function resetCanvas() {
  state.modelBeingDrawn.resetWholeModelManipulation();
  state.modelBeingDrawn.updateModelBeingDrawnFully();
  inFocusManipulationListener();

  state.projection = "perspective";
  state.obliqueAngle = 45;
  state.perspectiveFoV = 90;

  state.rotation = [degToRad(0), degToRad(0), degToRad(0)];
  state.translation = [0, 0, 0];
  state.scale = [1, 1, 1];

  state.camera = { radius: 10, angle: degToRad(0) };
  state.hading = true;
  state.animate = false;
  state.isKeyframePlaying = false;

  setModelsChildrenList();

  setupTranslateListener();
  setupRotationListener();
  setupScaleListener();
}

function setupAnimationListener() {
  let animationELmt = document.querySelector("#animate");
  animationELmt.addEventListener("change", (e) => {
    updateAnimation(e);
  });

  function updateAnimation(e) {
    state.animate = e.target.checked;
  }
}

function setupShadingListener() {
  let shadingElmt = document.querySelector("#shading");
  shadingElmt.addEventListener("change", (e) => {
    updateShading(e);
  });

  function updateShading(e) {
    state.shading = e.target.checked;
  }
}

function setupHelpListener() {
  // onclick open help.html on the same window
  let helpButton = document.querySelector("#help");
  helpButton.addEventListener("click", (e) => {
    window.open("help.html", "_self");
  });
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  cs.set(width, height, 2000);
}

function setupTextureListener(gl) {
  let textureElmt = document.querySelectorAll("input[name=texture]");
  textureElmt.forEach((elmt) => {
    elmt.addEventListener("change", (e) => {
      updateTexture(e);
    });
    elmt.checked = elmt.value === state.modelBeingDrawn.texture.mode;
  });

  function updateTexture(e) {
    let texture = e.target.value;
    state.modelBeingDrawn.texture.mode = texture;

    console.log(state.modelBeingDrawn.texture.mode);

    let customImageElmt = document.querySelector("#customImage");
    if (texture === "custom") {
      customImageElmt.style.display = "block";
    } else {
      customImageElmt.style.display = "none";
    }

    customImageElmt.addEventListener("change", (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = function (e) {
        state.customImage = e.target.result;
        createTexture(gl, state)
      };
      reader.readAsDataURL(file);
    });
  }
}

function setupProjectionListener() {
  let projectionElmt = document.querySelectorAll("input[name=projection]");
  projectionElmt.forEach((elmt) => {
    elmt.addEventListener("change", (e) => {
      updateProjection(e);
    });
  });

  function updateProjection(e) {
    let projection = e.target.value;
    state.projection = projection;

    let projectionMenuElmt = document.querySelector("h3[name='projectionMenu']");
    projectionMenuElmt.innerHTML = projection[0].toUpperCase() + projection.slice(1);

    let spaceElmt = document.querySelector("#space");
    let obliqueElmt = document.querySelector("#obliqueMenu");
    let perspectiveElmt = document.querySelector("#perspectiveMenu");
    switch (projection) {
      case "orthographic":
        spaceElmt.style.display = "block";

        obliqueElmt.style.display = "none";
        perspectiveElmt.style.display = "none";
        break;
      case "oblique":
        spaceElmt.style.display = "none";

        obliqueElmt.style.display = "inline-block";
        perspectiveElmt.style.display = "none";
        break;
      case "perspective":
        spaceElmt.style.display = "none";

        obliqueElmt.style.display = "none";
        perspectiveElmt.style.display = "inline-block";
        break;
    }
  }
}

function setupProjectionMenuListener() {
  let obliqueAngleElmt = document.querySelector("#obliqueAngle");
  obliqueAngleElmt.addEventListener("input", (e) => {
    updateObliqueAngle(e);
  });

  let perspectiveFoVElmt = document.querySelector("#perspectiveFoV");
  perspectiveFoVElmt.addEventListener("input", (e) => {
    updatePerspectiveFoV(e);
  });

  function updateObliqueAngle(e) {
    state.obliqueAngle = e.target.value;

    let obliqueAngleValueElmt = document.querySelector("#obliqueAngleValue");
    obliqueAngleValueElmt.textContent = e.target.value;
  }

  function updatePerspectiveFoV(e) {
    state.perspectiveFoV = e.target.value;

    let perspectiveFoVValueElmt = document.querySelector("#perspectiveFoVValue");
    perspectiveFoVValueElmt.textContent = e.target.value;
  }
}

function setupTranslateListener() {
  // set listeners for translateX sliders
  let translateXElmt = document.querySelector("#translateX");
  translateXElmt.min = -(Math.round(cs.width / 1000) * 1000) / 4;
  translateXElmt.max = (Math.round(cs.width / 1000) * 1000) / 4;
  translateXElmt.value = 0;
  updatePosition(0)(null, { value: translateXElmt.value });
  translateXElmt.addEventListener("input", (e) => {
    updatePosition(0)(e, { value: e.target.value });
  });

  // set listeners for translateY sliders
  let translateYElmt = document.querySelector("#translateY");
  translateYElmt.min = (-Math.round(cs.height / 1000) * 1000) / 4;
  translateYElmt.max = (Math.round(cs.height / 1000) * 1000) / 4;
  translateYElmt.value = 0;
  updatePosition(1)(null, { value: translateYElmt.value });
  translateYElmt.addEventListener("input", (e) => {
    updatePosition(1)(e, { value: e.target.value });
  });

  // set listeners for translateZ sliders
  let translateZElmt = document.querySelector("#translateZ");
  translateZElmt.min = -cs.depth / 8;
  translateZElmt.max = cs.depth / 8;
  translateZElmt.value = 0;
  updatePosition(2)(null, { value: translateZElmt.value });
  translateZElmt.addEventListener("input", (e) => {
    updatePosition(2)(e, { value: e.target.value });
  });

  function updatePosition(idx) {
    return function (_, ui) {
      state.translation[idx] = ui.value;
      switch (idx) {
        case 0:
          let translateXValueELmt = document.querySelector("#translateXValue");
          translateXValueELmt.textContent = ui.value;
          translateXElmt.value = ui.value;
          break;
        case 1:
          let translateYValueELmt = document.querySelector("#translateYValue");
          translateYValueELmt.textContent = ui.value;
          translateYElmt.value = ui.value;
          break;
        case 2:
          let translateZValueELmt = document.querySelector("#translateZValue");
          translateZValueELmt.textContent = ui.value;
          translateZElmt.value = ui.value;
          break;
      }
    };
  }
}

function setupRotationListener() {
  // set listeners for rotateX sliders
  let rotateXELmt = document.querySelector("#rotateX");
  rotateXELmt.value = 0;
  updateRotation(0)(null, { value: rotateXELmt.value });
  rotateXELmt.addEventListener("input", (e) => {
    updateRotation(0)(e, { value: e.target.value });
  });

  // set listeners for rotateY sliders
  let rotateYElmt = document.querySelector("#rotateY");
  rotateYElmt.value = 0;
  updateRotation(1)(null, { value: rotateYElmt.value });
  rotateYElmt.addEventListener("input", (e) => {
    updateRotation(1)(e, { value: e.target.value });
  });

  // set listeners for rotateZ sliders
  let rotateZElmt = document.querySelector("#rotateZ");
  rotateZElmt.value = 0;
  updateRotation(2)(null, { value: rotateZElmt.value });
  rotateZElmt.addEventListener("input", (e) => {
    updateRotation(2)(e, { value: e.target.value });
  });

  function updateRotation(idx) {
    return function (_, ui) {
      state.rotation[idx] = degToRad(ui.value);
      switch (idx) {
        case 0:
          let rotateXValueELmt = document.querySelector("#rotateXValue");
          rotateXValueELmt.textContent = ui.value;
          rotateXELmt.value = ui.value;
          break;
        case 1:
          let rotateYValueELmt = document.querySelector("#rotateYValue");
          rotateYValueELmt.textContent = ui.value;
          rotateYElmt.value = ui.value;
          break;
        case 2:
          let rotateZValueELmt = document.querySelector("#rotateZValue");
          rotateZValueELmt.textContent = ui.value;
          rotateZElmt.value = ui.value;
          break;
      }
    };
  }
}

function setupScaleListener() {
  // set listeners for scaleX sliders
  let scaleXElmt = document.querySelector("#scaleX");
  scaleXElmt.value = 1;
  updateScale(0)(null, { value: scaleXElmt.value });
  scaleXElmt.addEventListener("input", (e) => {
    updateScale(0)(e, { value: e.target.value });
  });

  // set listeners for scaleY sliders
  let scaleYElmt = document.querySelector("#scaleY");
  scaleYElmt.value = 1;
  updateScale(1)(null, { value: scaleYElmt.value });
  scaleYElmt.addEventListener("input", (e) => {
    updateScale(1)(e, { value: e.target.value });
  });

  // set listeners for scaleZ sliders
  let scaleZElmt = document.querySelector("#scaleZ");
  scaleZElmt.value = 1;
  updateScale(2)(null, { value: scaleZElmt.value });
  scaleZElmt.addEventListener("input", (e) => {
    updateScale(2)(e, { value: e.target.value });
  });

  function updateScale(idx) {
    return function (_, ui) {
      state.scale[idx] = ui.value;
      switch (idx) {
        case 0:
          let scaleXValueELmt = document.querySelector("#scaleXValue");
          scaleXValueELmt.textContent = ui.value;
          scaleXElmt.value = ui.value;
          break;
        case 1:
          let scaleYValueELmt = document.querySelector("#scaleYValue");
          scaleYValueELmt.textContent = ui.value;
          scaleYElmt.value = ui.value;
          break;
        case 2:
          let scaleZValueELmt = document.querySelector("#scaleZValue");
          scaleZValueELmt.textContent = ui.value;
          scaleZElmt.value = ui.value;
          break;
      }
    };
  }
}

function inFocusManipulationListener() {
  // translate

  console.log(state.modelBeingDrawn)
  let idNameInput = ["translateXInFocusInput", "translateYInFocusInput", "translateZInFocusInput", "rotateXInFocusInput", "rotateYInFocusInput", "rotateZInFocusInput", "scaleXInFocusInput", "scaleYInFocusInput", "scaleZInFocusInput"];
  let idNameLabel = ["translateXInFocusValue", "translateYInFocusValue", "translateZInFocusValue", "rotateXInFocusValue", "rotateYInFocusValue", "rotateZInFocusValue", "scaleXInFocusValue", "scaleYInFocusValue", "scaleZInFocusValue"];
  for (let i = 0; i < 3; i++) {
    let elmtInput = document.querySelector("#" + idNameInput[i]);
    let elmtValue = document.querySelector("#" + idNameLabel[i]);

    elmtInput.min = -(Math.round(cs.width / 1000) * 1000) / 4;
    elmtInput.max = (Math.round(cs.width / 1000) * 1000) / 4;

    // set current value and text
    elmtInput.value = state.modelInFocus.translation[i];
    elmtValue.textContent = state.modelInFocus.translation[i];

    elmtInput.addEventListener("input", (e) => {
      // parse the value to float
      state.modelInFocus.translation[i] = parseFloat(e.target.value);
      elmtValue.textContent = e.target.value;
      elmtInput.value = e.target.value;
      console.log("update model in focus")
      state.modelBeingDrawn.updateModelBeingDrawnFully();
    });
  }

  // rotate
  for (let i = 0; i < 3; i++) {
    let elmtInput = document.querySelector("#" + idNameInput[i + 3]);
    let elmtValue = document.querySelector("#" + idNameLabel[i + 3]);

    elmtInput.min = -360;
    elmtInput.max = 360;
    // set current value and text
    elmtInput.value = radToDeg(state.modelInFocus.rotation[i]);
    elmtValue.textContent = radToDeg(state.modelInFocus.rotation[i]);

    elmtInput.addEventListener("input", (e) => {
      // parse the value to float
      state.modelInFocus.rotation[i] = degToRad(parseFloat(e.target.value));
      elmtValue.textContent = e.target.value;
      elmtInput.value = e.target.value;
      state.modelBeingDrawn.updateModelBeingDrawnFully();
    });
  }

  // scale
  for (let i = 0; i < 3; i++) {
    let elmtInput = document.querySelector("#" + idNameInput[i + 6]);
    let elmtValue = document.querySelector("#" + idNameLabel[i + 6]);

    elmtInput.min = 0;
    elmtInput.max = 3;
    // set current value and text
    elmtInput.value = state.modelInFocus.scale[i];
    elmtValue.textContent = state.modelInFocus.scale[i];

    elmtInput.addEventListener("input", (e) => {
      // parse the value to float
      state.modelInFocus.scale[i] = parseFloat(e.target.value);
      elmtValue.textContent = e.target.value;
      elmtInput.value = e.target.value;
      state.modelBeingDrawn.updateModelBeingDrawnFully();
    });
  }
}

function setupCameraListener() {
  let radiusElmt = document.querySelector("#radius");
  radiusElmt.addEventListener("input", (e) => {
    updateRadius(e, { value: e.target.value });
  });

  let angleElmt = document.querySelector("#angle");
  angleElmt.addEventListener("input", (e) => {
    updateAngle(e, { value: e.target.value });
  });

  function updateRadius(_, ui) {
    state.camera.radius = parseInt(ui.value);
    let radiusValueElmt = document.querySelector("#radiusValue");
    radiusValueElmt.textContent = ui.value;
    radiusElmt.value = ui.value;
  }

  function updateAngle(_, ui) {
    state.camera.angle = degToRad(ui.value);
    let angleValueELmt = document.querySelector("#angleValue");
    angleValueELmt.textContent = ui.value;
    angleElmt.value = ui.value;
  }
}

export { setupUI };
