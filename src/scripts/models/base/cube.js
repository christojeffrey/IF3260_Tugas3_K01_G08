import { Point } from "./point.js";
import { Rectangle } from "./rectangle.js";
// todo: create a cube class that take width, length, depth, and center.
export class Cube {
  constructor(width, length, depth, center, points) {
    this.width = width;
    this.length = length;
    this.depth = depth;
    this.center = center;

    this.points = points || [];

    this.createRectangles();
  }

  static fromPoints(points) {
    return new Cube(null, null, null, null, points);
  }
  static fromDimensions(width, length, depth, center) {
    return new Cube(width, length, depth, center, null);
  }

  createRectangles() {
    // add 8 points
    if (this.points.length == 8) {
      // console.log("creating cube from points");
      this.rectangles = [];
      this.rectangles.push(new Rectangle(this.points[0], this.points[1], this.points[2], this.points[3]));
      this.rectangles.push(new Rectangle(this.points[7], this.points[6], this.points[5], this.points[4]));
      this.rectangles.push(new Rectangle(this.points[4], this.points[5], this.points[1], this.points[0]));
      this.rectangles.push(new Rectangle(this.points[5], this.points[6], this.points[2], this.points[1]));
      this.rectangles.push(new Rectangle(this.points[6], this.points[7], this.points[3], this.points[2]));
      this.rectangles.push(new Rectangle(this.points[7], this.points[4], this.points[0], this.points[3]));
    } else if (this.width && this.length && this.depth && this.center) {
      let rectangles = [];
      let points = [];

      // console.log("creating cube from dimensions");
      // back
      // left
      points.push(new Point(this.center.x - this.width / 2, this.center.y - this.length / 2, this.center.z - this.depth / 2));
      points.push(new Point(this.center.x - this.width / 2, this.center.y + this.length / 2, this.center.z - this.depth / 2));
      // right
      points.push(new Point(this.center.x + this.width / 2, this.center.y + this.length / 2, this.center.z - this.depth / 2));
      points.push(new Point(this.center.x + this.width / 2, this.center.y - this.length / 2, this.center.z - this.depth / 2));
      // front
      // left
      points.push(new Point(this.center.x - this.width / 2, this.center.y - this.length / 2, this.center.z + this.depth / 2));
      points.push(new Point(this.center.x - this.width / 2, this.center.y + this.length / 2, this.center.z + this.depth / 2));
      // right
      points.push(new Point(this.center.x + this.width / 2, this.center.y + this.length / 2, this.center.z + this.depth / 2));
      points.push(new Point(this.center.x + this.width / 2, this.center.y - this.length / 2, this.center.z + this.depth / 2));

      // add 6 rectangles
      rectangles.push(new Rectangle(points[0], points[1], points[2], points[3]));
      rectangles.push(new Rectangle(points[7], points[6], points[5], points[4]));
      rectangles.push(new Rectangle(points[4], points[5], points[1], points[0]));
      rectangles.push(new Rectangle(points[5], points[6], points[2], points[1]));
      rectangles.push(new Rectangle(points[6], points[7], points[3], points[2]));
      rectangles.push(new Rectangle(points[7], points[4], points[0], points[3]));

      this.points = points;
      this.rectangles = rectangles;
    } else {
      console.log("Error: Not enough information to create cube");
    }
  }
}
