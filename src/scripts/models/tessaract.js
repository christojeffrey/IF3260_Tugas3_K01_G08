import { Point } from "./classes/point.js";
import { Model } from "./classes/model.js";
import { Cube } from "./classes/cube.js";

let tessaract = new Model();
tessaract.setCubes([new Cube(100, 50, 200, new Point(0, 0, 0))]);

tessaract.completeModelUsingCubes();

export { tessaract };
