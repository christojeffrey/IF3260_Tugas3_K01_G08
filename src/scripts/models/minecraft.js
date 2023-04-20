import { Point } from "./base/point.js";
import { Model } from "./base/model.js";
import { Cube } from "./base/cube.js";
import { Keyframe } from "./base/keyframe.js";
import { degToRad } from "../math/math.js";

let minecraft = new Model("minecraft");

// Head
let head = new Model("head");
head.setCubes([new Cube(180, 180, 180, new Point(0, -215, 0))]);
head.completeModelUsingCubes();
// head.setAnchor(new Point(100, 0, 0));
// add animation
let headKeyframe1 = new Keyframe(5);
headKeyframe1.setRotation([0, degToRad(45), 0]);
head.addAnimation(headKeyframe1);

let headKeyframe2 = new Keyframe(15);
headKeyframe2.setRotation([0, degToRad(-45), 0]);
head.addAnimation(headKeyframe2);

let headKeyframe3 = new Keyframe(20);
headKeyframe3.setRotation([0, 0, 0]);
head.addAnimation(headKeyframe3);

// Arms
let leftArm = new Model("leftArm");
leftArm.setCubes([new Cube(80, 250, 25, new Point(-130, 0, 0))]);
leftArm.completeModelUsingCubes();
leftArm.setAnchor([-100, -100, 0]);
// add animation
let leftArmKeyframe1 = new Keyframe(5);
leftArmKeyframe1.setRotation([degToRad(45), 0, 0]);
leftArm.addAnimation(leftArmKeyframe1);
let leftArmKeyframe2 = new Keyframe(15);
leftArmKeyframe2.setRotation([degToRad(-45), 0, 0]);
leftArm.addAnimation(leftArmKeyframe2);
let leftArmKeyframe3 = new Keyframe(20);
leftArmKeyframe3.setRotation([0, 0, 0]);
leftArm.addAnimation(leftArmKeyframe3);

let rightArm = new Model("rightArm");
rightArm.setCubes([new Cube(80, 250, 25, new Point(130, 0, 0))]);
rightArm.completeModelUsingCubes();
rightArm.setAnchor([100, -100, 0]);
// add animation
let rightArmKeyframe1 = new Keyframe(5);
rightArmKeyframe1.setRotation([degToRad(-45), 0, 0]);
rightArm.addAnimation(rightArmKeyframe1);
let rightArmKeyframe2 = new Keyframe(15);
rightArmKeyframe2.setRotation([degToRad(45), 0, 0]);
rightArm.addAnimation(rightArmKeyframe2);
let rightArmKeyframe3 = new Keyframe(20);
rightArmKeyframe3.setRotation([0, 0, 0]);
rightArm.addAnimation(rightArmKeyframe3);

// Legs
let leftLeg = new Model("leftLeg");
leftLeg.setCubes([new Cube(80, 250, 25, new Point(-50, 250, 0))]);
leftLeg.completeModelUsingCubes();
leftLeg.setAnchor([-25, 120, 0]);
// add animation
let leftLegKeyframe1 = new Keyframe(5);
leftLegKeyframe1.setRotation([degToRad(-45), 0, 0]);
leftLeg.addAnimation(leftLegKeyframe1);
let leftLegKeyframe2 = new Keyframe(15);
leftLegKeyframe2.setRotation([degToRad(45), 0, 0]);
leftLeg.addAnimation(leftLegKeyframe2);
let leftLegKeyframe3 = new Keyframe(20);
leftLegKeyframe3.setRotation([0, 0, 0]);
leftLeg.addAnimation(leftLegKeyframe3);

let rightLeg = new Model("rightLeg");
rightLeg.setCubes([new Cube(80, 250, 25, new Point(50, 250, 0))]);
rightLeg.completeModelUsingCubes();
rightLeg.setAnchor([25, 120, 0]);
// add animation
let rightLegKeyframe1 = new Keyframe(5);
rightLegKeyframe1.setRotation([degToRad(45), 0, 0]);
rightLeg.addAnimation(rightLegKeyframe1);
let rightLegKeyframe2 = new Keyframe(15);
rightLegKeyframe2.setRotation([degToRad(-45), 0, 0]);
rightLeg.addAnimation(rightLegKeyframe2);
let rightLegKeyframe3 = new Keyframe(20);
rightLegKeyframe3.setRotation([0, 0, 0]);
rightLeg.addAnimation(rightLegKeyframe3);

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
