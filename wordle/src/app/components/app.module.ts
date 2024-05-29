import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { WordleApiAdapter } from '../infrastructure/adapters/wordle-api/wordle-api.adapter';
import { ErrorNotificationService } from '../domain/services/error-notification/error-notification.service';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GameOverlayComponent } from './game-overlay/game-overlay.component';
import { GameService } from '../domain/services/game/game.service';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    GameOverlayComponent,
    ErrorNotificationComponent,
    GameboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule 
  ],
  providers: [
    ErrorNotificationService,
    WordleApiAdapter,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }