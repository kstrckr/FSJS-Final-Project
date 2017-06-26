import { Component, OnInit } from '@angular/core';

export class GamePiece {
    id: number;
    unicode: string;
}

const PIECES: GamePiece[] = [
    { id: 1, unicode: '&#xf26e' },
    { id: 2, unicode: '&#xf2b9' },
    { id: 3, unicode: '&#xf2bc' },
    { id: 4, unicode: '&#xf0f9' },
    { id: 5, unicode: '&#xf106' },
    { id: 6, unicode: '&#xf179' },
    { id: 7, unicode: '&#xf190' },
    { id: 8, unicode: '&#xf080' },
    { id: 9, unicode: '&#xf240' },
    { id: 10, unicode: '&#xf244' },
    { id: 11, unicode: '&#xf133' },
    { id: 12, unicode: '&#xf191' },
];

@Component({
    selector: 'game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})

export class GameBoard implements OnInit {
    pieces = PIECES;
    ngOnInit(): void {
        console.log("GameBoard included");
        console.log(this.pieces);
    }
}