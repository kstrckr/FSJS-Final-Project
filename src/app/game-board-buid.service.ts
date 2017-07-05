import { Injectable } from  '@angular/core';
import { Http } from '@angular/http'
import { GamePiece } from    './game-piece';
import 'rxjs/add/operator/toPromise';
//import { PIECES } from      './mock-pieces';


@Injectable()

export class GameBoardBuildService {


    constructor( private http: Http) { };

    getPieces(): any {
        let url = "http://localhost:3000/api/method";

        return this.http.get(url)
            .toPromise()
            .then(res => res.json().gameTiles as GamePiece[]);
    }

/*
    getPiecesSlowly(): Promise<GamePiece[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getPieces()), 2000)
        });
    }
    */
}