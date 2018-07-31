import { ProductSelectorService } from './product-selector.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('ProductSelectorService', () => {
    let sut;
    let gtinResult;
    let itemsData;
    let productSummaries;
    let productSummariesItem1;
    let productSummariesItem2;

    beforeEach(() => {
        sut = new ProductSelectorService();
    });

    describe('gtins manipulation', () => {
        beforeEach(() => {
            gtinResult = [{gtin: 12345678, id: 1}, {gtin: 12345678, id: 2}];

            sut.selectionResult = {
                totalItems: 2,
                productBrandGroup: 'test/test'
            };

            itemsData = {
                selectedCategory: {count: 10},
                selectedBrandGroup: {count: 20},
                sectorNodes: [
                    {
                        name: 'sectorNodes',
                        count: 10,
                        children: [
                            {
                                name: 'children',
                                count: 644,
                                children: [
                                    {
                                        name: 'children2',
                                        count: 666
                                    }
                                ]
                            }
                        ]
                    }
                ],
                brands: [
                    {
                        name: 'brandGroupNodes',
                        count: 11,
                        children: [
                            {
                                name: 'children',
                                count: 645,
                                children: [
                                    {
                                        name: 'children2',
                                        count: 667
                                    }
                                ]
                            }
                        ]
                    }
                ],
                subBrands: [{name: 'subBrands', count: 30, isSelected: true}, {name: 'subBrands2', count: 4, isSelected: true}],
                versions: [{name: 'versions', count: 40, isSelected: true}, {name: 'versions2', count: 5, isSelected: true}],
                forms: [{name: 'forms', count: 50, isSelected: true}, {name: 'forms2', count: 6, isSelected: true}]
            };
        });

        it('should get gtins number summary by each category', () => {
            const result = {sector: 10, brands: 20, subBrands: 34, versions: 45, form: 56, sum: 2};
            expect(sut.getTotalGtins(itemsData, gtinResult)).toEqual(result);
        });

        it('should get selected gtins', () => {
            const result = {sector: 10, brands: 20, subBrands: 34, versions: 45, form: 56, sum: 2};
            expect(sut.getTotalGtins(itemsData, gtinResult)).toEqual(result);
        });

        it('should return 0 if productSummaries not selected', () => {
            const result = {sector: 10, brands: 20, subBrands: 0, versions: 0, form: 0, sum: 2};

            itemsData.selectedCategory = {count: 10};
            itemsData.selectedBrandGroup = {count: 20};
            itemsData.brands = [{name: 'brands', count: 20, isSelected: false}, {name: 'brands2', count: 3, isSelected: false}];
            itemsData.subBrands = [{name: 'subBrands', count: 30, isSelected: false}, {name: 'subBrands2', count: 4, isSelected: false}];
            itemsData.versions = [{name: 'versions', count: 40, isSelected: false}, {name: 'versions2', count: 5, isSelected: false}];
            itemsData.forms = [{name: 'forms', count: 50, isSelected: false}, {name: 'forms2', count: 6, isSelected: false}];

            expect(sut.getTotalGtins(itemsData)).toEqual(result);
        });

        it('should calculate total gtins by one category', () => {
            const result = 45;
            expect(sut.calculateTotalGtins(itemsData.versions)).toEqual(result);
        });

        it('should get default value if no item selected in category', () => {
            itemsData.subBrands = [];
            const result = 0;
            expect(sut.calculateTotalGtins(itemsData.subBrands)).toEqual(result);
        });

        it('should get brand group if it is present', () => {
            expect(sut.brandGroup).toEqual(sut.selectionResult.productBrandGroup);
        });

        it('should get brand group as empty string if result is not presented', () => {
            sut.selectionResult = null;
            expect(sut.brandGroup).toEqual('');
        });
    });

    describe('deselect and delete product summary item', () => {
        beforeEach(() => {
            productSummariesItem1 = "Sector 1^Category 1^Brand Family 1^Brand 1^subBrands^versions^forms";
            productSummariesItem2 = "Sector 1^Category 1^Brand Family 1^Brand 1^subBrands2^versions2^forms2";

            productSummaries = {
                [productSummariesItem1]: [
                    {"uid":"4fbf7ec2-7c2c-11e7-bb31-be2e44b06b34","gtin":"14785696325689"},
                    {"uid":"4fbf81ac-7c2c-11e7-bb31-be2e44b06b34","gtin":"85236947895212"}
                ],

                [productSummariesItem2]: [
                    {"uid":"4fbf7ec2-7c2c-11e7-bb31-be2e44b06b34","gtin":"14785696325689"},
                    {"uid":"4fbf81ac-7c2c-11e7-bb31-be2e44b06b34","gtin":"85236947895212"}
                ]
            };

            sut.productSummaries = new BehaviorSubject({});

            sut.selectionResult = {
                totalItems: 2,
                sectorState: {focusedNodeId: '1'},
                brandgroupState: {focusedNodeId: '2'},
                subBrands: [{name: 'subBrands', count: 30, isSelected: true}, {name: 'subBrands2', count: 4, isSelected: true}],
                versions: [{name: 'versions', count: 40, isSelected: false}, {name: 'versions2', count: 5, isSelected: true}],
                forms: [{name: 'forms', count: 50, isSelected: true}, {name: 'forms2', count: 6, isSelected: true}]
            };
        });

        it('should delete item', () => {
            const result = {
                [productSummariesItem2]: [
                    {"uid":"4fbf7ec2-7c2c-11e7-bb31-be2e44b06b34","gtin":"14785696325689"},
                    {"uid":"4fbf81ac-7c2c-11e7-bb31-be2e44b06b34","gtin":"85236947895212"}
                ]
            };
            sut.deselectItem(productSummariesItem1, productSummaries);

            expect(sut.productSummaries.getValue()).toEqual(result);
        });

        it('should deselect item', () => {
            const result = {
                totalItems: 2,
                sectorState: {focusedNodeId: '1'},
                brandgroupState: {focusedNodeId: '2'},
                subBrands: [{name: 'subBrands', count: 30, isSelected: false}, {name: 'subBrands2', count: 4, isSelected: true}],
                versions: [{name: 'versions', count: 40, isSelected: false}, {name: 'versions2', count: 5, isSelected: true}],
                forms: [{name: 'forms', count: 50, isSelected: false}, {name: 'forms2', count: 6, isSelected: true}]
            };

            sut.deselectItem(productSummariesItem1, productSummaries);
            expect(sut.selectionResult).toEqual(result);
        });

        it('should deselect last item', () => {
            const result = {
                totalItems: 0,
                sectorState: {},
                brandgroupState: {},
                subBrands: [{name: 'subBrands', count: 30, isSelected: false}, {name: 'subBrands2', count: 4, isSelected: false}],
                versions: [{name: 'versions', count: 40, isSelected: false}, {name: 'versions2', count: 5, isSelected: false}],
                forms: [{name: 'forms', count: 50, isSelected: false}, {name: 'forms2', count: 6, isSelected: false}]
            };

            sut.deselectItem(productSummariesItem1, productSummaries);
            sut.deselectItem(productSummariesItem2, productSummaries);
            expect(sut.selectionResult).toEqual(result);
        });
    });
});
