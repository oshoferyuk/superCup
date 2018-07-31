import { Injectable } from '@angular/core';
import { OfferFilterStore } from './offer-filter.store';
import { filtersTypes } from './filter-coupon-campaign/filter-coupon-campaign.constants';
import { Filters, FiltersParams, SelectedFilters, Filter, FiltersGroupSelected } from './models/filters.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfferFilterService {
    toggleAction: Subject<boolean> = new Subject<boolean>();
    allFiltersSelected: FiltersGroupSelected = new FiltersGroupSelected();
    allFiltersDeselected: FiltersGroupSelected = new FiltersGroupSelected();

    constructor(private offerFilterStore: OfferFilterStore) {
    }

    getFiltersParams(): FiltersParams {
        const selected = this.offerFilterStore.getSelected();
        return this.prepareFiltersParams(selected);
    }

    changeFiltersList(filtersList: Filters): any {
        const newFilterList = Object.assign({}, filtersList);
        for (const key in filtersList) {
            if (filtersList.hasOwnProperty(key) && key !== filtersTypes.segments) {
                newFilterList[key] = filtersList[key].map((filter, index) => {
                    return {id: index, name: filter};
                });
            }
        }
        return newFilterList;
    }

    isSomeFiltersSelected(): Observable<boolean> {
        return this.toggleAction.map(() => {
            const result = [];
            const selectedFilters: SelectedFilters = this.offerFilterStore.getSelected();
            for (const key in selectedFilters) {
                if (selectedFilters.hasOwnProperty(key)) {
                    result.push(selectedFilters[key].size > 0);
                }
            }
            return result.some(item => item);
        });
    }

    isAllSelectedByType(value: boolean, type: string): void {
        this.allFiltersSelected[type] = value;
    }

    isAllDeselectedByType(value: boolean, type: string): void {
        this.allFiltersDeselected[type] = value;
    }

    private prepareFiltersParams(selectedFilters: SelectedFilters): any {
        const params: FiltersParams = new FiltersParams();
        for (const key in selectedFilters) {
            if (selectedFilters.hasOwnProperty(key)) {
                if (this.allFiltersSelected[key] || this.allFiltersDeselected[key]) {
                    params[key] = '';
                } else {
                    params[key] = this.createParamsString(selectedFilters[key], key);
                }
            }
        }
        return params;
    }

    private createParamsString(collection: Set<Filter>, key: string): string {
        if (key === filtersTypes.segments) {
            return this.paramsStringMaker(collection, key);
        } else {
            return this.paramsStringMaker(collection);
        }
    }

    private paramsStringMaker(collection: Set<Filter>, segments?: string): string {
        let paramsString = '';
        collection.forEach((filter) => {
            segments
                ?   paramsString += `${filter.id},`
                :   paramsString += `${filter.name},`;
        });
        return paramsString.slice(0, -1);
    }
}
