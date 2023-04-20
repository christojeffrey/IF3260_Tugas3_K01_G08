import { Point } from "./base/point.js";
import { Model } from "./base/model.js";
import { Cube } from "./base/cube.js";

let horse = new Model("horse");

let body = new Model("body");
body.setCubes([Cube.fromDimensions(385, 175, 175, new Point(87.5,-28, 0))]);
body.completeModelUsingCubes();
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
neck.completeModelUsingCubes();
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
face.completeModelUsingCubes();
head.addChildren("face", face);
head.completeModelUsingCubes();
horse.addChildren("head", head);

let legs = new Model("legs");

let frontLeftLeg = new Model("frontLeftLeg");
frontLeftLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(-52.5, 77, -50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(-52.5, 217, -50.75)),
]);
frontLeftLeg.completeModelUsingCubes();
legs.addChildren("frontLeftLeg", frontLeftLeg);

let frontRightLeg = new Model("frontRightLeg");
frontRightLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(-52.5, 77, 50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(-52.5, 217, 50.75)),
]);
frontRightLeg.completeModelUsingCubes();
legs.addChildren("frontRightLeg", frontRightLeg);

let backLeftLeg = new Model("backLeftLeg");
backLeftLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(227.5, 77, -50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(227.5, 217, -50.75)),
]);
backLeftLeg.completeModelUsingCubes();
legs.addChildren("backLeftLeg", backLeftLeg);

let backRightLeg = new Model("backRightLeg");
backRightLeg.setCubes([
    Cube.fromDimensions(52.5, 210, 52.5, new Point(227.5, 77, 50.75)),
    Cube.fromDimensions(52.5, 70, 70, new Point(227.5, 217, 50.75)),
]);
backRightLeg.completeModelUsingCubes();
legs.addChildren("backRightLeg", backRightLeg);

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
tail.completeModelUsingCubes();
horse.addChildren("tail", tail);

console.log(tail);

horse.updateModelBeingDrawnFully();

export { horse };
