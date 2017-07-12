import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
// import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ScoreBoardComponent } from './score-board.component';
import { GameBoardComponent } from './game-board.component';
import { MatchCheckService } from './match-check.service'

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ScoreBoardComponent
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
