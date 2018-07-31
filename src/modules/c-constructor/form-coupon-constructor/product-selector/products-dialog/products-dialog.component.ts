import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MdDialogRef, OverlayContainer } from '@angular/material';
import { ITreeState, TreeNode } from 'angular-tree-component';
import { ProductSearchService } from '../services/product-search.service';
import { productSelector, toggle } from '../product-selector.constants';
import { cloneDeep } from 'lodash';
import { ProductSelectorService } from '../services/product-selector.service';
import { ProductSelectorOptimizationService } from '../services/product-selector-optimization.service';

@Component({
    selector: 'fp-products-dialog',
    templateUrl: './products-dialog.component.html',
    styleUrls: ['./products-dialog.component.scss']
})
export class ProductsDialogComponent implements OnInit {
    sectorNodes: any[];
    sectorState: ITreeState;
    brands: any[];
    brandgroupNodes: any[];
    brandgroupState: ITreeState;
    totalItems: number;

    subBrands: any[];
    versions: any[];
    forms: any[];
    result: any[];
    copyResult: any;

    searchFieldHasError: any = {
        sector: false,
        brand: false,
        subbrand: false,
        version: false,
        form: false,
    };

    searchData: any = {
        sector: '',
        category: '',
        brandGroups: '',
        brand: '',
        subbrand: '',
        version: '',
        form: '',
        levels: ''
    };

    totalsGtins: any = {
        sector: 0,
        brands: 0,
        subBrands: 0,
        versions: 0,
        form: 0,
        sum: 0
    };

    activeToggle: toggle;
    selectedCategory: any = {};
    selectedBrandGroup: any = {};
    previousResult: any;
    productBrandGroup: string = '';

    constructor(
        private overlayContainer: OverlayContainer,
        private dialogRef: MdDialogRef<ProductsDialogComponent>,
        private productSearch: ProductSearchService,
        private productSelectorService: ProductSelectorService,
        private productSelectorOptimizationService: ProductSelectorOptimizationService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.overlayContainer.themeClass = productSelector.PRODUCT_SELECTOR_MODAL;
        if (this.previousResult) {
            this.setSectionsResultFromForm(this.previousResult);
        }
    }

    onSearchSectors(input: HTMLInputElement): void {
        this.resetAll(input.value, input.value, '', '', '', '', '');
        this.activeToggle = toggle.SECTOR_SEARCH;
        this.clearAndSearch(input, 'sector');
    }

    onSearchBrands(input: HTMLInputElement): void {
        this.resetAll('', '', input.value, input.value, '', '', '');
        this.activeToggle = toggle.BRAND_SEARCH;
        this.clearAndSearch(input, 'brand');
    }

    onSearchSubBrands(input: HTMLInputElement): void {
        this.resetAll('', '', '', '', input.value, '', '');
        this.activeToggle = toggle.SUB_BRAND_SEARCH;
        this.clearAndSearch(input, 'subbrand');
    }

    onSearchVersions(input: HTMLInputElement): void {
        this.resetAll('', '', '', '', '', input.value, '');
        this.activeToggle = toggle.VERSION_SEARCH;
        this.clearAndSearch(input, 'version');
    }

    onSearchForms(input: HTMLInputElement): void {
        this.resetAll('', '', '', '', '', '', input.value);
        this.activeToggle = toggle.FORM_SEARCH;
        this.clearAndSearch(input, 'form');
    }

    resetAll(sSectors: string,
             sCategories: string,
             sBrandGroups: string,
             sBrands: string,
             sSubBrands: string,
             sVersions: string,
             sForms: string): void {
        this.searchData.sector = sSectors;
        this.searchData.category = sCategories;
        this.searchData.brandGroups = sBrandGroups;
        this.searchData.brand = sBrands;
        this.searchData.subbrand = sSubBrands;
        this.searchData.version = sVersions;
        this.searchData.form = sForms;
    }

    clearAndSearch(input: HTMLInputElement, field: string): void {
        this.setSearchFieldError(input, field);
        if (!this.isMoreThanTwoSymbols(input)) { return; }

        input.value = '';
        input.blur();
        this.searchRequest();
    }

    searchRequest(): void {
        this.searchData.levels = this.productSelectorOptimizationService.buildLevelsParam(this.activeToggle);

        this.productSearch.searchProgram(this.searchData)
            .subscribe(res => this.setSectionsResult(res));
    }

    setDialogResult(): any {
        const searchData = this.productSelectorService.getSelectedItemsByName(this.getItemsData());

        this.productSearch.getProductSummaries(searchData)
            .subscribe(res => this.productSelectorService.setProductSummaries(res));

        this.productSelectorService.setSelectionResult(this.getItemsData());
        this.dialogRef.close();
    }

    closeDialog(): any {
        this.productSelectorService.setSelectionResult(this.copyResult);
        this.dialogRef.close();
    }

    getItemsData(): any {
        return {
            sectorNodes: this.sectorNodes,
            sectorState: this.sectorState,
            brandgroupNodes: this.brandgroupNodes,
            brandgroupState: this.brandgroupState,
            brands: this.brands,
            subBrands: this.subBrands,
            versions: this.versions,
            forms: this.forms,
            result: this.result,
            selectedCategory: this.selectedCategory,
            selectedBrandGroup: this.selectedBrandGroup,
            productBrandGroup: this.productBrandGroup,
            totalItems: this.totalItems,
            searchData: this.searchData,
            activeToggle: this.activeToggle
        };
    }

    isApplyListDisabled(): boolean {
        return !this.selectedBrandGroup.hasOwnProperty('id');
    }

    onToggleAllVersions(event: any): void {
        if (!this.versions) {
            return;
        }

        if (event.target.checked) {
            this.versions.map((version) => {
                version.isSelected = true;
            });
        } else {
            this.versions.map((version) => {
                version.isSelected = false;
            });
        }
        this.activeToggle = toggle.VERSION_TOGGLE;
        this.searchData.version = this.groupRequest(this.versions);
        this.searchRequest();
    }

    onToggleAllForms(event: any): void {
        if (!this.forms) {
            return;
        }

        if (event.target.checked && !!this.forms) {
            this.forms.map((form) => {
                form.isSelected = true;
            });
        } else {
            this.forms.map((form) => {
                form.isSelected = false;
            });
        }
        this.activeToggle = toggle.FORM_TOGGLE;
        this.searchData.form = this.groupRequest(this.forms);
        this.searchRequest();
    }

    onToggleAllSubBrands(event: any): void {
        if (!this.subBrands) {
            return;
        }

        if (event.target.checked && !!this.subBrands) {
            this.subBrands.map((subBrand) => {
                subBrand.isSelected = true;
            });
        } else {
            this.subBrands.map((subBrand) => {
                subBrand.isSelected = false;
            });
        }
        this.activeToggle = toggle.SUB_BRAND_TOGGLE;
        this.searchData.subbrand = this.groupRequest(this.subBrands);
        this.searchRequest();
    }

    isAllVersionsChecked(): boolean {
        return !!this.versions && this.versions.length > 0 && this.versions.every(version => version.isSelected);
    }

    isAllFormsChecked(): boolean {
        return !!this.forms && this.forms.length > 0 && this.forms.every(form => form.isSelected);
    }

    isAllSubBrandsChecked(): boolean {
        return !!this.subBrands && this.subBrands.length > 0 && this.subBrands.every(form => form.isSelected);
    }

    isCategoryVisible(): boolean {
        return !!this.sectorNodes && this.sectorNodes.length > 0;
    }

    isBrandsVisible(): boolean {
        return !!this.brandgroupNodes && this.brandgroupNodes.length > 0;
    }

    isVersionsVisible(): boolean {
        return !!this.versions && this.versions.length > 0;
    }

    isFormsVisible(): boolean {
        return !!this.forms && this.forms.length > 0;
    }

    isSubBrandsVisible(): boolean {
        return !!this.subBrands && this.subBrands.length > 0;
    }

    onToggleForm(all: any, item: any): void {
        item.isSelected = !item.isSelected;

        if (item.isSelected) {
            this.searchData.form = this.groupRequest(all);
            this.activeToggle = toggle.FORM_TOGGLE;
        } else {
            this.searchData.form = this.groupRequest(all);
        }
        this.searchRequest();
    }

    onToggleVersion(all: any, item: any): void {
        item.isSelected = !item.isSelected;

        if (item.isSelected) {
            this.searchData.version = this.groupRequest(all);
            this.searchData.form = '';
            this.activeToggle = toggle.VERSION_TOGGLE;
        } else {
            this.searchData.version = this.groupRequest(all);
        }
        this.searchRequest();
    }

    groupRequest(all: any): string {
        let ret = '';
        all.forEach((subBrand) => {
            if (subBrand.isSelected) {
                if (ret === '') {
                    ret = subBrand.name;
                } else {
                    ret = ret + ', ' + subBrand.name;
                }

            }
        });
        return ret;
    }

    onToggleSubBrand(all: any, item: any): void {
        item.isSelected = !item.isSelected;

        if (item.isSelected) {
            this.searchData.subbrand = this.groupRequest(all);
            this.searchData.version = '';
            this.searchData.form = '';
            this.activeToggle = toggle.SUB_BRAND_TOGGLE;
        } else {
            this.searchData.subbrand = this.groupRequest(all);
        }
        this.searchRequest();
    }

    copyWithSelectionList(oldValues: any[], newValues: any[]): any[] {
        newValues.forEach((newValue) => {
            if (!!oldValues && oldValues.find(oldValue => oldValue.name === newValue.name && oldValue.isSelected)) {
                newValue.isSelected = true;
            } else {
                newValue.isSelected = false;
            }
        });
        return newValues;
    }

    setTotalGtins(): void {
        const itemsData = this.getItemsData();
        this.totalsGtins = this.productSelectorService.getTotalGtins(itemsData);
    }

    setSectionsResult(result: any): void {
        switch (this.activeToggle) {
            /**
             *  For search updated every section to left and current, every right sections cleared.
             *  For toggle updated only next right section, more right sections are cleared, left
             *  and current sections do not updated.
             */
            case toggle.SECTOR_SEARCH:
                this.sectorNodes = result.sectors;
                this.brandgroupNodes = result.brandgroups;
                this.brands = [];
                this.subBrands = [];
                this.versions = [];
                this.forms = [];
                break;

            case toggle.BRAND_SEARCH:
                this.sectorNodes = result.sectors;
                this.brandgroupNodes = result.brandgroups;
                this.brands = result.brands;
                this.subBrands = [];
                this.versions = [];
                this.forms = [];
                break;

            case toggle.SUB_BRAND_SEARCH:
                this.sectorNodes = result.sectors;
                this.brandgroupNodes = result.brandgroups;
                this.brands = result.brands;
                this.subBrands = result.subbrands;
                this.versions = [];
                this.forms = [];
                break;

            case toggle.VERSION_SEARCH:
                this.sectorNodes = result.sectors;
                this.brandgroupNodes = result.brandgroups;
                this.brands = result.brands;
                this.subBrands = result.subbrands;
                this.versions = result.versions;
                this.forms = [];
                break;

            case toggle.FORM_SEARCH:
                this.sectorNodes = result.sectors;
                this.brandgroupNodes = result.brandgroups;
                this.brands = result.brands;
                this.subBrands = result.subbrands;
                this.versions = result.versions;
                this.forms = result.forms;
                break;

            case toggle.SECTOR_TOGGLE:
                this.brands = result.brands;
                this.brandgroupNodes = result.brandgroups;
                this.subBrands = [];
                this.versions = [];
                this.forms = [];
                break;

            case toggle.BRAND_TOGGLE_ON:
                this.subBrands = result.subbrands;
                this.versions = [];
                this.forms = [];
                break;

            case toggle.BRAND_TOGGLE_OFF:
                this.subBrands = [];
                this.versions = [];
                this.forms = [];
                break;

            case toggle.SUB_BRAND_TOGGLE:
                this.versions = result.versions;
                this.forms = [];
                break;

            case toggle.VERSION_TOGGLE:
                this.forms = result.forms;
                break;

            case toggle.FORM_TOGGLE:
                break;
        }

        this.totalItems = result.totalItems;
        this.result = !!result.items ? result.items : [];
        this.productSelectorService.setSelectionResult(this.getItemsData());
        this.setTotalGtins();
        this.cd.detectChanges();
    }

    // TODO: missing test
    setSectionsResultFromForm(result: any): void {
        Object.assign(this, result);
        this.setTotalGtins();
        this.copyResult = cloneDeep(result);
    }

    onNodeSectorActivated(event: any): void {
        const node: TreeNode = event.node;
        if (!node.hasChildren) {
            this.searchData.category = node.displayField;
            this.searchData.sector = '';
        } else {
            this.searchData.sector = node.displayField;
            this.searchData.category = '';
        }

        this.searchData.brandGroups = '';
        this.searchData.brand = '';
        this.searchData.subbrand = '';
        this.searchData.version = '';
        this.searchData.form = '';
        this.activeToggle = toggle.SECTOR_TOGGLE;
        this.selectedCategory = node.data;
        this.searchRequest();
    }

    onNodeSectorDeactivated(event: any): void {

        const node: TreeNode = event.node;
        node.blur();

        this.searchData.sector = '';
        this.searchData.category = '';
        this.selectedCategory = '';
        this.activeToggle = toggle.SECTOR_TOGGLE;

        this.brandgroupNodes = [];
        this.brands = [];
        this.subBrands = [];
        this.versions = [];
        this.forms = [];

        this.setTotalGtins();
    }

    onNodeBrandGroupActivated(event: any): void {
        const node: TreeNode = event.node;

        if (!!node.hasChildren) {
            this.activeToggle = toggle.BRAND_TOGGLE_OFF;
            this.searchData.brandGroups = '';
            this.searchData.brand = '';
            node.toggleActivated(false);
        } else {
            this.searchData.subbrand = '';
            this.searchData.version = '';
            this.searchData.form = '';
            this.selectedBrandGroup = node.data;
            this.searchData.brandGroups = '';
            this.searchData.brand = node.displayField;
            this.activeToggle = toggle.BRAND_TOGGLE_ON;

            this.productBrandGroup = `${node.parent.data.name}/${node.data.name}`;
        }
        this.searchRequest();
    }

    onNodeBrandGroupDeactivated(event: any): void {
        const node: TreeNode = event.node;

        this.selectedBrandGroup = '';

        this.activeToggle = toggle.BRAND_TOGGLE_OFF;
        this.subBrands = [];
        this.versions = [];
        this.forms = [];
        this.setTotalGtins();

        this.productBrandGroup = '';

        node.blur();
    }

    onNodeBrandGroupFocus(event: any): void {
        if (!!event.node.hasChildren) {
            event.node.blur();
        }
    }

    private isMoreThanTwoSymbols(input: HTMLInputElement): boolean {
        return input.value.length > 2;
    }

    private setSearchFieldError(input: HTMLInputElement, field: string): void {
        Object.keys(this.searchFieldHasError)
            .map(item => this.searchFieldHasError[item] = false);
        this.searchFieldHasError[field] = !this.isMoreThanTwoSymbols(input);
    }
}
