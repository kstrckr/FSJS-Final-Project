import { Component } from '@angular/core';

@Component({
    selector: 'score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.css']
})

export class ScoreBoard {
    score = 42;
    matchesRemaining = 12;
}