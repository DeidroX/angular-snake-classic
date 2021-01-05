import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SnakeBody } from '../models/snake-body.model';
import { Direction } from '../types/direction.type';

@Injectable({ providedIn: 'root' })
export class GameService {
  // Context
  context: CanvasRenderingContext2D;

  // Game Loop
  gameLoopInterval: number;

  // Size of the board
  readonly width = 324;
  readonly height = 324;
  readonly tileCount = 18;
  readonly tileSize = this.width / this.tileCount - 2;

  // Snake head start position
  snakeX = 9;
  snakeY = 9;

  // Snake body
  snakeBody: SnakeBody[] = [];
  snakeBodySize = 2;

  // Food position
  foodX = Math.floor(Math.random() * this.tileCount);
  foodY = Math.floor(Math.random() * this.tileCount);

  // Controls
  readonly controls = new BehaviorSubject<Direction>('right');
  gameControlsSubscription: Subscription;
  inverted = false;
  xVelocity = 0;
  yVelocity = 0;

  // Speed
  difficultySpeed = 100;
  gameSpeed: number;

  // Score
  score = 0;

  // GameOver
  isGameOver = false;

  constructor() {}

  initGame(context: CanvasRenderingContext2D): void {
    this.gameSpeed = this.difficultySpeed;
    this.context = context;
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.initGameControls();
    this.startGameLoop();
  }

  startGameLoop(): void {
    this.changeSnakePosition();
    if (this.checkGameOverConditions()) {
      window.clearInterval(this.gameLoopInterval);
      return;
    }
    this.checkFoodCollision();
    this.drawBoard();
    this.drawSnake();
    this.drawFood();
    this.drawScore();
    this.drawMode();
    this.gameLoopInterval = window.setTimeout(
      this.startGameLoop.bind(this),
      this.gameSpeed
    );
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

  clearBoard(): void {
    window.clearInterval(this.gameLoopInterval);
    this.context.clearRect(0, 0, this.width, this.height);
    this.score = 0;
    this.gameSpeed = this.difficultySpeed;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.snakeX = 9;
    this.snakeY = 9;
    this.snakeBody = [];
    this.snakeBodySize = 2;
    this.foodX = Math.floor(Math.random() * this.tileCount);
    this.foodY = Math.floor(Math.random() * this.tileCount);
    this.isGameOver = false;
    this.controls.next('right');
  }

  tryAgain(): void {
    this.clearBoard();
    this.startGameLoop();
  }

  drawMode(): void {
    this.context.fillStyle = '#86f3ff';
    this.context.font = '10px monospace';
    let mode: string;
    if (this.difficultySpeed === 150) {
      mode = 'Easy';
    } else if (this.difficultySpeed === 100) {
      mode = 'Medium';
    } else if (this.difficultySpeed === 75) {
      mode = 'Hard';
    }
    this.context.fillText('Mode: ' + mode, this.width - 80, 40);
  }

  drawScore(): void {
    this.context.fillStyle = '#86f3ff';
    this.context.font = '12px monospace';
    this.context.fillText('Score: ' + this.score, this.width - 80, 20);
  }

  drawSnake(): void {
    this.context.fillStyle = 'lime';
    this.context.fillRect(
      this.snakeX * this.tileCount,
      this.snakeY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
    this.drawSnakeBody();
  }

  drawSnakeBody(): void {
    this.context.fillStyle = 'rgb(0, 175, 0)';
    this.snakeBody.forEach((bodyPart) => {
      this.context.fillRect(
        bodyPart.x * this.tileCount,
        bodyPart.y * this.tileCount,
        this.tileSize,
        this.tileSize
      );
    });
    // This will add a body part next to the head
    this.snakeBody.push({ x: this.snakeX, y: this.snakeY } as SnakeBody);
    /*
      This will remove the first item of the body part Array,
      because this will be the one item which is the furthest part from the snake head
    */
    if (this.snakeBody.length > this.snakeBodySize) {
      this.snakeBody.shift();
    }
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
      this.determinNextFoodPosition();
      this.snakeBodySize++;
      this.gameSpeed = this.difficultySpeed - this.score;
      ++this.score;
    }
  }

  determinNextFoodPosition(): void {
    this.foodX = Math.floor(Math.random() * this.tileCount);
    this.foodY = Math.floor(Math.random() * this.tileCount);
    if (this.foodX === this.snakeX && this.foodY === this.snakeY) {
      this.determinNextFoodPosition();
      return;
    }
    this.snakeBody.forEach((bodyPart) => {
      if (this.foodX === bodyPart.x && this.foodY === bodyPart.y) {
        this.determinNextFoodPosition();
        return;
      }
    });
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

  checkGameOverConditions(): boolean {
    let gameOver = false;
    this.snakeBody.forEach((bodyPart) => {
      if (bodyPart.x === this.snakeX && bodyPart.y === this.snakeY) {
        gameOver = true;
        return;
      }
    });
    if (gameOver) {
      this.drawGameOverScreen();
      this.isGameOver = true;
      return true;
    } else {
      return false;
    }
  }

  drawGameOverScreen(): void {
    this.context.fillStyle = '#86f3ff';
    this.context.font = '40px monospace';
    this.context.fillText('Game Over!', 53, this.height / 2);
    this.context.font = '20px monospace';
    this.context.fillText('Push to try again', 63, this.height / 1.7);
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
