import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Board } from '../models/board.model';
import { Food } from '../models/food.model';
import { Snake } from '../models/snake.model';
import { Direction } from '../types/direction.type';

@Injectable({ providedIn: 'root' })
export class GameService {
  context: CanvasRenderingContext2D;

  // Size of the board
  readonly width = 325;
  readonly height = 325;

  // Size of snake and powerup
  readonly objectsWidth = 25;
  readonly objectsHeight = 25;

  controls = new BehaviorSubject<Direction>('right');
  gameControlsSubscription: Subscription;

  score$ = new BehaviorSubject<number>(0);

  area = new Board(this.width, this.height);
  snake = new Snake(0, 0, this.objectsWidth, this.objectsHeight);
  powerUp = new Food(0, 0, this.objectsWidth, this.objectsHeight);

  // TODO:

  // SPEED OF THE GAME BASED ON SIZE OF THE SNAKE -> SPEED ON TIMER
  // ADDING POWERUP LOGIC
  // LOSING CONDITION (snake touches itself)
  // TRY AGAIN BUTTON IF LOSING

  constructor() {}

  initGame(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.initBoard();
    this.spawnSnake();
    this.spawnFood();

    this.go();
    // Start timer (animFrame) AND listen to control events -> start with moving right
  }

  go(): void {
    this.gameControlsSubscription = this.controls.subscribe((direction) => {
      switch (direction) {
        case 'up':
          // this.moveUp();
          break;
        case 'down':
          // this.moveDown();
          break;
        case 'left':
          // this.moveLeft();
          break;
        case 'right':
          // this.moveRight();
          break;
        default:
          break;
      }
      console.log(direction);
    });
  }

  initBoard(): void {
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'black';
    // NOT NECESSARY CODE (Grid structure):
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 1;
    for (let x = 0; x <= this.width; x += 20) {
      for (let y = 0; y <= this.height; y += 20) {
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.height);
        this.context.stroke();
        this.context.moveTo(0, y);
        this.context.lineTo(this.width, y);
        this.context.stroke();
      }
    }
  }

  spawnSnake(): void {
    this.context.fillStyle = 'lime';
    this.context.fillRect(
      (this.width - this.objectsWidth) / 2,
      (this.height - this.objectsHeight) / 2,
      this.objectsWidth,
      this.objectsHeight
    );
  }

  spawnFood(): void {
    this.context.fillStyle = 'red';
    this.context.fillRect(
      (this.width - this.objectsWidth) / 4,
      (this.height - this.objectsHeight) / 4,
      this.objectsWidth,
      this.objectsHeight
    );
  }

  moveUp(): void {}

  moveDown(): void {}

  moveRight(): void {}

  moveLeft(): void {}

  pickUpFood(): void {
    // TODO: Make snake larger, increase score subject
  }

  clearSubscription(): void {
    if (this.gameControlsSubscription) {
      this.gameControlsSubscription.unsubscribe();
    }
  }
}
