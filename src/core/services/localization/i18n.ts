import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en } from './en';

@Injectable()
export class I18n {
    constructor(private translate: TranslateService) {
    }

    setup(): void {
        this.translate.setTranslation('en', en);
        this.translate.setDefaultLang('en');
    }
}
