import { Injectable } from '@angular/core';
import { SelectionService } from '../../../../core/services/selection.service';
import { filterCollections } from './filter-coupon-campaign.constants';

@Injectable()
export class FilterBrandsService extends SelectionService {

    constructor() {
        super(filterCollections.brands);
    }
}
