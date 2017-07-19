import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';

@Component({
    selector: 'app-loading-screen',
    template: `
        <p>{{title}}</p>
        <div class="initials-input">

                <label for="initials">Enter Initials</label>

                <input type="text"
                id="initials"
                required
                [(ngModel)]="initials"
                (keypress)="saveInitialsEnter($event.keyCode)">

                <button type="submit"
                (click)="saveInitials()"
                class="bit-button">BEGIN!</button>

        </div>`,
        styleUrls: ['./loading-screen.component.css']
})

export class LoadingScreenComponent {
    initials: string;
    constructor(
        private gameStateService: GameStateService,
        private router: Router) {};

    saveInitials() {
       this.gameStateService.playerInitials = this.initials
       console.log(this.gameStateService.playerInitials);
       this.navigateToGameSpace();
    }

    saveInitialsEnter(keyCode) {
        if (keyCode === 13) {
            this.gameStateService.playerInitials = this.initials
            console.log(this.gameStateService.playerInitials);
            this.navigateToGameSpace();
        }
    }

    navigateToGameSpace() {
        if (this.gameStateService.playerInitials !== undefined && this.gameStateService.playerInitials.length > 0) {
            this.router.navigateByUrl('/match-master');
        }
    }

}
