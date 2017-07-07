import { Component, OnInit } from '@angular/core';
import { GameBoard } from './game-board';
import { GameBoardBuildService } from './game-board-buid.service';
import { MatchCheckService } from './match-check.service';

@Component({
    selector: 'game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css'],
    providers: [
        GameBoardBuildService,
        MatchCheckService
        ]
})

export class GameBoardComponent implements OnInit {

    gameBoard: GameBoard;
    id: string;
    pieces: number[] = [];

    constructor (private gameBoardBuildService: GameBoardBuildService) {}

    getBoardId(): void {
        this.gameBoardBuildService.getPieces()
                .then(gameBoard => {
                    this.gameBoard = gameBoard;
                    this.id = gameBoard.id;
                console.log(this.gameBoard);
                
            })
            
            .then(pieces => {
                for (let i = 0; i < this.gameBoard.length; i++){
                    this.pieces.push(i);
                }
            });
    }

    ngOnInit(): void {
        this.getBoardId();
    }

}