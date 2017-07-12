import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/toPromise';

@Injectable()

export class MatchCheckService implements OnInit {

    currentScore: number = 0;
    currentScoreSource: BehaviorSubject<number> = new BehaviorSubject(this.currentScore);
    currentScore$ = this.currentScoreSource.asObservable();
    score: number = 0;
    lastTwoMoves: string[] = [];
    tileIndex: string;

    constructor( private http: Http) {};

    getTile(id, a): Promise<string> {
        let url = "http://localhost:3000"
        let fullUrl = `${url}/api/checkmatch/${id}/${a}`
        console.log(id);
        return this.http.get(fullUrl)
            .toPromise()
            .then(res => {
                console.log(res);
                return res.json() as string;
                }
            )
    }

    storeValue(event) {
        this.lastTwoMoves.push(event)
        console.log(this.lastTwoMoves);
    }

    setScore(increment): void {
        this.currentScore += increment;
        this.currentScoreSource.next(this.currentScore);
        console.log(this.currentScore);
    }

    ngOnInit(): void {
    }

}
