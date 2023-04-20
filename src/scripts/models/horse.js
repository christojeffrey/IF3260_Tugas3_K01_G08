import { Point } from "./base/point.js";
import { Model } from "./base/model.js";
import { Cube } from "./base/cube.js";
import { Keyframe } from "./base/keyframe.js";
import { degToRad } from "../math/math.js";

let horse = new Model("horse");

let body = new Model("body");
body.setCubes([new Cube(385, 175, 175, new Point(87.5,-28, 0))]);
body.setAnchor([87.5, 0, 0]);
body.completeModelUsingCubes();

let bodyKeyframe1 = new Keyframe(5);
bodyKeyframe1.setRotation([0, degToRad(-2.5), 0]);
bodyKeyframe1.setTranslation([0, 7.5, 0]);
body.addAnimation(bodyKeyframe1);

let bodyKeyframe2 = new Keyframe(10);
bodyKeyframe2.setRotation([0, degToRad(2.5), 0]);
bodyKeyframe2.setTranslation([0, -7.5, 0]);
body.addAnimation(bodyKeyframe2);

let bodyKeyframe3 = new Keyframe(15);
bodyKeyframe3.setRotation([0, degToRad(-2.5), 0]);
bodyKeyframe3.setTranslation([0, 7.5, 0]);
body.addAnimation(bodyKeyframe3);

let bodyKeyframe4 = new Keyframe(20);
bodyKeyframe4.setRotation([0, degToRad(0), 0]);
bodyKeyframe4.setTranslation([0, 0, 0]);
body.addAnimation(bodyKeyframe4);

horse.addChildren("body", body);

let head = new Model("head");

let neck = new Model("neck");
neck.setCubes([Cube.fromPoints([
    // front
    new Point(-138, -243, -35),
    new Point(-101, -36, -35),
    new Point(-15, -51, -35),
    new Point(-52, -258, -35),
    // back
    new Point(-138, -243, 35),
    new Point(-101, -36, 35),
    new Point(-15, -51, 35),
    new Point(-52, -258, 35),
])]);
neck.setAnchor([0, 0, 0]);
neck.completeModelUsingCubes();

let neckKeyframe1 = new Keyframe(5);
neckKeyframe1.setRotation([0, degToRad(-5), 0]);
neck.addAnimation(neckKeyframe1);

let neckKeyframe2 = new Keyframe(10);
neckKeyframe2.setRotation([0, degToRad(5), 0]);
neck.addAnimation(neckKeyframe2);

let neckKeyframe3 = new Keyframe(15);
neckKeyframe3.setRotation([0, degToRad(-5), 0]);
neck.addAnimation(neckKeyframe3);

let neckKeyframe4 = new Keyframe(20);
neckKeyframe4.setRotation([0, degToRad(0), 0]);
neck.addAnimation(neckKeyframe4);

head.addChildren("neck", neck);

let face = new Model("face");
face.setCubes([
    Cube.fromPoints([
        // front
        new Point(-224, -268, -44),
        new Point(-215, -216, -44),
        new Point(-43, -246, -44),
        new Point(-52, -298, -44),
        // back
        new Point(-224, -268, 44),
        new Point(-215, -216, 44),
        new Point(-43, -246, 44),
        new Point(-52, -298, 44),
    ]),
    Cube.fromPoints([
        //front
        new Point(-293, -256, -26),
        new Point(-284, -204, -26),
        new Point(-198, -219, -26),
        new Point(-207, -271, -26),
        // back
        new Point(-293, -256, 26),
        new Point(-285, -204, 26),
        new Point(-198, -219, 26),
        new Point(-207, -271, 26),
    ]),
    Cube.fromPoints([
        // front        
        new Point(-78, -347, 26),
        new Point(-60, -243, 26),
        new Point(-43, -246, 26),
        new Point(-61, -350, 26),
        // back
        new Point(-78, -347, 44),
        new Point(-60, -243, 44),
        new Point(-43, -246, 44),
        new Point(-61, -350, 44),
    ]),
    Cube.fromPoints([
        // front
        new Point(-78, -347, -44),
        new Point(-60, -243, -44),
        new Point(-43, -246, -44),
        new Point(-61, -350, -44),
        // back
        new Point(-78, -347, -26),
        new Point(-60, -243, -26),
        new Point(-43, -246, -26),
        new Point(-61, -350, -26),
    ]),
]);
face.setAnchor([-60, 0, 0])
face.completeModelUsingCubes();

let faceKeyframe1 = new Keyframe(5);
faceKeyframe1.setRotation([0, degToRad(-15), 0]);
face.addAnimation(faceKeyframe1);

let faceKeyframe2 = new Keyframe(10);
faceKeyframe2.setRotation([0, degToRad(15), 0]);
face.addAnimation(faceKeyframe2);

let faceKeyframe3 = new Keyframe(15);
faceKeyframe3.setRotation([0, degToRad(-15), 0]);
face.addAnimation(faceKeyframe3);

let faceKeyframe4 = new Keyframe(20);
faceKeyframe4.setRotation([0, 0, 0]);
face.addAnimation(faceKeyframe4);

head.addChildren("face", face);
head.setAnchor([-52, 0, 0])
head.completeModelUsingCubes();

let headKeyframe1 = new Keyframe(5);
headKeyframe1.setRotation([0, 0, degToRad(-15)]);
head.addAnimation(headKeyframe1);

let headKeyframe2 = new Keyframe(10);
headKeyframe2.setRotation([0, 0, degToRad(2)]);
head.addAnimation(headKeyframe2);

let headKeyframe3 = new Keyframe(15);
headKeyframe3.setRotation([0, 0, degToRad(-15)]);
head.addAnimation(headKeyframe3);

let headKeyframe4 = new Keyframe(20);
headKeyframe4.setRotation([0, 0, 0]);
head.addAnimation(headKeyframe4);

horse.addChildren("head", head);


let legs = new Model("legs");

let frontLeg = new Model("frontLeg");

let frontLeftLeg = new Model("frontLeftLeg");
frontLeftLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(-52.5, 77, -50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(-52.5, 217, -50.75)),
]);
frontLeftLeg.completeModelUsingCubes();
frontLeftLeg.setAnchor([52.5, 0, 0]);

let frontLeftLegKeyframe1 = new Keyframe(5);
frontLeftLegKeyframe1.setRotation([0, 0, degToRad(15)]);
frontLeftLeg.addAnimation(frontLeftLegKeyframe1);

let frontLeftLegKeyframe2 = new Keyframe(10);
frontLeftLegKeyframe2.setRotation([0, 0, degToRad(-15)]);
frontLeftLeg.addAnimation(frontLeftLegKeyframe2);

let frontLeftLegKeyframe3 = new Keyframe(15);
frontLeftLegKeyframe3.setRotation([0, 0, degToRad(15)]);
frontLeftLeg.addAnimation(frontLeftLegKeyframe3);

let frontLeftLegKeyframe4 = new Keyframe(20);
frontLeftLegKeyframe4.setRotation([0, 0, 0]);
frontLeftLeg.addAnimation(frontLeftLegKeyframe4);

frontLeg.addChildren("frontLeftLeg", frontLeftLeg);

let frontRightLeg = new Model("frontRightLeg");
frontRightLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(-52.5, 77, 50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(-52.5, 217, 50.75)),
]);
frontRightLeg.completeModelUsingCubes();
frontRightLeg.setAnchor([52.5, 0, 0]);

let frontRightLegKeyframe1 = new Keyframe(5);
frontRightLegKeyframe1.setRotation([0, 0, degToRad(-15)]);
frontRightLeg.addAnimation(frontRightLegKeyframe1);

let frontRightLegKeyframe2 = new Keyframe(10);
frontRightLegKeyframe2.setRotation([0, 0, degToRad(2)]);
frontRightLeg.addAnimation(frontRightLegKeyframe2);

let frontRightLegKeyframe3 = new Keyframe(15);
frontRightLegKeyframe3.setRotation([0, 0, degToRad(-15)]);
frontRightLeg.addAnimation(frontRightLegKeyframe3);

let frontRightLegKeyframe4 = new Keyframe(20);
frontRightLegKeyframe4.setRotation([0, 0, 0]);
frontRightLeg.addAnimation(frontRightLegKeyframe4);

frontLeg.addChildren("frontRightLeg", frontRightLeg);

frontLeg.setAnchor([-52.5, 0, 0]);
frontLeg.completeModelUsingCubes();

legs.addChildren("frontLeftLeg", frontLeg);

let backLeg = new Model("backLeg");

let backLeftLeg = new Model("backLeftLeg");
backLeftLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(227.5, 77, -50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(227.5, 217, -50.75)),
]);
backLeftLeg.completeModelUsingCubes();
backLeftLeg.setAnchor([227.5, 0, 0]);

let backLeftLegKeyframe1 = new Keyframe(5);
backLeftLegKeyframe1.setRotation([0, 0, degToRad(15)]);
backLeftLeg.addAnimation(backLeftLegKeyframe1);

let backLeftLegKeyframe2 = new Keyframe(10);
backLeftLegKeyframe2.setRotation([0, 0, degToRad(-15)]);
backLeftLeg.addAnimation(backLeftLegKeyframe2);

let backLeftLegKeyframe3 = new Keyframe(15);
backLeftLegKeyframe3.setRotation([0, 0, degToRad(15)]);
backLeftLeg.addAnimation(backLeftLegKeyframe3);

let backLeftLegKeyframe4 = new Keyframe(20);
backLeftLegKeyframe4.setRotation([0, 0, 0]);
backLeftLeg.addAnimation(backLeftLegKeyframe4);

backLeg.addChildren("backLeftLeg", backLeftLeg);

let backRightLeg = new Model("backRightLeg");
backRightLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(227.5, 77, 50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(227.5, 217, 50.75)),
]);
backRightLeg.completeModelUsingCubes();
backRightLeg.setAnchor([227.5, 0, 0]);

let backRightLegKeyframe1 = new Keyframe(5);
backRightLegKeyframe1.setRotation([0, 0, degToRad(-15)]);
backRightLeg.addAnimation(backRightLegKeyframe1);

let backRightLegKeyframe2 = new Keyframe(10);
backRightLegKeyframe2.setRotation([0, 0, degToRad(15)]);
backRightLeg.addAnimation(backRightLegKeyframe2);

let backRightLegKeyframe3 = new Keyframe(15);
backRightLegKeyframe3.setRotation([0, 0, degToRad(-15)]);
backRightLeg.addAnimation(backRightLegKeyframe3);

let backRightLegKeyframe4 = new Keyframe(20);
backRightLegKeyframe4.setRotation([0, 0, 0]);
backRightLeg.addAnimation(backRightLegKeyframe4);

backLeg.addChildren("backRightLeg", backRightLeg);

backLeg.setAnchor([227.5, 0, 0]);
backLeg.completeModelUsingCubes();

legs.addChildren("backRightLeg", backLeg);

legs.completeModelUsingCubes();
horse.addChildren("legs", legs);

let tail = new Model("tail");
tail.setCubes([
    Cube.fromPoints([
        // front
        new Point(281, -109, -17),
        new Point(258, -82, -17),
        new Point(419, 53, -17),
        new Point(442, 26, -17),
        // back
        new Point(281, -109, 18),
        new Point(258, -82, 18),
        new Point(419, 53, 18),
        new Point(442, 26, 18),
    ]),
]);
tail.setAnchor([281, 0, 0]);
tail.completeModelUsingCubes();

let tailKeyframe1 = new Keyframe(5);
tailKeyframe1.setRotation([0, degToRad(-15), 0]);
tail.addAnimation(tailKeyframe1);

let tailKeyframe2 = new Keyframe(10);
tailKeyframe2.setRotation([0, degToRad(15), 0 ]);
tail.addAnimation(tailKeyframe2);

let tailKeyframe3 = new Keyframe(15);
tailKeyframe3.setRotation([0, degToRad(-15), 0]);
tail.addAnimation(tailKeyframe3);

let tailKeyframe4 = new Keyframe(20);
tailKeyframe4.setRotation([0, 0, 0]);
tail.addAnimation(tailKeyframe4);

horse.addChildren("tail", tail);

console.log(tail);

horse.updateModelBeingDrawnFully();

export { horse };
