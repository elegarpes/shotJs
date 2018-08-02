class Figure {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

export class Rect extends Figure {
  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }
}

export class Circle extends Figure {
  constructor(x, y, radio, color) {
    super(x, y, color);
    this.radio = radio;
  }
}
