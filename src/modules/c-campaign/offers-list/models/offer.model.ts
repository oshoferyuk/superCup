export class Offer {
    imageUrl: string;
    id: number;
    type: string; // enum?
    printable: boolean;
    status: string; // enum?
    brand: string;
    productDescription: string;
    summary: string;
    // TODO: remove as obsolete, use category instead
    categories: string[];
    category: string;
    validityStart: string;
    validityEnd: string;
    remainingQuantity: number;
    quantityStart: number;
}
