export class Snake {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(pieces: number, x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
