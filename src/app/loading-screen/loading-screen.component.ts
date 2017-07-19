import { Component } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

@Component({
    selector: 'app-loading-screen',
    template: `
        <p>{{title}}</p>
        <div class="initials-input">

                <label for="initials">Enter Initials</label>
                <input type="text" id="initials" required [(ngModel)]="initials">

                <button type="submit"
                (click)="saveInitials()"
                routerLink='/match-master'
                class="bit-button">BEGIN!</button>

        </div>`,
        styleUrls: ['./loading-screen.component.css']
})

export class LoadingScreenComponent {
    initials: string;
    constructor(private gameStateService: GameStateService) {};

    saveInitials() {
       this.gameStateService.playerInitials = this.initials
       console.log(this.gameStateService.playerInitials);
    }
}
