import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board.component';
import { ScoreBoardComponent } from './score-board.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent{
  title = 'Match Master';
}
