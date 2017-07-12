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
                console.log(this.gameBoard);
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
        console.log(event.target.classList);
        this.matchCheckService.getTile(this.id, event.target.id)
            .then(tileValue => {
                console.log(tileValue)
                event.srcElement.innerHTML = tileValue;
            })
    }

    setNewScore(): void {
        console.log(this.pieces);
        this.matchCheckService.setScore(1);
    }

    ngOnInit(): void {
        this.getBoardId();
    }
}
