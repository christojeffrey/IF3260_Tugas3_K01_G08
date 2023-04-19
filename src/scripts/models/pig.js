import { Point } from "./base/point.js";
import { Model } from "./base/model.js";
import { Cube } from "./base/cube.js";

let pig = new Model("pig");

let firstArm = new Model("firstArm");
firstArm.setCubes([new Cube(50, 150, 50, new Point(75, 125, 125))]);
firstArm.completeModelUsingCubes();
// firstArm.setAnchor(new Point(100, 0, 0));
firstArm.setAnchor([100, 0, 0]);

let secondArm = new Model("secondArm");
secondArm.setCubes([new Cube(50, 150, 50, new Point(-75, 125, 125))]);
secondArm.completeModelUsingCubes();
// secondArm.setAnchor(new Point(-100, 0, 0));
secondArm.setAnchor([-100, 0, 0]);

let thirdArm = new Model("thirdArm");
thirdArm.setCubes([new Cube(50, 150, 50, new Point(75, 125, -125))]);
thirdArm.completeModelUsingCubes();
thirdArm.setAnchor(new Point(100, 0, 0));
thirdArm.setAnchor([100, 0, 0]);

let forthArm = new Model("forthArm");
forthArm.setCubes([new Cube(50, 150, 50, new Point(-75, 125, -125))]);
forthArm.completeModelUsingCubes();
forthArm.setAnchor(new Point(-100, 0, 0));
forthArm.setAnchor([-100, 0, 0]);

let firstEar = new Model("firstEar"); 
firstEar.setCubes([new Cube(20, 75, 50, new Point(100, -10, 200))]);
firstEar.completeModelUsingCubes();
firstEar.setAnchor(new Point(100, 0, 0));
firstEar.setAnchor([100, 0, 0]);

let secondEar = new Model("secondEar");
secondEar.setCubes([new Cube(20, 75, 50, new Point(-100, -10, 200))]);
secondEar.completeModelUsingCubes();
secondEar.setAnchor(new Point(-100, 0, 0));
secondEar.setAnchor([-100, 0, 0]);

let nose = new Model("nose");
nose.setCubes([new Cube(75, 50, 50, new Point(0, 0, 250))]);
nose.completeModelUsingCubes();
nose.setAnchor(new Point(100, 0, 0));
nose.setAnchor([100, 0, 0]);

let head = new Model("head");
head.setCubes([new Cube(175, 125, 150, new Point(0, -12.5, 175))]);
head.completeModelUsingCubes();
head.setAnchor(new Point(100, 0, 0));
head.setAnchor([100, 0, 0]);
head.addChildren("firstEar", firstEar);
head.updateModelBeingDrawnFully();
head.addChildren("secondEar", secondEar);
head.updateModelBeingDrawnFully();
head.addChildren("nose", nose);
head.updateModelBeingDrawnFully();

pig.setCubes([new Cube(200, 100, 300, new Point(0, 0, 0))]);
pig.completeModelUsingCubes();

pig.setAnchor([0, 0, 100]);

pig.addChildren("firstArm", firstArm);

pig.updateModelBeingDrawnFully();

pig.addChildren("head", head);
pig.updateModelBeingDrawnFully();

pig.addChildren("secondArm", secondArm);
pig.updateModelBeingDrawnFully();

pig.addChildren("thirdArm", thirdArm);
pig.updateModelBeingDrawnFully();

pig.addChildren("forthArm", forthArm);
pig.updateModelBeingDrawnFully();
export { pig };