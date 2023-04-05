import { Point } from "./point.js";
import { Rectangle } from "./rectangle.js";
import { rubicColors } from "../constant/colors.js";
import { primaryColors } from "../constant/colors.js";
import { v3 } from "../math/v3.js";

let rectangles;
let minX, maxX, minY, maxY, minZ, maxZ;

// ==================================== Tessaract ======================================
// tessaract model
let tessaract = {
    position    : [],
    color       : [],
    normal      : [],
    center      : [],
}

const verticalOuterPillar_Tessaract   = [
    // front
    new Rectangle(
        new Point(-220, -220, -220), new Point(-220,  220, -220), 
        new Point(-180,  220, -220), new Point(-180, -220, -220)
    ),
    // back
    new Rectangle(
        new Point(-180, -220, -180), new Point(-180,  220, -180), 
        new Point(-220,  220, -180), new Point(-220, -220, -180)
    ),
    // left
    new Rectangle(
      new Point(-220, -220, -180), new Point(-220,  220, -180),
      new Point(-220,  220, -220), new Point(-220, -220, -220)
    ),
    // right
    new Rectangle(
        new Point(-180, -220, -220), new Point(-180,  220, -220), 
        new Point(-180,  220, -180), new Point(-180, -220, -180)
    ),
    // top
    new Rectangle(
        new Point(-220, 220, -220), new Point(-220, 220, -180), 
        new Point(-180, 220, -180), new Point(-180, 220, -220)
    ),
    // bottom
    new Rectangle(
        new Point(-220, -220, -220), new Point(-180, -220, -220), 
        new Point(-180, -220, -180), new Point(-220, -220, -180)
    ),
];

const verticalInnerPillar_Tessaract   = [
    // front
    new Rectangle(
        new Point(-120, -120, -120), new Point(-120,  120, -120),
        new Point( -80,  120, -120), new Point( -80, -120, -120)
    ),
    // back
    new Rectangle(
        new Point( -80, -120, -80), new Point( -80,  120, -80), 
        new Point(-120,  120, -80), new Point(-120, -120, -80)
    ),
    // left
    new Rectangle(
        new Point(-120, -120,  -80), new Point(-120,  120,  -80),
        new Point(-120,  120, -120), new Point(-120, -120, -120)
    ),
    // right
    new Rectangle(
        new Point(-80, -120, -120), new Point(-80,  120, -120), 
        new Point(-80,  120,  -80), new Point(-80, -120,  -80)
    ),
    // top
    new Rectangle(
        new Point(-120, 120, -120), new Point(-120, 120,  -80), 
        new Point( -80, 120,  -80), new Point( -80, 120, -120)
    ),
    // bottom
    new Rectangle(
        new Point(-120, -120, -120), new Point( -80, -120, -120), 
        new Point( -80, -120,  -80), new Point(-120, -120,  -80)
    ),
];

const horizontalOuterPillar_Tessaract = [
    // front
    new Rectangle(
        new Point(-220, -220, -220), new Point(-220, -180, -220), 
        new Point( 220, -180, -220), new Point( 220, -220, -220)
    ),
    // back
    new Rectangle(
        new Point( 220, -220, -180), new Point( 220, -180, -180), 
        new Point(-220, -180, -180), new Point(-220, -220, -180)
    ),
    // left
    new Rectangle(
        new Point(-220, -220, -180), new Point(-220, -180, -180),
        new Point(-220, -180, -220), new Point(-220, -220, -220)
    ),
    // right
    new Rectangle(
        new Point(220, -220, -220), new Point(220, -180, -220), 
        new Point(220, -180, -180), new Point(220, -220, -180)
    ),
    // top
    new Rectangle(
        new Point(-220, -180, -220), new Point(-220, -180, -180), 
        new Point( 220, -180, -180), new Point( 220, -180, -220)
    ),
    // bottom
    new Rectangle(
        new Point(-220, -220, -220), new Point( 220, -220, -220), 
        new Point( 220, -220, -180), new Point(-220, -220, -180)
    ),
];

const horizontalInnerPillar_Tessaract = [
    // front
    new Rectangle(
        new Point(-120, -120, -120), new Point(-120,  -80, -120), 
        new Point( 120,  -80, -120), new Point( 120, -120, -120)
    ),
    // back
    new Rectangle(
        new Point( 120, -120, -80), new Point( 120,  -80, -80), 
        new Point(-120,  -80, -80), new Point(-120, -120, -80)
    ),
    // left
    new Rectangle(
        new Point(-120, -120,  -80), new Point(-120,  -80,  -80),
        new Point(-120,  -80, -120), new Point(-120, -120, -120)
    ),
    // right
    new Rectangle(
        new Point(120, -120, -120), new Point(120,  -80, -120), 
        new Point(120,  -80,  -80), new Point(120, -120,  -80)
    ),
    // top
    new Rectangle(
        new Point(-120, -80, -120), new Point(-120, -80,  -80), 
        new Point( 120, -80,  -80), new Point( 120, -80, -120)
    ),
    // bottom
    new Rectangle(
        new Point(-120, -120, -120), new Point( 120, -120, -120), 
        new Point( 120, -120,  -80), new Point(-120, -120,  -80)
    ),
];

const depthOutterPillar_Tessaract     = [
    // front
    new Rectangle(
        new Point(-220, -220, -220), new Point(-220, -180, -220), 
        new Point(-180, -180, -220), new Point(-180, -220, -220)
    ),
    // back
    new Rectangle(
        new Point(-180, -220, 220), new Point(-180, -180, 220), 
        new Point(-220, -180, 220), new Point(-220, -220, 220)
    ),
    // left
    new Rectangle(
        new Point(-220, -220,  220), new Point(-220, -180,  220),
        new Point(-220, -180, -220), new Point(-220, -220, -220)
    ),
    // right
    new Rectangle(
        new Point(-180, -220, -220), new Point(-180, -180, -220), 
        new Point(-180, -180,  220), new Point(-180, -220,  220)
    ),
    // top
    new Rectangle(
        new Point(-220, -180, -220), new Point(-220, -180,  220), 
        new Point(-180, -180,  220), new Point(-180, -180, -220)
    ),
    // bottom
    new Rectangle(
        new Point(-220, -220, -220), new Point(-180, -220, -220), 
        new Point(-180, -220,  220), new Point(-220, -220,  220)
    ),
];

const depthInnerPillar_Tessaract      = [
    // front
    new Rectangle(
        new Point(-120, -120, -120), new Point(-120,  -80, -120), 
        new Point( -80,  -80, -120), new Point( -80, -120, -120)
    ),
    // back
    new Rectangle(
        new Point(-80, -120, 120), new Point( -80,  -80, 120), 
        new Point(-120, -80, 120), new Point(-120, -120, 120)
    ),
    // left
    new Rectangle(
        new Point(-120, -120,  120), new Point(-120,  -80,  120),
        new Point(-120,  -80, -120), new Point(-120, -120, -120)
    ),
    // right
    new Rectangle(
        new Point(-80, -120, -120), new Point(-80,  -80, -120), 
        new Point(-80,  -80,  120), new Point(-80, -120,  120)
    ),
    // top
    new Rectangle(
        new Point(-120, -80, -120), new Point(-120, -80,  120), 
        new Point( -80, -80,  120), new Point( -80, -80, -120)
    ),
    // bottom
    new Rectangle(
        new Point(-120, -120, -120), new Point( -80, -120, -120), 
        new Point( -80, -120,  120), new Point(-120, -120,  120)
    ),
];

rectangles = []
// vertical outer pillar
rectangles = rectangles.concat(verticalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(verticalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 400,  rectangle.firstPoint.y,   rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x + 400,  rectangle.secondPoint.y,  rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x  + 400,  rectangle.thirdPoint.y,   rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x + 400,  rectangle.fourthPoint.y,  rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(verticalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z  + 400),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z  + 400),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
    );
}));
rectangles = rectangles.concat(verticalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 400,  rectangle.firstPoint.y,  rectangle.firstPoint.z  + 400),
        new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y,  rectangle.secondPoint.z + 400),
        new Point(rectangle.thirdPoint.x  + 400,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z  + 400),
        new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y,  rectangle.fourthPoint.z + 400)
    );
}));
// vertical inner pillar
rectangles = rectangles.concat(verticalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(verticalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 200,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y,  rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x  + 200,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y,  rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(verticalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z  + 200),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 200),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z  + 200),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 200)
    );
}));
rectangles = rectangles.concat(verticalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 200,  rectangle.firstPoint.y,  rectangle.firstPoint.z  + 200),
        new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y,  rectangle.secondPoint.z + 200),
        new Point(rectangle.thirdPoint.x  + 200,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z  + 200),
        new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y,  rectangle.fourthPoint.z + 200)
    );
}));
// horizontal outer pillar
rectangles = rectangles.concat(horizontalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(horizontalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y  + 400,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 400, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y  + 400,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(horizontalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z  + 400),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z  + 400),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
    );
}));
rectangles = rectangles.concat(horizontalOuterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y  + 400,  rectangle.firstPoint.z  + 400),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 400,  rectangle.secondPoint.z + 400),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y  + 400,  rectangle.thirdPoint.z  + 400),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 400,  rectangle.fourthPoint.z + 400)
    );
}));
// horizontal inner pillar
rectangles = rectangles.concat(horizontalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(horizontalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y  + 200,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 200, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y  + 200,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 200, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(horizontalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z  + 200),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 200),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z  + 200),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 200)
    );
}));
rectangles = rectangles.concat(horizontalInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y  + 200,  rectangle.firstPoint.z  + 200),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 200,  rectangle.secondPoint.z + 200),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y  + 200,  rectangle.thirdPoint.z  + 200),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 200,  rectangle.fourthPoint.z + 200)
    );
}));
// depth outer pillar
rectangles = rectangles.concat(depthOutterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(depthOutterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 400,  rectangle.firstPoint.y,  rectangle.firstPoint.z),
        new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x  + 400,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z),
        new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(depthOutterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y  + 400,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 400, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y  + 400,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(depthOutterPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 400,  rectangle.firstPoint.y  + 400,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y + 400, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x  + 400,  rectangle.thirdPoint.y  + 400,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z)
    );
}));
// depth inner pillar
rectangles = rectangles.concat(depthInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(depthInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 200,  rectangle.firstPoint.y,  rectangle.firstPoint.z),
        new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x  + 200,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z),
        new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(depthInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y  + 200,  rectangle.firstPoint.z),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 200, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y  + 200,  rectangle.thirdPoint.z),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 200, rectangle.fourthPoint.z)
    );
}));
rectangles = rectangles.concat(depthInnerPillar_Tessaract.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 200, rectangle.firstPoint.y  + 200,  rectangle.firstPoint.z),
        new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y + 200, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x  + 200, rectangle.thirdPoint.y  + 200,  rectangle.thirdPoint.z),
        new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y + 200, rectangle.fourthPoint.z)
    );
}));


for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i].flattenToTriangles();
    for (let j = 0; j < rectangle.length; j += 3 * 3) {
        let vec1 = v3.create(
            rectangle[j + 3] - rectangle[j    ], 
            rectangle[j + 4] - rectangle[j + 1], 
            rectangle[j + 5] - rectangle[j + 2]
        ); 
        let vec2 = v3.create(
            rectangle[j + 6] - rectangle[j + 3], 
            rectangle[j + 7] - rectangle[j + 4], 
            rectangle[j + 8] - rectangle[j + 5]
        );
        let normal       = v3.normalize(v3.cross(vec2, vec1));
        tessaract.normal = [...tessaract.normal, ...normal, ...normal, ...normal];
    }
    for (let j = 0; j < 6; j++) {
        tessaract.color = [...tessaract.color, ...primaryColors[i % 6]];
    }
    tessaract.position  = [...tessaract.position, ...rectangle];
}

minX = Math.min(...tessaract.position.filter((_, i) => i % 3 === 0));
maxX = Math.max(...tessaract.position.filter((_, i) => i % 3 === 0));
minY = Math.min(...tessaract.position.filter((_, i) => i % 3 === 1));
maxY = Math.max(...tessaract.position.filter((_, i) => i % 3 === 1));
minZ = Math.min(...tessaract.position.filter((_, i) => i % 3 === 2));
maxZ = Math.max(...tessaract.position.filter((_, i) => i % 3 === 2));

tessaract.center = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];


// ====================================== Rubic ========================================
// Rubic size
const RUBIC_SIZE        = 3;

// Rubic Model
let rubic = {
    position    : [],
    color       : [],
    normal      : [],
    center      : [],
};

// Vertical pillar
const verticalPillar_Rubic    = [
    // Front
    new Rectangle(
        new Point(-156, -156, -156), new Point(-156, -144, -156),
        new Point( -44, -144, -156), new Point( -44, -156, -156)
    ),
    // Back
    new Rectangle(
        new Point( -44, -156, -144), new Point( -44, -144, -144),
        new Point(-156, -144, -144), new Point(-156, -156, -144)
    ),
    // Left
    new Rectangle(
        new Point(-156, -156, -144), new Point(-156, -144, -144),
        new Point(-156, -144, -156), new Point(-156, -156, -156)
    ),
    // Right
    new Rectangle(
        new Point( -44, -156, -156), new Point( -44, -144, -156),
        new Point( -44, -144, -144), new Point( -44, -156, -144)
    ),
    // Top
    new Rectangle(
        new Point(-156, -156, -156), new Point( -44, -156, -156),
        new Point( -44, -156, -144), new Point(-156, -156, -144)
    ),
    // Bottom
    new Rectangle(
        new Point(-156, -144, -156), new Point(-156, -144, -144),
        new Point( -44, -144, -144), new Point( -44, -144, -156)
    ),
];
// Horizontal pillar
const horizontalPillar_Rubic  = [
    // Front
    new Rectangle(
        new Point(-156, -156, -156), new Point(-156,  -44, -156),
        new Point(-144,  -44, -156), new Point(-144, -156, -156)
    ),
    // Back
    new Rectangle(
        new Point(-156, -156, -144), new Point(-144, -156, -144),
        new Point(-144,  -44, -144), new Point(-156,  -44, -144)
    ),
    // Left
    new Rectangle(
        new Point(-156, -156, -156), new Point(-156, -156, -144),
        new Point(-156,  -44, -144), new Point(-156,  -44, -156)
    ),
    // Right
    new Rectangle(  
        new Point(-144, -156, -156), new Point(-144,  -44, -156),
        new Point(-144,  -44, -144), new Point(-144, -156, -144)
    ),
    // Top
    new Rectangle(
        new Point(-156, -156, -156), new Point(-144, -156, -156),
        new Point(-144, -156, -144), new Point(-156, -156, -144)
    ),
    // Bottom
    new Rectangle(
        new Point(-156,  -44, -156), new Point(-156,  -44, -144),
        new Point(-144,  -44, -144), new Point(-144,  -44, -156)
    ),
];
// Depth pillar
const depthPillar_Rubic       = [
    // Front
    new Rectangle(
        new Point(-156, -156, -156), new Point(-156, -144, -156),
        new Point(-144, -144, -156), new Point(-144, -156, -156)
    ),
    // Back
    new Rectangle(
        new Point(-156, -156,  -44), new Point(-144, -156,  -44),
        new Point(-144, -144,  -44), new Point(-156, -144,  -44)
    ),
    // Left
    new Rectangle(
        new Point(-156, -156, -156), new Point(-156, -156,  -44),
        new Point(-156, -144,  -44), new Point(-156, -144, -156)
    ),
    // Right
    new Rectangle(  
        new Point(-144, -156, -156), new Point(-144, -144, -156),
        new Point(-144, -144,  -44), new Point(-144, -156,  -44)
    ),
    // Top
    new Rectangle(
        new Point(-156, -156, -156), new Point(-144, -156, -156),
        new Point(-144, -156,  -44), new Point(-156, -156,  -44)
    ),
    // Bottom
    new Rectangle(
        new Point(-156, -144, -156), new Point(-156, -144,  -44),
        new Point(-144, -144,  -44), new Point(-144, -144, -156)
    ),
];

// Store rubic's rectangles
rectangles = []

// Make the rubic
for (let i = 0; i < RUBIC_SIZE; i++) {
    for (let j = 0; j <= RUBIC_SIZE; j++) {
        for (let k = 0; k <= RUBIC_SIZE; k++) {
            // Vertical Pillar
            /* ============================================================================================================================== */           
            rectangles = rectangles.concat(verticalPillar_Rubic.map(rectangle => {
                    return new Rectangle(
                            new Point(rectangle.firstPoint.x  + 100 * i, rectangle.firstPoint.y  + 100 * j, rectangle.firstPoint.z  + 100 * k),
                            new Point(rectangle.secondPoint.x + 100 * i, rectangle.secondPoint.y + 100 * j, rectangle.secondPoint.z + 100 * k),
                            new Point(rectangle.thirdPoint.x  + 100 * i, rectangle.thirdPoint.y  + 100 * j, rectangle.thirdPoint.z  + 100 * k),
                            new Point(rectangle.fourthPoint.x + 100 * i, rectangle.fourthPoint.y + 100 * j, rectangle.fourthPoint.z + 100 * k)
                    );
                })
            );
            /* ============================================================================================================================== */

            // Vertical Pillar Color
            /* ============================================================================================================================== */
            for (let n = 0; n < 6; n++)  
                rubic.color = k == 0               ? rubic.color.concat(rubicColors.red)    : rubic.color.concat(rubicColors.black);  // Red for front
            for (let n = 0; n < 6; n++)  
                rubic.color = k == RUBIC_SIZE      ? rubic.color.concat(rubicColors.orange) : rubic.color.concat(rubicColors.black); // Orange for back
            for (let n = 0; n < 6; n++)  
                rubic.color = i == 0               ? rubic.color.concat(rubicColors.blue)   : rubic.color.concat(rubicColors.black);  // Blue for left
            for (let n = 0; n < 6; n++)  
                rubic.color = i == RUBIC_SIZE - 1  ? rubic.color.concat(rubicColors.green)  : rubic.color.concat(rubicColors.black);  // Green for right
            for (let n = 0; n < 6; n++)  
                rubic.color = j == 0               ? rubic.color.concat(rubicColors.yellow) : rubic.color.concat(rubicColors.black);  // Yellow for top
            for (let n = 0; n < 6; n++)  
                rubic.color = j == RUBIC_SIZE      ? rubic.color.concat(rubicColors.white)  : rubic.color.concat(rubicColors.black);  // White for bottom
            /* ============================================================================================================================== */
            



            // Horizontal Pillar
            /* ============================================================================================================================== */
            rectangles = rectangles.concat(horizontalPillar_Rubic.map(rectangle => {
                    return new Rectangle(
                            new Point(rectangle.firstPoint.x  + 100 * j, rectangle.firstPoint.y  + 100 * i, rectangle.firstPoint.z  + 100 * k),
                            new Point(rectangle.secondPoint.x + 100 * j, rectangle.secondPoint.y + 100 * i, rectangle.secondPoint.z + 100 * k),
                            new Point(rectangle.thirdPoint.x  + 100 * j, rectangle.thirdPoint.y  + 100 * i, rectangle.thirdPoint.z  + 100 * k),
                            new Point(rectangle.fourthPoint.x + 100 * j, rectangle.fourthPoint.y + 100 * i, rectangle.fourthPoint.z + 100 * k)
                    );
                })
            );
            /* ============================================================================================================================== */

            // Horizontal Pillar Color
            /* ============================================================================================================================== */
            for (let n = 0; n < 6; n++)  
                rubic.color = k == 0               ? rubic.color.concat(rubicColors.red)    : rubic.color.concat(rubicColors.black);  // Red for front
            for (let n = 0; n < 6; n++)  
                rubic.color = k == RUBIC_SIZE      ? rubic.color.concat(rubicColors.orange) : rubic.color.concat(rubicColors.black); // Orange for back
            for (let n = 0; n < 6; n++)  
                rubic.color = j == 0               ? rubic.color.concat(rubicColors.blue)   : rubic.color.concat(rubicColors.black);  // Blue for left
            for (let n = 0; n < 6; n++)  
                rubic.color = j == RUBIC_SIZE      ? rubic.color.concat(rubicColors.green)  : rubic.color.concat(rubicColors.black);  // Green for right
            for (let n = 0; n < 6; n++)  
                rubic.color = i == 0               ? rubic.color.concat(rubicColors.yellow) : rubic.color.concat(rubicColors.black);  // Yellow for top
            for (let n = 0; n < 6; n++)  
                rubic.color = i == RUBIC_SIZE - 1  ? rubic.color.concat(rubicColors.white)  : rubic.color.concat(rubicColors.black);  // White for bottom
            /* ============================================================================================================================== */




            // Depth Pillar
            /* ============================================================================================================================== */
            rectangles = rectangles.concat(depthPillar_Rubic.map(rectangle => {
                    return new Rectangle(
                        new Point(rectangle.firstPoint.x  + 100 * j , rectangle.firstPoint.y  + 100 * k , rectangle.firstPoint.z  + 100 * i),
                        new Point(rectangle.secondPoint.x + 100 * j , rectangle.secondPoint.y + 100 * k , rectangle.secondPoint.z + 100 * i),
                        new Point(rectangle.thirdPoint.x  + 100 * j , rectangle.thirdPoint.y  + 100 * k , rectangle.thirdPoint.z  + 100 * i),
                        new Point(rectangle.fourthPoint.x + 100 * j , rectangle.fourthPoint.y + 100 * k , rectangle.fourthPoint.z + 100 * i)
                    );
                })
            );

            // Depth Pillar Color
            /* ============================================================================================================================== */
            for (let n = 0; n < 6; n++)  
                rubic.color = i == 0               ? rubic.color.concat(rubicColors.red)    : rubic.color.concat(rubicColors.black);  // Red for front
            for (let n = 0; n < 6; n++)  
                rubic.color = i == RUBIC_SIZE - 1  ? rubic.color.concat(rubicColors.orange) : rubic.color.concat(rubicColors.black);  // Orange for back
            for (let n = 0; n < 6; n++)  
                rubic.color = j == 0               ? rubic.color.concat(rubicColors.blue)   : rubic.color.concat(rubicColors.black);  // Blue for left
            for (let n = 0; n < 6; n++)  
                rubic.color = j == RUBIC_SIZE      ? rubic.color.concat(rubicColors.green)  : rubic.color.concat(rubicColors.black);  // Green for right
            for (let n = 0; n < 6; n++)  
                rubic.color = k == 0               ? rubic.color.concat(rubicColors.yellow) : rubic.color.concat(rubicColors.black);  // Yellow for top
            for (let n = 0; n < 6; n++)  
                rubic.color = k == RUBIC_SIZE      ? rubic.color.concat(rubicColors.white)  : rubic.color.concat(rubicColors.black);  // White for bottom
            /* ============================================================================================================================== */
        }
    }
}

// Flatten the rectangles to triangles
for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i].flattenToTriangles();
    for (let j = 0; j < rectangle.length; j += 3*3) {
        let vec1 = v3.create(
            rectangle[j + 3] - rectangle[j    ], 
            rectangle[j + 4] - rectangle[j + 1], 
            rectangle[j + 5] - rectangle[j + 2]
        ); 
        let vec2 = v3.create(
            rectangle[j + 6] - rectangle[j + 3], 
            rectangle[j + 7] - rectangle[j + 4], 
            rectangle[j + 8] - rectangle[j + 5]
        );
        let normal     = v3.normalize(v3.cross(vec2, vec1));
        rubic.normal   = [...rubic.normal, ...normal, ...normal, ...normal];
    }
    rubic.position = [...rubic.position, ...rectangle];
}

minX = Math.min(...rubic.position.filter((_, i) => i % 3 === 0));
maxX = Math.max(...rubic.position.filter((_, i) => i % 3 === 0));
minY = Math.min(...rubic.position.filter((_, i) => i % 3 === 1));
maxY = Math.max(...rubic.position.filter((_, i) => i % 3 === 1));
minZ = Math.min(...rubic.position.filter((_, i) => i % 3 === 2));
maxZ = Math.max(...rubic.position.filter((_, i) => i % 3 === 2));

rubic.center = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];

// ==================================== Pyramid ========================================
// Pyramid Model
let pyramid = {
    position    : [],
    color       : [],
    normal      : [],
    center      : []
}

const hypotenusePillar_1_Pyramid = [
    // front
    new Rectangle(
        new Point(-220, -220, -220), new Point( -20,  220,  -20), 
        new Point(   0,  220,  -20), new Point(-180, -220, -220)
    ),
    // back
    new Rectangle(
        new Point(-180, -220,-180), new Point(   0,  200,   0), 
        new Point( -20,  200,   0), new Point(-220, -220,-180)
    ),
    // left
    new Rectangle(
      new Point(-220, -220, -180), new Point( -20,  200,    0),
      new Point( -20,  220,  -20), new Point(-220, -220, -220)
    ),
    // right
    new Rectangle(
        new Point(-180, -220, -220), new Point(   0,  220,  -20), 
        new Point(   0,  200,    0), new Point(-180, -220, -180)
    ),
    // top
    new Rectangle(
        new Point(-20, 220, -20), new Point(-20, 200,   0), 
        new Point(  0, 200,   0), new Point(  0, 220, -20)
    ),
    // bottom
    new Rectangle(
        new Point(-220, -220, 180), new Point(-180, -220, 180), 
        new Point(-180, -220, 220), new Point(-220, -220, 220)
    ),
]; 

const hypotenusePillar_2_Pyramid = [
    // front
    new Rectangle(
        new Point(180, -220, -220), new Point(-20,  220,  -20), 
        new Point(  0,  220,  -20), new Point(220, -220, -220)
    ),
    // back
    new Rectangle(
        new Point(220, -220, -180), new Point(  0,  200,   0), 
        new Point(-20,  200,    0), new Point(180, -220,-180)
    ),
    // left
    new Rectangle(
      new Point(180, -220, -180), new Point(-20,  200,    0),
      new Point(-20,  220,  -20), new Point(180, -220, -220)
    ),
    // right
    new Rectangle(
        new Point(220, -220, -220), new Point(  0, 220,   -20), 
        new Point(  0,  200,    0), new Point(220, -220, -180)
    ),
    // top
    new Rectangle(
        new Point(-20, 220, -20), new Point(-20, 200,   0), 
        new Point(  0, 200,   0), new Point(  0, 220, -20)
    ),
    // bottom
    new Rectangle(
        new Point(180, -220, -220), new Point(220, -220, -220), 
        new Point(220, -220, -180), new Point(180, -220, -180)
    ),
  ];

const hypotenusePillar_3_Pyramid = [
    // front
    new Rectangle(
        new Point(-220, -220, 180), new Point( -20,  220, -20), 
        new Point(   0,  220, -20), new Point(-180, -220, 180)
        ),
    // back
    new Rectangle(
        new Point(-180, -220, 220), new Point(   0,  200,   0), 
        new Point( -20,  200,   0), new Point(-220, -220, 220)
        ),
    // left
    new Rectangle(
        new Point(-220, -220, 220), new Point( -20,  200,   0),
        new Point( -20,  220, -20), new Point(-220, -220, 180)
    ),
    // right
    new Rectangle(
        new Point(-180, -220, 180), new Point(   0,  220, -20),
        new Point(   0,  200,   0), new Point(-180, -220, 220)
    ),
    // top
    new Rectangle(
        new Point(-20, 220, -20), new Point(-20, 200,   0),
        new Point(  0, 200,   0), new Point(  0, 220, -20)
        ),
    // bottom
    new Rectangle(
        new Point(-220, -220, 180), new Point(-180, -220, 180),
        new Point(-180, -220, 220), new Point(-220, -220, 220)
    ),
];

const hypotenusePillar_4_Pyramid = [
    // front
    new Rectangle(
        new Point(180, -220, 180), new Point(-20, 220, -20),
        new Point(  0,  220, -20), new Point(220, -220, 180)
    ),
    // back
    new Rectangle(
        new Point(220, -220, 220), new Point(  0,  200,   0),
        new Point(-20,  200,   0), new Point(180, -220, 220)
    ),
    // left
    new Rectangle(
        new Point(180, -220, 220), new Point(-20,  200,   0),
        new Point(-20,  220, -20), new Point(180, -220, 180)
    ),  
    // right
    new Rectangle(
        new Point(220, -220, 180), new Point(  0, 220, -20), 
        new Point(  0, 200,    0), new Point(220, -220, 220)
    ),
    // top
    new Rectangle(
        new Point(-20, 220, -20), new Point(-20, 200,   0), 
        new Point(  0, 200,   0), new Point(  0, 220, -20)
    ),
    // bottom
    new Rectangle(
        new Point(180, -220, 180), new Point(220, -220, 180), 
        new Point(220, -220, 220), new Point(180, -220, 220)
    ),
];

const depthPillar_Pyramid = [
    // front
    new Rectangle(
        new Point(-220, -220, -220), new Point(-220, -180, -220), 
        new Point(-180, -180, -220), new Point(-180, -220, -220)
    ),
    // back
    new Rectangle(
        new Point(-180, -220, 220), new Point(-180, -180, 220),
        new Point(-220, -180, 220), new Point(-220, -220, 220)
    ),
    // left
    new Rectangle(
      new Point(-220, -220,  220), new Point(-220, -180,  220),
      new Point(-220, -180, -220), new Point(-220, -220, -220)
    ),
    // right
    new Rectangle(
        new Point(-180, -220, -220), new Point(-180, -180, -220), 
        new Point(-180, -180,  220), new Point(-180, -220,  220)
    ),
    // top
    new Rectangle(
        new Point(-220, -180, -220), new Point(-220, -180,  220), 
        new Point(-180, -180,  220), new Point(-180, -180, -220)
    ),
    // bottom
    new Rectangle(
        new Point(-220, -220, -220), new Point(-180, -220, -220), 
        new Point(-180, -220,  220), new Point(-220, -220,  220)
    ), 
]

const horizontalPillar_Pyramid = [
    // front
    new Rectangle(
        new Point(-220, -220, -220), new Point(-220, -180, -220),
        new Point( 220, -180, -220), new Point( 220, -220, -220)
    ),
    // back
    new Rectangle(
        new Point( 220, -220,-180), new Point( 220, -180,-180), 
        new Point(-220, -180,-180), new Point(-220, -220,-180)
    ),
    // left
    new Rectangle(
        new Point(-220, -220, -180), new Point(-220, -180, -180),
        new Point(-220, -180, -220), new Point(-220, -220, -220)
    ),
    // right
    new Rectangle(
        new Point(220, -220, -220), new Point(220, -180, -220), 
        new Point(220, -180, -180), new Point(220, -220, -180)
    ),
    // top
    new Rectangle(
        new Point(-220, -180, -220), new Point(-220, -180, -180),
        new Point( 220, -180, -180), new Point( 220, -180, -220)
    ),
    // bottom
    new Rectangle(
        new Point(-220, -220, -220), new Point( 220, -220, -220), 
        new Point( 220, -220, -180), new Point(-220, -220, -180)
    ),
]; 

rectangles = []

rectangles = rectangles.concat(hypotenusePillar_1_Pyramid)
rectangles = rectangles.concat(hypotenusePillar_2_Pyramid)
rectangles = rectangles.concat(hypotenusePillar_3_Pyramid)
rectangles = rectangles.concat(hypotenusePillar_4_Pyramid)

rectangles = rectangles.concat(depthPillar_Pyramid.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    )
}))

rectangles = rectangles.concat(depthPillar_Pyramid.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x  + 400, rectangle.firstPoint.y,  rectangle.firstPoint.z ),
        new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x  + 400, rectangle.thirdPoint.y,  rectangle.thirdPoint.z ),
        new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    )
}))

rectangles = rectangles.concat(horizontalPillar_Pyramid.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    )
}))

rectangles = rectangles.concat(horizontalPillar_Pyramid.map((rectangle) => {
    return new Rectangle(
        new Point(rectangle.firstPoint.x,  rectangle.firstPoint.y,  rectangle.firstPoint.z  + 400),
        new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
        new Point(rectangle.thirdPoint.x,  rectangle.thirdPoint.y,  rectangle.thirdPoint.z  + 400),
        new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
    )
}))

for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i].flattenToTriangles()
    for (let j = 0; j < rectangle.length; j += 3 *3) {
        let vec1 = v3.create(
            rectangle[j + 3] - rectangle[j    ], 
            rectangle[j + 4] - rectangle[j + 1], 
            rectangle[j + 5] - rectangle[j + 2]
        ); 
        let vec2 = v3.create(
            rectangle[j + 6] - rectangle[j + 3], 
            rectangle[j + 7] - rectangle[j + 4], 
            rectangle[j + 8] - rectangle[j + 5]
        );
        let normal      = v3.normalize(v3.cross(vec2, vec1));
        pyramid.normal  = [...pyramid.normal, ...normal, ...normal, ...normal]
    }
    for (let j = 0; j < rectangle.length; j += 3) {
        pyramid.color = [...pyramid.color, ...primaryColors[i % 6]]
    }
    pyramid.position = [...pyramid.position, ...rectangle]
}

minX = Math.min(...pyramid.position.filter((_, i) => i % 3 === 0))
maxX = Math.max(...pyramid.position.filter((_, i) => i % 3 === 0))
minY = Math.min(...pyramid.position.filter((_, i) => i % 3 === 1))
maxY = Math.max(...pyramid.position.filter((_, i) => i % 3 === 1))
minZ = Math.min(...pyramid.position.filter((_, i) => i % 3 === 2))
maxZ = Math.max(...pyramid.position.filter((_, i) => i % 3 === 2))

pyramid.center = [(minX + maxX) / 2, (minY + maxY) * 2 / 3, (minZ + maxZ) / 2]

export { tessaract, rubic, pyramid }