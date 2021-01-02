import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Direction } from '../types/direction.type';

@Injectable({ providedIn: 'root' })
export class GameService {
  // Context
  context: CanvasRenderingContext2D;

  // Size of the board
  readonly width = 324;
  readonly height = 324;
  readonly tileCount = 18;
  readonly tileSize = this.width / this.tileCount - 1;

  // Snake start position
  snakeX = 9;
  snakeY = 9;

  // Food position
  foodX = Math.floor(Math.random() * this.tileCount);
  foodY = Math.floor(Math.random() * this.tileCount);

  // Controls
  controls = new BehaviorSubject<Direction>('right');
  gameControlsSubscription: Subscription;
  xVelocity = 0;
  yVelocity = 0;

  // Speed
  readonly SPEED = 100;
  gameSpeed = this.SPEED;
  currentTime = Date.now();

  // Score
  score$ = new BehaviorSubject<number>(0);
  score = 0;

  // TODO:

  // SIZE OF SNAKE
  // LOSING CONDITION (snake touches itself)
  // TRY AGAIN BUTTON IF LOSING

  constructor() {}

  initGame(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.initGameControls();
    this.startGameLoop();
  }

  startGameLoop(): void {
    if (Date.now() > this.currentTime) {
      this.currentTime += this.gameSpeed;
      this.drawBoard();
      this.changeSnakePosition();
      this.checkFoodCollision();
      this.drawFood();
      this.drawSnake();
    }
    requestAnimationFrame(this.startGameLoop.bind(this));
  }

  initGameControls(): void {
    this.gameControlsSubscription = this.controls.subscribe((direction) => {
      switch (direction) {
        case 'up':
          this.moveUp();
          break;
        case 'down':
          this.moveDown();
          break;
        case 'left':
          this.moveLeft();
          break;
        case 'right':
          this.moveRight();
          break;
        default:
          break;
      }
    });
  }

  drawBoard(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
  }

  drawSnake(): void {
    this.context.fillStyle = 'lime';
    this.context.fillRect(
      this.snakeX * this.tileCount,
      this.snakeY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
  }

  drawFood(): void {
    this.context.fillStyle = 'red';
    this.context.fillRect(
      this.foodX * this.tileCount,
      this.foodY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
  }

  checkFoodCollision(): void {
    if (this.snakeX === this.foodX && this.snakeY === this.foodY) {
      this.foodX = Math.floor(Math.random() * this.tileCount);
      this.foodY = Math.floor(Math.random() * this.tileCount);
      this.gameSpeed = this.SPEED - this.score;
      this.score$.next(++this.score);
    }
  }

  changeSnakePosition(): void {
    this.snakeX += this.xVelocity;
    this.snakeY += this.yVelocity;
    if (this.snakeX < 0) {
      this.snakeX = this.tileCount - 1;
    } else if (this.snakeX > this.tileCount - 1) {
      this.snakeX = 0;
    } else if (this.snakeY < 0) {
      this.snakeY = this.tileCount - 1;
    } else if (this.snakeY > this.tileCount - 1) {
      this.snakeY = 0;
    }
  }

  moveUp(): void {
    this.yVelocity = -1;
    this.xVelocity = 0;
  }

  moveDown(): void {
    this.yVelocity = 1;
    this.xVelocity = 0;
  }

  moveRight(): void {
    this.xVelocity = 1;
    this.yVelocity = 0;
  }

  moveLeft(): void {
    this.xVelocity = -1;
    this.yVelocity = 0;
  }

  clearControlsSubscription(): void {
    if (this.gameControlsSubscription) {
      this.gameControlsSubscription.unsubscribe();
    }
  }
}
