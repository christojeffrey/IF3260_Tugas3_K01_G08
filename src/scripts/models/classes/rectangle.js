class Rectangle {
  constructor(firstPoint, secondPoint, thirdPoint, fourthPoint) {
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.thirdPoint = thirdPoint;
    this.fourthPoint = fourthPoint;
  }

  // flatten method
  flattenToPoints() {
    return [...this.firstPoint.flatten(), ...this.secondPoint.flatten(), ...this.fourthPoint.flatten(), ...this.secondPoint.flatten(), ...this.thirdPoint.flatten(), ...this.fourthPoint.flatten()];
  }
  triangleCount() {
    return 2;
  }
  totalDrawnPoints() {
    return this.triangleCount() * 3;
  }
  export() {
    return [this.firstPoint.export(), this.secondPoint.export(), this.thirdPoint.export(), this.fourthPoint.export()];
  }
  import(array) {
    this.firstPoint.import(array[0]);
    this.secondPoint.import(array[1]);
    this.thirdPoint.import(array[2]);
    this.fourthPoint.import(array[3]);
  }
}

export { Rectangle };
