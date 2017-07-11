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
    score: number = 5;
    subscription: Subscription;

    constructor(private matchCheckService: MatchCheckService) { 
        
    }

    getScore() {
        
    }
    
    ngOnInit():void {
      this.matchCheckService.currentScore.subscribe(score => {
          this.score = score;
          console.log("subscribed")
        })
       }
    }
