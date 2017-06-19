import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})

export class GameBoard implements OnInit {
    ngOnInit(): void {
        console.log("GameBoard included");
    }
}