import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../core/transfer-module/http.service';
import { mainRouting } from '../../main/main-routing.constants';

export class LoginData {
    username: string;
    password: string;
}

@Component({
    selector: 'fp-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    public federationLoginUrl: string;

    loginTrigger: boolean = false;
    loginData: LoginData = new LoginData();

    constructor(private http: HttpService, private router: Router) {
    }

    ngOnInit(): void {
        this.federationLoginUrl = '/login';
    }

    isLogin(): void {
        this.loginTrigger = !this.loginTrigger;
    }

    login(): void {
        this.http.post(this.federationLoginUrl, this.loginData)
                .subscribe(() => this.router.navigate([mainRouting.campaign]));
    }

}
