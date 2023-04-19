import { Point } from "./classes/point.js";
import { Model } from "./classes/model.js";
import { Cube } from "./classes/cube.js";

let distalThumb = new Model("distalThumb");
distalThumb.setCubes([new Cube(20, 50, 20, new Point(-120, 55, 0))]);
distalThumb.completeModelUsingCubes();
distalThumb.setAnchor(new Point(-120, 30, 0));

let distalIndex = new Model("distalIndex");
distalIndex.setCubes([new Cube(20, 50, 20, new Point(-72, 295, 0))]);
distalIndex.completeModelUsingCubes();
distalIndex.setAnchor(new Point(-72, 270, 0));

let distalMiddle = new Model("distalMiddle");
distalMiddle.setCubes([new Cube(20, 50, 20, new Point(-24, 295, 0))]);
distalMiddle.completeModelUsingCubes();
distalMiddle.setAnchor(new Point(-24, 270, 0));

let distalRing = new Model("distalRing");
distalRing.setCubes([new Cube(20, 50, 20, new Point(24, 295, 0))]);
distalRing.completeModelUsingCubes();
distalRing.setAnchor(new Point(24, 270, 0));

let distalLittle = new Model("distalLittle");
distalLittle.setCubes([new Cube(20, 50, 20, new Point(72, 295, 0))]);
distalLittle.completeModelUsingCubes();
distalLittle.setAnchor(new Point(72, 270, 0));

let intermediateIndex = new Model("intermediateIndex");
intermediateIndex.setCubes([new Cube(30, 70, 30, new Point(-72, 235, 0))]);
intermediateIndex.completeModelUsingCubes();
intermediateIndex.setAnchor(new Point(-72, 200, 0));
intermediateIndex.addChildren("distalIndex", distalIndex);
intermediateIndex.updateModelBeingDrawnFully();

let intermediateMiddle = new Model("intermediateMiddle");
intermediateMiddle.setCubes([new Cube(30, 70, 30, new Point(-24, 235, 0))]);
intermediateMiddle.completeModelUsingCubes();
intermediateMiddle.setAnchor(new Point(-24, 200, 0));
intermediateMiddle.addChildren("distalMiddle", distalMiddle);
intermediateMiddle.updateModelBeingDrawnFully();

let intermediateRing = new Model("intermediateRing");
intermediateRing.setCubes([new Cube(30, 70, 30, new Point(24, 235, 0))]);
intermediateRing.completeModelUsingCubes();
intermediateRing.setAnchor(new Point(24, 200, 0));
intermediateRing.addChildren("distalRing", distalRing);
intermediateRing.updateModelBeingDrawnFully();

let intermediateLittle = new Model("intermediateLittle");
intermediateLittle.setCubes([new Cube(30, 70, 30, new Point(72, 235, 0))]);
intermediateLittle.completeModelUsingCubes();
intermediateLittle.setAnchor(new Point(72, 200, 0));
intermediateLittle.addChildren("distalLittle", distalLittle);
intermediateLittle.updateModelBeingDrawnFully();

let proximalThumb = new Model("proximalThumb");
proximalThumb.setCubes([new Cube(40, 100, 40, new Point(-120, -20, 0))]);
proximalThumb.completeModelUsingCubes();
proximalThumb.setAnchor(new Point(-100, -70, 0));
proximalThumb.addChildren("distalThumb", distalThumb);
proximalThumb.updateModelBeingDrawnFully();

let proximalIndex = new Model("proximalIndex");
proximalIndex.setCubes([new Cube(40, 100, 40, new Point(-72, 150, 0))]);
proximalIndex.completeModelUsingCubes();
proximalIndex.setAnchor(new Point(-72, 100, 0));
proximalIndex.addChildren("intermediateIndex", intermediateIndex);
proximalIndex.updateModelBeingDrawnFully();

let proximalMiddle = new Model("proximalMiddle");
proximalMiddle.setCubes([new Cube(40, 100, 40, new Point(-24, 150, 0))]);
proximalMiddle.completeModelUsingCubes();
proximalMiddle.setAnchor(new Point(-24, 100, 0));
proximalMiddle.addChildren("intermediateMiddle", intermediateMiddle);
proximalMiddle.updateModelBeingDrawnFully();

let proximalRing = new Model("proximalRing");
proximalRing.setCubes([new Cube(40, 100, 40, new Point(24, 150, 0))]);
proximalRing.completeModelUsingCubes();
proximalRing.setAnchor(new Point(24, 100, 0));
proximalRing.addChildren("intermediateRing", intermediateRing);
proximalRing.updateModelBeingDrawnFully();

let proximalLittle = new Model("proximalLittle");
proximalLittle.setCubes([new Cube(40, 100, 40, new Point(72, 150, 0))]);
proximalLittle.completeModelUsingCubes();
proximalLittle.setAnchor(new Point(72, 100, 0));
proximalLittle.addChildren("intermediateLittle", intermediateLittle);
proximalLittle.updateModelBeingDrawnFully();

let hand = new Model("hand");
hand.setCubes([new Cube(200, 200, 50, new Point(0, 0, 0))])
hand.completeModelUsingCubes();
hand.setAnchor(new Point(0, 100, 0));
hand.addChildren("proximalThumb", proximalThumb);
hand.updateModelBeingDrawnFully();
hand.addChildren("proximalIndex", proximalIndex);
hand.updateModelBeingDrawnFully();
hand.addChildren("proximalMiddle", proximalMiddle);
hand.updateModelBeingDrawnFully();
hand.addChildren("proximalRing", proximalRing);
hand.updateModelBeingDrawnFully();
hand.addChildren("proximalLittle", proximalLittle);
hand.updateModelBeingDrawnFully();

export { hand };
