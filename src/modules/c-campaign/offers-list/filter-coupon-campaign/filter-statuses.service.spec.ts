import { FilterStatusesService } from './filter-statuses.service';

describe('FilterStatusesService', () => {
    let sut;
    let filterStatuses = 'filterStatuses';

    beforeEach(() => {
        sut = new FilterStatusesService();
    });

    describe('on init', () => {
        it('should invoke super', () => {
            expect(sut[filterStatuses]).toBeDefined();
        });
    })
});
