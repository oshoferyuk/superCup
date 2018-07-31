import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { Observable } from 'rxjs/Observable';
import { StorageService, storageParams } from '../services/storage.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(private router: Router,
                private cookieService: CookieService,
                private storageService: StorageService) {
    }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.cookieService.checkCookie()) {
            return true;
        }
        this.storageService.clearData(storageParams.searchParams);
        this.storageService.clearData(storageParams.selectedFilters);
        this.router.navigate(['login']);
        return false;
    }
}
