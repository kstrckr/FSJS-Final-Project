import { Component } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.css']
})

export class LeaderBoardComponent {
    title = `${this.gameStateService.playerInitials} achieved Match Mastery with a score of ${this.gameStateService.currentScore}`

    constructor(private gameStateService: GameStateService) {};

}
