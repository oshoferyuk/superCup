import { Offer } from './offer.model';
import { OfferTab } from './tabs.enum';

export class OfferList {
    tab: OfferTab;

    countOnPage: number;
    currentPage: number = 0;
    totalItems: number;

    offers: Offer[] = [];
    totals: Totals = new Totals();
}

export class SelectList {
    value: string;
    viewValue: string;
}

export class Totals {
    ALL: number = 0;
    DRAFT: number = 0;
    UPCOMING: number = 0;
    ACTIVE: number = 0;
    EXPIRED: number = 0;
}
