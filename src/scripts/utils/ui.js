import { degToRad, radToDeg } from "../math/math.js";
import { cs } from "../constant/cs.js";
import { v3 } from "../math/v3.js";
import { m4 } from "../math/m4.js";
import { elbow, horse, pig } from "../models/index.js";

//  update model list from here
let modelListAsObject = {
  elbow,
  horse,
  pig,
};
let state;
let defaultState;

function setupUI(gl) {
  // this is the default object. take the first object in the list
  let firstObjectKey = Object.keys(modelListAsObject)[1];
  let modelBeingDrawn = modelListAsObject[firstObjectKey];

  console.log("modelBeingDrawn", modelBeingDrawn);

  let modelInFocus = modelBeingDrawn.children.firstArm;
  console.log("modelInFocus", modelBeingDrawn.children.firstArm);
  //modelInFocus.anchor = modelInFocus.anchor || [0, 0, 0];

  // console.log("modelInFocus", modelInFocus);

  // let projection = "orthographic";
  // let projection = "oblique";
  let projection = "perspective";
  let obliqueAngle = 45;
  let perspectiveFoV = 90;
  // let rotation = [degToRad(0), degToRad(0), degToRad(350)];
  // let rotation = [degToRad(0), degToRad(315), degToRad(0)];
  let rotation = [degToRad(0), degToRad(0), degToRad(0)];
  // let translation = [0, 0, 0];\
  let translation = [0, 0, 0];
  let scale = [1, 1, 1];
  // let scale = [0.7, 0.7, 0.7];
  let camera = { radius: 10, angle: degToRad(0) };
  let shading = true;
  let animate = false;

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
  };

  // set state as the default state
  state = defaultState;

  console.log("defaultState", defaultState.modelBeingDrawn);

  // Set canvas size
  resizeCanvasToDisplaySize(gl.canvas);
  // setup ui
  setupModelList();
  // Left bar listeners
  setupModelListener();
  setupAnimationListener();
  setupFileListener();
  setupCanvasListener();
  setupShadingListener();
  setupHelpListener();

  setModelsChildrenList();
  inFocusManipulationListener();

  // Right bar listeners
  setupProjectionListener();
  setupProjectionMenuListener();
  setupTranslateListener();
  setupRotationListener();
  setupScaleListener();
  setupCameraListener();

  window.addEventListener("resize", resizeCanvasToDisplaySize(gl.canvas));

  return state;
}

function setupModelList() {
  // id:model-list
  {
    /* <div style="padding-left: 1.7rem">
  <input type="radio" id="tessaract" name="model" value="tessaract" />
  <label for="tessaract">Tessaract</label>
</div> */
  }
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
    inputElmt.checked = model === defaultState.modelInFocus.name;
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
  });
  childElmt.appendChild(buttonElmt);
  modelsChildrenElmt.appendChild(childElmt);

  let childrenObject = child.children;
  let childrenList = Object.keys(childrenObject);
  childrenList.forEach((child) => {
    addChildrenButtonRecursively(leftMargin + 1.7, childrenObject[child], modelsChildrenElmt);
  });
}

function setupModelListener() {
  let modelElmt = document.querySelectorAll("input[name=model]");
  modelElmt.forEach((elmt) => {
    elmt.addEventListener("change", (e) => {
      updateModel(e);
    });
  });

  function updateModel(e) {
    let model = e.target.value;
    state.modelInFocus.name = model;
    state.modelInFocus.position = modelListAsObject[model].position;
    state.modelInFocus.color = modelListAsObject[model].color;
    state.modelInFocus.normal = modelListAsObject[model].normal;
    state.modelInFocus.anchor = modelListAsObject[model].anchor;
    state.totalVertices = state.modelInFocus.position.length / 3;
  }
}

function setupFileListener() {
  let importElmt = document.querySelector("#import");
  importElmt.addEventListener("input", importData);

  let exportElmt = document.querySelector("#export");
  exportElmt.addEventListener("click", exportData);

  function importData() {
    // based on spec, seems like we should turn this off. canvas won't be reseted on import
    // resetCanvas();

    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = JSON.parse(e.target.result);
      let modelElmt = document.querySelector(`input[value=${data.name}]`);
      modelElmt.checked = true;
      // Pass data to defaultState
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

      // set the imported file as the default state
      // Pass defaultState to state
      state.modelInFocus.name = defaultState.modelInFocus.name;
      state.modelInFocus.position = defaultState.modelInFocus.position;
      state.modelInFocus.color = defaultState.modelInFocus.color;
      state.modelInFocus.normal = defaultState.modelInFocus.normal;
      state.modelInFocus.anchor = defaultState.modelInFocus.anchor;
      state.totalVertices = defaultState.totalVertices;
    };
    reader.readAsText(file);

    let customFileUploadElmt = document.querySelector(".custom-file-upload");
    customFileUploadElmt.innerHTML = file.name;
  }

  function exportData() {
    // Transform position
    let transformedPosition = [];
    for (let i = 0; i < state.modelInFocus.position.length; i += 3) {
      let vec = v3.create(state.modelInFocus.position[i], state.modelInFocus.position[i + 1], state.modelInFocus.position[i + 2]);
      console.log(state.modelInFocus.anchor);
      let transformedVec = m4.multiplyWithV3(m4.transform(state.translation, state.rotation, state.scale, state.modelInFocus.anchor), vec);
      transformedVec = transformedVec.slice(0, 3);
      transformedPosition = [...transformedPosition, Math.round(transformedVec[0]), Math.round(transformedVec[1]), Math.round(transformedVec[2])];
    }

    // for make default model with transformation
    let rectangle_point = [
    ]

    for (let i = 0; i < state.modelInFocus.cubes.length; i++) {
      rectangle_point.push(transformedPosition[(108*i) + 0]); rectangle_point.push(transformedPosition[(108*i) + 1]); rectangle_point.push(transformedPosition[(108*i) + 2]);
      rectangle_point.push(transformedPosition[(108*i) + 3]); rectangle_point.push(transformedPosition[(108*i) + 4]); rectangle_point.push(transformedPosition[(108*i) + 5]);
      rectangle_point.push(transformedPosition[(108*i) + 12]); rectangle_point.push(transformedPosition[(108*i) + 13]); rectangle_point.push(transformedPosition[(108*i) + 14]);
      rectangle_point.push(transformedPosition[(108*i) + 6]); rectangle_point.push(transformedPosition[(108*i) + 7]); rectangle_point.push(transformedPosition[(108*i) + 8]);

      rectangle_point.push(transformedPosition[(108*i) + 24]); rectangle_point.push(transformedPosition[(108*i) + 25]); rectangle_point.push(transformedPosition[(108*i) + 26]);
      rectangle_point.push(transformedPosition[(108*i) + 30]); rectangle_point.push(transformedPosition[(108*i) + 31]); rectangle_point.push(transformedPosition[(108*i) + 32]);
      rectangle_point.push(transformedPosition[(108*i) + 21]); rectangle_point.push(transformedPosition[(108*i) + 22]); rectangle_point.push(transformedPosition[(108*i) + 23]);
      rectangle_point.push(transformedPosition[(108*i) + 18]); rectangle_point.push(transformedPosition[(108*i) + 19]); rectangle_point.push(transformedPosition[(108*i) + 20]);
    }
    let data = {
      name: state.modelInFocus.name,
      position: transformedPosition,
      color: state.modelInFocus.color,
    };

    // let data = {
    //   rectangle_point: rectangle_point,
    // }
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
  state.modelInFocus = {
    name: defaultState.modelInFocus.name,
    position: defaultState.modelInFocus.position,
    color: defaultState.modelInFocus.color,
    normal: defaultState.modelInFocus.normal,
    anchor: defaultState.modelInFocus.anchor,
  };
  state.totalVertices = defaultState.totalVertices;
  state.projection = defaultState.projection;
  state.obliqueAngle = defaultState.obliqueAngle;
  state.perspectiveFoV = defaultState.perspectiveFoV;
  state.rotation = [...defaultState.rotation];
  state.translation = [...defaultState.translation];
  state.scale = [...defaultState.scale];
  state.camera = {
    radius: defaultState.camera.radius,
    angle: defaultState.camera.angle,
  };
  state.shading = defaultState.shading;
  state.animate = defaultState.animate;

  let modelElmt = document.querySelectorAll("input[name=model]");
  for (let i = 0; i < modelElmt.length; i++) {
    if (modelElmt[i].value == state.modelInFocus.name) {
      modelElmt[i].checked = true;
      break;
    }
  }

  let projectionElmt = document.querySelectorAll("input[name='projection']");
  for (let i = 0; i < projectionElmt.length; i++) {
    if (projectionElmt[i].value == state.projection) {
      projectionElmt[i].checked = true;
      break;
    }
  }

  let translateXElmt = document.querySelector("#translateX");
  translateXElmt.value = state.translation[0];
  let translateYElmt = document.querySelector("#translateY");
  translateYElmt.value = state.translation[1];
  let translateZElmt = document.querySelector("#translateZ");
  translateZElmt.value = state.translation[2];

  let translateXValueELmt = document.querySelector("#translateXValue");
  translateXValueELmt.textContent = state.translation[0];
  let translateYValueELmt = document.querySelector("#translateYValue");
  translateYValueELmt.textContent = state.translation[1];
  let translateZValueELmt = document.querySelector("#translateZValue");
  translateZValueELmt.textContent = state.translation[2];

  let rotateXElmt = document.querySelector("#rotateX");
  rotateXElmt.value = state.rotation[0];
  let rotateYElmt = document.querySelector("#rotateY");
  rotateYElmt.value = state.rotation[1];
  let rotateZElmt = document.querySelector("#rotateZ");
  rotateZElmt.value = state.rotation[2];

  let rotateXValueELmt = document.querySelector("#rotateXValue");
  rotateXValueELmt.textContent = state.rotation[0];
  let rotateYValueELmt = document.querySelector("#rotateYValue");
  rotateYValueELmt.textContent = state.rotation[1];
  let rotateZValueELmt = document.querySelector("#rotateZValue");
  rotateZValueELmt.textContent = state.rotation[2];

  let scaleXElmt = document.querySelector("#scaleX");
  scaleXElmt.value = state.scale[0];
  let scaleYElmt = document.querySelector("#scaleY");
  scaleYElmt.value = state.scale[1];
  let scaleZElmt = document.querySelector("#scaleZ");
  scaleZElmt.value = state.scale[2];

  let scaleXValueELmt = document.querySelector("#scaleXValue");
  scaleXValueELmt.textContent = state.scale[0];
  let scaleYValueELmt = document.querySelector("#scaleYValue");
  scaleYValueELmt.textContent = state.scale[1];
  let scaleZValueELmt = document.querySelector("#scaleZValue");
  scaleZValueELmt.textContent = state.scale[2];

  let radiusElmt = document.querySelector("#radius");
  radiusElmt.value = state.camera.radius;

  let radiusValueElmt = document.querySelector("#radiusValue");
  radiusValueElmt.textContent = state.camera.radius;

  let angleElmt = document.querySelector("#angle");
  angleElmt.value = state.camera.angle;

  let angleValueElmt = document.querySelector("#angleValue");
  angleValueElmt.textContent = state.camera.angle;

  let animateElmt = document.querySelector("#animate");
  animateElmt.checked = state.animate;

  let shadingElmt = document.querySelector("#shading");
  shadingElmt.checked = state.shading;
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
  translateXElmt.addEventListener("input", (e) => {
    updatePosition(0)(e, { value: e.target.value });
  });

  // set listeners for translateY sliders
  let translateYElmt = document.querySelector("#translateY");
  translateYElmt.min = (-Math.round(cs.height / 1000) * 1000) / 4;
  translateYElmt.max = (Math.round(cs.height / 1000) * 1000) / 4;
  translateYElmt.value = 0;
  translateYElmt.addEventListener("input", (e) => {
    updatePosition(1)(e, { value: e.target.value });
  });

  // set listeners for translateZ sliders
  let translateZElmt = document.querySelector("#translateZ");
  translateZElmt.min = -cs.depth / 8;
  translateZElmt.max = cs.depth / 8;
  translateZElmt.value = 0;
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
  rotateXELmt.addEventListener("input", (e) => {
    updateRotation(0)(e, { value: e.target.value });
  });

  // set listeners for rotateY sliders
  let rotateYElmt = document.querySelector("#rotateY");
  rotateYElmt.addEventListener("input", (e) => {
    updateRotation(1)(e, { value: e.target.value });
  });

  // set listeners for rotateZ sliders
  let rotateZElmt = document.querySelector("#rotateZ");
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
  scaleXElmt.addEventListener("input", (e) => {
    updateScale(0)(e, { value: e.target.value });
  });

  // set listeners for scaleY sliders
  let scaleYElmt = document.querySelector("#scaleY");
  scaleYElmt.addEventListener("input", (e) => {
    updateScale(1)(e, { value: e.target.value });
  });

  // set listeners for scaleZ sliders
  let scaleZElmt = document.querySelector("#scaleZ");
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
  let idNameInput = [
    "translateXInFocusInput", "translateYInFocusInput", "translateZInFocusInput",
    "rotateXInFocusInput", "rotateYInFocusInput", "rotateZInFocusInput",
    "scaleXInFocusInput", "scaleYInFocusInput", "scaleZInFocusInput",
  ];
  let idNameLabel = [
    "translateXInFocusValue", "translateYInFocusValue", "translateZInFocusValue",
    "rotateXInFocusValue", "rotateYInFocusValue", "rotateZInFocusValue",
    "scaleXInFocusValue", "scaleYInFocusValue", "scaleZInFocusValue",
  ];
  for (let i = 0; i < 3; i++) {
    let elmtInput = document.querySelector("#" + idNameInput[i]);
    elmtInput.min = -(Math.round(cs.width / 1000) * 1000) / 4;
    elmtInput.max = (Math.round(cs.width / 1000) * 1000) / 4;
    elmtInput.addEventListener("input", (e) => {
      // parse the value to float
      state.modelInFocus.translation[i] = parseFloat(e.target.value);
      let elmtValue = document.querySelector("#" + idNameLabel[i]);
      elmtValue.textContent = e.target.value;
      elmtInput.value = e.target.value;
      state.modelBeingDrawn.updateModelBeingDrawnFully();
    });
  }

  for (let i = 0; i < 3; i++) {
    let elmtInput = document.querySelector("#" + idNameInput[i + 3]);
    elmtInput.min = -360;
    elmtInput.max = 360;
    elmtInput.addEventListener("input", (e) => {
      // parse the value to float
      state.modelInFocus.rotation[i] = degToRad(parseFloat(e.target.value));
      let elmtValue = document.querySelector("#" + idNameLabel[i + 3]);
      elmtValue.textContent = e.target.value;
      elmtInput.value = e.target.value;
      state.modelBeingDrawn.updateModelBeingDrawnFully();
    });
  }
  
  for (let i = 0; i < 3; i++) {
    let elmtInput = document.querySelector("#" + idNameInput[i + 6]);
    elmtInput.min = 0;
    elmtInput.max = 3;
    elmtInput.addEventListener("input", (e) => {
      // parse the value to float
      state.modelInFocus.scale[i] = parseFloat(e.target.value);
      let elmtValue = document.querySelector("#" + idNameLabel[i + 6]);
      elmtValue.textContent = e.target.value;
      elmtInput.value = e.target.value;
      state.modelBeingDrawn.updateModelBeingDrawnFully();
    });
  }


  // TODO: rotation
  // TODO: scale
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
