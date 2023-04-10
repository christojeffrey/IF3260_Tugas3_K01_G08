import { primaryColors } from "../../constant/colors.js";
import { v3 } from "../../math/v3.js";
import { Point } from "./point.js";

let minX, maxX, minY, maxY, minZ, maxZ;

export class Model {
  constructor() {
    this.cubes = [];
    // private
    this.position = [];
    this.color = [];
    this.normal = [];

    // object anchor. let's make it a coordinate relative to the object's center location
    this.anchor = new Point(0, 0, 0);
    // children, which is an object of Models with the name of the object as key
    this.children = {};
    // TODO: add keyframes. which is an array of Keyframe. Keyframe is an object that has the transformation argument.
    // TODO: adapt to Cube class.
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
    // you only need to setup the rectangles.
    // the rest will be done automatically.
    // note that the color is aplied 'randomly' based on primary color

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

    this.setCenterAsAnchor();
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
}
