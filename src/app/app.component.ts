import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <h1>Welcome to {{title}}</h1>
        <a routerLink="/match-master">Load new Game!</a>
        <router-outlet></router-outlet>
    `
})

export class AppComponent {
    title = 'Match Master';
}