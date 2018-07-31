import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdDialogModule, MdSelectModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { MomentModule } from 'angular2-moment';
import { MyDatePickerModule } from 'mydatepicker';

import {
    ContainerCouponConstructorComponent,
    DistributionDetailsComponent,
    DistributionDetailsCouponComponent,
    DistributionDetailsSampleComponent,
    FormCouponConstructorComponent,
    HeaderCouponConstructorComponent,
    IdsInfoCouponConstructorComponent,
    OfferInformationComponent,
    OfferInformationCouponComponent,
    OfferInformationSampleComponent,
    PreviewCouponConstructorComponent,
    ProductsDialogComponent,
    ProductSelectorComponent,
    ProductsSummaryComponent,
    SubmitFormCouponConstructorComponent
} from '.';
import { CoreModule } from '../../core/core.module';
import { ConsumerSegmentsService, ConsumerSegmentsStore } from './consumer-segments';

import { ConstructorRoutingModule } from './coupon-constructor-routing.module';
import { CouponConstructorResolver } from './coupon-constructor.resolver';
import { DatePickerValidationService } from './services/date-picker-validation.service';
import { MarketingProgramService } from './services/marketing-program.service';
import { MarketingProgramStore } from './services/marketing-program.store';
import { OfferFormService } from './services/offer-form.service';
import { OfferStore } from './services/offer.store';
import { SampleValuesService } from './services/sample-values-service';
import {
    ProductSelectorService,
    ProductSelectorOptimizationService,
    ProductSearchService
} from './form-coupon-constructor/product-selector/services';

@NgModule({
    imports: [
        CoreModule,
        TreeModule,
        FormsModule,
        MomentModule,
        CommonModule,
        MdDialogModule,
        MdSelectModule,
        MyDatePickerModule,
        ReactiveFormsModule,
        ConstructorRoutingModule
    ],
    declarations: [
        ContainerCouponConstructorComponent,
        FormCouponConstructorComponent,
        HeaderCouponConstructorComponent,
        IdsInfoCouponConstructorComponent,
        PreviewCouponConstructorComponent,
        SubmitFormCouponConstructorComponent,
        OfferInformationComponent,
        DistributionDetailsComponent,
        OfferInformationCouponComponent,
        OfferInformationSampleComponent,
        DistributionDetailsCouponComponent,
        DistributionDetailsSampleComponent,
        ProductsSummaryComponent,
        ProductsDialogComponent,
        ProductSelectorComponent
    ],
    providers: [
        OfferFormService,
        OfferStore,
        SampleValuesService,
        ProductSearchService,
        MarketingProgramService,
        ConsumerSegmentsService,
        ConsumerSegmentsStore,
        CouponConstructorResolver,
        MarketingProgramStore,
        DatePickerValidationService,
        ProductSelectorService,
        ProductSelectorOptimizationService
    ],
    entryComponents: [
        ProductsDialogComponent,
        ProductSelectorComponent
    ],
})
export class CouponConstructorModule {
}
