import { Component } from '@angular/core';
import { GameStateService } from './game-state.service';
import { LoadingScreenComponent } from './loading-screen.component';

@Component({
    selector: 'app-root',
    template: `
        <h1>{{title}}</h1>
        <router-outlet></router-outlet>`,
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    title = 'Match Master';
}
