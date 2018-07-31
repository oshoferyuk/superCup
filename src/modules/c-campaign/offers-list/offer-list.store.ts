import { Injectable } from '@angular/core';
import { OfferList } from './models/offer-list.model';
import { BaseStore } from '../../../core/storage/base.store';

@Injectable()
export class OfferListStore extends BaseStore<OfferList> {
    constructor() {
        const offerList = new OfferList();
        super(offerList);
    }
}

