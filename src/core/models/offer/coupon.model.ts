import { BaseOffer } from './base-offer.model';

export class Coupon extends BaseOffer {
    minimumPurchasePrice: number;
    requiredPurchaseQuantity: number;
    expiryType: string;
    fixedExpiration: string;
    rollingExpirationDays: number;
    printable: boolean;
    value: number;
    clearingCode: string;
    printableCouponImage: string;
    eanNumber: string;
    offerPrintingHouseID: string;
    type: string;
}

