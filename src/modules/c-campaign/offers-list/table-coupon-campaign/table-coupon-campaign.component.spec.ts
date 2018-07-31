import { TableCouponCampaignComponent, ascSortClass, descSortClass } from './table-coupon-campaign.component';
import { Observable } from 'rxjs/Rx';
import { OfferList } from '../models/offer-list.model';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TableCouponCampaignComponent', () => {
    let sut;
    let OfferListStore;
    let OfferListService;
    let OfferService;
    let OfferSelectionService;
    let Router;

    beforeEach(() => {
        OfferListStore = {
            get: jasmine.createSpy('get'),
            onUpdate: jasmine.createSpy('onUpdate')
        };
        OfferListService = {
            sortOffers: jasmine.createSpy('sortOffers')
        };
        OfferService = {
            getOfferDuplicate: jasmine.createSpy('getOfferDuplicate')
        };

        OfferSelectionService = {
            select: jasmine.createSpy('select'),
            deselect: jasmine.createSpy('deselect'),
            isSelected: jasmine.createSpy('isSelected'),
            selectAll: jasmine.createSpy('selectAll'),
            deselectAll: jasmine.createSpy('deselectAll'),
            isAllSelected: jasmine.createSpy('isAllSelected')
        };

        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        sut = new TableCouponCampaignComponent(
            OfferListStore,
            OfferListService,
            OfferService,
            OfferSelectionService,
            Router
        );
        sut.offers = [];
    });

    describe('on init', () => {
        let offerList;
        let mockOffers;
        let newList;
        let newOffers;

        beforeEach(() => {
            mockOffers = ['offer1', 'offer2'];
            offerList = new OfferList();
            offerList.countOnPage = 10;
            offerList.offers = mockOffers;

            newOffers = ['offer3'];
            newList = new OfferList();
            newList.countOnPage = 10;
            newList.offers = newOffers;

            OfferListStore.get.and.returnValue(offerList);
            OfferListStore.onUpdate.and.returnValue(Observable.timer(1).map(() => newList));
        });

        it('should subscribe on offer list updates', () => {
            sut.ngOnInit();

            expect(OfferListStore.onUpdate).toHaveBeenCalled();
        });

        it('should update offers when new data arrived', fakeAsync(() => {
            sut.ngOnInit();
            tick(1);

            expect(sut.offers).toEqual(newOffers);
        }));
    });

    describe('toggle sorting', () => {
        const sortField = 'mockedField';

        beforeEach(() => {
            sut.toggleSorting(sortField);
        });

        it('should toggle sort by field', () => {
            expect(sut.sorting[sortField]).toEqual(1);
            sut.toggleSorting(sortField);
            expect(sut.sorting[sortField]).toEqual(0);
        });

        it('should have only one sort type', () => {
            sut.toggleSorting('override');
            expect(OfferListService.sortOffers).toHaveBeenCalledWith({override: 1});
        });

        it('should get sorted offers', () => {
            expect(OfferListService.sortOffers).toHaveBeenCalledWith({mockedField: 1});
        });
    });

    describe('get sorting class', () => {
        const sortField = 'mockedField';

        it('should get desc class', () => {
            sut.sorting[sortField] = 1;
            expect(sut.getSortingClass(sortField)).toEqual(ascSortClass);
        });

        it('should get asc class', () => {
            sut.sorting[sortField] = 0;
            expect(sut.getSortingClass(sortField)).toEqual(descSortClass);
        });
    });

    describe('get category', () => {
        const offer = {categories: []};

        it('should return empty string when no categories', () => {
            expect(sut.getCategory(offer)).toEqual('');
        });

        it('should return empty category when there is only one', () => {
            const category = 'mockedCategory';
            offer.categories.push(category);

            expect(sut.getCategory(offer)).toEqual(category);
        });

        it('should return "Multiple Categories" when there are many categories', () => {
            const category = 'mockedCategory';
            offer.categories.push(category);
            offer.categories.push(category);

            expect(sut.getCategory(offer)).toEqual('Multiple Categories');
        });
    });

    describe('get type', () => {
        it('should return transformed type', () => {
            const mockOffer = {type: 'TYPE'};

            expect(sut.getType(mockOffer)).toEqual('type');
        });
    });

    describe('edit current offer', () => {
        const mockOfferId = {id: 1};

        it('should edit current offer', () => {
            sut.router = {navigate: jasmine.createSpy('navigate')};
            sut.editCurrentOffer(mockOfferId);

            expect(sut.router.navigate).toHaveBeenCalledWith(['constructor', 1]);
        });
    });

    describe('copy current offer', () => {
        const mockOfferId = {id: 1};

        it('should copy current offer', () => {
            OfferService.getOfferDuplicate.and.returnValue(Observable.of(mockOfferId));
            sut.copyCurrentOffer(mockOfferId);

            expect(sut.router.navigate).toHaveBeenCalledWith(['constructor', 1]);
        });
    });

    describe('selection', () => {
        const offer = {id: 1};

        beforeEach(() => {
            sut.offers = [offer];
        });

        it('should add selected during checked', () => {
            sut.toggleSelection(offer, true);
            expect(sut.offerSelectionService.select).toHaveBeenCalledWith(offer);
        });

        it('should remove selected during unchecked', () => {
            sut.toggleSelection(offer, false);
            expect(sut.offerSelectionService.deselect).toHaveBeenCalledWith(1);
        });

        it('should check whether offer is selected', () => {
            expect(sut.isSelected(1)).toBeFalsy();
        });

        it('should set all selected for checked', () => {
            sut.selectAll(true);
            expect(sut.offerSelectionService.selectAll).toHaveBeenCalled();
        });

        it('should set all selected for unchecked', () => {
            sut.selectAll(false);
            expect(sut.offerSelectionService.deselectAll).toHaveBeenCalled();
        });

        it('should check whether all selected ', () => {
            sut.isAllSelected();
            expect(sut.offerSelectionService.isAllSelected).toHaveBeenCalled();
        });
    });

    describe('click offers', () => {
        let event;
        const offer = Symbol('offer');
        beforeEach(() => {
            sut.editCurrentOffer = jasmine.createSpy('editCurrentOffer');

            event = {
                target: {
                    tagName: '',
                    parentElement: {
                        previousElementSibling: {
                            tagName: ''
                        }
                    },
                    attributes: {
                        getNamedItem: jasmine.createSpy('getNamedItem').and.returnValue(false)
                    }
                }
            };
        });

        describe('when select input', () => {
            describe('when input clicked', () => {
                beforeEach(() => {
                    event.target.tagName = 'INPUT';
                    sut.clickOffers(event, offer);
                });

                it('should not edit current offer', () => {
                    expect(sut.editCurrentOffer).not.toHaveBeenCalled();
                });
            });

            describe('when input label clicked', () => {
                beforeEach(() => {
                    event.target.parentElement.previousElementSibling.tagName = 'INPUT';
                    sut.clickOffers(event, offer);
                });

                it('should not edit current offer', () => {
                    expect(sut.editCurrentOffer).not.toHaveBeenCalled();
                });
            });
        });

        describe('when dropdown', () => {
            beforeEach(() => {
                event.target.attributes.getNamedItem.and.returnValue(true);
                sut.clickOffers(event, offer);
            });

            it('should not edit current offer', () => {
                expect(sut.editCurrentOffer).not.toHaveBeenCalled();
            });
        });

        describe('when clicked directly on offer', () => {
            beforeEach(() => {
                sut.clickOffers(event, offer);
            });

            it('should navigate to edit offer state', () => {
                expect(sut.editCurrentOffer).toHaveBeenCalledWith(offer);
            });
        });
    });
});
