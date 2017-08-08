import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    instructions: string = 'Login to dashboard';

    constructor( private http: Http,
                private router: Router) { };

    authenticate() {
        console.log('click');
    }
}
