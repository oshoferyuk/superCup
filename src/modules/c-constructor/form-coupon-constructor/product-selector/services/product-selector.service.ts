import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductSummaries } from '../models/product-summaries.model';
import { isNullOrUndefined } from 'util';


const productSummariesItemsMap = {
    gtin: 'gtin',
    uid: 'uid'
};

const productSummariesMap = {
    0: 'sector',
    1: 'category',
    2: 'brandGroup',
    3: 'brand',
    4: 'subBrands',
    5: 'versions',
    6: 'forms',
};

const lastThreeColumns = 3;

@Injectable()
export class ProductSelectorService { // TODO should be tested
    selectionResult: any;
    productSummaries: BehaviorSubject<ProductSummaries> = new BehaviorSubject<ProductSummaries>({});

    get lastCatalogLevel(): string {
        const productSummariesValue = this.productSummaries.getValue();
        if (isNullOrUndefined(productSummariesValue) || !Object.keys(productSummariesValue).length) {
            return '';
        }
        const productSummaryNames = Object.keys(productSummariesValue);
        const longestCatalogLevel = productSummaryNames
            .reduce((a, b) => a.length > b.length ? a : b)
            .split('^');
        return productSummariesMap[longestCatalogLevel.length - 1];
    }

    get gtins(): string[] {
        return this.getProductSummariesItems(productSummariesItemsMap.gtin);
    }

    get uuids(): string[] {
        return this.getProductSummariesItems(productSummariesItemsMap.uid);
    }

    get brandGroup(): string {
        return !!this.selectionResult ? this.selectionResult.productBrandGroup : '';
    }

    constructor() {}

    deselectItem(productSummaryItem: string, newProductSummaries: ProductSummaries): void {
        const deleted = productSummaryItem.split('^');
        const selectionResultCopy = Object.assign({}, this.selectionResult);
        if (Object.keys(newProductSummaries).length <= 1) {
            selectionResultCopy['brandgroupState'] = {};
            selectionResultCopy['sectorState'] = {};
        }

        delete  newProductSummaries[productSummaryItem];
        const productSummaries = Object.keys(newProductSummaries)
            .map(item => item.split('^'));

        deleted.forEach((curr, i) => {
            if (i > lastThreeColumns) {
                const isEnySelected = productSummaries
                    .some(summaryItem => summaryItem[i] === curr);

                selectionResultCopy[productSummariesMap[i]].forEach((currItem) => {
                    if (currItem.name === curr && !isEnySelected) { currItem.isSelected = false; }
                });
            }
        });

        this.setProductSummaries(newProductSummaries);
        selectionResultCopy.totalItems = this.gtins.length;
        this.setSelectionResult(selectionResultCopy);
    }

    resetData(): void {
        this.selectionResult = null;
        this.productSummaries.next(null);
    }

    getSelectedItem(category: any): any {
        return category.filter(item => item.isSelected);
    }

    getSelectedItemsByName(itemsData: any): object {
        const result = {
            sector: '',
            category: '',
            brand: itemsData.selectedBrandGroup.name,
            subbrands: this.getSelectedItem(itemsData.subBrands).map(item => item.name).join(),
            versions: this.getSelectedItem(itemsData.versions).map(item => item.name).join(),
            forms: this.getSelectedItem(itemsData.forms).map(item => item.name).join()
        };

        if (itemsData.selectedCategory['children']) {
            result.sector = itemsData.selectedCategory.name;
        } else {
            result.category = itemsData.selectedCategory.name;
        }

        return result;
    }

    getSelectionResult(): any {
        return this.selectionResult;
    }

    setSelectionResult(selectionResult: object): void {
        this.selectionResult = selectionResult;
    }

    setProductSummaries(productSummaries: any): void {
        this.productSummaries.next(productSummaries);
    }

    getSumOfGtins(totalGtins: object): number {
        const sum = this.selectionResult.totalItems;
        const isAnySelected = Object.keys(totalGtins)
            .some(item => totalGtins[item] > 0);

        if (isAnySelected) { return sum; }
        return 0;
    }

    getTotalGtins(itemsData: any): object {
        const totalGtins = {
            sector: itemsData.selectedCategory.count || 0,
            brands: itemsData.selectedBrandGroup.count || 0,
            subBrands: this.calculateTotalGtins(itemsData.subBrands),
            versions: this.calculateTotalGtins(itemsData.versions),
            form: this.calculateTotalGtins(itemsData.forms),
        };

        return {
            sum: this.getSumOfGtins(totalGtins),
            ...totalGtins
        };
    }

    private calculateTotalGtins(category: any): number {
        if (!category) { return 0; }

        return category.reduce(
            (count, item) => item.isSelected ? count + item.count || 0 : count,
            0
        );
    }

    private getProductSummariesItems(key: string): any[] {
        const productSummaries = this.productSummaries.getValue();
        if (!productSummaries) { return []; }

        return Object.keys(productSummaries)
            .reduce((acc, curr) => {
                productSummaries[curr].forEach(item => acc.push(item[key]));
                return acc;
            }, []);
    }
}
