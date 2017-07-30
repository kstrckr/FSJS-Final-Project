// leader-boad appears after a game has been won. It lists the final score, whether you made top 10 or not, and lists the top 10 high scores

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GameStateService } from '../services/game-state.service';
import { LeaderBoardEntry } from '../models/leader-board';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.css']
})

export class LeaderBoardComponent implements OnInit {

    url: string = `/api/high-scores`;
    score = this.gameStateService.currentScore;
    player = this.gameStateService.playerInitials;
    leaderBoard: LeaderBoardEntry[];
    congratulations: string;
    

    constructor(private http: Http,
                private gameStateService: GameStateService) { };

/*
        getTopTen() is called OnInit and gets the top 10 score saved to the database,
        prepares them for display, and renders them as a column of <li> elements
*/

    getTopTen(): void {
        this.http.get(this.url)
            .toPromise()
            .then(res => {
                let isTopTen: boolean = false;
                this.leaderBoard = res.json()
                this.leaderBoard.forEach((element, i) => element.rank = i + 1)
                const lastScore = this.leaderBoard.length - 1;
                if (this.score <= this.leaderBoard[lastScore].score) {
                    isTopTen = true;
                }

                if (isTopTen) {
                    this.congratulations = `${this.player} achieves Match Mastery with score: ${this.score}`
                }   else {
                    this.congratulations = `Sorry ${this.player}, Match Mastery remains elusive`;
                }

                console.log(this.leaderBoard);
            })
    }

    ngOnInit(): void {
        this.getTopTen();
    }

}
