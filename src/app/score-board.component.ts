import { Component, OnInit } from '@angular/core';
import { MatchCheckService } from './match-check.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.css']
})

export class ScoreBoardComponent implements OnInit {
    matchesRemaining = 12;
    score: number = 5;
    subscription: Subscription;

    constructor(private matchCheckService: MatchCheckService) {
    }

    getScore() {
        this.matchCheckService.setScore(1);
    }

    ngOnInit(): void {

        this.matchCheckService.currentScore$.subscribe(value => {
            this.score = value;
        });
       }
    }
