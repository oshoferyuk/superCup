import { Injectable, Inject } from '@angular/core';
import { FpDocument, FpWindow } from './wrappers';
import { JwtHelper } from 'angular2-jwt';

const cookieName = 'flip.jwt';

@Injectable()
export class CookieService {

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(@Inject(FpWindow) private window: FpWindow,
                @Inject(FpDocument) private document: FpDocument) {
    }

    checkCookie(): boolean {
        return !!this.getCookie(cookieName);
    }

    getUserDisplayName(): string {
        const cookie = this.getCookie(cookieName);
        if (!!cookie) {
            try {
                const decoded = this.jwtHelper.decodeToken(cookie);
                if (decoded.first_name && decoded.family_name) {
                    return `${decoded.first_name} ${decoded.family_name}`;
                }
            } catch (err) {
                return '';
            }
        }
        return '';
    }

    private getCookie(cname: string): string {
        const cookies = {};
        for (const cookie of this.document.cookie.split('; ')) {
            const [name, value] = cookie.split('=');

            cookies[name] = (this.window as any).decodeURIComponent(value);
        }
        return cookies[cname];
    }
}
