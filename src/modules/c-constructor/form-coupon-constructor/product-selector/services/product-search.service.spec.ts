import { ProductSearchService } from './product-search.service';
import { URLSearchParams } from '@angular/http';

describe('ProductSearchService', () => {
    let sut;
    let Http;
    const productSearch = Symbol('productSearch');
    const urlSearchParams = new URLSearchParams();

    beforeEach(() => {
        Http = {
            get: jasmine.createSpy('get').and.returnValue(productSearch)
        };

        sut = new ProductSearchService(Http);
        urlSearchParams.set('sector', '');
        urlSearchParams.set('category', '');
        urlSearchParams.set('brand', '');
        urlSearchParams.set('subbrand', '');
        urlSearchParams.set('version', '');
        urlSearchParams.set('form', '');
    });

    describe('resolve', () => {
        let result;
        beforeEach(() => {
            result = sut.searchProgram('','','','','','');
        });

        it('should make request to backend to get productSummaries', () => {
            const urlSearchParams =  new URLSearchParams();
            expect(Http.get).toHaveBeenCalledWith('/products', urlSearchParams);
        });

        it('should get products data from server', () => {
            expect(result).toEqual(productSearch);
        });
    });
});
