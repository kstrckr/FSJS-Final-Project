import { Component, OnInit} from '@angular/core';
import { AfterViewInit, QueryList, ViewChildren, ElementRef} from '@angular/core';
import { GameBoard } from './game-board';
import { PieceState } from './piece-list';
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

    buildBoard(): void {
        this.gameBoardBuildService.getPieces()
                .then(gameBoard => {
                    this.gameBoard = gameBoard;
                    this.id = gameBoard.id;
            //  console.log(this.gameBoard);
            })
            .then(pieces => {
                for (let i = 0; i < this.gameBoard.length; i++) {
                    const pieceState = new PieceState;
                    pieceState.pieceId = i;
                    pieceState.selected = false;
                    pieceState.matched = false;
                    pieceState.value = '';
                    pieceState.matched = false;
                    this.gameStateService.boardState.push(pieceState);
                    this.pieces.push(i);
                }
            });
    }

    updateGameState(event: any): void {
        const clickedPieceId = event.target.id;
        const clickedPieceMatched = this.gameStateService.isMatched(clickedPieceId);
        const clickedPieceSelected = this.gameStateService.isSelected(clickedPieceId);

        if (!clickedPieceSelected && !clickedPieceMatched) {

            if (this.gameStateService.selectedPieces.length === 2) {
                const matchCheck = this.gameStateService.matchCheck();
                if (!matchCheck) {
                    this.gameStateService.resetNonMatches(this.piecesInDom)
                }
            }

            this.gameStateService.getTileContents(this.id, clickedPieceId)
                .then(tileValue => {
                    this.gameStateService.updateSelectedPieces(this.gameStateService.boardState);
                    event.srcElement.innerHTML = tileValue;
                    this.setNewScore();
                });
            }
        }

    setNewScore(): void {
        this.gameStateService.setScore(1);
    }

    ngOnInit(): void {
        this.buildBoard();
    }

    ngAfterViewInit() {
         this.gamePieces.changes.subscribe(
             (r) => {
                this.piecesInDom = this.gamePieces.toArray();
                // this.piecesInDom[0].nativeElement.innerHTML = '!'
                });
        }
}
