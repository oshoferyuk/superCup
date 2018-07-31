import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CouponConstructorResolver } from './coupon-constructor.resolver';
import { ContainerCouponConstructorComponent } from './container-coupon-constructor/container-coupon-constructor.component';

const routes: Routes = [
    {
        path: '',
        resolve: {
            couponConstructor: CouponConstructorResolver
        },
        component: ContainerCouponConstructorComponent
    },
    {
        path: ':id',
        resolve: {
            couponConstructor: CouponConstructorResolver,
        },
        component: ContainerCouponConstructorComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ConstructorRoutingModule {
}
