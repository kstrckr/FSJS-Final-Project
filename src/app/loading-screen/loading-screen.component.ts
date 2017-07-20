import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';

@Component({
    selector: 'app-loading-screen',
    templateUrl: './loading-screen.component.html',
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
