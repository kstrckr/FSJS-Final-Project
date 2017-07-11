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
        this.matchCheckService.setScore(1);
    }
    
    ngOnInit():void {
        
        this.matchCheckService.getScore().subscribe(value => {
            this.score = value;
        })
        
        
        
       }
    }
