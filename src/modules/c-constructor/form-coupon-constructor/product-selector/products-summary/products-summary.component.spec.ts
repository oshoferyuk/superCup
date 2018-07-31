import { ProductsSummaryComponent } from './products-summary.component';

describe('ProductsSummaryComponent', () => {
    let sut;
    let productSummaryItem;
    let mockProductSummaryInitial;
    let mockProductSummaryResult;

    beforeEach(() => {
        sut = new ProductsSummaryComponent();
        productSummaryItem = 'sector/category/brandgroup/brand/subbrand/version/form';

        mockProductSummaryInitial = 'Sector 1^Category 1sub/sub^Brand Family 1^Brand 1^SubBrand 1';
        mockProductSummaryResult = 'Sector 1/Category 1sub/sub/Brand Family 1/Brand 1/SubBrand 1';

        sut.deleteProductSummaryItem = {
            emit: jasmine.createSpy('emit')
        };
    });

    it('should emit delete product method', () => {
        sut.onDeleteProduct(productSummaryItem);
        expect(sut.deleteProductSummaryItem.emit).toHaveBeenCalledWith(productSummaryItem);
    });

    it('should correctly transform product summary', () => {
        expect(sut.filterProductSummary(mockProductSummaryInitial)).toEqual(mockProductSummaryResult);
    });
});
