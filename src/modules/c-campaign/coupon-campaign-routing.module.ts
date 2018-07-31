import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferListResolver } from './offers-list/offer-list.resolver';
import { OfferFilterResolver } from './offers-list/offer-filter.resolver';

import { ContainerCouponCampaignComponent } from './container-coupon-campaign/container-coupon-campaign.component';


const routes: Routes = [
    {
        path: '',
        component: ContainerCouponCampaignComponent,
        resolve: {
            offerList: OfferListResolver,
            filtersList: OfferFilterResolver
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [
        OfferListResolver,
        OfferFilterResolver
    ]
})
export class CampaignRoutingModule {
}
