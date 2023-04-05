export const v3 = {
  create: function (x, y, z) {
    return [
      x, 
      y, 
      z
    ];
  },
  cross: function (a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  },
  substract: function (a, b) {
    return [
      a[0] - b[0],
      a[1] - b[1],
      a[2] - b[2],
    ];
  },
  normalize: function (v) {
    let length = v3.length(v);
    if (length > 0.00001) {
      return v3.scale(v, 1 / length);
    } else {
      return [
        0, 
        0, 
        0
      ];
    }
  },
  length: function (v) {
    let x = v[0];
    let y = v[1];
    let z = v[2];
    return Math.sqrt(x * x + y * y + z * z);
  },
  scale: function (v, s) {
    return [
      v[0] * s,
      v[1] * s,
      v[2] * s,
    ];
  },
}