import { Component, OnInit} from '@angular/core';
import { AfterViewInit, QueryList, ViewChildren, ElementRef} from '@angular/core';
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

export class GameBoardComponent implements OnInit, AfterViewInit {

     @ViewChildren('gamePiece') gamePieces: QueryList<ElementRef>

    gameBoard: GameBoard;
    id: string;
    pieces: PieceStatus[] = [];
    piecesInDom: ElementRef[];
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
            console.log(this.pieces);
    }

    getTileValue(event: any): void {
        let clickedPiece = this.pieces[event.target.id];
        if (clickedPiece.status === 'selected' || clickedPiece.status === 'matched') {
            return null;
        } else {
            this.pieces[clickedPiece.pieceId].status = 'selected';
            this.matchCheckService.getTileContents(this.id, event.target.id)
                .then(tileValue => {
                    clickedPiece.value = tileValue;
                    event.srcElement.innerHTML = tileValue;
                })
            this.setNewScore();

            let matchState = this.matchCheckService.matchCheck(this.pieces);
            if (matchState.match === true) {
                this.pieces.forEach((piece) => {
                    if (piece.status === 'selected') {
                        piece.status = 'matched';
                    }
                });
            } else if (matchState.pair === true && matchState.match === false) {
                 this.pieces.forEach((piece) => {
                    if (piece.status === 'selected') {
                        piece.status = 'unselected';
                        this.piecesInDom[piece.pieceId].nativeElement.innerHTML = ' ';
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

    ngAfterViewInit() {
         this.gamePieces.changes.subscribe(
             (r) => {
                this.piecesInDom = this.gamePieces.toArray();
                // this.piecesInDom[0].nativeElement.innerHTML = '!'
                });
        }
}
