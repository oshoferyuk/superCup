import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Filters, Filter } from '../models/filters.model';
import { filtersTypes, filterServices } from './filter-coupon-campaign.constants';
import { OfferFilterService } from '../offer-filter.service';
import { OfferFilterStore } from '../offer-filter.store';
import { FilterSegmentsService } from './filter-segments.service';
import { FilterStatusesService } from './filter-statuses.service';
import { FilterCategoriesService } from './filter-categories.service';
import { FilterBrandsService } from './filter-brands.service';
import { StorageService, storageParams} from '../../../../core/services/storage.service';

@Component({
    selector: 'fp-filter-coupon-campaign',
    templateUrl: './filter-coupon-campaign.component.html',
    styleUrls: ['./filter-coupon-campaign.component.scss'],
    providers: [
        FilterSegmentsService,
        FilterStatusesService,
        FilterCategoriesService,
        FilterBrandsService
    ]
})
export class FilterCouponCampaignComponent implements OnInit {
    filtersTypes: any;
    filtersList: Filters;

    constructor(
            private route: ActivatedRoute,
            private offerFilterStore: OfferFilterStore,
            private offerFilterService: OfferFilterService,
            private filterSegmentsService: FilterSegmentsService,
            private filterStatusesService: FilterStatusesService,
            private filterCategoriesService: FilterCategoriesService,
            private filterBrandsService: FilterBrandsService,
            private storageService: StorageService
    ) {
    }

    ngOnInit(): void {
        const list = this.route.snapshot.data['filtersList'];
        this.filtersList = this.offerFilterService.changeFiltersList(list);
        this.filtersTypes = filtersTypes;
        this.setSelectedFromStorage();
    }

    toggleSelection(filter: Filter, selected: boolean, type: string): void {
        const nameService = this.getFilterService(type);
        selected
            ? this[nameService].select(filter)
            : this[nameService].deselect(filter);
        this.setSelectedFiltersFacade(nameService, type);
    }

    isSelected(filter: Filter, type: string): boolean {
        const nameService = this.getFilterService(type);
        return this[nameService].isSelected(filter);
    }

    selectAll(selected: boolean, type: string): void {
        const nameService = this.getFilterService(type);
        selected
            ? this[nameService].selectAll(this.filtersList[type])
            : this[nameService].deselectAll(this.filtersList[type]);
        this.setSelectedFiltersFacade(nameService, type);
    }

    isAllSelected(type: string): boolean {
        const nameService = this.getFilterService(type);
        return this[nameService].isAllSelected(this.filtersList[type]);
    }

    isAllDeselected(type: string): boolean {
        const nameService = this.getFilterService(type);
        return this[nameService].isAllDeselected(this.filtersList[type]);
    }

    private getFilterService(typeService: string): string {
        switch (typeService) {
            case filtersTypes.segments:
                return filterServices.segments;
            case filtersTypes.statuses:
                return filterServices.statuses;
            case filtersTypes.categories:
                return filterServices.categories;
            case filtersTypes.brands:
                return filterServices.brands;
        }
    }

    private setSelectedFiltersFacade(nameService: string, type: string): void {
        this.offerFilterStore.setSelected(this[nameService].getSelected(), type);
        this.offerFilterService.isAllSelectedByType(this.isAllSelected(type), type);
        this.offerFilterService.isAllDeselectedByType(this.isAllDeselected(type), type);
        this.offerFilterService.toggleAction.next();
    }

    private setSelectedFromStorage(): void {
        const selectedFiltersFromStorage =  JSON.parse(this.storageService.getData(storageParams.selectedFilters));
        for (const key in selectedFiltersFromStorage) {
            if (selectedFiltersFromStorage.hasOwnProperty(key)) {
                this.switchOnSelectedFilters(key, selectedFiltersFromStorage);
            }
        }
    }

    private switchOnSelectedFilters(type: string, selectedFiltersFromStorage: Filters): void {
        for (const filterFromStorage of selectedFiltersFromStorage[type]) {
            const selectedFilters = this.filtersList[type].find(filter => filter.id === filterFromStorage.id);
            this.toggleSelection(selectedFilters, true, type);
        }
    }
}
