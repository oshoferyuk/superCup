import { OfferFilterService } from './offer-filter.service';
import { FiltersParams } from './models/filters.model';

describe('OfferFilterService', () => {
    let sut;
    let type;
    let params;
    let toggleAction;
    let OfferFilterStore;
    const selectedFilter = {
        segments: [{id: 0, name: 'Seg1'}],

    };
    const oldFilterList = {
        segments: [{id: 0, name: 'Seg1'}, {id: 1, name: 'Seg2'}],
        statuses: ['Stat1','Stat2'],
        categories: ['Cat1', 'Cat2'],
        brands: ['Brand1', 'Brand2'],
    };
    const newFilterList = {
        segments: [{id: 0, name: 'Seg1'}, {id: 1, name: 'Seg2'}],
        statuses: [{id: 0, name: 'Stat1'}, {id: 1, name: 'Stat2'}],
        categories: [{id: 0, name: 'Cat1'}, {id: 1, name: 'Cat2'}],
        brands: [{id: 0, name: 'Brand1'}, {id: 1, name: 'Brand2'}],
    };

    beforeEach(() => {
        toggleAction = Symbol('toggleAction');
        OfferFilterStore = {
            getSelected: jasmine.createSpy('getFiltersList').and.returnValue(selectedFilter)
        };

        sut = new OfferFilterService(
            OfferFilterStore
        );

        sut.toggleAction = { map: jasmine.createSpy('toggleAction')};
    });

    describe('get params', () => {

        beforeEach(() => {
            params = new FiltersParams();
            params.segments = '0';
        });

        it('should return params for request', () => {
            expect(sut.getFiltersParams()).toEqual(params);
        });
    });

    describe('change filter list', () => {
        it('should transform filter list', () => {
            expect(sut.changeFiltersList(oldFilterList)).toEqual(newFilterList);
        });
    });

    describe('check filter selection', () => {
        beforeEach(() => {
            type = 'segments';
        });

        it('should check if at least one filter is selected', () => {
            sut.isSomeFiltersSelected();
            expect(sut.toggleAction.map).toHaveBeenCalled();
        });

        it('should set true if all filter is selected', () => {
            sut.isAllSelectedByType(true, type);
            expect(sut.allFiltersSelected[type]).toBeTruthy();
        });

        it('should set true if all filter is deselected', () => {
            sut.isAllDeselectedByType(true, type);
            expect(sut.allFiltersDeselected[type]).toBeTruthy();
        });
    });
});
