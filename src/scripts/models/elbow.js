import { Point } from "./classes/point.js";
import { Model } from "./classes/model.js";
import { Cube } from "./classes/cube.js";

let elbow = new Model();

// let firstArm = new Model();
// firstArm.setCubes([new Cube(100, 50, 200, new Point(0, 0, 0))]);
// firstArm.completeModelUsingCubes();
// firstArm.setAnchor(new Point(100, 0, 0));

// let secondArm = new Model();
// secondArm.setCubes([new Cube(100, 200, 50, new Point(0, 125, 125))]);
// secondArm.completeModelUsingCubes();
// elbow.setChildren([firstArm, secondArm]);
elbow.setCubes([new Cube(100, 50, 200, new Point(0, 0, 0)), new Cube(100, 200, 50, new Point(0, 125, 125))]);
elbow.completeModelUsingCubes();
// elbow.addChildren("firstArm", firstArm);

export { elbow };
