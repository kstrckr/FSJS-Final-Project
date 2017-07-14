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
    score: number = 0;
    tileIndex: string;

    constructor( private http: Http) {};

// called from game-board.components (click)="getTileValue()"
    getTileContents(id, a): Promise<string> {
        let url = 'http://localhost:3000';
        let fullUrl = `${url}/api/checkmatch/${id}/${a}`;
        return this.http.get(fullUrl)
            .toPromise()
            .then(res => {
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
