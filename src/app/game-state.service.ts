import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/toPromise';

import { PieceState } from './piece-list';

@Injectable()

export class GameStateService implements OnInit {

    currentScore: number = 0;
    currentScoreSource: BehaviorSubject<number> = new BehaviorSubject(this.currentScore);
    currentScore$ = this.currentScoreSource.asObservable();
    selectedPieces: PieceState[] = [];
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
            return true;
            }
        } else {
            return false;
        }
    }

    resetNonMatches(piecesInDom) {
        const selectedPieceA = this.selectedPieces[0];
        const selectedPieceB = this.selectedPieces[1];

        selectedPieceA.selected = false;
        selectedPieceA.value = '';
        selectedPieceB.selected = false;
        selectedPieceB.value = '';

        piecesInDom[selectedPieceA.pieceId].nativeElement.innerHTML = '<p></p>'
        piecesInDom[selectedPieceB.pieceId].nativeElement.innerHTML = '<p></p>'

        console.log(this.boardState);
    }

    ngOnInit(): void {
    }

}
