import { ProductSelectorComponent } from './product-selector.component';
import { Observable } from 'rxjs/Observable';
import { DialogOptions } from '../../../../core/dialog/dialog-options.model';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';

describe('ProductSelectorComponent', () => {
    let sut;
    let ViewContainerRef;
    let DialogService;
    let ProductSelectorService;
    let mockResultDialog;
    let ChangeDetectorRef;

    beforeEach(() => {
        mockResultDialog = {
            brands: [{name: 'brand'}],
            versions: [{name: 'version'}],
            result: [{gtin: '123'}, {gtin: '234'}]
        };

        ProductSelectorService = {
            resetData: jasmine.createSpy('resetData'),
            getSelectionResult: jasmine.createSpy('getSelectionResult'),
        };

        ViewContainerRef = Symbol('ViewContainerRef');

        DialogService = {
            open: jasmine.createSpy('open').and.returnValue(Observable.of(mockResultDialog))
        };

        ChangeDetectorRef = {
            markForCheck: jasmine.createSpy('markforCheck')
        };

        sut = new ProductSelectorComponent(
            ProductSelectorService,
            ViewContainerRef,
            DialogService,
            ChangeDetectorRef
        );
    });

    describe('on init', () => {
        beforeEach(() => {});
    });

    describe('dialog', () => {
        beforeEach(() => {
            sut.openProductDialog();
        });

        it('should open it', () => {
            const dialogOption = new DialogOptions();
            dialogOption.options = { previousResult: undefined };
            dialogOption.config = { width: '98%' };

            expect(DialogService.open).toHaveBeenCalledWith(
                ProductsDialogComponent,
                ViewContainerRef,
                dialogOption
            );
        });
    });
});
