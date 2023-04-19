import { Point } from "./base/point.js";
import { Model } from "./base/model.js";
import { Cube } from "./base/cube.js";

let elbow = new Model("elbow");

let firstArm = new Model("firstArm");
firstArm.setCubes([Cube.fromDimensions(100, 200, 50, new Point(0, 125, 125))]);
firstArm.completeModelUsingCubes();
firstArm.setAnchor(new Point(100, 0, 0));
firstArm.setAnchor([100, 0, 0]);

console.log("first arm anchor", firstArm.anchor)

// let secondArm = new Model();
// secondArm.setCubes([new Cube(100, 200, 50, new Point(0, 125, 125))]);
// secondArm.completeModelUsingCubes();
// elbow.setChildren([firstArm, secondArm]);
elbow.setCubes([Cube.fromDimensions(100, 50, 200, new Point(0, 0, 0))]);
elbow.completeModelUsingCubes();

// elbow.setAnchor([0, 0, 100]);
elbow.setAnchor(new Point(0, 0, 100));
elbow.setAnchor([0, 0, 100]);

elbow.addChildren("firstArm", firstArm);

elbow.updateModelBeingDrawnFully();

console.log("anchor elbow", elbow.anchor);
console.log("anchor first arm", elbow.children.firstArm.anchor);

export { elbow };
