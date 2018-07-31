import { ChangeDetectorRef, Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductSelectorService } from './services/product-selector.service';
import { productSelector, optimizationLevel } from './product-selector.constants';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
import { offerFields } from '../form-coupon-constructor.constants';
import { DialogService } from '../../../../core/dialog/dialog.service';
import { DialogOptions } from '../../../../core/dialog/dialog-options.model';

@Component({
    selector: 'fp-product-selector',
    templateUrl: './product-selector.component.html',
    styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit {
    @Input() form: FormGroup;

    offerFields: any;
    productSummaries: any;

    constructor(
        private productSelectorService: ProductSelectorService,
        private viewContainerRef: ViewContainerRef,
        private dialogService: DialogService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void { // TODO should be tested
        this.offerFields = offerFields;

        this.productSelectorService.productSummaries.subscribe((productSummaries) => {
            if (productSummaries) { this.productSummaries = Object.keys(productSummaries); }
            const lastCatalogLevel = optimizationLevel[this.productSelectorService.lastCatalogLevel];

            this.form.get(offerFields.lastCatalogLevel).setValue(lastCatalogLevel);
            this.form.get(offerFields.purchaseGtins).setValue(this.productSelectorService.gtins.join());
            this.form.get(offerFields.itemUuids).setValue(this.productSelectorService.uuids);
            if (this.productSelectorService.brandGroup) {
                this.form.get(offerFields.productBrandGroup).setValue(this.productSelectorService.brandGroup);
            }
            this.cd.markForCheck();
        });
    }

    openProductDialog(): void {
        const dialogOptions = new DialogOptions();

        dialogOptions.config = { width: productSelector.DIALOG_WIDTH };
        dialogOptions.options = { previousResult: this.productSelectorService.getSelectionResult() };

        this.dialogService.open(
            ProductsDialogComponent,
            this.viewContainerRef,
            dialogOptions
        );
    }

    onDeleteProductSummaryItem(productSummaryItem: string): void {  // TODO should be tested
        const newProductSummaries = Object.assign({}, this.productSelectorService.productSummaries.getValue());
        this.productSelectorService.deselectItem(productSummaryItem, newProductSummaries);
    }
}








