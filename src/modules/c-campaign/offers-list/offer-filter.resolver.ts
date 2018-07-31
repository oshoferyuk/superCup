import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';


import { OfferListService } from './offer-list.service';
const mockFilters = {
    segments:  [
        {
            id: 0,
            name: 'Suburban Mom'
        },
        {
            id: 1,
            name: 'Young Professional'
        },
        {
            id: 2,
            name: 'Financially Dependent'
        },
        {
            id: 3,
            name: 'New Mom'
        },
        {
            id: 4,
            name: 'Family Planner'
        },
        {
            id: 5,
            name: 'Deal Hunter'
        },
        {
            id: 6,
            name: 'Brand Loyalist'
        },
        {
            id: 7,
            name: 'Single Male'
        }
    ],
    statuses:  [
        'Data Needed',
        'Image Needed',
        'Created',
        'Deleted',
        'Upcoming',
        'Active',
        'Disabled',
        'Expired'
    ],
    categories:  [
        'Family Care',
        'Household',
        'Beauty',
        'Health & Grooming'
    ],
    brands: [
        'Always',
        'Ambipur',
        'Ariel',
        'Bounty',
        'Braun',
        'Charmin',
        'Crest',
        'Dawn'
    ]
};

@Injectable()
export class OfferFilterResolver implements Resolve<any> {  // TODO Should be tested

    constructor(private offerListService: OfferListService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.offerListService.getListFilters()
                .map((filters) => {
                    // TODO IT need refactor when backend will be ready
                    if (!filters.segments || !filters.categories || !filters.statuses || !filters.brands) {
                        return mockFilters;
                    } else  {
                        return filters;
                    }
                });
    }
}
