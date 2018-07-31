import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { mainRouting } from '../../main/main-routing.constants';


@Component({
    selector: 'fp-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
    errorCode: number;
    errorMessage: string;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translate: TranslateService) { }

    ngOnInit(): void {

        this.errorCode = +this.activatedRoute.snapshot.params['status'];
        switch (this.errorCode) {
            case 500:
                this.errorMessage =  this.translate.instant('errorForm.serverDown');
                break;
            case 401:
                this.errorMessage =  this.translate.instant('errorForm.unAuthorized');
                break;
            default:
                this.errorMessage =  this.translate.instant('errorForm.defaultMessage');
                break;
        }
    }

    goToLogin(): void {
        this.router.navigate([mainRouting.login]);
    }
}


