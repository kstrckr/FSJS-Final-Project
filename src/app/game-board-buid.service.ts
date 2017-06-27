import { Injectable } from  '@angular/core';

import{ GamePiece } from    './game-piece';
import { PIECES } from      './mock-pieces';


@Injectable()

export class GameBoardBuildService {

    getPieces(): Promise<GamePiece[]> {
        return Promise.resolve(PIECES);
    }

    getPiecesSlowly(): Promise<GamePiece[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getPieces()), 2000)
        });
    }
}