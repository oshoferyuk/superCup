import { OfferListService, offersEndpoint, reportUrl, sortField } from './offer-list.service';
import { Observable } from 'rxjs/Observable';

describe('OfferListService', () => {
    let sut;
    let Http;
    let HttpHelperService;
    let OfferListStore;
    let ExportService;
    let offers;
    let makeHttpRequest;
    let searchParams;
    let StorageService;
    let OfferFilterStore;
    let OfferFilterService;
    let searchParamsFromStorage;

    beforeEach(() => {
        offers = 'mockedOffers';
        makeHttpRequest = Observable.of(offers);
        searchParams = 'mockedSearchParams';
        searchParamsFromStorage = { get: jasmine.createSpy('getParams')};

        Http = {
            get: jasmine.createSpy('get').and.returnValue(makeHttpRequest)
        };

        HttpHelperService = {
            transformToQuery: jasmine.createSpy('transformToQuery').and.returnValue(searchParams),
            appendMultipleField: jasmine.createSpy('transformToQuery'),
            transformStringToQuery:jasmine.createSpy('transformToQuery').and.returnValue(searchParamsFromStorage)
        };

        OfferListStore = {
            update: jasmine.createSpy('update')
        };

        ExportService = {
            openFile: jasmine.createSpy('openFile')
        };

        StorageService = {
            getData: jasmine.createSpy('getData'),
            setData: jasmine.createSpy('setData')
        };

        OfferFilterStore = {
            getSelected: jasmine.createSpy('getSelected')
        };

        OfferFilterService = {
            getFiltersParams: jasmine.createSpy('getFiltersParams')
        };

        sut = new OfferListService(
            Http,
            HttpHelperService,
            OfferListStore,
            ExportService,
            StorageService,
            OfferFilterStore,
            OfferFilterService
        );
    });

    describe('get offers', () => {
        let result;

        beforeEach(() => {
            result = sut.getOffers();
        });

        it('should make append sorting fileds', () => {
            expect(HttpHelperService.appendMultipleField).toHaveBeenCalledWith(sortField, sut.sortParams, searchParams);
        });

        it('should make request to get offers', () => {
            expect(Http.get).toHaveBeenCalledWith(offersEndpoint, searchParams);
        });

        it('should return offers observable', () => {
            expect(result).toEqual(makeHttpRequest);
        });
    });

    describe('get offers from storage params', () => {
        let result;

        beforeEach(() => {
            result = sut.getOffersByStorageParams();
        });

        it('should make request to get offers', () => {
            expect(Http.get).toHaveBeenCalledWith(offersEndpoint, searchParamsFromStorage);
        });

        it('should return offers observable', () => {
            expect(result).toEqual(makeHttpRequest);
        });
    });

    describe('sort offers', () => {
        const sorting = { type: 1, id: 0 };
        let result;

        beforeEach(() => {
            result = sut.sortOffers(sorting);
        });

        it('should form sorting params', () => {
            expect(sut.sortParams).toEqual({ type: 'ASC', id: 'DESC' });
        });

        it('should make append sorting fileds', () => {
            expect(HttpHelperService.appendMultipleField).toHaveBeenCalledWith(sortField, sut.sortParams, searchParams);
        });

        it('should make request to get offers', () => {
            expect(Http.get).toHaveBeenCalledWith(offersEndpoint, searchParams);
        });

        it('should return offers observable', () => {
            expect(result).toEqual(makeHttpRequest);
        });
    });

    describe('export offers', () => {
        it('should not open exported file if no offer selected', () => {
            sut.exportOffers(null);

            expect(ExportService.openFile).not.toHaveBeenCalled();
        });

        it('should open exported file if any offer selected', () => {
            const ids = 'ids';
            sut.exportOffers('ids');

            expect(ExportService.openFile).toHaveBeenCalledWith(`${reportUrl}${ids}`);
        });
    });
});
