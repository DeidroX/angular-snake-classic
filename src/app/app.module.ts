import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';
import { FooterComponent } from './components/footer/footer.component';
import { ControlsDirective } from './core/directives/controls.directive';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameCanvasComponent,
    FooterComponent,
    ScoreComponent,
    ControlsDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
