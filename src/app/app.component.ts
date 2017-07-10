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
  lastTwoMoves: string[] = [];

  ngOnInit(){
    this.currentScore = 0;
  }

  incrementScore(){
    this.currentScore++
  }

//PROBABLY REDUDANT, MOVE BACK TO GAME-BOARD.COMPOENT
  storeValue(event){
    this.lastTwoMoves.push(event)
    console.log(this.lastTwoMoves);
  }
}
