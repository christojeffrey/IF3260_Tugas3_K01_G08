export class Keyframe {
  constructor(end) {
    this.end = end;
    this.translation = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [1, 1, 1];
  }
  // setter
  setTranslation(translation) {
    this.translation = translation;
  }
  setRotation(rotation) {
    this.rotation = rotation;
  }
  setScale(scale) {
    this.scale = scale;
  }
  // getter
  getTranslation() {
    return this.translation;
  }
  getRotation() {
    return this.rotation;
  }
  getScale() {
    return this.scale;
  }
}
