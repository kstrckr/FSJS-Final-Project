import { Component, OnInit } from '@angular/core';
import { GamePiece} from './game-piece';
import { GameBoardBuildService } from './game-board-buid.service';

@Component({
    selector: 'game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css'],
    providers: [GameBoardBuildService]
})

export class GameBoardComponent implements OnInit {

    pieces: GamePiece[];

    constructor (private gameBoardBuildService: GameBoardBuildService) {}

    buildBoard(): void {
        this.gameBoardBuildService.getPiecesSlowly().then(pieces => this.pieces = pieces);
    }

    ngOnInit(): void {
        this.buildBoard();
    }

}