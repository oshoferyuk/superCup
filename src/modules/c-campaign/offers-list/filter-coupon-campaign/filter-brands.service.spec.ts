import { FilterBrandsService } from './filter-brands.service';

describe('FilterBrandsService', () => {
    let sut;
    let filterBrands = 'filterBrands';

    beforeEach(() => {
        sut = new FilterBrandsService();
    });

    describe('on init', () => {
        it('should invoke super', () => {
            expect(sut[filterBrands]).toBeDefined();
        });
    })
});
