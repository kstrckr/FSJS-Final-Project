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

    ngOnInit(): void {
    }

}
