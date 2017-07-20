import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GameStateService } from '../services/game-state.service';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.css']
})

export class LeaderBoardComponent implements OnInit {

    url: string = `http://localhost:3000/api/high-scores/${this.gameStateService.currentScore}`;
    title = `${this.gameStateService.playerInitials} achieved Match Mastery with a score of ${this.gameStateService.currentScore}`
    playerRank: object[];

    constructor(private http: Http,
                private gameStateService: GameStateService) { };

    getPlayerRank(): void {
        this.http.get(this.url)
            .toPromise()
            .then(res => {
                this.playerRank = res.json().sort((a, b) => a.score - b.score)
                console.log(this.playerRank);
            })
    }

    ngOnInit(): void {
        this.getPlayerRank();
    }

}
