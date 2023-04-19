import { Point } from "./classes/point.js";
import { Model } from "./classes/model.js";
import { Cube } from "./classes/cube.js";

let minecraft = new Model("elbow");

let head = new Model("head");
head.setCubes([new Cube(150, 150, 150, new Point(0, -225, 0))]);
head.completeModelUsingCubes();
// head.setAnchor(new Point(100, 0, 0));

// body
minecraft.setCubes([new Cube(150, 300, 50, new Point(0, 0, 0))]);
minecraft.completeModelUsingCubes();

minecraft.setAnchor([0, 0, 100]);

minecraft.addChildren("head", head);

minecraft.updateModelBeingDrawnFully();
export { minecraft };
