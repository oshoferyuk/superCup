import { FilterSegmentsService } from './filter-segments.service';

describe('FilterSegmentsService', () => {
    let sut;
    let filterSegments = 'filterSegments';

    beforeEach(() => {
        sut = new FilterSegmentsService();
    });

    describe('on init', () => {
        it('should invoke super', () => {
            expect(sut[filterSegments]).toBeDefined();
        });
    })
});
