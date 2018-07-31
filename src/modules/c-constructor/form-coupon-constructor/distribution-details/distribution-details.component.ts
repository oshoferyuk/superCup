import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { offerFields, offerTypes } from '../form-coupon-constructor.constants';

@Component({
    selector: 'fp-distribution-details',
    templateUrl: './distribution-details.component.html',
    styleUrls: ['./distribution-details.component.scss']
})
export class DistributionDetailsComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() marketingProgram: any;

    sampleForm: FormGroup;
    couponForm: FormGroup;
    offerTypes: { coupon: string; sample: string };

    constructor() {}

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
