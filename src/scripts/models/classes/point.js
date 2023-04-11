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
    this.x += vector[0];
    this.y += vector[1];
    this.z += vector[2];
  }
  rotate(rotation, anchor) {
    // TODO: implement rotation. beware of returning NaN
  }
  scale(scale, anchor) {
    // TODO: implement scale. beware of returning NaN
    console.log("scale");
    let newX = anchor[0] + (this.x - anchor[0]) * scale[0];
    let newY = anchor[1] + (this.y - anchor[1]) * scale[1];
    let newZ = anchor[2] + (this.z - anchor[2]) * scale[2];
    // this return number
    console.log(newX, newY, newZ);

    // but if we do this, it returns NaN
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
