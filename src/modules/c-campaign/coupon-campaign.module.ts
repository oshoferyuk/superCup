import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdSelectModule } from '@angular/material';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CampaignRoutingModule } from './coupon-campaign-routing.module';

import { OfferListService } from './offers-list/offer-list.service';
import { OfferListStore } from './offers-list/offer-list.store';
import { OfferFilterService } from './offers-list/offer-filter.service';
import { OfferFilterStore } from './offers-list/offer-filter.store';
import { OfferSelectionService } from './offers-list/offer-selection.service';

import { CoreModule } from '../../core/core.module';

import { couponCampaignComponents } from './';

@NgModule({
    imports: [
        CoreModule,
        CampaignRoutingModule,
        CommonModule,
        PaginationModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        MdSelectModule,
        PerfectScrollbarModule.forRoot()
    ],
    declarations: [
        ...couponCampaignComponents
    ],
    providers: [
        OfferFilterService,
        OfferFilterStore,
        OfferListStore,
        OfferListService,
        OfferSelectionService
    ]
})
export class CouponCampaignModule {
}
