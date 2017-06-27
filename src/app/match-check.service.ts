import { Injectable } from '@angular/core';

import{ GamePiece } from './game-piece';
import { PIECES } from './mock-pieces';


@Injectable()

export class MatchCheckService {
    //checkMatch(): void {}

    getPieces(): Promise<GamePiece[]> {
        return Promise.resolve(PIECES);
    }
}