import { Injectable } from '@angular/core';
import { Offer } from './models/offer.model';

@Injectable()
export class OfferSelectionService {
    private selectedOffers: any = {};

    constructor() {
    }

    select(offer: Offer): void {
        this.selectedOffers[offer.id] = offer;
    }

    deselect(offerId: number): void {
        delete this.selectedOffers[offerId];
    }

    clearAll(): void {
        this.selectedOffers = {};
    }

    isSelected(offerId: number): boolean {
        return !!this.selectedOffers[offerId];
    }

    getSelectedPrintableOfferIds(): string[] {
        const ids: string[] = [];
        for (const offerId in this.selectedOffers) {
            if (this.selectedOffers[offerId].printable) {
                ids.push(offerId);
            }
        }
        return ids;
    }

    selectAll(offers: Offer[]): void {
        offers.forEach(offer => this.select(offer));
    }

    deselectAll(offers: Offer[]): void {
        offers.forEach(offer => this.deselect(offer.id));
    }

    isAllSelected(offers: Offer[]): boolean {
        if (offers.length) {
            return offers.every(offer => this.isSelected(offer.id));
        }
    }

}

