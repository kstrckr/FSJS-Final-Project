import { Component, OnInit } from '@angular/core';
import { ScoreBoard } from './score-board.component';
import { GameBoardComponent } from './game-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  title = 'Match Master';
  currentScore: number;

  ngOnInit(){
    this.currentScore = 0;
  }

  incrementScore(){
    this.currentScore++
  }
}
