export class BaseOffer {
    channelId: number;
    summary: string;
    validityStart: string;
    validityEnd: string;
    targeted: boolean;
    quantityStart: number;
    brand: string;
    consumerSegments: string[];
    itemUuids: string[];
    budgetCode: string;
    budgetName: string;
    language: string;
    productDescription: string;
    imageUrl: string;
    printableCouponImage: string;
    estimatedRedemptionRate: string;

    offerType?: string;
    id?: string;
    status?: string;
    type?: string;
    incentiveId?: string;
}

