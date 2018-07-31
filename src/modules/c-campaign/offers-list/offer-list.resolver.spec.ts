import { OfferListResolver } from './offer-list.resolver';

describe('OfferListResolver', () => {
    let sut;
    let OfferListService;
    let StorageService;
    let offers;

    beforeEach(() => {
        offers = 'mockedOffers';

        OfferListService = {
            getOffers: jasmine.createSpy('getOffers').and.returnValue(offers)
        };

        StorageService = {
            getData: jasmine.createSpy('getData')
        };

        sut = new OfferListResolver(
            OfferListService,
            StorageService
        );
    });

    describe('resolve', () => {
        let result;

        beforeEach(() => {
            result = sut.resolve();
        });

        it('should get offers', () => {
            expect(OfferListService.getOffers).toHaveBeenCalled();
        });

        it('should return offers', () => {
            expect(result).toEqual(offers);
        });
    });
});
