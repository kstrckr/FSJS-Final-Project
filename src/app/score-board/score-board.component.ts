// score-board simply displays the current score as it's updated by the game-state-service

import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.css']
})

export class ScoreBoardComponent implements OnInit {
    matchesRemaining = 12;
    score: number = 5;
    player: string = this.gameStateService.playerInitials;
    subscription: Subscription;

    constructor(private gameStateService: GameStateService) {
    }

    getScore() {
        this.gameStateService.setScore(1);
    }

    ngOnInit(): void {

        this.gameStateService.currentScore$.subscribe(value => {
            this.score = value;
        });
       }
    }
