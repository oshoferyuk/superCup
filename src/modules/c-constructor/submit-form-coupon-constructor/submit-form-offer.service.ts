import { Injectable, ViewContainerRef } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/never';
import { Observable } from 'rxjs/Observable';
import { DialogOptions } from '../../../core/dialog/dialog-options.model';
import { DialogService } from '../../../core/dialog/dialog.service';
import { HttpService } from '../../../core/transfer-module/http.service';
import { offerStateTransitionType, stateTransitionType } from './offer-state-transition-types.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SubmitFormOfferService {
    constructor(private httpService: HttpService,
                private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef,
                private translate: TranslateService) {
    }

    submitOffer(offer: any): Observable<any> {
        if (offer.id) {
            return this.sendPutRequestWithType(offer, <string>offerStateTransitionType.SAVE_DRAFT);
        }
        return this.httpService.post(`/${offer.type}s/`, offer);
    }

    publishOffer(offer: any): Observable<any> {
        return this.sendPutRequestWithType(offer, <string>offerStateTransitionType.PUBLISH)
            .catch(response => this.showError(response));
    }

    disableOffer(offer: any): Observable<any> {
        return this.sendPutRequestWithType(offer, <string>offerStateTransitionType.DISABLE);
    }

    deleteOffer(offer: any): Observable<any> {
        return this.sendPutRequestWithType(offer, <string>offerStateTransitionType.DELETE);
    }

    showDeleteDialog(): Observable<any> {
        const dialogOptions = new DialogOptions();
        dialogOptions.options = {
            message: 'offer.dialogs.deleteOffer.message',
            ok: 'buttons.confirm'
        };

        return this.dialogService.confirm(this.viewContainerRef, dialogOptions)
            .filter(result => result);
    }

    private sendPutRequestWithType(offer: any, type: string): Observable<any> {
        const url = `/${offer.type}s/${offer.id}`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set(stateTransitionType, type);
        return this.httpService.put(url, offer, urlSearchParams);
    }

    private showError(response: any): Observable<any> {

        // TODO VN Apply ErrorModel
        // if (!submitErrors[response.errorCode]) {
        //     return Observable.of(response);
        // }
        const dialogOptions = new DialogOptions();
        dialogOptions.options = {
            title: this.translate.instant('offer.dialogs.error.title'),
            message: this.translate.instant('offer.dialogs.error.message')
        };

        this.dialogService.alert(this.viewContainerRef, dialogOptions);
        return Observable.never();
    }
}
