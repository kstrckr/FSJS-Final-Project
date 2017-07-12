import { Component, OnInit} from '@angular/core';
import { GameBoard } from './game-board';
import { PieceStatus } from './piece-list';
import { GameBoardBuildService } from './game-board-buid.service';
import { MatchCheckService } from './match-check.service';



@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css'],
    providers: [
        GameBoardBuildService
        ]
})

export class GameBoardComponent implements OnInit {


    gameBoard: GameBoard;
    id: string;
    pieces: PieceStatus[] = [];
    selected: string[];

    constructor (private gameBoardBuildService: GameBoardBuildService,
    private matchCheckService: MatchCheckService) {}

    getBoardId(): void {
        this.gameBoardBuildService.getPieces()
                .then(gameBoard => {
                    this.gameBoard = gameBoard;
                    this.id = gameBoard.id;
            //  console.log(this.gameBoard);
            })
            .then(pieces => {
                for (let i = 0; i < this.gameBoard.length; i++) {
                    let pieceStatus = new PieceStatus;
                    pieceStatus.pieceId = i;
                    pieceStatus.status = 'unselected';
                    pieceStatus.value = '';
                    this.pieces.push(pieceStatus);
                }
            });
    }

    getTileValue(event: any): void {
        let clickedPiece = this.pieces[event.target.id];
        if (clickedPiece.status === 'selected' || clickedPiece.status === 'matched') {
            return null;
        } else {
            this.pieces[clickedPiece.pieceId].status = 'selected';
            // console.log(this.pieces[event.target.id]);
            this.matchCheckService.getTileContents(this.id, event.target.id)
                .then(tileValue => {
                    clickedPiece.value = tileValue;
                    event.srcElement.innerHTML = tileValue;
                })
            this.setNewScore();
            let matchState = this.matchCheckService.matchCheck(this.pieces);
            console.log(matchState);
            if (matchState.match === true) {
                console.log("Match!")
                this.pieces.forEach((piece) => {
                    if (piece.status === 'selected') {
                        piece.status = 'matched';
                    }
                });
            } else if (matchState.pair === true && matchState.match === false) {
                console.log("miss");
                 this.pieces.forEach((piece) => {
                    if (piece.status === 'selected') {
                        piece.status = 'unselected';
                    }
                });
            } else {
                return;
            }
        }
    }

    setNewScore(): void {
        this.matchCheckService.setScore(1);
    }

    ngOnInit(): void {
        this.getBoardId();
    }
}
