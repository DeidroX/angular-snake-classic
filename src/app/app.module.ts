import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonDirective } from './core/directives/button.directive';
import { HeaderComponent } from './components/header/header.component';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameCanvasComponent,
    ButtonDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
