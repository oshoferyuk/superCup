import { FilterCouponCampaignComponent } from './filter-coupon-campaign.component';
import { filtersTypes, filterServices } from './filter-coupon-campaign.constants';

describe('FilterCouponCampaignComponent', () => {
    let sut;
    let ActivatedRoute;
    let OfferFilterStore;
    let OfferFilterService;
    let FilterSegmentsService;
    let FilterStatusesService;
    let FilterCategoriesService;
    let FilterBrandsService;
    let StorageService;

    const list = {
        segments: [{id: 0, name: 'Seg1'}, {id: 1, name: 'Seg2'}],
        statuses: ['Stat1','Stat2'],
        categories: ['Cat1', 'Cat2'],
        brands: ['Brand1', 'Brand2'],
    };

    const filterList = {
        segments: [{id: 0, name: 'Seg1'}, {id: 1, name: 'Seg2'}],
        statuses: [{id: 0, name: 'Stat1'}, {id: 1, name: 'Stat2'}],
        categories: [{id: 0, name: 'Cat1'}, {id: 1, name: 'Cat2'}],
        brands: [{id: 0, name: 'Brand1'}, {id: 1, name: 'Brand2'}],
    };

    beforeEach(() => {
        ActivatedRoute = { snapshot : { data : { filtersList: list}}};
        OfferFilterService = {
            changeFiltersList: jasmine.createSpy('changeFiltersList').and.returnValue(filterList),
            toggleAction: {next: jasmine.createSpy('emitToggleAction')},
            isSomeFiltersSelected: jasmine.createSpy('isSomeFiltersSelected'),
            isAllSelectedByType: jasmine.createSpy('isAllSelectedByType'),
            isAllDeselectedByType: jasmine.createSpy('isAllDeselectedByType')
        };
        OfferFilterStore = {
            setSelected: jasmine.createSpy('setSelected')
        };
        FilterSegmentsService = {};
        FilterStatusesService = {};
        FilterCategoriesService = {};
        FilterBrandsService = {};
        StorageService = {
            getData: jasmine.createSpy('getData').and.returnValue('{"statuses":[{"id":0,"name":"Stat1"}]}')
        };

        sut = new FilterCouponCampaignComponent(
                ActivatedRoute,
                OfferFilterStore,
                OfferFilterService,
                FilterSegmentsService,
                FilterStatusesService,
                FilterCategoriesService,
                FilterBrandsService,
                StorageService
        );

    });

    describe('on init', () => {
        beforeEach(() => {
            sut.toggleSelection = jasmine.createSpy('toggleSelection');
            sut.ngOnInit();

        });
        it('should get filter list', () => {
            expect(sut.filtersList).toEqual(filterList);
        });
        it('should set form types', () => {
            expect(sut.filtersTypes).toEqual(filtersTypes);
        });
    });

    describe('check changing selection', () => {

        beforeEach(() => {
            sut[filterServices.segments] = {
                select: jasmine.createSpy('select'),
                deselect: jasmine.createSpy('deselect'),
                isSelected: jasmine.createSpy('isSelected').and.returnValue(true),
                selectAll: jasmine.createSpy('selectAll'),
                isAllSelected: jasmine.createSpy('isAllSelected').and.returnValue(false),
                isAllDeselected: jasmine.createSpy('isAllDeselected').and.returnValue(false),
                getSelected: jasmine.createSpy('getSelected').and.returnValue(filterList.segments[0])
            };
            sut.filtersList = filterList;
            sut.toggleSelection(filterList.segments[0], true, filtersTypes.segments);
        });

        it('should select checkbox', () => {
            sut.toggleSelection(filterList.segments[0], true, filtersTypes.segments);
            expect(sut[filterServices.segments].select).toHaveBeenCalledWith(filterList.segments[0]);
        });

        it('should deselect checkbox', () => {
            sut.toggleSelection(filterList.segments[0], false, filtersTypes.segments);
            expect(sut[filterServices.segments].deselect).toHaveBeenCalledWith(filterList.segments[0]);
        });

        it('should save selected checkbox in store', () => {
            expect(OfferFilterStore.setSelected).toHaveBeenCalledWith(
                    sut[filterServices.segments].getSelected(),
                    filtersTypes.segments
            );
        });

        it('should check ia all filter selected', () => {
            expect(OfferFilterService.isAllSelectedByType).toHaveBeenCalledWith(
                    sut.isAllSelected(filtersTypes.segments),
                    filtersTypes.segments
            );
        });

        it('should check ia all filter deselected', () => {
            expect(OfferFilterService.isAllDeselectedByType).toHaveBeenCalledWith(
                    sut.isAllDeselected(filtersTypes.segments),
                    filtersTypes.segments
            );
        });

        it('should return true if checkbox is selected', () => {
            expect(sut.isSelected).toBeTruthy();
        });

        it('should select all checkboxes', () => {
            sut.selectAll(true, filtersTypes.segments);
            expect(sut[filterServices.segments].selectAll).toHaveBeenCalledWith(filterList.segments);
        });

        it('should return true if all checkboxes is selected', () => {
            sut.isAllSelected(filtersTypes.segments);
            expect(sut[filterServices.segments].isAllSelected).toHaveBeenCalledWith(filterList.segments);
        });

        it('should return true if all checkboxes is deselected', () => {
            sut.isAllDeselected(filtersTypes.segments);
            expect(sut[filterServices.segments].isAllDeselected).toHaveBeenCalledWith(filterList.segments);
        });
    });
});
