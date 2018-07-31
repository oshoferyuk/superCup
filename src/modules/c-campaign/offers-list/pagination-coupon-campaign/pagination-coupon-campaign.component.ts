import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { OfferList } from '../models/offer-list.model';
import { OfferListService } from '../offer-list.service';
import { OfferListStore } from '../offer-list.store';

import { pageSizes, defaultPaginationParams } from './pagination-coupon-campaing.constants';

@Component({
    selector: 'fp-pagination-coupon-campaign',
    templateUrl: './pagination-coupon-campaign.component.html',
    styleUrls: ['./pagination-coupon-campaign.component.scss']
})
export class PaginationCouponCampaignComponent implements OnInit, OnDestroy {
    countOnPage: number = defaultPaginationParams.countOnPage;
    currentPage: number = defaultPaginationParams.currentPage;
    totalItems: number;
    pageSizes: any[] = pageSizes;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private offerListStore: OfferListStore,
        private offerListService: OfferListService
    ) {}

    ngOnInit(): void {
        this.offerListStore.onUpdate()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => this.updatePaginationData(data));
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    onCountChange(): void {
        const params = { countOnPage: this.countOnPage };
        this.offerListService.getOffers(params);
    }

    onPageChanged(page: any): void {
        const newPage = page - 1;
        if (newPage !== this.currentPage) {
            const params = { currentPage: newPage};
            this.offerListService.getOffers(params);
        }
    }

    private updatePaginationData(offerList: OfferList): void {
        this.totalItems = offerList.totalItems;
        this.countOnPage = offerList.countOnPage;
        this.currentPage = offerList.currentPage;
    }
}
