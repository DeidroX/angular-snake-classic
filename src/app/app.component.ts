import { Component, OnInit } from '@angular/core';
import { GameService } from './core/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  hasStarted = false;
  constructor(public gameService: GameService) {}

  ngOnInit(): void {}
}
