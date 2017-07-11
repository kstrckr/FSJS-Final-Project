import { Component, OnInit } from '@angular/core';
import { MatchCheckService } from './match-check.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.css'],
    providers: [
        MatchCheckService
    ]
})

export class ScoreBoard implements OnInit {
    matchesRemaining = 12;
    score: number = 666;
    subscription: Subscription;

    constructor(private matchCheckService: MatchCheckService) {
     
    }

    
    
    ngOnInit():void {
       this.subscription = this.matchCheckService.curentScore$.subscribe(res => {
           this.score = res
       })
    }
}