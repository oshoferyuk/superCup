import { TabsCouponCampaignComponent } from './tabs-coupon-campaign.component';
import { Observable } from 'rxjs/Observable';
import { OfferList } from '../models/offer-list.model';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TabsCouponCampaignComponent', () => {
    let sut;
    let newList;
    let offerList;
    let mockResult;
    let mockOffers;
    let mockOfferList;
    let OfferListStore;
    let OfferListService;
    let OfferFilterService;
    let MaskService;
    let OfferSelectionService;
    let ExportDialogService;
    const params = Symbol('params');

    beforeEach(() => {
        mockResult = {value: 'test'};
        mockOffers = {campaignId: 1};
        mockOfferList = new OfferList();
        mockOfferList.offers = [];
        offerList = new OfferList();
        offerList.tab = 'ALL';
        offerList.totals = {
            ALL: 137,
            DRAFT: 20,
            UPCOMING: 70,
            ACTIVE: 35,
            EXPIRED: 12
        };
        newList = new OfferList();
        newList.tab = 'DRAFT';
        newList.totals = {
            ALL: 138,
            DRAFT: 21,
            UPCOMING: 71,
            ACTIVE: 36,
            EXPIRED: 13
        };

        OfferListService = {
            getOffers: jasmine.createSpy('getOffers'),
            getOffersViaFilter: jasmine.createSpy('getOffersViaFilter'),
            exportOffers: jasmine.createSpy('exportOffers'),
        };

        OfferFilterService = {
            getFiltersParams: jasmine.createSpy('getFiltersParams').and.returnValue(params),
            isSomeFiltersSelected: jasmine.createSpy('isSomeFiltersSelected').and.returnValue(Observable.timer(1).map(() => true))
        };

        OfferListStore = {
            get: jasmine.createSpy('get').and.returnValue(offerList),
            update: jasmine.createSpy('update').and.returnValue(mockResult),
            onUpdate: jasmine.createSpy('onUpdate').and.returnValue(Observable.timer(1).map(() => newList))
        };

        MaskService = {
            onlyNumberMask: jasmine.createSpy('onlyNumberMask')
        };

        OfferSelectionService = {
            getSelectedPrintableOfferIds: jasmine.createSpy('getSelectedPrintableOfferIds')
        };

        ExportDialogService = {
            showExportDialog: jasmine.createSpy('showExportDialog')
        };

        sut = new TabsCouponCampaignComponent(
            OfferFilterService,
            OfferListService,
            OfferListStore,
            MaskService,
            OfferSelectionService,
            ExportDialogService
        );
        sut.clickFiltersButton = {emit: jasmine.createSpy('getFiltersParams')};
        sut.getSearchOffer = {
            emit: jasmine.createSpy('emit').and.returnValue(mockResult)
        };

        sut.ngOnInit();
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });
        it('should emit boolean value', () => {
            expect(sut.clickFiltersButton.emit).toHaveBeenCalledWith(sut.isExpanded);
        });
        it('should get active tab', () => {
            expect(sut.activeTab).toEqual('ALL');
        });

        it('should subscribe on offer list updates', () => {
            expect(OfferListStore.onUpdate).toHaveBeenCalled();
        });

        it('should subscribe on change filter selection', () => {
            expect(OfferFilterService.isSomeFiltersSelected).toHaveBeenCalled();
        });
    });

    describe('when new data arrived', () => {
        beforeEach(fakeAsync(() => {
            sut.ngOnInit();
            tick(1);
        }));

        it('should update active tab', fakeAsync(() => {
            expect(sut.activeTab).toEqual('DRAFT');
        }));

        it('should update total tab All', fakeAsync(() => {
            expect(sut.totalAll).toEqual(138);
        }));

        it('should update total tab Draft', fakeAsync(() => {
            expect(sut.totalDraft).toEqual(21);
        }));

        it('should update total tab Upcoming', fakeAsync(() => {
            expect(sut.totalUpcoming).toEqual(71);
        }));

        it('should update total tab Active', fakeAsync(() => {
            expect(sut.totalActive).toEqual(36);
        }));

        it('should update total tab Expired', fakeAsync(() => {
            expect(sut.totalExpired).toEqual(13);
        }));

        it('should return true if some checkbox is selected', fakeAsync(() => {
            expect(sut.showApplyFilterButton).toBeTruthy();
        }));
    });

    describe('send request with filters', () => {
        it('should emit expanded value', () => {
            sut.isExpanded = false;
            sut.expandFilters();
            expect(sut.clickFiltersButton.emit).toHaveBeenCalledWith(true);
        });
    });

    describe('show apply filter button', () => {
        it('should show apply filter button', () => {
            sut.isExpanded = true;
            sut.showApplyFilterButton = true;
            expect(sut.isShowButton()).toBeTruthy();
        });
    });

    describe('search', () => {

        it('get offers', () => {
            sut.searchChange(mockResult);
            expect(OfferListService.getOffers).toHaveBeenCalledWith({campaignId: mockResult.value});
        });
    });

    describe('check tabs', () => {
        it('should check active tab', () => {
            sut.activeTab = offerList.tab;
            expect(sut.isActiveTab(offerList.tab)).toBeTruthy();
        });

        it('should update offer list', () => {
            sut.changeTab(offerList.tab);
            const param = {tab: offerList.tab};
            expect(OfferListService.getOffers).toHaveBeenCalledWith(param);
        });
    });

    describe('download report', () => {
        describe('when no offer selected', () => {
            beforeEach(() => {
                OfferSelectionService.getSelectedPrintableOfferIds.and.returnValue([]);
                sut.downloadReport();
            });

            it('should show export error dialog', () => {
                expect(ExportDialogService.showExportDialog).toHaveBeenCalled();
            });
        });

        describe('when one offer selected', () => {
            beforeEach(() => {
                OfferSelectionService.getSelectedPrintableOfferIds.and.returnValue([1]);
                sut.downloadReport();
            });

            it('should call export offers with one id', () => {
                expect(OfferListService.exportOffers).toHaveBeenCalledWith('id=1');
            });
        });

        describe('when multiple offer selected', () => {
            beforeEach(() => {
                OfferSelectionService.getSelectedPrintableOfferIds.and.returnValue([1, 2, 3]);
                sut.downloadReport();
            });

            it('should call export offers with all ids', () => {
                expect(OfferListService.exportOffers).toHaveBeenCalledWith('id=1&id=2&id=3');
            });
        });
    });
});
