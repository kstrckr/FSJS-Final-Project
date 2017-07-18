import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board.component';
import { ScoreBoardComponent } from './score-board.component';


@Component({
  selector: 'app-game-space',
  templateUrl: './game-space.component.html',
  styleUrls: ['./game-space.component.css'],
})

export class GameSpaceComponent {
  title = 'Match Master';
}
