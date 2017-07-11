import { NgModule } from                    '@angular/core';
import { BrowserModule } from               '@angular/platform-browser';
import { HttpModule } from                  '@angular/http'
//import { HttpModule, JsonpModule } from     '@angular/http';

import { AppComponent } from                './app.component';
import { ScoreBoard } from                  './score-board.component';
import { GameBoardComponent } from          './game-board.component';
import { MatchCheckService } from './match-check.service'

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ScoreBoard
  ],
  imports: [
    BrowserModule,
    HttpModule
   // JsonpModule
  ],
  providers: [MatchCheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
