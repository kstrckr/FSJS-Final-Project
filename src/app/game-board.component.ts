import { Component, OnInit} from '@angular/core';
import { AfterViewInit, QueryList, ViewChildren, ElementRef} from '@angular/core';
import { GameBoard } from './game-board';
import { PieceStatus } from './piece-list';
import { GameBoardBuildService } from './game-board-buid.service';
import { GameStateService } from './game-state.service';

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
    pieces: number[] = [];
    piecesInDom: ElementRef[];
    selected: string[];

    constructor (private gameBoardBuildService: GameBoardBuildService,
    private gameStateService: GameStateService) {}

    getBoardId(): void {
        this.gameBoardBuildService.getPieces()
                .then(gameBoard => {
                    this.gameBoard = gameBoard;
                    this.id = gameBoard.id;
            //  console.log(this.gameBoard);
            })
            .then(pieces => {
                for (let i = 0; i < this.gameBoard.length; i++) {
                    const pieceStatus = new PieceStatus;
                    pieceStatus.pieceId = i;
                    pieceStatus.selected = false;
                    pieceStatus.matched = false;
                    pieceStatus.value = '';
                    pieceStatus.matched = false;
                    this.gameStateService.boardStatus.push(pieceStatus);
                    this.pieces.push(i);
                }
            });
            console.log(this.gameStateService.boardStatus)
    }

    getTileValue(event: any): void {
        const clickedPieceId = event.target.id;

        if (!this.gameStateService.isSelected(clickedPieceId) && !this.gameStateService.isMatched(clickedPieceId)) {
            this.gameStateService.getTileContents(this.id, clickedPieceId)
                .then(tileValue => {
                    event.srcElement.innerHTML = tileValue;
                    this.setNewScore();
                });
            }
        }

    setNewScore(): void {
        this.gameStateService.setScore(1);
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
