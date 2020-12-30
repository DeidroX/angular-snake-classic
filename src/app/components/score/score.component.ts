import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-score',
  template: '<h4>Score: {{ gameService.score$ | async }}</h4>',
  styles: ['h4 { margin: 0 }'],
})
export class ScoreComponent implements OnInit {
  constructor(public gameService: GameService) {}

  ngOnInit(): void {}
}
