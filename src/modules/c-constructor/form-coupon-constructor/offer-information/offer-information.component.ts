import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { offerFields, offerTypes } from '../form-coupon-constructor.constants';

@Component({
    selector: 'fp-offer-information',
    templateUrl: './offer-information.component.html',
    styleUrls: ['./offer-information.component.scss'],
})
export class OfferInformationComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() sampleValues: any;
    @Input() marketingProgram: any;
    sampleForm: FormGroup;
    couponForm: FormGroup;
    offerTypes: { coupon: string; sample: string };

    constructor() {
    }

    ngOnInit(): void {
        this.offerTypes = offerTypes;
        this.couponForm = <FormGroup>this.form.get(offerTypes.coupon);
        this.sampleForm = <FormGroup>this.form.get(offerTypes.sample);
    }

    getType(): any {
        const formValue = this.form.getRawValue();
        return formValue && formValue[offerFields.type];
    }
}
