import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class LoggedGuard implements CanActivate {
    constructor(private router: Router,
                private cookieService: CookieService) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.cookieService.checkCookie()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
