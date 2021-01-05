import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../services/game.service';
import { Direction } from '../types/direction.type';

@Directive({ selector: '[appControls]' })
export class ControlsDirective implements OnInit, OnDestroy {
  directionMode: Direction;
  gameControlsSubscription: Subscription;
  readonly minTimeGap = 50;
  timeOfLastControlChange: number = Date.now();
  // Variables for swipe controls
  minDistance = 40;
  startX: number;
  startY: number;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameControlsSubscription = this.gameService.controls.subscribe(
      (direction: Direction) => {
        this.directionMode = direction;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.gameControlsSubscription) {
      this.gameControlsSubscription.unsubscribe();
    }
  }

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

    if (
      this.startY > y &&
      this.startY - y >= this.minDistance &&
      this.directionMode !== 'down' &&
      this.directionMode !== 'up'
    ) {
      if (!this.gameService.inverted) {
        this.up();
      } else {
        this.down();
      }
    }

    if (
      this.startY < y &&
      Math.abs(this.startY - y) >= this.minDistance &&
      this.directionMode !== 'up' &&
      this.directionMode !== 'down'
    ) {
      if (!this.gameService.inverted) {
        this.down();
      } else {
        this.up();
      }
    }

    if (
      this.startX > x &&
      this.startX - x >= this.minDistance &&
      this.directionMode !== 'right' &&
      this.directionMode !== 'left'
    ) {
      if (!this.gameService.inverted) {
        this.left();
      } else {
        this.right();
      }
    }

    if (
      this.startX < x &&
      Math.abs(this.startX - x) >= this.minDistance &&
      this.directionMode !== 'left' &&
      this.directionMode !== 'right'
    ) {
      if (!this.gameService.inverted) {
        this.right();
      } else {
        this.left();
      }
    }
  }

  up(): void {
    if (Date.now() - this.timeOfLastControlChange > this.minTimeGap) {
      this.timeOfLastControlChange = Date.now();
      this.gameService.controls.next('up');
    }
  }

  down(): void {
    if (Date.now() - this.timeOfLastControlChange > this.minTimeGap) {
      this.timeOfLastControlChange = Date.now();
      this.gameService.controls.next('down');
    }
  }

  left(): void {
    if (Date.now() - this.timeOfLastControlChange > this.minTimeGap) {
      this.timeOfLastControlChange = Date.now();
      this.gameService.controls.next('left');
    }
  }

  right(): void {
    if (Date.now() - this.timeOfLastControlChange > this.minTimeGap) {
      this.timeOfLastControlChange = Date.now();
      this.gameService.controls.next('right');
    }
  }
}
