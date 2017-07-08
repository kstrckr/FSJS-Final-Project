import { Injectable } from  '@angular/core';
import { Http } from '@angular/http'
import { GameBoard } from    './game-board';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class GameBoardBuildService {

    url: string = "http://localhost:3000/api/method"
    numOfPieces: number;
    gameBoard: GameBoard;

    constructor( private http: Http) { };

    getPieces(): Promise<GameBoard> {

        return this.http.get(this.url)
            .toPromise()
            .then(res => {
                this.gameBoard = res.json() as GameBoard;
                return this.gameBoard;
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