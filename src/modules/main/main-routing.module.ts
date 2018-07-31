import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '.';
import { mainRouting } from './main-routing.constants';

const routes: Routes = [
    {
        path: mainRouting.base,
        component: MainLayoutComponent,
        children: [
            {
                path: mainRouting.base,
                pathMatch: 'full',
                redirectTo: 'campaign'
            },
            {
                path: mainRouting.constructor,
                loadChildren: '../coupon-constructor/coupon-constructor.module#CouponConstructorModule'
            },
            {
                path: mainRouting.campaign,
                loadChildren: '../coupon-campaign/coupon-campaign.module#CouponCampaignModule'
            }
        ]
    }
];

export let mainRouterComponents = [MainLayoutComponent];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class MainRoutingModule {
}
