import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { OfferListService } from './offer-list.service';
import { OfferList } from './models/offer-list.model';
import { StorageService, storageParams } from '../../../core/services/storage.service';

@Injectable()
export class OfferListResolver implements Resolve<any> {

    constructor(
        private offerListService: OfferListService,
        private storageService: StorageService
    ) {}

    resolve(): Observable<OfferList> | Promise<OfferList> | OfferList {
        if (!!this.storageService.getData(storageParams.searchParams)) {
            return this.offerListService.getOffersByStorageParams();
        } else {
            return this.offerListService.getOffers();
        }
    }
}
