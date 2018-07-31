import { Injectable } from '@angular/core';
import { optimizationLevel, toggle } from '../product-selector.constants';

@Injectable()
export class ProductSelectorOptimizationService {

    constructor() {}

    buildLevelsParam(activeToggle: toggle): string {
        return this.buildLevels(activeToggle).join(',');
    }

    private buildLevels(activeToggle: toggle): string[] {

        switch (activeToggle) {
            /**
             *  For optimization purposes we need to set level param in order to exclude
             *  section which needed to be reset.
             */
            case toggle.SECTOR_SEARCH:
                return [
                    optimizationLevel.category,
                    optimizationLevel.sector
                ];

            case toggle.BRAND_SEARCH:
                return [
                    optimizationLevel.category,
                    optimizationLevel.sector,
                    optimizationLevel.brandGroup,
                    optimizationLevel.brand
                ];

            case toggle.SUB_BRAND_SEARCH:
                return [
                    optimizationLevel.category,
                    optimizationLevel.sector,
                    optimizationLevel.brandGroup,
                    optimizationLevel.brand,
                    optimizationLevel.subBrands
                ];

            case toggle.VERSION_SEARCH:
                return [
                    optimizationLevel.category,
                    optimizationLevel.sector,
                    optimizationLevel.brandGroup,
                    optimizationLevel.brand,
                    optimizationLevel.subBrands,
                    optimizationLevel.versions
                ];

            case toggle.FORM_SEARCH:
                return [
                    optimizationLevel.category,
                    optimizationLevel.sector,
                    optimizationLevel.brandGroup,
                    optimizationLevel.brand,
                    optimizationLevel.subBrands,
                    optimizationLevel.versions,
                    optimizationLevel.forms
                ];

            case toggle.SECTOR_TOGGLE:
                return [
                    optimizationLevel.brandGroup,
                    optimizationLevel.brand
                ];

            case toggle.BRAND_TOGGLE_ON:
            case toggle.BRAND_TOGGLE_OFF:
                return [optimizationLevel.subBrands];

            case toggle.SUB_BRAND_TOGGLE:
                return [optimizationLevel.versions];

            case toggle.VERSION_TOGGLE:
            case toggle.FORM_TOGGLE:
                return [optimizationLevel.forms];
        }
    }
}
