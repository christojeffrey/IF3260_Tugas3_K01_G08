import { Point } from "./base/point.js";
import { Model } from "./base/model.js";
import { Cube } from "./base/cube.js";
import { Keyframe } from "./base/keyframe.js";
import { degToRad } from "../math/math.js";

let wolf = new Model("wolf");

let firstArm = new Model("firstArm");
firstArm.setCubes([new Cube(30, 150, 30, new Point(50, 125, 125))]);
firstArm.completeModelUsingCubes();
firstArm.setAnchor([50, 25, 125]);

let secondArm = new Model("secondArm");
secondArm.setCubes([new Cube(30, 150, 30, new Point(-50, 125, 125))]);
secondArm.completeModelUsingCubes();
secondArm.setAnchor([-50, 25, 125]);

let thirdArm = new Model("thirdArm");
thirdArm.setCubes([new Cube(30, 150, 30, new Point(50, 125, -125))]);
thirdArm.completeModelUsingCubes();
thirdArm.setAnchor(new Point(100, 0, 0));
thirdArm.setAnchor([50, 25, -125]);

let forthArm = new Model("forthArm");
forthArm.setCubes([new Cube(30, 150, 30, new Point(-50, 125, -125))]);
forthArm.completeModelUsingCubes();
forthArm.setAnchor(new Point(-100, 0, 0));
forthArm.setAnchor([-50, 25, -125]);


let frontfeetKeyframe1 = new Keyframe(3);
frontfeetKeyframe1.setRotation([degToRad(30),0,0]);
firstArm.addAnimation(frontfeetKeyframe1);
secondArm.addAnimation(frontfeetKeyframe1);

let BackfeetKeyframe1 = new Keyframe(3);
BackfeetKeyframe1.setRotation([degToRad(-30),0,0]);
thirdArm.addAnimation(BackfeetKeyframe1);
forthArm.addAnimation(BackfeetKeyframe1);

let frontfeetKeyframe2 = new Keyframe(6);
frontfeetKeyframe2.setRotation([degToRad(-30),0,0]);
firstArm.addAnimation(frontfeetKeyframe2);
secondArm.addAnimation(frontfeetKeyframe2);

let BackfeetKeyframe2 = new Keyframe(6);
BackfeetKeyframe2.setRotation([degToRad(30),0,0]);
thirdArm.addAnimation(BackfeetKeyframe2);
forthArm.addAnimation(BackfeetKeyframe2);

let frontfeetKeyframe3 = new Keyframe(9);
frontfeetKeyframe3.setRotation([degToRad(30),0,0]);
firstArm.addAnimation(frontfeetKeyframe3);
secondArm.addAnimation(frontfeetKeyframe3);

let BackfeetKeyframe3 = new Keyframe(9);
BackfeetKeyframe3.setRotation([degToRad(-30),0,0]);
thirdArm.addAnimation(BackfeetKeyframe3);
forthArm.addAnimation(BackfeetKeyframe3);

let frontfeetKeyframe4 = new Keyframe(12);
frontfeetKeyframe4.setRotation([degToRad(-30),0,0]);
firstArm.addAnimation(frontfeetKeyframe4);
secondArm.addAnimation(frontfeetKeyframe4);

let BackfeetKeyframe4 = new Keyframe(12);
BackfeetKeyframe4.setRotation([degToRad(30),0,0]);
thirdArm.addAnimation(BackfeetKeyframe4);
forthArm.addAnimation(BackfeetKeyframe4);

let frontfeetKeyframe5 = new Keyframe(15);
frontfeetKeyframe5.setRotation([degToRad(30),0,0]);
firstArm.addAnimation(frontfeetKeyframe5);
secondArm.addAnimation(frontfeetKeyframe5);

let BackfeetKeyframe5 = new Keyframe(15);
BackfeetKeyframe5.setRotation([degToRad(-30),0,0]);
thirdArm.addAnimation(BackfeetKeyframe5);
forthArm.addAnimation(BackfeetKeyframe5);

let frontfeetKeyframe6 = new Keyframe(18);
frontfeetKeyframe6.setRotation([degToRad(-30),0,0]);
firstArm.addAnimation(frontfeetKeyframe6);
secondArm.addAnimation(frontfeetKeyframe6);

let BackfeetKeyframe6 = new Keyframe(18);
BackfeetKeyframe6.setRotation([degToRad(30),0,0]);
thirdArm.addAnimation(BackfeetKeyframe6);
forthArm.addAnimation(BackfeetKeyframe6);

let frontfeetKeyframe7 = new Keyframe(20);
frontfeetKeyframe7.setRotation([0,0,0]);
firstArm.addAnimation(frontfeetKeyframe7);
secondArm.addAnimation(frontfeetKeyframe7);

let BackfeetKeyframe7 = new Keyframe(20);
BackfeetKeyframe7.setRotation([0,0,0]);
thirdArm.addAnimation(BackfeetKeyframe7);
forthArm.addAnimation(BackfeetKeyframe7);

let firstEar = new Model("firstEar"); 
firstEar.setCubes([new Cube(30, 90, 20, new Point(45, -50, 175))]);
firstEar.completeModelUsingCubes();
firstEar.setAnchor(new Point(100, 0, 0));
firstEar.setAnchor([100, 0, 0]);

let secondEar = new Model("secondEar");
secondEar.setCubes([new Cube(30, 90, 20, new Point(-45, -50, 175))]);
secondEar.completeModelUsingCubes();
secondEar.setAnchor(new Point(-100, 0, 0));
secondEar.setAnchor([-100, 0, 0]);

let nose = new Model("nose");
nose.setCubes([new Cube(60, 50, 50, new Point(0, 10, 250))]);
nose.completeModelUsingCubes();
nose.setAnchor(new Point(100, 0, 0));
nose.setAnchor([100, 0, 0]);

let head = new Model("head");
head.setCubes([new Cube(125, 100, 100, new Point(0, -12.5, 175))]);
head.completeModelUsingCubes();
head.setAnchor(new Point(100, 0, 0));
head.setAnchor([100, 0, 0]);
head.addChildren("firstEar", firstEar);
head.addChildren("secondEar", secondEar);
head.addChildren("nose", nose);
head.updateModelBeingDrawnFully();

let mane = new Model("mane");
mane.setCubes([new Cube(175, 125, 100, new Point(0, -12.5, 125))]);
mane.completeModelUsingCubes();
mane.setAnchor(new Point(100, 0, 0));
mane.setAnchor([100, 0, 0]);
mane.updateModelBeingDrawnFully();

let tail = new Model("tail");
tail.setCubes([new Cube(30, 30, 100, new Point(0, 0, -200))]);
tail.completeModelUsingCubes();
tail.setAnchor(new Point(0, 0, -150));
tail.setAnchor([0, 0, -150]);

let tailKeyframe1 = new Keyframe(2);
tailKeyframe1.setRotation([0,degToRad(30),0]);
tail.addAnimation(tailKeyframe1);

let tailKeyframe2 = new Keyframe(4);
tailKeyframe2.setRotation([0,degToRad(-30),0]);
tail.addAnimation(tailKeyframe2);

let tailKeyframe3 = new Keyframe(6);
tailKeyframe3.setRotation([0,degToRad(30),0]);
tail.addAnimation(tailKeyframe3);

let tailKeyframe4 = new Keyframe(8);
tailKeyframe4.setRotation([0,degToRad(-30),0]);
tail.addAnimation(tailKeyframe4);

let tailKeyframe5 = new Keyframe(10);
tailKeyframe5.setRotation([0,degToRad(30),0]);
tail.addAnimation(tailKeyframe5);

let tailKeyframe6 = new Keyframe(12);
tailKeyframe6.setRotation([0,degToRad(-30),0]);
tail.addAnimation(tailKeyframe6);

let tailKeyframe7 = new Keyframe(14);
tailKeyframe7.setRotation([0,degToRad(30),0]);
tail.addAnimation(tailKeyframe7);

let tailKeyframe8 = new Keyframe(16);
tailKeyframe8.setRotation([0,degToRad(-30),0]);
tail.addAnimation(tailKeyframe8);

let tailKeyframe9 = new Keyframe(18);
tailKeyframe9.setRotation([0,degToRad(30),0]);
tail.addAnimation(tailKeyframe9);

let tailKeyframe10 = new Keyframe(20);
tailKeyframe10.setRotation([0,degToRad(-30),0]);
tail.addAnimation(tailKeyframe10);

wolf.setCubes([new Cube(130, 100, 300, new Point(0, 0, 0))]);
wolf.completeModelUsingCubes();

wolf.setAnchor([0, 0, 100]);

wolf.addChildren("firstArm", firstArm);

wolf.updateModelBeingDrawnFully();

wolf.addChildren("mane", mane);
wolf.updateModelBeingDrawnFully();

wolf.addChildren("secondArm", secondArm);
wolf.updateModelBeingDrawnFully();

wolf.addChildren("thirdArm", thirdArm);
wolf.updateModelBeingDrawnFully();

wolf.addChildren("forthArm", forthArm);
wolf.updateModelBeingDrawnFully();

wolf.addChildren("tail", tail);
wolf.updateModelBeingDrawnFully();

wolf.addChildren("head", head);
wolf.updateModelBeingDrawnFully();

let WolfKeyframe1 = new Keyframe(3);
WolfKeyframe1.setTranslation([0,-10,0]);
wolf.addAnimation(WolfKeyframe1);

let WolfKeyframe2 = new Keyframe(6);
WolfKeyframe2.setTranslation([0,0,0]);
wolf.addAnimation(WolfKeyframe2);

let WolfKeyframe3 = new Keyframe(9);
WolfKeyframe3.setTranslation([0,-10,0]);
wolf.addAnimation(WolfKeyframe3);

let WolfKeyframe4 = new Keyframe(12);
WolfKeyframe4.setTranslation([0,0,0]);
wolf.addAnimation(WolfKeyframe4);

let WolfKeyframe5 = new Keyframe(15);
WolfKeyframe5.setTranslation([0,-10,0]);
wolf.addAnimation(WolfKeyframe5);

let WolfKeyframe6 = new Keyframe(18);
WolfKeyframe6.setTranslation([0,0,0]);
wolf.addAnimation(WolfKeyframe6);

let WolfKeyframe7 = new Keyframe(20);
WolfKeyframe7.setTranslation([0,-10,0]);
wolf.addAnimation(WolfKeyframe7);

export { wolf };