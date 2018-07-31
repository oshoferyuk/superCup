import { Observable } from 'rxjs/Rx';
import { ProductsDialogComponent } from './products-dialog.component';
import { toggle, optimizationLevel } from '../product-selector.constants';

describe('ProductsDialogComponent', () => {
    let sut;
    let overlay;
    let MdDialogRef;
    let ChangeDetectorRef;
    let productSelectorService;
    let productSelectorOptimizationService;
    let productSearch;
    let sProgram;
    let search;
    let mock_data;
    let deactivateMock;
    let searchBlur;
    let input;

    beforeEach(() => {
        overlay = {};
        mock_data = {
            sectors: [{test: 'test'}],
            brands: [{test: 'test'}],
            subbrands: [{test: 'test'}],
            versions: [{test: 'test'}],
            forms: [{test: 'test'}]
        };
        sProgram = jasmine.createSpy('searchProgram').and.returnValue(Observable.of(mock_data));
        MdDialogRef = {open: jasmine.createSpy('close').and.returnValue(23)};
        productSelectorService = jasmine.createSpyObj('productSelectorService', [
            'getTotalGtins',
            'setSelectionResult'
        ]);

        productSelectorOptimizationService = jasmine.createSpyObj('productSelectorOptimizationService', [
            'buildLevelsParam'
        ]);

        ChangeDetectorRef = {
            detectChanges: jasmine.createSpy('detectChanges')
        };

        productSearch = {searchProgram: sProgram};
        search = 'search';
        searchBlur = {value: search, blur: jasmine.createSpy('blur')};
        deactivateMock = {node: {blur: jasmine.createSpy('blur')}};

        sut = new ProductsDialogComponent(
            overlay,
            MdDialogRef,
            productSearch,
            productSelectorService,
            productSelectorOptimizationService,
            ChangeDetectorRef
        );
        sut.setTotalGtins = jasmine.createSpy('setTotalGtins');
    });

    it('can copy result with ramain selection with empty list', () => {
        const oldValues = [{name: 'one'}, {name: 'first'}];
        const newValues = [];
        expect(sut.copyWithSelectionList(oldValues, newValues))
            .toEqual([]);
    });

    it('can copy result with ramain selection with list', () => {
        const oldValues = [{name: 'one', isSelected: true}, {name: 'first'}];
        const newValues = [{name: 'some'}, {name: 'one'}];
        expect(sut.copyWithSelectionList(oldValues, newValues))
            .toEqual([{name: 'some', isSelected: false}, {name: 'one', isSelected: true}]);
    });

    it('clearAndSearch empty input', () => {
        sut.buildLevels = jasmine.createSpy(('buildLevels')).and.returnValue([]);
        sut.clearAndSearch(searchBlur);
        expect(sut.searchData.version).toEqual('');
    });

    it('gets empty items', () => {
        sut.versions = [{isSelected: true, data: 'test'}];
        expect(sut.getItemsData().versions).toEqual([{isSelected: true, data: 'test'}]);
    });

    it('gets items', () => {
        sut.versions = [{isSelected: true, data: 'test'}];
        expect(sut.getItemsData().versions).toEqual([{isSelected: true, data: 'test'}]);
    });

    it('apply list button should be disabled if brand group not selected', () => {
        sut.selectedBrandGroup = {};
        expect(sut.isApplyListDisabled()).toBeTruthy();
    });

    it('apply list button should be enabled if brand group is selected', () => {
        sut.selectedBrandGroup = { name: 'brand', id: '123' };
        expect(sut.isApplyListDisabled()).toBeFalsy();
    });

    it('all sub brands are all checked', () => {
        sut.subBrands = [{isSelected: true, data: 'test'}, {isSelected: true, data: 'test2'}];
        expect(sut.isAllSubBrandsChecked()).toBeTruthy();
    });

    it('all sub brands are not all checked', () => {
        sut.subBrands = [{isSelected: true, data: 'test'}, {isSelected: false, data: 'test2'}];
        expect(sut.isAllSubBrandsChecked()).toBeFalsy();
    });

    it('all sub brands are all checked', () => {
        sut.versions = [{isSelected: true, data: 'test'}, {isSelected: true, data: 'test2'}];
        expect(sut.isAllVersionsChecked()).toBeTruthy();
    });

    it('all sub brands are not all checked', () => {
        sut.versions = [{isSelected: true, data: 'test'}, {isSelected: false, data: 'test2'}];
        expect(sut.isAllVersionsChecked()).toBeFalsy();
    });

    it('all forms are all checked', () => {
        sut.forms = [{isSelected: true, data: 'test'}, {isSelected: true, data: 'test2'}];
        expect(sut.isAllFormsChecked()).toBeTruthy();
    });

    it('all forms are not all checked', () => {
        sut.forms = [{isSelected: true, data: 'test'}, {isSelected: false, data: 'test2'}];
        expect(sut.isAllFormsChecked()).toBeFalsy();
    });

    it('all versions are visible', () => {
        sut.versions = [{isSelected: true, data: 'test'}, {isSelected: false, data: 'test2'}];
        expect(sut.isVersionsVisible()).toBeTruthy();
    });

    it('all versions are not visible', () => {
        sut.versions = [];
        expect(sut.isVersionsVisible()).toBeFalsy();
    });

    it('all versions are visible', () => {
        sut.forms = [{isSelected: true, data: 'test'}, {isSelected: false, data: 'test2'}];
        expect(sut.isFormsVisible()).toBeTruthy();
    });

    it('all versions are not visible', () => {
        sut.forms = [];
        expect(sut.isFormsVisible()).toBeFalsy();
    });

    it('all versions are visible', () => {
        sut.subBrands = [{isSelected: true, data: 'test'}, {isSelected: false, data: 'test2'}];
        expect(sut.isSubBrandsVisible()).toBeTruthy();
    });

    it('all versions are not visible', () => {
        sut.subBrands = [];
        expect(sut.isSubBrandsVisible()).toBeFalsy();
    });

    it('search section result', () => {
        sut.setSectionsResult = jasmine.createSpy('setSectionsResult');
        sut.buildLevels = jasmine.createSpy(('buildLevels')).and.returnValue([]);
        sut.searchRequest();
        expect(sut.setSectionsResult).toHaveBeenCalled();
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.setSectionsResultFromForm = jasmine.createSpy('setSectionsResultFromForm');
        });

        it('should have default theme', () => {
            sut.ngOnInit();
            expect(sut.overlayContainer.themeClass).toEqual('product-selector-modal');
        });

        describe('when has previous result', () => {
            const previousResult = Symbol('result');

            beforeEach(() => {
                sut.previousResult = previousResult;
                sut.ngOnInit();
            });

            it('should set result into form', () => {
                expect(sut.setSectionsResultFromForm).toHaveBeenCalledWith(previousResult);
            });
        });

        describe('when has no previous result', () => {
            beforeEach(() => {
                sut.previousResult = null;
                sut.ngOnInit();
            });

            it('should set result into form', () => {
                expect(sut.setSectionsResultFromForm).not.toHaveBeenCalled();
            });
        });
    });

    describe('search', () => {
        it('set all results after retreving for sector search', () => {
            sut.activeToggle = toggle.SECTOR_SEARCH;
            sut.setSectionsResult(mock_data);
            expect(sut.sectorNodes).toEqual([{test: 'test'}]);
            expect(sut.brands).toEqual([]);
            expect(sut.subBrands).toEqual([]);
            expect(sut.versions).toEqual([]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for brand search', () => {
            sut.activeToggle = toggle.BRAND_SEARCH;
            sut.setSectionsResult(mock_data);
            expect(sut.sectorNodes).toEqual([{test: 'test'}]);
            expect(sut.brands).toEqual([{test: 'test'}]);
            expect(sut.subBrands).toEqual([]);
            expect(sut.versions).toEqual([]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for sub brand search', () => {
            sut.activeToggle = toggle.SUB_BRAND_SEARCH;
            sut.setSectionsResult(mock_data);
            expect(sut.sectorNodes).toEqual([{test: 'test'}]);
            expect(sut.brands).toEqual([{test: 'test'}]);
            expect(sut.subBrands).toEqual([{test: 'test'}]);
            expect(sut.versions).toEqual([]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for version search', () => {
            sut.activeToggle = toggle.VERSION_SEARCH;
            sut.setSectionsResult(mock_data);
            expect(sut.sectorNodes).toEqual([{test: 'test'}]);
            expect(sut.brands).toEqual([{test: 'test'}]);
            expect(sut.subBrands).toEqual([{test: 'test'}]);
            expect(sut.versions).toEqual([{test: 'test'}]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for form search', () => {
            sut.activeToggle = toggle.FORM_SEARCH;
            sut.setSectionsResult(mock_data);
            expect(sut.sectorNodes).toEqual([{test: 'test'}]);
            expect(sut.brands).toEqual([{test: 'test'}]);
            expect(sut.subBrands).toEqual([{test: 'test'}]);
            expect(sut.versions).toEqual([{test: 'test'}]);
            expect(sut.forms).toEqual([{test: 'test'}]);
        });

        it('should call for change detection', () => {
            sut.setSectionsResult(mock_data);
            expect(ChangeDetectorRef.detectChanges).toHaveBeenCalled();
        });
    });

    describe('toggle', () => {
        it('set all results after retreving for sector toggle', () => {
            sut.activeToggle = toggle.SECTOR_TOGGLE;
            sut.setSectionsResult(mock_data);
            expect(sut.brands).toEqual([{test: 'test'}]);
            expect(sut.subBrands).toEqual([]);
            expect(sut.versions).toEqual([]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for brand toggle on', () => {
            sut.activeToggle = toggle.BRAND_TOGGLE_ON;
            sut.setSectionsResult(mock_data);
            expect(sut.subBrands).toEqual([{test: 'test'}]);
            expect(sut.versions).toEqual([]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for brand toggle off', () => {
            sut.activeToggle = toggle.BRAND_TOGGLE_OFF;
            sut.setSectionsResult(mock_data);
            expect(sut.subBrands).toEqual([]);
            expect(sut.versions).toEqual([]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for sub brand toggle on', () => {
            sut.activeToggle = toggle.SUB_BRAND_TOGGLE;
            sut.setSectionsResult(mock_data);
            expect(sut.versions).toEqual([{test: 'test'}]);
            expect(sut.forms).toEqual([]);
        });

        it('set all results after retreving for version toggle', () => {
            sut.activeToggle = toggle.VERSION_TOGGLE;
            sut.setSectionsResult(mock_data);
            expect(sut.forms).toEqual([{test: 'test'}]);
        });
    });

    it('toggle All version when checked', () => {
        sut.versions = [{isChecked: true}];
        sut.onToggleAllVersions({target: {checked: true}});
        expect(sut.versions).toEqual([{isChecked: true, isSelected: true}]);
    });

    it('toggle All version when unchecked', () => {
        sut.versions = [{isChecked: true}];
        sut.onToggleAllVersions({target: {checked: false}});
        expect(sut.versions).toEqual([{isChecked: true, isSelected: false}]);
    });

    it('toggle All version search', () => {
        sut.versions = [{isChecked: true, name: 'test1'}, {isChecked: true, name: 'test2'},];
        sut.onToggleAllVersions({target: {checked: true}});
        expect(sut.searchData.version).toEqual('test1, test2');
    });

    it('toggle All form when unchecked', () => {
        sut.forms = [{isChecked: true}];
        sut.onToggleAllForms({target: {checked: false}});
        expect(sut.forms).toEqual([{isChecked: true, isSelected: false}]);
    });

    it('toggle All form search', () => {
        sut.forms = [{isChecked: true, name: 'test1'}, {isChecked: true, name: 'test2'},];
        sut.onToggleAllForms({target: {checked: true}});
        expect(sut.searchData.form).toEqual('test1, test2');
    });


    it('toggle All sub brands when unchecked', () => {
        sut.subBrands = [{isChecked: true}];
        sut.onToggleAllSubBrands({target: {checked: false}});
        expect(sut.subBrands).toEqual([{isChecked: true, isSelected: false}]);
    });

    it('toggle All sub brands search', () => {
        sut.subBrands = [{isChecked: true, name: 'test1'}, {isChecked: true, name: 'test2'},];
        sut.onToggleAllSubBrands({target: {checked: true}});
        expect(sut.searchData.subbrand).toEqual('test1, test2');
    });


    it('is all forms are checked for empty form ', () => {
        sut.forms = null;
        expect(sut.isAllFormsChecked()).toBeFalsy();
    });

    it('is all forms are checked for  form ', () => {
        sut.forms = [{isSelected: true}, {isSelected: false}];
        expect(sut.isAllFormsChecked()).toBeFalsy();
    });

    it('is all versions are checked for empty form ', () => {
        sut.versions = null;
        expect(sut.isAllVersionsChecked()).toBeFalsy();
    });

    it('is all versions are checked for  form ', () => {
        sut.versions = [{isSelected: true}, {isSelected: false}];
        expect(sut.isAllVersionsChecked()).toBeFalsy();
    });

    it('is all versions are checked for  form ', () => {
        sut.versions = [{isSelected: true}, {isSelected: true}];
        expect(sut.isAllVersionsChecked()).toBeTruthy();
    });

    it('toggle form when checked', () => {
        const item = {isSelected: false};
        const all = [{isSelected: true, name: 'aaa'}, {isSelected: true, name: 'bbb'}];
        sut.onToggleForm(all, item);
        expect(item.isSelected).toBeTruthy();
        expect(sut.searchData.form).toEqual('aaa, bbb');
    });

    it('toggle form when unchecked', () => {
        const item = {isSelected: false};
        const all = [{isSelected: true, name: 'aaa'}, {isSelected: true, name: 'bbb'}];
        sut.onToggleForm(all, item);
        expect(item.isSelected).toBeTruthy();
        expect(sut.searchData.form).toEqual('aaa, bbb');
    });

    it('toggle form when checked', () => {
        const item = {isSelected: false};
        const all = [{isSelected: true, name: 'aaa'}, {isSelected: true, name: 'bbb'}];
        sut.onToggleVersion(all, item);
        expect(item.isSelected).toBeTruthy();
        expect(sut.searchData.version).toEqual('aaa, bbb');
    });

    it('toggle form when unchecked', () => {
        const item = {isSelected: false};
        const all = [{isSelected: true, name: 'aaa'}, {isSelected: true, name: 'bbb'}];
        sut.onToggleVersion(all, item);
        expect(item.isSelected).toBeTruthy();
        expect(sut.searchData.version).toEqual('aaa, bbb');
    });

    it('activated node sector', () => {
        sut.onNodeSectorActivated({
            node: {
                hasChildren: false,
                displayField: 'test',
                data: {name: 'category'}
            }
        });
        expect(sut.searchData.sector).toEqual('');
        expect(sut.searchData.category).toEqual('test');
        expect(sut.searchData.brand).toEqual('');
        expect(sut.searchData.subbrand).toEqual('');
        expect(sut.searchData.version).toEqual('');
        expect(sut.activeToggle).toEqual(toggle.SECTOR_TOGGLE);
    });

    it('activated node category', () => {
        sut.onNodeSectorActivated({
            node: {
                hasChildren: false,
                displayField: 'test',
                data: {name: 'category'}
            }
        });
        expect(sut.searchData.sector).toEqual('');
        expect(sut.searchData.category).toEqual('test');
    });

    it('activated node brand group', () => {
        sut.onNodeBrandGroupActivated({
            node: {
                hasChildren: false,
                displayField: 'test',
                data: {name: 'category'},
                parent: {data: this}
            }
        });
        expect(sut.searchData.subbrand).toEqual('');
    });

    it('deactivated sector node', () => {
        sut.onNodeSectorDeactivated(deactivateMock);
        expect(sut.searchData.sector).toEqual('');
        expect(sut.searchData.category).toEqual('');
        expect(sut.selectedCategory).toEqual('');
    });

    it('deactivated brand group node', () => {
        sut.onNodeBrandGroupDeactivated(deactivateMock);
        expect(sut.searchData.subbrand).toEqual('');
    });

    it('focus brand group node', () => {
        const event = {node: {hasChildren: true, blur: jasmine.createSpy('blur')}};
        sut.onNodeBrandGroupFocus(event);
        expect(event.node.blur).toHaveBeenCalled();
    });

    it('deactivated node should empty every sections', () => {
        sut.onNodeSectorDeactivated(deactivateMock);
        expect(sut.brands).toEqual([]);
        expect(sut.subBrands).toEqual([]);
        expect(sut.versions).toEqual([]);
        expect(sut.forms).toEqual([]);
    });

    it('deactivated node should recalculate total gtins', () => {
        sut.onNodeSectorDeactivated(deactivateMock);
        expect(sut.setTotalGtins).toHaveBeenCalled();
    });

    it('set correct search during toggle sub brand', () => {
        const item = {isSelected: false};
        const all = [{isSelected: true, name: 'aaa'}, {isSelected: true, name: 'bbb'}];
        sut.onToggleSubBrand(all, item);
        expect(item.isSelected).toBeTruthy();
        expect(sut.searchData.subbrand).toEqual('aaa, bbb');
    });

    describe('search status', () => {
        it('should set sector search', () => {
            sut.onSearchSectors(searchBlur);
            expect(sut.activeToggle).toEqual(toggle.SECTOR_SEARCH);
        });

        it('should set brands search', () => {
            sut.onSearchBrands(searchBlur);
            expect(sut.activeToggle).toEqual(toggle.BRAND_SEARCH);
        });

        it('should set sub brands search', () => {
            sut.onSearchSubBrands(searchBlur);
            expect(sut.activeToggle).toEqual(toggle.SUB_BRAND_SEARCH);
        });

        xit('should set version search', () => {
            sut.onsearchData.version(searchBlur);
            expect(sut.activeToggle).toEqual(toggle.VERSION_SEARCH);
        });

        it('should set form search', () => {
            sut.onSearchForms(searchBlur);
            expect(sut.activeToggle).toEqual(toggle.FORM_SEARCH);
        });
    });

    describe('search', () => {

        beforeEach(() => {
            sut.searchRequest = jasmine.createSpy('searchRequest');

            sut.searchFieldHasError = {
                section: false,
                brand: false,
            };
        });

        it('should set searchSectros during onSearchSectors', () => {
            sut.onSearchSectors(searchBlur);
            expect(sut.searchData.sector).toEqual('search');
            expect(sut.searchData.category).toEqual('search');
            expect(sut.searchData.version).toEqual('');
        });

        it('should set searchBrands during onSearchBrands', () => {
            sut.onSearchBrands(searchBlur);
            expect(sut.searchData.brand).toEqual(search);
            expect(sut.searchData.version).toEqual('');
        });

        it('should set searchSubBrands during onSearchBrands', () => {
            sut.onSearchSubBrands(searchBlur);
            expect(sut.searchData.subbrand).toEqual(search);
            expect(sut.searchData.version).toEqual('');
        });

        it('should set searchVersions during onSearchVersions', () => {
            sut.onSearchVersions(searchBlur);
            expect(sut.searchData.version).toEqual(search);
            expect(sut.searchData.form).toEqual('');
        });

        it('should set searchForms during onSearchForms', () => {
            sut.onSearchForms(searchBlur);
            expect(sut.searchData.form).toEqual(search);
        });

        it('should set searchForms during onSearchForms', () => {
            sut.onSearchForms(searchBlur);
            expect(sut.searchData.form).toEqual(search);
        });

        it('should be truthy if user input more than two symbols', () => {
            input = { value: '123' };
            expect(sut.isMoreThanTwoSymbols(input)).toBeTruthy();
        });

        it('should be Falsy if user input less than two symbols', () => {
            input = { value: '12' };
            expect(sut.isMoreThanTwoSymbols(input)).toBeFalsy();
        });

        it('should set error if user input less than two symbols', () => {
            const columnName = 'section';
            input = { value: '12' };

            sut.setSearchFieldError(input, columnName);
            expect(sut.searchFieldHasError[columnName]).toBeTruthy();
        });

        it('should clear error if user input more than two symbols', () => {
            const columnName = 'section';
            input = { value: '123' };

            sut.setSearchFieldError(input, columnName);
            expect(sut.searchFieldHasError[columnName]).toBeFalsy();
        });

        it('should not call search request if user input less than two symbols', () => {
            const columnName = 'section';
            input = { value: '12' };

            sut.clearAndSearch(input, columnName);
            expect(sut.searchRequest).not.toHaveBeenCalled();
        });

        it('should clear previous search field errors', () => {
            const columnName = 'section';
            input = { value: '123' };
            sut.searchFieldHasError = {
                section: true,
                brand: true,
            };
            sut.setSearchFieldError(input, columnName);

            expect(sut.searchFieldHasError).toEqual({
                section: false,
                brand: false,
            });
        });
    });
});
