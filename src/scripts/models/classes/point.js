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
    // rotation is an array of 3 angles
    // anchor is an array of 3 numbers
    // rotate around x axis
    // let y = this.y - anchor[1];
    // let z = this.z - anchor[2];
    // this.y = y * Math.cos(rotation[0]) - z * Math.sin(rotation[0]) + anchor[1];
    // this.z = y * Math.sin(rotation[0]) + z * Math.cos(rotation[0]) + anchor[2];
    // // rotate around y axis
    // let x = this.x - anchor[0];
    // z = this.z - anchor[2];
    // this.x = x * Math.cos(rotation[1]) + z * Math.sin(rotation[1]) + anchor[0];
    // this.z = -x * Math.sin(rotation[1]) + z * Math.cos(rotation[1]) + anchor[2];
    // // rotate around z axis
    // x = this.x - anchor[0];
    // y = this.y - anchor[1];
    // this.x = x * Math.cos(rotation[2]) - y * Math.sin(rotation[2]) + anchor[0];
    // this.y = x * Math.sin(rotation[2]) + y * Math.cos(rotation[2]) + anchor[1];
  }
  scale(scale, anchor) {
    // scale is an array of 3 numbers
    // anchor is an array of 3 numbers
    // this.x = (this.x - anchor[0]) * scale[0] + anchor[0];
    // this.y = (this.y - anchor[1]) * scale[1] + anchor[1];
    // this.z = (this.z - anchor[2]) * scale[2] + anchor[2];
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
