import { Component } from '@angular/core';
import { GameStateService } from './game-state.service';

@Component({
    selector: 'app-root',
    template: `
        <p>Welcome to {{title}}</p>
        <div class="initials-input" routerLinkActive="link-hidden">
           
                <label for="initials">Enter Initials</label>
                <input type="text" id="initials" required [(ngModel)]="initials">
                
                <button type="submit" 
                (click)="saveInitials()"
                routerLink='/match-master' 
                routerLinkActive="link-hidden" 
                class="bit-button">BEGIN!</button>
            
        </div>
        <router-outlet></router-outlet>`,
    styleUrls: ['./app.component.css'],
    
})

export class AppComponent {
    title = 'Match Master';
    initials: string;
    constructor(private gameStateService: GameStateService) {};

    saveInitials(){
       this.gameStateService.playerInitials = this.initials
       console.log(this.gameStateService.playerInitials);
    }
}
