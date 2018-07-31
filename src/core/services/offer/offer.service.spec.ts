import { OfferService } from './offer.service';

describe('OfferService', () => {
    let sut;
    let HttpService;

    const id = 1;
    const offer = Symbol('offer');

    beforeEach(() => {
        HttpService = {
            get: jasmine.createSpy('get').and.returnValue(offer),
            post: jasmine.createSpy('post').and.returnValue(id)
        };

        sut = new OfferService(HttpService);
    });

    describe('get offer by id', () => {
        let result;

        beforeEach(() => {
            result = sut.getOfferById(id);
        });

        it('should make proper request', () => {
            expect(HttpService.get).toHaveBeenCalledWith('/offers/1');
        });

        it('should return offer', () => {
            expect(result).toEqual(offer);
        });
    });

    describe('get offer duplicate', () => {
        let result;

        beforeEach(() => {
            result = sut.getOfferDuplicate(id);
        });

        it('should make proper request', () => {
            expect(HttpService.post).toHaveBeenCalledWith('/offers/1/duplicate', {});
        });

        it('should return id', () => {
            expect(result).toEqual(id);
        });
    });
});
