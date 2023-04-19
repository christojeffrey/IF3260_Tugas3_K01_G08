import { m4 } from "../../math/m4.js";
import { v3 } from "../../math/v3.js";

class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  // flatten method
  flatten() {
    return [this.x, this.y, this.z];
  }

  translate(vector) {
    // console.log("vector");
    // console.log(vector);
    let newPoint = m4.multiplyWithV3(
      m4.translation(
        vector[0], vector[1], vector[2]
        ), v3.create(this.x, this.y, this.z)
      ).slice(0, 3);
    this.x = newPoint[0];
    this.y = newPoint[1];
    this.z = newPoint[2];
  }

  rotate(rotation, anchor) {
    let newPoint = m4.multiplyWithV3(
      m4.transform(
          [0, 0, 0], rotation, [1, 1, 1], anchor
        ), v3.create(this.x, this.y, this.z)
      ).slice(0, 3)
    this.x = newPoint[0];
    this.y = newPoint[1];
    this.z = newPoint[2];
  }
  scale(scale, anchor) {
    // console.log("scale");
    // console.log(anchor);
    let newPoint = m4.multiplyWithV3(
      m4.transform(
        [0, 0, 0], [0, 0, 0], scale, anchor
      ), v3.create(this.x, this.y, this.z)  
    )
    
    this.x = newPoint[0];
    this.y = newPoint[1];
    this.z = newPoint[2];
    // let newX = anchor[0] + (this.x - anchor[0]) * scale[0];
    // let newY = anchor[1] + (this.y - anchor[1]) * scale[1];
    // let newZ = anchor[2] + (this.z - anchor[2]) * scale[2];
    // // this return number
    // // console.log(newX, newY, newZ);

    // // but if we do this, it returns NaN
    // this.x = newX;
    // this.y = newY;
    // this.z = newZ;
  }
  export() {
    return [this.x, this.y, this.z];
  }
  import(array) {
    this.x = array[0];
    this.y = array[1];
    this.z = array[2];
  }
}

export { Point };
