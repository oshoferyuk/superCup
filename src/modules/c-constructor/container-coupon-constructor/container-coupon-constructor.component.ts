import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MarketingProgram } from '../../../core/models/marketing-program.model';
import { MarketingProgramStore } from '../services/marketing-program.store';
import { OfferFormService } from '../services/offer-form.service';
import { ConsumerSegments } from '../../../core/models/consumer-segments.model';
import { offerFields } from '../form-coupon-constructor/form-coupon-constructor.constants';
import { OfferStore } from '../services/offer.store';
import { ProductSelectorService } from '../form-coupon-constructor/product-selector/services/product-selector.service';

@Component({
    selector: 'fp-container-coupon-constructor',
    templateUrl: './container-coupon-constructor.component.html',
    styleUrls: ['./container-coupon-constructor.component.scss']
})
export class ContainerCouponConstructorComponent implements OnInit, OnDestroy {
    sampleValues: any[];
    formOffer: FormGroup;
    timeStamp: string;
    consumerSegments: ConsumerSegments[];
    marketingPrograms: MarketingProgram[];
    selectedMarketingProgram: MarketingProgram = null;

    constructor(private route: ActivatedRoute,
                private offerFormService: OfferFormService,
                private offerStore: OfferStore,
                private marketingProgramStore: MarketingProgramStore,
                private productSelectorService: ProductSelectorService) {
    }

    ngOnInit(): void {
        this.sampleValues = this.route.snapshot.data['couponConstructor'].sampleValues;
        this.marketingPrograms = this.route.snapshot.data['couponConstructor'].marketingPrograms;

        this.marketingProgramStore.setMarketingPrograms(this.marketingPrograms);
        this.formOffer = this.offerFormService.createForm();

        this.offerStore.setFormForUpdates(this.formOffer);

        const offer = this.route.snapshot.data['couponConstructor'] && this.route.snapshot.data['couponConstructor'].offer;
        this.timeStamp = !!offer && !!offer.updatedTimestamp ? offer.updatedTimestamp : 'N/A';
        this.offerFormService.updateForm(offer, this.formOffer);

        this.setDialogResult(offer);
    }

    ngOnDestroy(): void {
        this.offerStore.clear();
    }

    setMarketingProgram(marketingProgram: MarketingProgram): void {
        this.marketingProgramStore.setSelectedMarketingProgram(marketingProgram);
        this.selectedMarketingProgram = marketingProgram;
    }

    getStatus(): string {
        return this.formOffer.get(offerFields.status).value;
    }

    private setDialogResult(offer: any): void {
        if (offer) {
            this.productSelectorService.resetData();
            this.productSelectorService.setProductSummaries(offer.productSummaries);
        } else {
            this.productSelectorService.resetData();
        }
    }
}
