import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../../core/services/cookie.service';

@Component({
    selector: 'fp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userImg: string = '';
    userDisplayName: string = '';

    constructor(private cookieService: CookieService) { }

    ngOnInit(): void {
        this.userDisplayName = this.cookieService.getUserDisplayName();
    }

}
