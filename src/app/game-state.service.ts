import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/toPromise';

import { PieceStatus } from './piece-list';

@Injectable()

export class GameStateService implements OnInit {

    currentScore: number = 0;
    currentScoreSource: BehaviorSubject<number> = new BehaviorSubject(this.currentScore);
    currentScore$ = this.currentScoreSource.asObservable();

    boardStatus: PieceStatus[] = [];

    constructor( private http: Http) {};

// called from game-board.components (click)="getTileValue()"
    getTileContents(boardId, tileIndex): Promise<string> {
        const url = 'http://localhost:3000';
        const fullUrl = `${url}/api/checkmatch/${boardId}/${tileIndex}`;
        return this.http.get(fullUrl)
            .toPromise()
            .then(res => {
                this.boardStatus[tileIndex].value = res.json();
                return res.json() as string;
                }
            );
    }

    setScore(increment): void {
        this.currentScore += increment;
        this.currentScoreSource.next(this.currentScore);
    }

    matchCheck(pieces) {
    }

    ngOnInit(): void {
    }

}
