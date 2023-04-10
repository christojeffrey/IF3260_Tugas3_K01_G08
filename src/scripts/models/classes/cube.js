import { Point } from "./point.js";
import { Rectangle } from "./rectangle.js";
// todo: create a cube class that take width, length, depth, and center.
export class Cube {
  constructor(width, length, depth, center) {
    this.width = width;
    this.length = length;
    this.depth = depth;
    this.center = center;
    this.createRectangles();
  }
  createRectangles() {
    let rectangles = [];
    let points = [];
    // add 8 points

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
  }
}
