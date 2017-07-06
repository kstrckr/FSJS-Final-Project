import { Injectable } from  '@angular/core';
import { Http } from '@angular/http'
import { GamePiece } from    './game-piece';
import 'rxjs/add/operator/toPromise';
//import { PIECES } from      './mock-pieces';


@Injectable()

export class GameBoardBuildService {

    url: string = "http://localhost:3000/api/method"
    numOfPieces: number;

    constructor( private http: Http) { };

    getPieces(): Promise<string> {

        return this.http.get(this.url)
            .toPromise()
            .then(res => {
                let boardId = res.json()._id;
                this.numOfPieces = res.json().gameTiles.length;
                return boardId as string;
            })
    }
        

/*
    getPiecesSlowly(): Promise<GamePiece[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getPieces()), 2000)
        });
    }
*/
}