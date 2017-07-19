import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/toPromise';

import { PieceState } from './piece-list';

@Injectable()

export class GameStateService implements OnInit {

    playerInitials: string;

    currentScore: number = 0;
    currentScoreSource: BehaviorSubject<number> = new BehaviorSubject(this.currentScore);
    currentScore$ = this.currentScoreSource.asObservable();
// selectedPieces only reflects the currently selected pieces and has a max length of 2
    selectedPieces: PieceState[] = [];
// boardState represents all pieces on the board at each stage of the game cycle
    boardState: PieceState[] = [];

    constructor( private http: Http) {};

// called from game-board.components (click)="getTileValue()"
    getTileContents(boardId, tileIndex): Promise<string> {
        const url = 'http://localhost:3000';
        const fullUrl = `${url}/api/checkmatch/${boardId}/${tileIndex}`;
        return this.http.get(fullUrl)
            .toPromise()
            .then(res => {
                this.boardState[tileIndex].value = res.json();
                this.boardState[tileIndex].selected = true;
                return res.json() as string;
                }
            );
    }

    isSelected(tileIndex): boolean {
        return this.boardState[tileIndex].selected
    }

    isMatched(tileIndex): boolean {
        return this.boardState[tileIndex].matched;
    }

    setScore(increment): void {
        this.currentScore += increment;
        this.currentScoreSource.next(this.currentScore);
    }

    updateSelectedPieces(boardState) {
       this.selectedPieces = boardState.filter((piece) => {
            return piece.selected === true;
        })
    }

    matchCheck() {
        const selectedPieceA = this.selectedPieces[0];
        const selectedPieceB = this.selectedPieces[1];
        if (selectedPieceA.value !== '' && selectedPieceB.value !== '') {
            if (selectedPieceA.value === selectedPieceB.value) {
            selectedPieceA.matched = true;
            selectedPieceA.selected = false;
            selectedPieceB.matched = true;
            selectedPieceB.selected = false;
            // console.log(this.boardState);
            return true;
            }
        } else {
            return false;
        }
    }

    winCheck() {
        const matchTiles = this.boardState.filter((piece) => piece.matched === true)
        if (matchTiles.length === this.boardState.length) {
            console.log(`${this.playerInitials} is a Match Master! with a score of ${this.currentScore}`);
        }
    }

    resetNonMatches(piecesInDom) {
        const selectedPieceA = this.selectedPieces[0];
        const selectedPieceB = this.selectedPieces[1];

        selectedPieceA.selected = false;
        selectedPieceB.selected = false;

        selectedPieceA.value = '';
        selectedPieceB.value = '';

        if (selectedPieceA.matched === false && selectedPieceB .matched === false) {
        piecesInDom[selectedPieceA.pieceId].nativeElement.innerHTML = '<p></p>'
        piecesInDom[selectedPieceB.pieceId].nativeElement.innerHTML = '<p></p>'
        }

        //console.log(this.boardState);
    }

    ngOnInit(): void {
    }

}
