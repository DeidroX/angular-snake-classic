import { Directive, HostListener } from '@angular/core';
import { GameService } from '../services/game.service';
import { Button } from '../types/button.type';

@Directive({ selector: '[appButton]' })
export class ButtonDirective {
  constructor(private gameService: GameService) {}

  @HostListener('window:keydown', ['$event']) keyEvent(
    event: KeyboardEvent
  ): void {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      this.gameService.buttonActive.next(event.key as Button);
    }
  }
}
