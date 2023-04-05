import { radToDeg, degToRad } from "../math/math.js";

const ANIMATION_SPEED   =  0.3; // degrees per second

function animate(objectsConditions) {
    let angleX  = radToDeg(objectsConditions.rotation[0]);
    let angleY  = radToDeg(objectsConditions.rotation[1]);
    let angleZ  = radToDeg(objectsConditions.rotation[2]);

    angleX = (angleX + ANIMATION_SPEED) % 360;
    angleY = (angleY + ANIMATION_SPEED) % 360;
    angleZ = (angleZ + ANIMATION_SPEED) % 360;

    let rotateXElmt = document.querySelector("#rotateX");
    let rotateYElmt = document.querySelector("#rotateY");
    let rotateZElmt = document.querySelector("#rotateZ");

    rotateXElmt.value = angleX;
    rotateYElmt.value = angleY;
    rotateZElmt.value = angleZ;

    let rotateXValueELmt = document.querySelector("#rotateXValue");
    let rotateYValueELmt = document.querySelector("#rotateYValue");
    let rotateZValueELmt = document.querySelector("#rotateZValue");

    rotateXValueELmt.textContent = Math.round(angleX);
    rotateYValueELmt.textContent = Math.round(angleY);
    rotateZValueELmt.textContent = Math.round(angleZ);

    objectsConditions.rotation[0] = degToRad(angleX);
    objectsConditions.rotation[1] = degToRad(angleY);
    objectsConditions.rotation[2] = degToRad(angleZ);
}

export { animate };