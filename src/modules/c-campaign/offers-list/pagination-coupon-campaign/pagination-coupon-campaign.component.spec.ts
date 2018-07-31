import { PaginationCouponCampaignComponent } from './pagination-coupon-campaign.component';
import { Observable } from 'rxjs/Observable';
import { OfferList } from '../models/offer-list.model';
import { fakeAsync, tick } from '@angular/core/testing';

describe('PaginationCouponCampaignComponent', () => {
    let sut;
    let OfferListStore;
    let OfferListService;

    beforeEach(() => {
        OfferListStore = {
            get: jasmine.createSpy('get'),
            onUpdate: jasmine.createSpy('onUpdate')
        };
        OfferListService = {
            getOffers: jasmine.createSpy('getOffers')
        };

        sut = new PaginationCouponCampaignComponent(
            OfferListStore,
            OfferListService
        );
    });

    describe('on init', () => {
        let offerList;
        let newList;

        beforeEach(() => {
            offerList = new OfferList();
            offerList.totalItems = 10;
            offerList.countOnPage = 5;

            newList = new OfferList();
            newList.totalItems = 100;
            newList.countOnPage = 10;

            OfferListStore.get.and.returnValue(offerList);
            OfferListStore.onUpdate.and.returnValue(Observable.timer(1).map(() => newList));
            sut.ngOnInit();
        });

        it('should subscribe on offer list updates', () => {
            expect(OfferListStore.onUpdate).toHaveBeenCalled();
        });

        describe('when new data arrived', () => {
            it('should update totalItems', fakeAsync(() => {
                sut.ngOnInit();
                tick(1);
                expect(sut.totalItems).toEqual(100);
            }));

            it('should update countOnPage', fakeAsync(() => {
                sut.ngOnInit();
                tick(1);
                expect(sut.countOnPage).toEqual(10);
            }));
        });
    });

    describe('on page changed', () => {
        it('should not send request when page is the same', () => {
            const page = 5;
            sut.currentPage = 4;
            sut.onPageChanged(page);

            expect(OfferListService.getOffers).not.toHaveBeenCalled();
        });

        it('should get new page offers', () => {
            const page = 5;
            const params = { currentPage: page - 1 };
            sut.currentPage = 1;
            sut.onPageChanged(page);

            expect(OfferListService.getOffers).toHaveBeenCalledWith(params);
        });
    });

    describe('on count changed', () => {
        it('should get new page offers', () => {
            const params = { countOnPage: sut.countOnPage };
            sut.countOnPage = 10;
            sut.onCountChange();

            expect(OfferListService.getOffers).toHaveBeenCalledWith(params);
        });
    });
});
