import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { API_URL } from './adapters/game/game.sevice';
import { HttpGameMockCLient } from './adapters/http-game-mock-client/http-game-mock-client.service';
import { RAE_URL } from './adapters/rae/rae.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './ui/components/component.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    ComponentModule
  ],
  providers: [
    // Cambiamos el proveedr de httpClient con la clase que mockea el backe
    {
      provide: HttpClient,
      useClass: HttpGameMockCLient
    },
    {
      provide: RAE_URL,
      useValue: environment.api
    },
    {
      provide: API_URL,
      useValue: environment.api
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
