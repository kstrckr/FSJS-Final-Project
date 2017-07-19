import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameSpaceComponent } from './game-space.component';
import { ScoreBoardComponent } from './score-board.component';
import { GameBoardComponent } from './game-board.component';
import { GameStateService } from './game-state.service'


@NgModule({
  declarations: [
    AppComponent,
    GameSpaceComponent,
    GameBoardComponent,
    ScoreBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
  {
    path: 'match-master',
    component: GameSpaceComponent
  }
])
  ],
  providers: [GameStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
