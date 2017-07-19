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
import { LeaderBoardComponent } from './leader-board.component';
import { LoadingScreenComponent } from './loading-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSpaceComponent,
    GameBoardComponent,
    ScoreBoardComponent,
    LeaderBoardComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: '/loading-screen', pathMatch: 'full'
      },
      {
        path: 'loading-screen',
        component: LoadingScreenComponent
      },
      {
        path: 'match-master',
        component: GameSpaceComponent
      },
      {
        path: 'leader-board',
        component: LeaderBoardComponent
      }
])
  ],
  providers: [GameStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
