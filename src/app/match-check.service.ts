import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class MatchCheckService implements OnInit {


    constructor( private http: Http) { 

    };

    currentScore: number = 0;
    currentScoreSource: BehaviorSubject<number> = new BehaviorSubject(this.currentScore);
    currentScore$ = this.currentScoreSource.asObservable();
    score: number = 0;
    lastTwoMoves: string[] = [];
    tileIndex: string;

//wip--

    getTile(id, a): Promise<string> {
        let url = "http://localhost:3000"
        let fullUrl = `${url}/api/checkmatch/${id}/${a}`
        console.log(id);
        return this.http.get(fullUrl)
            .toPromise()
            .then(res => {
                return res.json() as string;
                }
            )        
    }

    storeValue(event){
        this.lastTwoMoves.push(event)
        console.log(this.lastTwoMoves);
  }

    setScore(increment): void {
        this.currentScore += increment;
        this.currentScoreSource.next(this.currentScore);
        console.log(this.currentScore);
    }
    
  ngOnInit():void {
     
  }
}