import { ProductSelectorOptimizationService } from './product-selector-optimization.service';
import { toggle, optimizationLevel } from '../product-selector.constants';

describe('ProductSelectorOptimizationService', () => {
    let sut;
    beforeEach(() => {
        sut = new ProductSelectorOptimizationService();
    });

    describe('build optimize level', () => {
        it('should be set for search sector', () => {
            expect(sut.buildLevels(toggle.SECTOR_SEARCH)).toEqual([
                optimizationLevel.category,
                optimizationLevel.sector
            ]);
        });

        it('should be set for search brand', () => {
            expect(sut.buildLevels(toggle.BRAND_SEARCH)).toEqual([
                optimizationLevel.category,
                optimizationLevel.sector,
                optimizationLevel.brandGroup,
                optimizationLevel.brand
            ]);
        });

        it('should be set for search sub brand', () => {
            expect(sut.buildLevels(toggle.SUB_BRAND_SEARCH)).toEqual([
                optimizationLevel.category,
                optimizationLevel.sector,
                optimizationLevel.brandGroup,
                optimizationLevel.brand,
                optimizationLevel.subBrands
            ]);
        });

        it('should be set for search version', () => {
            expect(sut.buildLevels(toggle.VERSION_SEARCH)).toEqual([
                optimizationLevel.category,
                optimizationLevel.sector,
                optimizationLevel.brandGroup,
                optimizationLevel.brand,
                optimizationLevel.subBrands,
                optimizationLevel.versions
            ]);
        });

        it('should be set for search form', () => {
            expect(sut.buildLevels(toggle.FORM_SEARCH)).toEqual([
                optimizationLevel.category,
                optimizationLevel.sector,
                optimizationLevel.brandGroup,
                optimizationLevel.brand,
                optimizationLevel.subBrands,
                optimizationLevel.versions,
                optimizationLevel.forms
            ]);
        });

        it('should be set for toggle sector', () => {
            expect(sut.buildLevels(toggle.SECTOR_TOGGLE)).toEqual([
                optimizationLevel.brandGroup,
                optimizationLevel.brand
            ]);
        });

        it('should be set for toggle brand on', () => {
            expect(sut.buildLevels(toggle.BRAND_TOGGLE_ON)).toEqual([optimizationLevel.subBrands]);
        });

        it('should be set for toggle brand off', () => {
            expect(sut.buildLevels(toggle.BRAND_TOGGLE_OFF)).toEqual([optimizationLevel.subBrands]);
        });

        it('should be set for toggle sub brand', () => {
            expect(sut.buildLevels(toggle.SUB_BRAND_TOGGLE)).toEqual([optimizationLevel.versions]);
        });

        it('should be set for toggle version', () => {
            expect(sut.buildLevels(toggle.VERSION_TOGGLE)).toEqual([optimizationLevel.forms]);
        });

        it('should be set for toggle form', () => {
            expect(sut.buildLevels(toggle.FORM_TOGGLE)).toEqual([optimizationLevel.forms]);
        });
    });
});
