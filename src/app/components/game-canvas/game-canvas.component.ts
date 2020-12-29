import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-game-canvas',
  template: '<canvas appButton #canvas></canvas>',
  styles: ['canvas {border: 2px solid black; margin: 0; padding: 0; }'],
})
export class GameCanvasComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  readonly width = this.gameService.areaWidth;
  readonly height = this.gameService.areaHeight;
  subscription: Subscription;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.subscription = this.gameService.buttonActive.subscribe((button) => {
      switch (button) {
        case 'ArrowUp':
          // TODO: game service move up
          break;
        case 'ArrowDown':
          break;
        case 'ArrowLeft':
          break;
        case 'ArrowRight':
          this.gameService.moveRight();
          break;
        default:
          break;
      }
      console.log(button);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.context.strokeStyle = 'lightgrey';
    this.context.lineWidth = 1;
    for (let x = 0; x <= this.width; x += 25) {
      for (let y = 0; y <= this.height; y += 25) {
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.height);
        this.context.stroke();
        this.context.moveTo(0, y);
        this.context.lineTo(this.width, y);
        this.context.stroke();
      }
    }
    this.gameService.spawnSnake(this.context);
    // this.context.fillRect(252.5, 252.5, 20, 20);
    // this.context.clearRect(252.5, 252.5, 20, 20);
  }
}
