import { Rect, Circle } from './figures.js';


class Canvas {
  constructor(canvasDOM) {
    this.canvasDOM = canvasDOM;
    this.ctx = canvasDOM.getContext("2d");
  }

  _draw(figure) {
    this.ctx.beginPath();
    figure();
    this.ctx.fill();
    this.ctx.closePath();
  }
  _rect(rect) {
    this.ctx.rect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.fillStyle = rect.color;
  }

  _circle(circle) {
    this.ctx.arc(circle.x, circle.y, circle.radio, 0, Math.PI*2, false);
    this.ctx.fillStyle = circle.color;
  }

  drawRect(rect) {
    this._draw((function() { return this._rect(rect)}).bind(this));
  }

  drawCircle(circle) {
    this._draw((function() { return this._circle(circle)}).bind(this));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height);
  }
}


const LeftArrow = "ArrowLeft";
const UpArrow = "ArrowUp";
const RightArrow = "ArrowRight";
const DownArrow = "ArrowDown";

class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0
    this.speed = 1;
  }

  draw() {
    const now = Date.now();
    const dt = now - this.lastUpdate;
    this.lastUpdate = now;
    this.canvas.clear();
    this.updatePosition(dt)
    this.canvas.drawCircle(new Circle(this.x, this.y, 50, "#FF0000"));
  }

  updatePosition(dt) {
    if (this.rightPressed) this.x += this.speed * dt;
    if (this.leftPressed) this.x -= this.speed * dt;
    if (this.upPressed) this.y -= this.speed * dt;
    if (this.downPressed) this.y += this.speed * dt;

    if (this.x < 50) this.x = 50;
    else if (this.x > 850) this.x = 850;
    if (this.y < 50) this.y = 50;
    else if (this.y > 550) this.y = 550;
  }

  handleKeyDown(event) {
    this.leftPressed = event.key == LeftArrow || this.leftPressed;
    this.rightPressed = event.key == RightArrow || this.rightPressed;
    this.upPressed = event.key == UpArrow || this.upPressed;
    this.downPressed = event.key == DownArrow || this.downPressed;
  }

  handleKeyUp(event) {
    this.leftPressed = event.key == LeftArrow ? false : this.leftPressed;
    this.rightPressed = event.key == RightArrow ? false : this.rightPressed;
    this.upPressed = event.key == UpArrow ? false : this.upPressed;
    this.downPressed = event.key == DownArrow ? false : this.downPressed;
  }

  play() {
    this.canvas.canvasDOM.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    this.canvas.canvasDOM.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    this.lastUpdate = Date.now();
    setInterval(this.draw.bind(this), 0);
  }
}



const canvas = new Canvas(document.getElementById("canvas"));
const game = new Game(canvas);
game.play();
