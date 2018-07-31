import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExportService } from '../../../core/services/export.service';
import { HttpHelperService } from '../../../core/transfer-module/http-helper.service';
import { HttpService } from '../../../core/transfer-module/http.service';
import { OfferList } from './models/offer-list.model';
import { SortDirection } from './models/sort-direction.enum';
import { OfferTab } from './models/tabs.enum';
import { OfferListStore } from './offer-list.store';
import { filtersTypes } from './filter-coupon-campaign/filter-coupon-campaign.constants';
import { defaultPaginationParams } from './pagination-coupon-campaign/pagination-coupon-campaing.constants';
import { defaultSorting } from './table-coupon-campaign/table-coupon-campaign.constants';
import { StorageService, storageParams } from '../../../core/services/storage.service';
import { URLSearchParams } from '@angular/http';
import { OfferFilterStore } from './offer-filter.store';
import { OfferFilterService } from './offer-filter.service';

export const offersEndpoint = '/offers';
export const filtersEndpoint = '/offers/filters';
export const sortField = 'sort';

export const defaultSearchParams = {
    tab: OfferTab.ALL,
    countOnPage: defaultPaginationParams.countOnPage,
    currentPage: defaultPaginationParams.currentPage
};

export const defaultFilterSearchParams = {
    [filtersTypes.segments]: '',
    [filtersTypes.statuses]: '',
    [filtersTypes.categories]: '',
    [filtersTypes.brands]: ''
};

export const reportUrl = '/oms-ui/coupons/printable/report?';

@Injectable()
export class OfferListService {
    private searchParams: any = defaultSearchParams;
    private sortParams: any = {};

    constructor(
        private http: HttpService,
        private httpHelperService: HttpHelperService,
        private offerListStore: OfferListStore,
        private exportService: ExportService,
        private storageService: StorageService,
        private offerFilterStore: OfferFilterStore,
        private offerFilterService: OfferFilterService
    ) {
        this.sortParams = this.formSortParams(defaultSorting);
    }

    getOffers(params?: any): Observable<OfferList> {
        Object.assign(this.searchParams, params, this.offerFilterService.getFiltersParams());
        const sortParams = this.getSortParamsFromStorage();
        if (!!sortParams) {
            this.sortParams = this.formSortParams(sortParams);
        }
        return this.makeRequest();
    }

    getOffersByStorageParams(): Observable<OfferList> {
        return this.makeRequestByStorageParams();
    }

    sortOffers(sorting: any): Observable<OfferList> {
        this.sortParams = this.formSortParams(sorting);
        Object.assign(this.searchParams, defaultFilterSearchParams, this.offerFilterService.getFiltersParams());
        return this.makeRequest();
    }

    getListFilters(): Observable<any> {
        return this.http.get(filtersEndpoint);
    }

    exportOffers(ids: string): void {
        if (ids) {
            this.exportService.openFile(`${reportUrl}${ids}`);
        }
    }

    private makeRequest(): Observable<OfferList> {
        const queryParams = this.httpHelperService.transformToQuery(this.searchParams);
        this.httpHelperService.appendMultipleField(sortField, this.sortParams, queryParams);
        this.storageService.setData(storageParams.searchParams, queryParams);
        this.storageService.setData(storageParams.selectedFilters, JSON.stringify(this.offerFilterStore.getSelected()));
        return this.makeHttpRequest(queryParams);
    }

    private makeRequestByStorageParams(): Observable<OfferList> {
        const queryParams = this.getSearchParamsFromStorage();
        return this.makeHttpRequest(queryParams);
    }

    private formSortParams(sorting: any): any {
        const sortParams = {};
        for (const key in sorting) {
            if (sorting.hasOwnProperty(key)) {
                sortParams[key] = SortDirection[sorting[key]];
            }
        }
        return sortParams;
    }

    private makeHttpRequest(queryParams: URLSearchParams): Observable<OfferList>  {
        const observable = this.http.get(offersEndpoint, queryParams);
        observable.subscribe(response => this.offerListStore.update(response));
        return observable;
    }

    private getSortParamsFromStorage(): any {
        const searchParams = this.getSearchParamsFromStorage();
        if (searchParams.get(sortField)) {
            const sortParamsFromStorage = searchParams.get(sortField).split(',');
            return {
                [sortParamsFromStorage[0]]: SortDirection[sortParamsFromStorage[1]]
            };
        } else {
            return defaultSorting;
        }
    }

    private getSearchParamsFromStorage(): URLSearchParams {
        const searchParamsFromStorage =  this.storageService.getData(storageParams.searchParams);
        return this.httpHelperService.transformStringToQuery(searchParamsFromStorage || '');
    }
}

