import { Point } from "./classes/point.js";
import { Model } from "./classes/model.js";
import { Cube } from "./classes/cube.js";

let elbow = new Model();
elbow.setCubes([new Cube(100, 50, 200, new Point(0, 0, 0)), new Cube(100, 200, 50, new Point(0, 125, 125))]);

elbow.completeModelUsingCubes();

export { elbow };
