export class Timeframe {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.translation = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [1, 1, 1];
  }
}
