import { primaryColors } from "../../constant/colors.js";
import { v3 } from "../../math/v3.js";
import { m4 } from "../../math/m4.js";
import { Point } from "./point.js";
import { Keyframe } from "./keyframe.js";
import { degToRad } from "../../math/math.js";

let minX, maxX, minY, maxY, minZ, maxZ;

export class Model {
  constructor(name) {
    // PUBLIC
    this.cubes = [];
    this.name = name;
    // children, which is an object of Models with the name of the object as key
    this.children = {};
    // object anchor. let's make it a coordinate relative to the object's center location
    this.anchor = [0, 0, 0];

    // private
    this.color = [];
    this.position = [];
    this.normal = [];

    // TODO: add keyframes. which is an array of Keyframe. Keyframe is an object that has the transformation argument.
    this.keyframes = [];
    // modelManipulation
    this.translation = [degToRad(0), degToRad(0), degToRad(0)];
    this.rotation = [0, 0, 0];
    this.scale = [1, 1, 1];
  }
  addAnimation(keyframe) {
    // add keyframe on the back
    this.keyframes.push(keyframe);
  }
  addChildren(name, model) {
    console.log("add children for", this.name, name, model.scale);
    this.children[name] = model;

    let position = [...this.position, ...model.position];
    minX = Math.min(...position.filter((_, i) => i % 3 === 0));
    maxX = Math.max(...position.filter((_, i) => i % 3 === 0));
    minY = Math.min(...position.filter((_, i) => i % 3 === 1));
    maxY = Math.max(...position.filter((_, i) => i % 3 === 1));
    minZ = Math.min(...position.filter((_, i) => i % 3 === 2));
    maxZ = Math.max(...position.filter((_, i) => i % 3 === 2));

    this.anchor = [minX + (maxX - minX) / 2, minY + (maxY - minY) / 2, minZ + (maxZ - minZ) / 2];
  }
  setAnchor(anchor) {
    // console.log("name", this.name);
    // console.log("set anchor", anchor);
    this.anchor = anchor;
  }

  setCubes(cubes) {
    this.cubes = cubes;
  }

  completeModelUsingCubes() {
    // not for children
    // you only need to setup the rectangles.
    // the rest will be done automatically.
    // note that the color is aplied 'randomly' based on primary color
    this.position = [];
    this.color = [];
    this.normal = [];
    // set normal, color, position
    for (let i = 0; i < this.cubes.length; i++) {
      for (let j = 0; j < this.cubes[i].rectangles.length; j++) {
        let positions = this.cubes[i].rectangles[j].flattenToPoints();
        for (let k = 0; k < positions.length; k += 3 * 3) {
          let vec1 = v3.create(positions[k + 3] - positions[k], positions[k + 4] - positions[k + 1], positions[k + 5] - positions[k + 2]);
          let vec2 = v3.create(positions[k + 6] - positions[k + 3], positions[k + 7] - positions[k + 4], positions[k + 8] - positions[k + 5]);
          let normal = v3.normalize(v3.cross(vec2, vec1));
          this.normal = [...this.normal, ...normal, ...normal, ...normal];
        }
        for (let k = 0; k < 6; k++) {
          this.color = [...this.color, ...primaryColors[j % primaryColors.length]];
        }
        this.position = [...this.position, ...positions];
      }
    }
  }

  setCenterAsAnchor() {
    // set center
    if (this.position.length === 0) {
      this.anchor = [0, 0, 0]; // set to origin
      return;
    }

    minX = Math.min(...this.position.filter((_, i) => i % 3 === 0));
    maxX = Math.max(...this.position.filter((_, i) => i % 3 === 0));
    minY = Math.min(...this.position.filter((_, i) => i % 3 === 1));
    maxY = Math.max(...this.position.filter((_, i) => i % 3 === 1));
    minZ = Math.min(...this.position.filter((_, i) => i % 3 === 2));
    maxZ = Math.max(...this.position.filter((_, i) => i % 3 === 2));

    this.anchor = [minX + (maxX - minX) / 2, minY + (maxY - minY) / 2, minZ + (maxZ - minZ) / 2];
  }

  updateModelBeingDrawnFully() {
    // update position based on translation, rotation, scale and anchor
    // do this recursively for all children
    this.completeModelUsingCubes();
    // console.log("name of this model", this.name);
    // console.log(this.position);
    // console.log("====================================");
    // console.log("anchor", this.anchor);

    let childrenKeys = Object.keys(this.children);
    childrenKeys.forEach((key) => {
      // console.log(key);
      this.children[key].updateModelBeingDrawnFully();
      // console.log("this.children[childrenKeys[key]].position");
      // console.log(this.children[key].position);
      this.position = [...this.position, ...this.children[key].position];
      this.color = [...this.color, ...this.children[key].color];
      this.normal = [...this.normal, ...this.children[key].normal];
      // this.cubes = [...this.cubes, ...this.children[key].cubes];
    });
    // console.log("done");
    // console.log("====================================");
    // console.log("this.position after");
    // console.log(this.position);
    // console.log("anchor", this.anchor);
    // // update position based on translation, rotation, scale and anchor
    let newPositions = [];
    let newNormals = [];
    // group position by 3, then manipulate it
    for (let i = 0; i < this.position.length; i += 3) {
      // console.log(this.position[i], this.position[i + 1], this.position[i + 2]);
      // let vec = v3.create(this.position[i], this.position[i + 1], this.position[i + 2]);
      // let transformedPoint = m4.multiplyWithV3(m4.transform(this.translation, this.rotation, this.scale, this.anchor), vec).slice(0, 3);

      // let vecNormal = v3.create(this.normal[i], this.normal[i + 1], this.normal[i + 2]);
      // let transformedNormal = m4.multiplyWithV3(m4.rotation(this.rotation[0], this.rotation[1], this.rotation[2]), vecNormal).slice(0, 3);
      // transformedNormal = [Math.round(transformedNormal[0]), Math.round(transformedNormal[1]), Math.round(transformedNormal[2])];

      let temporaryPoint = new Point(this.position[i], this.position[i + 1], this.position[i + 2]);
      let temporaryNormalPoint = new Point(this.normal[i], this.normal[i + 1], this.normal[i + 2]);
      // translate
      // console.log("temporaryPoint for ", this.name);
      // console.log("temporaryPoint before", temporaryPoint.flatten());
      // console.log(temporaryPoint.flatten());
      // console.log("anchor", this.anchor);
      temporaryPoint.translate(this.translation);

      // rotate
      temporaryPoint.rotate(this.rotation, this.anchor);

      // scale
      temporaryPoint.scale(this.scale, this.anchor);

      // rotate
      temporaryNormalPoint.rotate(this.rotation, [0, 0, 0]);

      let temporaryNormal = temporaryNormalPoint.flatten();
      temporaryNormal = [Math.round(temporaryNormal[0]), Math.round(temporaryNormal[1]), Math.round(temporaryNormal[2])];

      console.log("temporaryPoint after", temporaryPoint.flatten());

      newPositions = [...newPositions, ...temporaryPoint.flatten()];
      newNormals = [...newNormals, ...temporaryNormal];
      // newPositions = [...newPositions, ...transformedPoint];
      // newNormals = [...newNormals, ...transformedNormal];
    }

    console.log("newPositions for", this.name, newPositions);
    this.position = newPositions;
    this.normal = newNormals;
    // console.log("anchor for", this.name, this.anchor);
    // this.setCenterAsAnchor();
    // console.log("newAnchor for", this.name, this.anchor);
    // console.log("Normal for", this.name, this.normal);
    // console.log("newNormal for", this.name, newNormal);

    // this.completeModelUsingCubes();
  }

  getMaxFrameCount() {
    // recursively get the max animation time
    let childrenMaxTime = 0;
    let thisModelMaxTime = 0;
    if (this.keyframes.length > 0) {
      thisModelMaxTime = this.keyframes[this.keyframes.length - 1].end;
    }

    let childrenKeys = Object.keys(this.children);
    childrenKeys.forEach((key) => {
      let childMaxTime = this.children[key].getMaxFrameCount();
      if (childMaxTime > childrenMaxTime) {
        childrenMaxTime = childMaxTime;
      }
    });
    return Math.max(thisModelMaxTime, childrenMaxTime);
  }

  // update by changing the translation, rotation, scale
  // do this recursively for all children
  updateModelBeingDrawnAtFrame(frame) {
    // do linear interpolation
    // get the keyframe that is before the frame, and the keyframe that is after the frame
    // then do linear interpolation
    let beforeKeyframe = null;
    let afterKeyframe = null;
    for (let i = 0; i < this.keyframes.length; i++) {
      if (this.keyframes[i].end > frame) {
        afterKeyframe = this.keyframes[i];
        if (i > 0) {
          beforeKeyframe = this.keyframes[i - 1];
        }
        break;
      }
    }
    // if there is no beforeKeyframe, then set the previous as 0,0,0 for translation, rotation. 1,1,1 for scale
    if (beforeKeyframe === null) {
      beforeKeyframe = new Keyframe(0);
      beforeKeyframe.setRotation(0, 0, 0);
      beforeKeyframe.setScale(1, 1, 1);
      beforeKeyframe.setTranslation(0, 0, 0);
    }

    if (afterKeyframe === null) {
      afterKeyframe = new Keyframe(0);
      afterKeyframe.setRotation(0, 0, 0);
      afterKeyframe.setScale(1, 1, 1);
      afterKeyframe.setTranslation(0, 0, 0);
    }

    // update translation
    let translation = beforeKeyframe.getTranslation();
    if (afterKeyframe !== null) {
      let afterTranslation = afterKeyframe.getTranslation();
      let timeDifference = afterKeyframe.end - beforeKeyframe.end;
      let timeElapsed = frame - beforeKeyframe.end;
      let timeRatio = timeElapsed / timeDifference;
      translation = [translation[0] + (afterTranslation[0] - translation[0]) * timeRatio, translation[1] + (afterTranslation[1] - translation[1]) * timeRatio, translation[2] + (afterTranslation[2] - translation[2]) * timeRatio];
    }
    this.translation = translation;

    // TODO: update rotation and scale

    // update children
    let childrenKeys = Object.keys(this.children);
    childrenKeys.forEach((key) => {
      this.children[key].updateModelBeingDrawnAtFrame(frame);
    });
  }
}
