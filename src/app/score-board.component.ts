import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.css']
})

export class ScoreBoard implements OnInit {
    matchesRemaining = 12;

    @Input() score: number;

    constructor() {}

    ngOnInit() {

    }

}