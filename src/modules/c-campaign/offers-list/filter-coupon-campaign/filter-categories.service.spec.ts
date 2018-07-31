import { FilterCategoriesService } from './filter-categories.service';

describe('FilterCategoriesService', () => {
    let sut;
    let filterCategories = 'filterCategories';

    beforeEach(() => {
        sut = new FilterCategoriesService();
    });

    describe('on init', () => {
        it('should invoke super', () => {
            expect(sut[filterCategories]).toBeDefined();
        });
    })
});
