import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';





@Injectable()

export class MatchCheckService implements OnInit {

    currentScore: BehaviorSubject<number> = new BehaviorSubject(0);
    score: number = 0;
    lastTwoMoves: string[] = [];
    tileIndex: string;

    constructor( private http: Http) { };

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
        this.currentScore.next(this.currentScore.getValue() + increment)
        console.log(this.currentScore.getValue());
    }


  ngOnInit():void {
     
  }
}