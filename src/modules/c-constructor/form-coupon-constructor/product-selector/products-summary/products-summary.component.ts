import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
    selector: 'fp-products-summary',
    templateUrl: './products-summary.component.html',
    styleUrls: ['./products-summary.component.scss']
})
export class ProductsSummaryComponent {
    @Input() productSummaries: string[];
    @Output() deleteProductSummaryItem: any = new EventEmitter();

    constructor() {}

    filterProductSummary(productSummary: string): string {
        return productSummary.replace(/\^/g , '/');
    }

    onDeleteProduct(productSummaryItem: string): void {
        this.deleteProductSummaryItem.emit(productSummaryItem);
    }
}
