import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject, Observable } from 'rxjs';





@Injectable()

export class MatchCheckService implements OnInit {
    currentScore: BehaviorSubject<number> = new BehaviorSubject(0);
    curentScore$ = this.currentScore.asObservable();
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

    matchCheck(){
        
    }

    initialScore(): void {         
         //console.log(this.currentScore);
    }

    incrementScore(){
        this.currentScore.next(this.currentScore.value + 1);
    }

    returnScore(): Observable<any> {
        return this.currentScore.asObservable();
    }

      storeValue(event){
        this.lastTwoMoves.push(event)
        console.log(this.lastTwoMoves);
  }

  ngOnInit():void {
     
  }
}