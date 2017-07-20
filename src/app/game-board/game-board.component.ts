// this component handles the view for the main game space, the board full of tiles

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

/*
 buildBoard() uses the server's API to generate a board's values, then receives
 the ID of the new board and its size. Uses the size to build the proper
 number of tiles
*/

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
1: the clicked piece is checked to make sure it's not already matched or selected
2: the board is checked to see if 2 tiles are already face up and selected
3: if 2 pieces are face up and not matched they're reset to empty
4: the value of the clicked tile is fetched from the server and returned as a Promise and the score is incremented by 1
5: the clicked tile is updated in gameState metadata as selected along with its assigned value
6: if this tile is the second selected and face up matchCheck() is run to compare values
7: winCheck() is called to see if the game has been won
8: if winCheck() returns false the cycle continues with the next click on a new tile
9: if winCheck() returns true the view is updated to the leader-board (./leader-board/leader-board.component.ts)
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
                    event.target.innerHTML = tileValue;
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
