import { Point } from "./classes/point.js";
import { Model } from "./classes/model.js";
import { Cube } from "./classes/cube.js";

let minecraft = new Model("elbow");

let head = new Model("head");
head.setCubes([new Cube(180, 180, 180, new Point(0, -215, 0))]);
head.completeModelUsingCubes();
// head.setAnchor(new Point(100, 0, 0));

let leftArm = new Model("leftArm");
leftArm.setCubes([new Cube(80, 250, 25, new Point(-130, 0, 0))]);
leftArm.completeModelUsingCubes();

let rightArm = new Model("rightArm");
rightArm.setCubes([new Cube(80, 250, 25, new Point(130, 0, 0))]);
rightArm.completeModelUsingCubes();

let leftLeg = new Model("leftLeg");
leftLeg.setCubes([new Cube(80, 250, 25, new Point(-50, 250, 0))]);
leftLeg.completeModelUsingCubes();

let rightLeg = new Model("rightLeg");
rightLeg.setCubes([new Cube(80, 250, 25, new Point(50, 250, 0))]);
rightLeg.completeModelUsingCubes();

// body
minecraft.setCubes([new Cube(180, 250, 50, new Point(0, 0, 0))]);
minecraft.completeModelUsingCubes();

minecraft.setAnchor([0, 0, 100]);

minecraft.addChildren("head", head);
minecraft.addChildren("leftArm", leftArm);
minecraft.addChildren("rightArm", rightArm);
minecraft.addChildren("leftLeg", leftLeg);
minecraft.addChildren("rightLeg", rightLeg);

minecraft.updateModelBeingDrawnFully();
export { minecraft };
