// game-space is simply a container for the view which incorporates the Score Board and the Game Board simultaneously

import { Component } from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';
import { ScoreBoardComponent } from '../score-board/score-board.component';


@Component({
  selector: 'app-game-space',
  templateUrl: './game-space.component.html',
  styleUrls: ['./game-space.component.css'],
})

export class GameSpaceComponent {
  title = 'Match Master';
}
