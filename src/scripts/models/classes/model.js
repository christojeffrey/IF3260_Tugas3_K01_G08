import { primaryColors } from "../../constant/colors.js";
import { v3 } from "../../math/v3.js";
import { Point } from "./point.js";
import { Keyframe } from "./keyframe.js";

let minX, maxX, minY, maxY, minZ, maxZ;

export class Model {
  constructor(name) {
    // PUBLIC
    this.cubes = [];
    this.name = name;
    // children, which is an object of Models with the name of the object as key
    this.children = {};
    // object anchor. let's make it a coordinate relative to the object's center location
    this.anchor = new Point(0, 0, 0);

    // private
    this.color = [];
    this.position = [];
    this.normal = [];

    // TODO: add keyframes. which is an array of Keyframe. Keyframe is an object that has the transformation argument.
    this.keyframes = [];
    // modelManipulation
    this.translation = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [1, 1, 1];
  }
  addAnimation(keyframe) {
    // add keyframe on the back
    this.keyframes.push(keyframe);
  }
  addChildren(name, model) {
    this.children[name] = model;
  }
  setAnchor(anchor) {
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

    // this.setCenterAsAnchor();
  }

  setCenterAsAnchor() {
    // set center
    minX = Math.min(...this.position.filter((_, i) => i % 3 === 0));
    maxX = Math.max(...this.position.filter((_, i) => i % 3 === 0));
    minY = Math.min(...this.position.filter((_, i) => i % 3 === 1));
    maxY = Math.max(...this.position.filter((_, i) => i % 3 === 1));
    minZ = Math.min(...this.position.filter((_, i) => i % 3 === 2));
    maxZ = Math.max(...this.position.filter((_, i) => i % 3 === 2));

    this.anchor = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];
  }

  updateModelBeingDrawnFully() {
    // update position based on translation, rotation, scale and anchor
    // do this recursively for all children
    this.completeModelUsingCubes();
    console.log("name of this model", this.name);
    console.log(this.position);

    let childrenKeys = Object.keys(this.children);
    childrenKeys.forEach((key) => {
      console.log(key);
      this.children[key].updateModelBeingDrawnFully();
      console.log("this.children[childrenKeys[key]].position");
      console.log(this.children[key].position);
      this.position = [...this.position, ...this.children[key].position];
      this.color = [...this.color, ...this.children[key].color];
      this.normal = [...this.normal, ...this.children[key].normal];
    });
    console.log("done");
    console.log("====================================");
    console.log("this.position after");
    console.log(this.position);

    // // update position based on translation, rotation, scale and anchor
    let newPositions = [];
    // group position by 3, then manipulate it
    for (let i = 0; i < this.position.length; i += 3) {
      // console.log(this.position[i], this.position[i + 1], this.position[i + 2]);
      let temporaryPoint = new Point(this.position[i], this.position[i + 1], this.position[i + 2]);
      // translate
      console.log("temporaryPoint");
      console.log(temporaryPoint.flatten());
      temporaryPoint.translate(this.translation);

      // rotate
      temporaryPoint.rotate(this.rotation, this.anchor);

      // scale
      temporaryPoint.scale(this.scale, this.anchor);

      newPositions = [...newPositions, ...temporaryPoint.flatten()];
    }

    console.log("newPositions");
    console.log(newPositions);
    this.position = newPositions;
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
      beforeKeyframe.translation = [0, 0, 0];
    }
  }
}
