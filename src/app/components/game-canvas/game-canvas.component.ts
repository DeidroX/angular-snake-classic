import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-game-canvas',
  template: '<canvas (click)="onTryAgain()" appControls #canvas></canvas>',
  styles: ['canvas {box-shadow: 4px 4px 10px black; margin: 0; padding: 0; }'],
})
export class GameCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.initGame(this.canvas.nativeElement.getContext('2d'));
  }

  ngOnDestroy(): void {
    this.gameService.clearControlsSubscription();
  }

  onTryAgain(): void {
    if (this.gameService.isGameOver) {
      this.gameService.clearBoard();
    }
  }
}
