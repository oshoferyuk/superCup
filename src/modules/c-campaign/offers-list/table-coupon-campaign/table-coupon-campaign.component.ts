import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { OfferService } from '../../../../core/services/offer/offer.service';
import { OfferList } from '../models/offer-list.model';
import { Offer } from '../models/offer.model';
import { OfferListService } from '../offer-list.service';
import { OfferListStore } from '../offer-list.store';
import { OfferSelectionService } from '../offer-selection.service';
import { defaultSorting } from './table-coupon-campaign.constants';

export const ascSortClass = 'campaign-table__asc';
export const descSortClass = 'campaign-table__desc';

@Component({
    selector: 'fp-table-coupon-campaign',
    templateUrl: './table-coupon-campaign.component.html',
    styleUrls: ['./table-coupon-campaign.component.scss']
})
export class TableCouponCampaignComponent implements OnInit, OnDestroy {
    offers: Offer[];

    private sorting: any = defaultSorting;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private offerListStore: OfferListStore,
        private offerListService: OfferListService,
        private offerService: OfferService,
        private offerSelectionService: OfferSelectionService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.offerListStore.onUpdate()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => this.updateOffers(data));
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    toggleSorting(sortField: string): void {
        this.sorting = Object.assign({}, {
            [sortField]: this.sorting[sortField]
        });
        this.sorting[sortField] = +!this.sorting[sortField];
        this.offerListService.sortOffers(this.sorting);
    }

    getSortingClass(sortField: string): string {
        return this.sorting[sortField]
            ? ascSortClass
            : descSortClass;
    }

    getType(offer: Offer): string {
        return offer.type && offer.type.toLowerCase();
    }

    getCategory(offer: Offer): string {
        if (!offer.categories || !offer.categories.length) {
            return '';
        }
        if (offer.categories.length === 1) {
            return offer.categories[0];
        }
        return 'Multiple Categories';
    }

    editCurrentOffer(offer: Offer): void {
        this.router.navigate(['constructor', offer.id]);
    }

    copyCurrentOffer(offer: Offer): void {
        this.offerService.getOfferDuplicate('' + offer.id)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(result => this.router.navigate(['constructor', result.id]));
    }

    toggleSelection(offer: Offer, selected: boolean): void {
        selected
            ? this.offerSelectionService.select(offer)
            : this.offerSelectionService.deselect(offer.id);
    }

    isSelected(offerId: number): boolean {
        return this.offerSelectionService.isSelected(offerId);
    }

    selectAll(selected: boolean): void {
        selected
            ? this.offerSelectionService.selectAll(this.offers)
            : this.offerSelectionService.deselectAll(this.offers);
    }

    isAllSelected(): boolean {
        return this.offerSelectionService.isAllSelected(this.offers);
    }

    clickOffers(event: Event, offer: Offer): void {
        const target = event.target as HTMLElement;
        if (this.isInputClicked(target) || this.isDropdownClicked(target)) {
            return;
        }

        this.editCurrentOffer(offer);
    }

    private isInputClicked(target: HTMLElement): boolean {
        return (target.tagName === 'INPUT')
            || (
                (target.parentElement.previousElementSibling)
                && (target.parentElement.previousElementSibling.tagName === 'INPUT')
            );
    }

    private isDropdownClicked(target: HTMLElement): boolean {
        return !!target.attributes.getNamedItem('dropdowntoggle');
    }

    private updateOffers(offerList: OfferList): void {
        this.offers = offerList.offers;
    }
}

