import { primaryColors } from "../constant/colors.js";
import { v3 } from "../math/v3.js";

let rectangles;
let minX, maxX, minY, maxY, minZ, maxZ;

export class Model {
  constructor() {
    this.rectangles = [];
    this.position = [];
    this.color = [];
    this.normal = [];
    this.center = [];
  }

  completeModelUsingRectangles() {
    // you only need to setup the rectangles.
    // the rest will be done automatically.
    // note that the color is aplied 'randomly' based on primary color

    // set normal, color, position
    for (let i = 0; i < this.rectangles.length; i++) {
      let rectangle = this.rectangles[i].flattenToTriangles();
      for (let j = 0; j < rectangle.length; j += 3 * 3) {
        let vec1 = v3.create(rectangle[j + 3] - rectangle[j], rectangle[j + 4] - rectangle[j + 1], rectangle[j + 5] - rectangle[j + 2]);
        let vec2 = v3.create(rectangle[j + 6] - rectangle[j + 3], rectangle[j + 7] - rectangle[j + 4], rectangle[j + 8] - rectangle[j + 5]);
        let normal = v3.normalize(v3.cross(vec2, vec1));
        this.normal = [...this.normal, ...normal, ...normal, ...normal];
      }
      for (let j = 0; j < 6; j++) {
        this.color = [...this.color, ...primaryColors[i % 6]];
      }
      this.position = [...this.position, ...rectangle];
    }

    // set center
    minX = Math.min(...this.position.filter((_, i) => i % 3 === 0));
    maxX = Math.max(...this.position.filter((_, i) => i % 3 === 0));
    minY = Math.min(...this.position.filter((_, i) => i % 3 === 1));
    maxY = Math.max(...this.position.filter((_, i) => i % 3 === 1));
    minZ = Math.min(...this.position.filter((_, i) => i % 3 === 2));
    maxZ = Math.max(...this.position.filter((_, i) => i % 3 === 2));

    this.center = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];
  }
}
