import { Component, OnInit } from '@angular/core';
//import { GamePiece} from './game-piece';
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

    numOfPieces: number;
    boardId: string;
    pieces: number[] = [];

    constructor (private gameBoardBuildService: GameBoardBuildService) {}

    getBoardId(): void {
        this.gameBoardBuildService.getPieces()
                .then(boardId => {
                this.boardId = boardId;
                this.numOfPieces = this.gameBoardBuildService.numOfPieces;
                console.log(this.boardId);
                return (this.numOfPieces)
            })
            .then(pieces => {
                for (let i = 0; i < pieces; i++){
                    this.pieces.push(i);
                }
            });
    }

    ngOnInit(): void {
        this.getBoardId();
    }

}