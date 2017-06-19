import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoard } from './game-board.component';
import { ScoreBoard } from './score-board.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoard,
    ScoreBoard
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
