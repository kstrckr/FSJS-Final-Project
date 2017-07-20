import { Component, OnInit} from '@angular/core';
import { AfterViewInit, QueryList, ViewChildren, ElementRef} from '@angular/core';
import { GameBoard } from '../models/game-board';
import { PieceState } from '../models/piece-list';
import { GameBoardBuildService } from '../services/game-board-buid.service';
import { GameStateService } from '../services/game-state.service';
import { Router } from '@angular/router';

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

    constructor (
        private gameBoardBuildService: GameBoardBuildService,
        private gameStateService: GameStateService,
        private router: Router) {}

// uses the server's API to generate a board's values, then receives 
// the ID of the new board and it's size. Uses the size to build the proper
// number of tiles

    buildBoard(): void {
        this.gameBoardBuildService.getPieces()
                .then(gameBoard => {
                    this.gameBoard = gameBoard;
                    this.id = gameBoard.id;
                    this.gameStateService.boardId = this.id;
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


/*
The core cycle of the game, each click advances the game state by 1 full cycle
1: the clicked piece's ID value is stored
2: the cycle is ended without change if the clicked piece is already Matched or Selected
3: if the piece is neitehr Selected or Matched the number of Selected tiles already on the board is checked
4: if there are 0 or 1 Selected tiles already on the board the value of the tile is fetched from the server and displayed
5: if there are 2 previously selected pieces on the board the next click checks their values for a match 
    and if they aren't a match the board is reset before the new piece is displayed
6: game-state.service's 'boardState' is an array of piece objects which each tracks it's HTML counterpart's status
    it is updated each cycle when matchCheck() is called.
*/
    updateGameState(event: any): void {
        const clickedPieceId: string = event.target.id;
        const clickedPieceMatched: boolean = this.gameStateService.isMatched(clickedPieceId);
        const clickedPieceSelected: boolean = this.gameStateService.isSelected(clickedPieceId);

        if (!clickedPieceSelected && !clickedPieceMatched) {

            if (this.gameStateService.selectedPieces.length === 2) {
                this.gameStateService.resetNonMatches(this.piecesInDom);
            }

            this.gameStateService.getTileContents(this.id, clickedPieceId)
                .then(tileValue => {
                    this.gameStateService.updateSelectedPieces(this.gameStateService.boardState);
                    event.srcElement.innerHTML = tileValue;
                    this.setNewScore();
                    if (this.gameStateService.selectedPieces.length < 2) {
                        return
                    } else if (this.gameStateService.selectedPieces.length === 2) {
                        const isMatched = this.gameStateService.matchCheck()
                        if (!isMatched) {
                            this.gameStateService.updateSelectedPieces(this.gameStateService.boardState);
                        }
                        const hasWon = this.gameStateService.winCheck();
                        if (hasWon) {
                            this.router.navigateByUrl('/leader-board');
                        }
                    }
                });
            }
        }

// updates the score on each click, lower scores are better
    setNewScore(): void {
        this.gameStateService.setScore(1);
    }

// builds the board when the app first starts
    ngOnInit(): void {
        this.buildBoard();
    }


// returns a queryList of all gamePieces' HTML counterparts so that the inner values can be set and cleared each game cycle
    ngAfterViewInit() {
         this.gamePieces.changes.subscribe(
             (r) => {
                this.piecesInDom = this.gamePieces.toArray();
                });
        }
}
