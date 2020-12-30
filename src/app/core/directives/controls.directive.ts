import { Directive, HostListener } from '@angular/core';
import { GameService } from '../services/game.service';
import { Direction } from '../types/direction.type';

@Directive({ selector: '[appControls]' })
export class ControlsDirective {
  directionMode: Direction = 'right';
  // Variables for swipe controls
  minDistance = 40;
  startX: number;
  startY: number;
  constructor(private gameService: GameService) {}

  @HostListener('window:keydown', ['$event']) keyEvent(
    event: KeyboardEvent
  ): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.directionMode !== 'up' && this.directionMode !== 'down') {
          this.up();
        }
        break;
      case 'ArrowDown':
        if (this.directionMode !== 'down' && this.directionMode !== 'up') {
          this.down();
        }
        break;
      case 'ArrowLeft':
        if (this.directionMode !== 'left' && this.directionMode !== 'right') {
          this.left();
        }
        break;
      case 'ArrowRight':
        if (this.directionMode !== 'right' && this.directionMode !== 'left') {
          this.right();
        }
        break;
      default:
        break;
    }
  }

  @HostListener('touchstart', ['$event']) touchStart(event: TouchEvent): void {
    this.startX = event.touches[0].screenX;
    this.startY = event.touches[0].screenY;
  }

  @HostListener('touchmove', ['$event']) touchMove(event: TouchEvent): void {
    const x = event.touches[0].screenX;
    const y = event.touches[0].screenY;

    // Check if swipe goes in a diagonal direction (sort of)
    if (
      Math.abs(this.startX - x) > this.minDistance &&
      Math.abs(this.startY - y) > this.minDistance
    ) {
      return;
    }

    // UP
    if (
      this.startY < y &&
      Math.abs(this.startY - y) >= this.minDistance &&
      this.directionMode !== 'up' &&
      this.directionMode !== 'down'
    ) {
      this.up();
    }

    // DOWN
    if (
      this.startY > y &&
      this.startY - y >= this.minDistance &&
      this.directionMode !== 'down' &&
      this.directionMode !== 'up'
    ) {
      this.down();
    }

    // LEFT
    if (
      this.startX < x &&
      Math.abs(this.startX - x) >= this.minDistance &&
      this.directionMode !== 'left' &&
      this.directionMode !== 'right'
    ) {
      this.left();
    }

    // RIGHT
    if (
      this.startX > x &&
      this.startX - x >= this.minDistance &&
      this.directionMode !== 'right' &&
      this.directionMode !== 'left'
    ) {
      this.right();
    }
  }

  up(): void {
    this.directionMode = 'up';
    this.gameService.controls.next('up');
  }

  down(): void {
    this.directionMode = 'down';
    this.gameService.controls.next('down');
  }

  left(): void {
    this.directionMode = 'left';
    this.gameService.controls.next('left');
  }

  right(): void {
    this.directionMode = 'right';
    this.gameService.controls.next('right');
  }
}
