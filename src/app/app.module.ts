import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';
import { FooterComponent } from './components/footer/footer.component';
import { ControlsDirective } from './core/directives/controls.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameCanvasComponent,
    FooterComponent,
    ControlsDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    // Check if on non desktop device
    if (window.screen.width < 900) {
      window.screen.orientation.lock('landscape');
    }
  }
}
