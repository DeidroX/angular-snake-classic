import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Area } from '../models/area.model';
import { PowerUp } from '../models/power-up.model';
import { Snake } from '../models/snake.model';
import { Button } from '../types/button.type';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly areaWidth = 525;
  readonly areaHeight = 525;
  readonly snakeWidth = 20;
  readonly snakeHeight = 20;

  buttonActive = new BehaviorSubject<Button>('ArrowRight');

  area = new Area(this.areaWidth, this.areaHeight);
  snake = new Snake(0, 0, this.snakeWidth, this.snakeHeight);
  powerUp = new PowerUp(0, 0, 20, 20);

  // TODO:
  // winning and losing
  // powerups

  constructor() {}

  spawnSnake(context: CanvasRenderingContext2D): void {
    context.fillRect(
      (this.areaWidth - this.snakeWidth) / 2,
      (this.areaHeight - this.snakeHeight) / 2,
      this.snakeWidth,
      this.snakeHeight
    );
  }

  moveRight(): void {
    // let testNum = 3;
    // setInterval(() => {
    //     if (testNum !== 0) {

    //         testNum--;
    //     }
    // }, 1000);
  }

  pickUpPowerUp(): void {}
}
