import { Point } from "./classes/point.js";
import { Rectangle } from "./classes/rectangle.js";
import { Model } from "./classes/model.js";

let tessaract = new Model();

// setup rectangles
const verticalOuterPillar_Tessaract = [
  // front
  new Rectangle(new Point(-220, -220, -220), new Point(-220, 220, -220), new Point(-180, 220, -220), new Point(-180, -220, -220)),
  // back
  new Rectangle(new Point(-180, -220, -180), new Point(-180, 220, -180), new Point(-220, 220, -180), new Point(-220, -220, -180)),
  // left
  new Rectangle(new Point(-220, -220, -180), new Point(-220, 220, -180), new Point(-220, 220, -220), new Point(-220, -220, -220)),
  // right
  new Rectangle(new Point(-180, -220, -220), new Point(-180, 220, -220), new Point(-180, 220, -180), new Point(-180, -220, -180)),
  // top
  new Rectangle(new Point(-220, 220, -220), new Point(-220, 220, -180), new Point(-180, 220, -180), new Point(-180, 220, -220)),
  // bottom
  new Rectangle(new Point(-220, -220, -220), new Point(-180, -220, -220), new Point(-180, -220, -180), new Point(-220, -220, -180)),
];

let rectangles = [];
// vertical outer pillar
rectangles = rectangles.concat(
  verticalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z),
      new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
      new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
      new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
  })
);

tessaract.rectangles = rectangles;

tessaract.completeModelUsingRectangles();

export { tessaract };
