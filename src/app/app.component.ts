import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <p>Welcome to {{title}}</p>
        <a routerLink='/match-master'>Load new Game</a>
        <router-outlet></router-outlet>`,
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    title = 'Match Master';
}
