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
  template: '<canvas class="noselect" (click)="onTryAgain()" appControls #canvas></canvas>',
  styleUrls: ['./game-canvas.component.css'],
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
      this.gameService.tryAgain();
    }
  }
}
